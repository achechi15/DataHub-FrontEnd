import { useEffect, useRef } from 'react'
import { useChatStore } from '../store/chat-store';
import { SingleMessage } from './SingleMessage';

export const ChatContent = () => {

    const { chat } = useChatStore();

    const messagesEndRef = useRef<null | HTMLDivElement>(null);
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
        });
    }

    useEffect(() => {
        scrollToBottom();
        console.log("Se ha montado el componente chat content");

        return () => {
            console.log("Se ha desmontado el componente chat content");
        };
    }, [chat]);

    return (
        <div className="flex flex-1 bg-white">
            <div className="flex flex-1 overflow-y-scroll bg-gray-200 w-full marginTop">
                    <ul className="w-full h-[calc(100vh-400px)] m-5">
                        {
                            chat.map( (message, index) => <SingleMessage key={index} message={message} isLastMessage={index === chat.length - 1} />)
                        }
                        <div ref={messagesEndRef} />
                    </ul>
            </div>
        </div>
    )
}
