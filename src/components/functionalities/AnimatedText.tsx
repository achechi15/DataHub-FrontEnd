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
        const intervalId = setInterval(() => {
            if (text.length > position) {
                setDisplayedText((prev) => prev + text[position]);
                setPosition(prev => prev + 1);
                setIndex(position);
                if (position === text.length-1) {
                    setIndex(0);
                    clearInterval(intervalId);
                }
            }
            else {
                clearInterval(intervalId);
            }
        }, 10);

        return () => clearInterval(intervalId);
    }, [text, position, index, setIndex]);

    return (<>{displayedText}</>);
}
