import { Send, Smile } from "lucide-react";
import { useRef, useState } from "react";
import { useChatStore } from "../store/chat-store";
import { useWebSocketStore } from "../store/useWebSocketStore";

interface Props {
    // onClick: (a: string) => void;
    isLoading: boolean;
}


export const ChatInput = ({ isLoading }: Props) => {

    const { addMessage } = useChatStore();

    const handleAddMessage = async (content: string) => {
        // Añade el mensaje dado por el usuario
        addMessage({
            content,
            id: crypto.randomUUID(),
            isBot: false,
            timestamp: new Date(),
        })

        // Envío el mensaje al websocket
        useWebSocketStore.getState().sendMessage(content);


    }

    
    const [input, setInput] = useState("");
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    
    const handleSend = () => {
        if (input.trim()) {
            handleAddMessage(input);
            setInput("");
            if (textareaRef.current) {
                textareaRef.current.style.height = 'auto'
            }
        }
        else {
            setInput("");
        }
    }
    
    const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.ctrlKey && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    }
    
    
    const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInput(e.target.value);
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto'
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
        }
    }
    
    return (
        <div className="p-4 bg-gradient-to-r from-gray-100 to-gray-200 border-t rounded-b-xl border-gray-300 shadow-inner">
            <div className="relative flex items-center space-x-2 max-w-4xl mx-auto bg-white rounded-2xl shadow-md p-2">
                {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80 rounded-2xl z-10">
                        <p className="text-gray-500 font-medium">Esperando respuesta...</p>
                    </div>
                )}
                <button className="text-gray-500 hover:text-yellow-500 rounded-full p-2">
                    <Smile className="h-5 w-5" />
                    <span className="sr-only">Insertar emoji</span>
                </button>
                <textarea
                    ref={textareaRef}
                    placeholder="Escribe tu mensaje... (Ctrl + Enter para nueva línea)"
                    value={input}
                    onChange={handleInput}
                    onKeyDown={handleKeyPress}
                    className="flex-grow text-sm focus:outline-none focus:border-[#FF0066] focus:ring-1 focus:ring-[#FF0066] border-none rounded-xl px-4 py-2 resize-none overflow-hidden min-h-[40px] max-h-[200px]"
                    rows={1}
                    disabled={isLoading}
                />
                
                <button
                    onClick={handleSend}
                    className="bg-[#FF1D8E] hover:bg-[#ff1d8ee6] text-white p-2 rounded-xl transition-all duration-200 ease-in-out transform hover:scale-105 shadow-md flex items-center justify-center"
                    disabled={isLoading}
                >
                    <Send className="h-5 w-5" />
                    <span className="sr-only">Enviar</span>
                </button>
            </div>
        </div>
    )
}