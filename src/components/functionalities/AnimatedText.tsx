import React, { useEffect, useState } from 'react'
import { useChatStore } from '../../store/chat-store';

interface Props {
    text: string;
}

export const AnimatedText = ({ text }: Props) => {
    
    const { index, setIndex } = useChatStore();
    
    const [position, setPosition] = useState(index);
    const [displayedText, setDisplayedText] = useState(text.slice(0, index));

    useEffect(() => {
        console.log("Se ha montado el componente animation text");

        return () => {
            console.log("Se ha desmontado el componente animation text");
        }
    }, []);

    useEffect(() => {
        console.log("Se ha ejecutado el useEffect");
        const intervalId = setInterval(() => {
            console.log("Ha llamado al setInterval");
            if (text.length > position) {
                setDisplayedText((prev) => prev + text[position]);
                setPosition(prev => prev + 1);
                setIndex(position);
                console.log("index", index);
                console.log({textLength: text.length});
                console.log({position});
                if (position === text.length-1) {
                    console.log("Ha llegado al final de la animación");
                    setIndex(0);
                    clearInterval(intervalId);
                }
            }
            else {
                clearInterval(intervalId);
            }
        }, 100);

        return () => clearInterval(intervalId);
    }, [text, position, index, setIndex]);

    return (<>{displayedText}</>);
}
