import { useState, useEffect } from "react";
import { useChatStore } from "../store/chat-store";
import { useWebSocketStore } from "../store/useWebSocketStore";
import { useWebSocketsDeepDive } from "../store/deepDive/useWebSocketsDeepDive";
import { useChatStoreDeepDive } from "../store/deepDive/useChatStoreDeepDive";

export const Header = () => {

    const { resetChat } = useChatStore();
    const { ws } = useWebSocketStore();
    const { connect } = useWebSocketsDeepDive();
    const [isOnline, setIsOnline] = useState(false);

    const { selectedProducts, setIsModalOpen } = useChatStore();

    const handleDeepDive = async () => {
        setIsModalOpen(true);
        console.log("Ha entrado");
        useChatStoreDeepDive.getState().setIsLoading(true);
        console.log(`${import.meta.env.VITE_API_URL}/chat/deep-dive`)
        console.log(JSON.stringify({
            products: selectedProducts
        }));
        const response = await fetch(`${import.meta.env.VITE_API_URL}/chat/deep-dive`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Origin': 'https://entrega5-front-109855577898.europe-southwest1.run.app/'
            },
            body: JSON.stringify({
                products: selectedProducts
            })
        });
        const id = await response.json();
        console.log(id);
        //TODO: Cambiar el ws por el que se conecta a la deep dive
        console.log(`${import.meta.env.VITE_WEBSOCKET_URL}/chat/deep-dive/${id.id}`);
        connect(`${import.meta.env.VITE_WEBSOCKET_URL}/chat/deep-dive/${id.id}`);
    }



    useEffect(() => {
        const updateConnectionStatus = () => {
            setIsOnline(ws?.readyState === WebSocket.OPEN);
        };

        updateConnectionStatus();

        if (ws) {
            ws.addEventListener('open', updateConnectionStatus);
            ws.addEventListener('close', updateConnectionStatus);
            ws.addEventListener('error', updateConnectionStatus);
        }

        return () => {
            if (ws) {
                ws.removeEventListener('open', updateConnectionStatus);
                ws.removeEventListener('close', updateConnectionStatus);
                ws.removeEventListener('error', updateConnectionStatus);
            }
        };
    }, [ws]);


    return (
        <div className="bg-[#1B2A4E] p-4 rounded-t-xl shadow-sm border-b flex justify-between items-center pl-8">
            <div className="flex items-center space-x-4">
                {/* <FaUserMd size={32} color="white" /> */}
                <div className="h-10 w-10 ring-2 ring-white shadow-md rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                    <img 
                        src="https://pbs.twimg.com/profile_images/1488857444013027330/kpyepi0k_400x400.jpg" 
                        alt="Profile"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div>
                    <h2 className="text-white font-bold text-lg">CoFinder</h2>
                    <p className="text-[#fb2070] text-sm flex items-center">
                        { isOnline ? (
                            <>
                                <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                                En línea
                            </>
                        ) : (
                            <>
                                <span className="w-2 h-2 bg-white rounded-full mr-2"></span>
                                Desconectado
                            </>
                        )}
                    </p>
                </div>
            </div>
            <div className="flex items-center">
                <button 
                    className="bg-white text-[#1B2A4E] hover:scale-105 transition-all duration-200 ease-in-out transform px-6 py-2 rounded-full mr-4"
                    onClick={() => resetChat()}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                    </svg>
                </button>
                <button 
                    className={`bg-[#fb2070] text-white hover:scale-105 transition-all duration-200 ease-in-out transform px-6 py-2 rounded-full mr-2
                        ${selectedProducts.length > 0 ? 'opacity-100' : 'opacity-50 pointer-events-none '}`}
                    onClick={() => {
                        handleDeepDive();
                    }}
                >
                    Deep dive
                </button>
            </div>
        </div>
    )
}
