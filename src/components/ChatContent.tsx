import { useEffect, useRef } from 'react'
import { useChatStore } from '../store/chat-store'
import { SingleMessage } from './SingleMessage';

export const ChatContent = () => {

    const { chat } = useChatStore();

    const messagesEndRef = useRef<null | HTMLDivElement>(null);
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth'});
    }

    useEffect(() => {
        scrollToBottom();
    }, [chat]);

    return (
        <div className="flex bg-gray-200 flex-1 w-full marginTop overflow-y-scroll">
                <ul className="w-full h-[300px] m-10">
                    {
                        chat.map( message => <SingleMessage key={crypto.randomUUID()} message={message} />)
                    }
                    <div ref={messagesEndRef} />
                </ul>
        </div>
    )
}
