import { createContext, useState, ReactNode, useEffect } from 'react';
import challanges from '../../challanges.json'

interface Challange {
    type: 'body' | 'eye';
    description: string;
    amount: number;
}

interface ChallangesContextData {
    level: number;
    currentExperience: number;
    experienceToNextLevel: number;
    challangesCompleted: number;
    activeChallange: Challange;
    levelUp: () => void;
    startNewChallange: () => void;
    resetChallange: () => void;
    completeChallange: () => void;
}

interface ChallangeProviderProps {
    children: ReactNode;
}

export const ChallangesContext = createContext({} as ChallangesContextData);

export function ChallangesProvider({ children }: ChallangeProviderProps) {
    const [level, setLevel] = useState(1)
    const [currentExperience, setCurrentExeperience] = useState(0);
    const [challangesCompleted, setChallangesCompleted] = useState(0);

    const [activeChallange, setActiveChallange] = useState(null)

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

    useEffect(() => {
        Notification.requestPermission();
    }, [])

  function levelUp() {
    setLevel(level + 1);
  }

  function startNewChallange() {
      const randomChallangeIndex = Math.floor(Math.random() * challanges.length)
      const challange = challanges[randomChallangeIndex];

      setActiveChallange(challange)

      new Audio('/notification.mp3').play();

      if (Notification.permission === 'granted') {
          new Notification('Novo desafio!', { body: `Valendo ${challange.amount}xp`})
      }
  }

  function resetChallange() {
      setActiveChallange(null)
  }

  function completeChallange() {
    if (!activeChallange) {
        return;
    }

    const { amount } = activeChallange;

    let finalExperience = currentExperience + amount;

    if (finalExperience >= experienceToNextLevel) {
        finalExperience = finalExperience - experienceToNextLevel;
        levelUp();
    }

    setCurrentExeperience(finalExperience);
    setActiveChallange(null);
    setChallangesCompleted(challangesCompleted + 1);
  }

    return (
        <ChallangesContext.Provider 
            value={{ level,
               currentExperience,
               experienceToNextLevel,
               challangesCompleted,
               levelUp,
               startNewChallange,
               activeChallange,
               resetChallange,
               completeChallange,
               }}>
            { children }
        </ChallangesContext.Provider>
    )
}