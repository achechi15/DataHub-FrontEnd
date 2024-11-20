import { useEffect, useRef } from 'react'
import { SingleMessage } from './SingleMessage';
import { Message } from '../entities/MessageEntity';
interface Props {
    chat: Message[];
    isDeepDive: boolean;
}

export const ChatContent = ({ chat, isDeepDive }: Props) => {

    // const { chat } = useChatStore();

    const messagesEndRef = useRef<null | HTMLDivElement>(null);
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
        });
    }

    useEffect(() => {
        // detengo la ejecución durante 0.5 segundos
        setTimeout(() => {
            scrollToBottom();
        }, 500);
        // console.log("Se ha montado el componente chat content");

        return () => {
            // console.log("Se ha desmontado el componente chat content");
        };
    }, [chat]);

    return (
        <div className="flex flex-1 bg-white">
            <div className="flex flex-1 overflow-y-scroll bg-gray-200 w-full marginTop">
                    <ul className="w-full h-[calc(100vh-200px)] m-5 py-5">
                        {
                            chat.map( (message, index) => <SingleMessage key={index} message={message} isLastMessage={index} chat={chat} isDeepDive={isDeepDive} />)
                        }
                        <div ref={messagesEndRef} />
                    </ul>
            </div>
        </div>
    )
}
