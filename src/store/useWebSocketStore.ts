import { create } from "zustand";
import { useChatStore } from "./chat-store";

interface WebSocketState {
    ws: WebSocket | null;
    
    connect: (url: string) => void;
    disconnect: () => void;
    sendMessage: (message: string) => void;
}

export const useWebSocketStore = create<WebSocketState>()( (set, get) => ({
    ws: null,
    connect: (url: string) => {
        const  ws = new WebSocket(url);
        
        ws.onopen = () => {
            console.log('conectado');
        }

        ws.onmessage = (event: MessageEvent) => {
            // console.log(event.data);
            const data = JSON.parse(event.data);
            console.log(data);
            if (data.type === 'start') {
                useChatStore.getState().setIsLoading(true);
                useChatStore.getState().addMessage({
                    id: "xd",
                    isBot: true,
                    content: "",
                    timestamp: new Date(),
                })
            }
            else if (data.type === 'stream') {
                const message = JSON.parse(data.textPart);
                useChatStore.getState().editLastMessage({
                    id: "xd",
                    isBot: true,
                    content: message,
                    timestamp: new Date(),
                })
            }
            else if (data.type === 'end') {
                console.log("finalizo");
                useChatStore.getState().setIsLoading(false);
            }
        }

        set(() => ({ ws }));
    },
    disconnect: () => {
        if (get().ws) {
            console.log('desconectado');    
            set(() => ({ ws: null }));
        }
    },
    sendMessage: (message: string) => {
        get().ws?.send(message);
    },
}))