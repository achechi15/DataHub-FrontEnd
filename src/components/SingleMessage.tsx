import { Message } from "../entities/MessageEntity";
import { ProductsTable } from "./ProductsTable";
import { TypingIndicator } from "./TypingIndicator";
import { AnimatedText } from "./functionalities/AnimatedText";
import { useChatStore } from "../store/chat-store";
// import { useChatStore } from "../store/chat-store";
// import { useChatStore } from "../store/chat-store";

interface Props {
    message: Message;
    isLastMessage: number;
}



export const SingleMessage = ({ message, isLastMessage }: Props) => {

    const { chat } = useChatStore();


    return (
        <div className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}>
            <div className={`flex gap-2 max-w-[80%] ${message.isBot ? 'flex-row' : 'flex-row-reverse'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0
                    ${message.isBot ? 'bg-blue-100' : 'bg-gray-100'}`}>
                    {message.isBot ? 
                        <img src={"https://pbs.twimg.com/profile_images/1488857444013027330/kpyepi0k_400x400.jpg"} alt="Bot" className="w-full h-full object-contain rounded-full mt-2" /> 
                        :
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-5 h-5 text-gray-500">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    }
                </div>
                {
                    ((typeof message.content === 'object' && 'introText' in message.content && message.content.introText === "") || message.content === "") ?
                    <TypingIndicator /> :
                    <div
                    className={`rounded-2xl px-4 py-3 my-4 ${
                    message.isBot
                        ? 'bg-white border border-gray-200 shadow-sm'
                        : 'bg-[#fb2070] text-white max-w-[80%] break-words'
                    }`}
                    >
                        {message.content && (
                            <p className={`text-sm ${message.isBot ? 'text-[#1B2A4E]' : 'text-white'} ${typeof message.content === 'object' && message.content.introText ? 'mb-3' : ''}`}>
                                {typeof message.content === 'string' ? (
                                    isLastMessage === chat.length - 1 && message.isBot ? <AnimatedText text={message.content} /> : message.content
                                ) : (
                                    isLastMessage === chat.length - 1 && message.isBot ? <AnimatedText text={message.content.introText} /> : message.content.introText
                                )}
                            </p>
                        )}
                        {typeof message.content === 'object' && 'products' in message.content && message.content.products.length > 0 && (
                            <div className="transition-opacity duration-300">
                                <ProductsTable isLastMessage={isLastMessage} products={message.content.products} productCount={message.content.productCount} />
                            </div>
                        )}
                        <p className="text-xs mt-2 opacity-70">
                            {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                    </div>
                }
            </div>
        </div>
    )
}