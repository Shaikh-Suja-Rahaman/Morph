import React from 'react';

const FeatureCard = ({ title, description, image }) => {
  return (
    <div className="flex-none w-[400px] bg-black/90 rounded-xl overflow-hidden
      transition-all duration-300 hover:-translate-y-1 group border border-purple-500/10
      hover:border-purple-500/30 hover:shadow-xl hover:shadow-purple-500/20">
      <div className="h-[250px] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover grayscale hover:grayscale-0
            transition-all duration-500 transform group-hover:scale-105"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
        <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

const FeatureCards = () => {
  const features = [
    {
      title: 'Prevent Injury',
      description: 'Learn techniques and analyze posture to avoid injuries',
      image: 'https://www.orthobethesda.com/wp-content/uploads/2020/12/How-to-Prevent-Sports-Injuries.jpg'
    },
    {
      title: 'Boost Confidence',
      description: 'Stand tall and confident with posture-enhancing exercises',
      image: 'https://media.istockphoto.com/id/1834928372/photo/fitness-breathing-and-sweating-with-a-tired-man-in-the-gym-resting-after-an-intense-workout.jpg?s=612x612&w=0&k=20&c=3QRYeKdStt2yvO0DNY-UAMs0Fh4uFDhuJj-kP26UoM4='
    },
    {
      title: 'Better Posture',
      description: 'Improve your posture through analysis and guidance',
      image: 'https://media.istockphoto.com/id/1287206027/photo/sporty-female-boxer-with-headphones-on-grey-background.jpg?s=612x612&w=0&k=20&c=JWAhgyxam_GaRdQNukKK2vMlOtltzPk0eh4aMxotSH0='
    }
  ];

  return (
    <div className="w-full  py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-white mb-12 uppercase tracking-wider">
          WORKOUT with better form
        </h2>

        {/* Changed to grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>

        <p className="text-center text-gray-400 mt-12 max-w-2xl mx-auto">
          All this is possible with pose estimation and form correction.
        </p>
      </div>
    </div>
  );
};

export default FeatureCards;