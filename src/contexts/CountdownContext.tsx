import { createContext, ReactNode, useState, useContext, useEffect } from "react";
import { ChallangesContext} from './ChallangesContext'

interface CountdownContextData {
    minutes: number;
    seconds: number;
    hasFineshed: boolean;
    isActive: boolean;
    startConuntdown: () => void;
    resetCountdown: () => void;
}

interface CountdownProviderProps {
    children: ReactNode;
}

export const CountdownContext = createContext({} as CountdownContextData);

let countdownTimeout : NodeJS.Timeout;

export function CountdownProvider({children}: CountdownProviderProps) {
    const { startNewChallange } = useContext(ChallangesContext);
    

    const [time, setTime] = useState(30 * 60);
    const [isActive, setIsActive] = useState(false)
    const [hasFineshed, setHasFinished] = useState(false)

    const minutes = Math.floor(time / 60)
    const seconds = time % 60

     function startConuntdown() {
        setIsActive(true)
    }

    function resetCountdown() {
        clearTimeout(countdownTimeout)
        setIsActive(false);
        setHasFinished(false);
        setTime(30 * 60);
    }

    useEffect( () => {
        if (isActive && time > 0) {
            countdownTimeout = setTimeout(() => {
                setTime(time - 1);
            }, 1000)
        } else if(isActive && time === 0) {
            setHasFinished(true);
            setIsActive(false);
            startNewChallange();
        }
    }, [isActive, time])

    return (
        <CountdownContext.Provider value={{
            minutes,
            seconds,
            hasFineshed,
            isActive,
            startConuntdown,
            resetCountdown,
        }}>
            {children}
        </CountdownContext.Provider>
    )
}
