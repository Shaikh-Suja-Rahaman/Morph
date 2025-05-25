import React, { useRef, useEffect } from "react";
import "@tensorflow/tfjs-backend-webgl";
import * as tf from "@tensorflow/tfjs";
import * as posedetection from "@tensorflow-models/pose-detection";

const speakFeedback = (text) => {
  // asdasd
  const utterance = new SpeechSynthesisUtterance(text);
  window.speechSynthesis.speak(utterance);
};

const areLegJointsVisible = (keypoints, threshold = 0.2) => {
  const indexes = [11, 12, 13, 14, 15, 16];
  return indexes.every(
    (i) => keypoints[i]?.score && keypoints[i].score > threshold
  );
};

const areArmJointsVisible = (keypoints, threshold = 0.2) => {
  const indexes = [5, 6, 7, 8, 9, 10];
  return indexes.every(
    (i) => keypoints[i]?.score && keypoints[i].score > threshold
  );
};

const areCoreJointsVisible = (keypoints, threshold = 0.2) => {
  const indexes = [5, 6, 11, 12, 15, 16];
  return indexes.every(
    (i) => keypoints[i]?.score && keypoints[i].score > threshold
  );
};

const PoseDetector = ({ exercise }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  let detector;
  let lastFeedbackTime = 0;
  const FEEDBACK_INTERVAL = 2500;

  useEffect(() => {
    const runPoseDetection = async () => {
      await tf.setBackend("webgl");
      await tf.ready();

      detector = await posedetection.createDetector(
        posedetection.SupportedModels.MoveNet,
        {
          modelType: posedetection.movenet.modelType.SINGLEPOSE_LIGHTNING,
        }
      );

      if (navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        videoRef.current.srcObject = stream;

        videoRef.current.onloadedmetadata = () => {
          videoRef.current.play();
          detectPose();
        };
      }
    };

    const detectPose = async () => {
      if (videoRef.current && detector) {
        const estimationLoop = async () => {
          const poses = await detector.estimatePoses(videoRef.current);
          const keypoints = poses[0]?.keypoints || [];
          drawKeypoints(keypoints);

          const isVisible =
            (exercise === "squat" && areLegJointsVisible(keypoints)) ||
            (exercise === "pushup" && areArmJointsVisible(keypoints)) ||
            (exercise === "plank" && areCoreJointsVisible(keypoints));

          if (isVisible) {
            const now = Date.now();
            if (now - lastFeedbackTime > FEEDBACK_INTERVAL) {
              const formattedKeypoints = keypoints.map((kp) => ({
                x: kp.x,
                y: kp.y,
                score: kp.score,
                name: kp.name,
              }));

              const endpoint = `https://morph-backend-fvad.onrender.com/analyze_${exercise}/`;

              fetch(endpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ keypoints: formattedKeypoints }),
              })
                .then((res) => res.json())
                .then((data) => {
                  console.log("📡 Backend Response:", data);
                  if (data.feedback) {
                    console.log("🧠 Feedback:", data.feedback);
                    speakFeedback(data.feedback);
                  }

                  if (exercise === "squat" && data.knee_angle)
                    console.log("🦵 Knee Angle:", data.knee_angle);
                  if (exercise === "pushup" && data.elbow_angle)
                    console.log("💪 Elbow Angle:", data.elbow_angle);
                  if (exercise === "plank" && data.body_angle)
                    console.log("📏 Body Angle:", data.body_angle);
                })
                .catch((err) => console.error("❌ Backend Error:", err));

              lastFeedbackTime = now;
            }
          }

          requestAnimationFrame(estimationLoop);
        };
        estimationLoop();
      }
    };

    const drawKeypoints = (keypoints) => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (!canvas || !ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.save();
      ctx.scale(-1, 1);
      ctx.translate(-canvas.width, 0);
      const scaleX = canvas.width / videoRef.current.videoWidth;
      const scaleY = canvas.height / videoRef.current.videoHeight;

      keypoints.forEach(({ x, y, score }) => {
        if (score > 0.5) {
          ctx.beginPath();
          ctx.arc(x * scaleX, y * scaleY, 5, 0, 2 * Math.PI);
          ctx.fillStyle = "aqua";
          ctx.fill();
        }
      });

      const skeleton = [
        [0, 1],
        [0, 2],
        [1, 3],
        [2, 4],
        [5, 6],
        [5, 7],
        [7, 9],
        [6, 8],
        [8, 10],
        [5, 11],
        [6, 12],
        [11, 12],
        [11, 13],
        [13, 15],
        [12, 14],
        [14, 16],
      ];

      ctx.strokeStyle = "lime";
      ctx.lineWidth = 2;

      skeleton.forEach(([i, j]) => {
        const kp1 = keypoints[i];
        const kp2 = keypoints[j];

        if (kp1?.score > 0.2 && kp2?.score > 0.2) {
          ctx.beginPath();
          ctx.moveTo(kp1.x * scaleX, kp1.y * scaleY);
ctx.lineTo(kp2.x * scaleX, kp2.y * scaleY);
          ctx.stroke();
        }
      });

      ctx.restore();
    };

    runPoseDetection();
  }, [exercise]);

  return (
    <div
      style={{
        display: "flex",
        width: "100vw",
        height: "100vh",
        background: "linear-gradient(to bottom right, #0f0f0f, #1e0e2f)",
        fontFamily: "sans-serif",
      }}
    >
      {/* === LEFT: Canvas / Video Feed === */}
      <div
        ref={(el) => {
          if (el && canvasRef.current && videoRef.current) {
            canvasRef.current.width = el.clientWidth;
            canvasRef.current.height = el.clientHeight;
            videoRef.current.width = el.clientWidth;
            videoRef.current.height = el.clientHeight;
          }
        }}
        style={{
          position: "relative",
          width: "70vw",
          height: "100vh",
          borderRight: "2px solid #1e1e1e",
          backgroundColor: "#000",
        }}
      >
        <video
          ref={videoRef}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: "scaleX(-1)",
          }}
        />
        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
          }}
        />
      </div>

      {/* === RIGHT: Trainer Call Panel === */}
      <div
        style={{
          width: "30vw",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#111827",
          color: "#fff",
          padding: "2rem",
          gap: "2rem",
        }}
      >
        {/* Trainer Avatar */}
        <div
          style={{
            width: "130px",
            height: "130px",
            borderRadius: "50%",
            backgroundImage: "url('https://via.placeholder.com/150')", // Replace this with actual image
            backgroundSize: "cover",
            backgroundPosition: "center",
            border: "3px solid #3b82f6",
            boxShadow: "0 0 15px rgba(59,130,246,0.4)",
          }}
        />

        {/* Trainer Name */}
        <div style={{ fontSize: "1.5rem", fontWeight: "600" }}>Morph AI</div>

        {/* Audio Wave Placeholder */}
        <div
          style={{
            width: "200px",
            height: "40px",
            background: "linear-gradient(90deg, #6b21a8, #4c1d95)",
            borderRadius: "10px",
            animation: "pulse 1.5s infinite ease-in-out",
            boxShadow: "0 0 10px rgba(6, 182, 212, 0.3)",
          }}
        />

        {/* Pulse Animation */}
        <style>{`
          @keyframes pulse {
            0% { transform: scaleY(1); opacity: 0.7; }
            50% { transform: scaleY(1.4); opacity: 1; }
            100% { transform: scaleY(1); opacity: 0.7; }
          }
        `}</style>
      </div>
    </div>
  );

};

export default PoseDetector;