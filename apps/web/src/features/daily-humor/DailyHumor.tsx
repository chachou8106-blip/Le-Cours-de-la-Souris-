import React, { useState, useEffect } from 'react';

const humorScenes = [
  {
    id: 1,
    text: "Aujourd'hui, la Petite Souris a laissé 5€ sous l'oreiller de Jean-Michel… mais il a 45 ans. #Oops",
    image: "https://via.placeholder.com/400x200/0F6E56/FFFFFF?text=Jean-Michel+45+ans",
  },
  {
    id: 2,
    text: "En Australie, la Petite Souris s'appelle 'Tooth Fairy'… et elle paie en kangourous. #VraieHistoire",
    image: "https://via.placeholder.com/400x200/0F6E56/FFFFFF?text=Kangourou+Tooth+Fairy",
  },
  {
    id: 3,
    text: "Un enfant a essayé de négocier avec la Petite Souris. Résultat : 0€. #LeçonDeVie",
    image: "https://via.placeholder.com/400x200/0F6E56/FFFFFF?text=Négociation+Ratée",
  },
];

interface humorScene {
  id: number;
  text: string;
  image: string;
}

export const DailyHumor: React.FC = () => {
  const [currentScene, setCurrentScene] = useState<humorScene>(() => {
    const today = new Date().toDateString();
    const storedScene = localStorage.getItem(`humorScene-${today}`);
    return storedScene ? JSON.parse(storedScene) : humorScenes[0];
  });

  useEffect(() => {
    const today = new Date().toDateString();
    const randomIndex = Math.floor(Math.random() * humorScenes.length);
    const scene = humorScenes[randomIndex];
    setCurrentScene(scene);
    localStorage.setItem(`humorScene-${today}`, JSON.stringify(scene));
  }, []);

  return (
    <div className="bg-[var(--primary)] text-[var(--light)] p-4 mb-4 rounded-lg">
      <h2 className="text-xl font-bold mb-2">🎭 Scène Humoristique du Jour</h2>
      <div className="flex flex-col md:flex-row items-center gap-4">
        <img
          src={currentScene.image}
          alt="Scène humoristique"
          className="w-full md:w-1/3 rounded-lg"
        />
        <p className="text-center md:text-left">{currentScene.text}</p>
      </div>
      <div className="mt-4 text-center">
        <button
          onClick={() => {
            const newIndex = Math.floor(Math.random() * humorScenes.length);
            setCurrentScene(humorScenes[newIndex]);
          }}
          className="bg-[var(--light)] text-[var(--primary)] px-4 py-2 rounded-lg hover:bg-opacity-90"
        >
          Une autre scène !
        </button>
      </div>
    </div>
  );
};