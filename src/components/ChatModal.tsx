import { Menu, Send, Smile, X } from "lucide-react";
import { useChatStore } from "../store/chat-store";
import { useRef, useState } from "react";
import { ChatContent } from "./ChatContent";
import { useChatStoreDeepDive } from "../store/deepDive/useChatStoreDeepDive";
import { useWebSocketsDeepDive } from "../store/deepDive/useWebSocketsDeepDive";


export const ChatModal = () => {
    
    const { isModalOpen, setIsModalOpen, selectedProducts, resetSelectedProducts } = useChatStore();
    const { chat, addMessage, resetChat, isLoading } = useChatStoreDeepDive();
    const [input, setInput] = useState("");
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [isNavExpanded, setIsNavExpanded] = useState(false);
    const { sendMessage } = useWebSocketsDeepDive();

    // console.log(isLoading);

    const handleAddMessage = (content: string) => {
        addMessage({
            content,
            id: crypto.randomUUID(),
            isBot: false,
            timestamp: new Date(),
        })

        // HACER EL ENVIO AL WEBSOCKET
        sendMessage(content);

    }
    
    console.log(chat);

    if (!isModalOpen) return null;
    
    const handleSend = () => {
        if (input.trim()) {
            handleAddMessage(input);
            console.log(input);
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
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center animate-fadeIn">
            <div className="bg-white w-full max-w-7xl h-[900px] rounded-xl shadow-xl flex flex-col animate-slideIn">
                <div className="p-4 border-b flex items-center justify-between">
                    <Menu className="w-5 h-5 text-gray-500" onClick={() => setIsNavExpanded(!isNavExpanded)} />
                <h2 className="text-lg font-semibold text-[#1B355E] flex items-center">
                    Deep dive
                    {/* <span className="inline-block w-2 h-2 bg-green-400 rounded-full mx-2 ml-4"></span>
                    <p className="text-sm text-gray-500">En línea</p> */}
                </h2>
                <button
                    onClick={() => {
                        setIsModalOpen(false);
                        resetChat();
                        resetSelectedProducts();
                    }}
                    className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                >
                    <X className="w-5 h-5 text-gray-500" />
                </button>
                </div>
                
                <div className="flex-1 overflow-hidden">
                    <div className="flex h-full">
                        <div className={`left-0 top-0 bg-gray-300 overflow-y-auto ${isNavExpanded ? 'w-1/4' : 'w-0'} transition-all duration-200 ease-in-out`}>
                            <h2 className="text-lg text-[#1b355b] font-semibold m-4">Productos</h2>
                            {
                                selectedProducts.map((product) => (
                                    <div key={product.id} className="bg-white p-4 m-4 rounded-lg shadow">
                                        {/* <img
                                            src={product.image || "/placeholder.svg?height=96&width=96"}
                                            alt={product.productName}
                                            width={96}
                                            height={96}
                                            className="object-contain mb-2"
                                        /> */}
                                        <h3 className="font-medium text-sm">{product.name}</h3>
                                        <p className="text-xs text-gray-600">CN {product.id}</p>
                                        <p className="text-sm text-[#fb2070] font-bold mt-1">{product.price.toFixed(2)}€</p>
                                        <p className="text-xs text-gray-500">{product.stock}</p>
                                    </div>
                                ))
                            }
                        </div>
                        <div className="flex-1 overflow-y-auto">
                            <ChatContent chat={chat} isDeepDive={true} />
                        </div>
                    </div>
                </div>

                <div className="border-t">
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
                </div>
            </div>
        </div>
    );
}
