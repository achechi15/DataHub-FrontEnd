import React, { useEffect } from 'react'
import { ChatContent } from './ChatContent'
import { ChatInput } from './ChatInput'
import { useChatStore } from '../store/chat-store'
import { useWebSocketStore } from '../store/useWebSocketStore'
import { Header } from './Header'

interface Props {
    isOpen: boolean;
}

export const Chat = ({ isOpen }: Props) => {

    const { isLoading } = useChatStore();

    useEffect(() => {
        console.log("Se ha montado el componente chat");

        return () => {
            console.log("Se ha desmontado el componente chat");
        };
    }, []);

    return (
        <div className={`max-w-7xl w-[100%] flex flex-col transform transition-all duration-300 ease-in-out
            ${isOpen ? 'opacity-100 translate-y-0' : 'max-h-0 opacity-0 absolute -translate-y-4 pointer-events-none'}`}>
                
                <div className={`bg-white pt-4 rounded-t-xl shadow-sm `}>
                    <Header />
                    <ChatContent />
                </div>

                <ChatInput isLoading={isLoading} />
        </div>
    )
}
