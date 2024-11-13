import { create } from "zustand";
import { useChatStore } from "./chat-store";

interface WebSocketState {
    ws: WebSocket | null;
    
    connect: (url: string) => void;
    disconnect: () => void;
    sendMessage: (message: string) => void;
}

function decodeUnicode(text: string): string {
    // Maneja secuencias de escape Unicode estándar (\u1234)
    const standardUnicode = text.replace(/\\u([\dA-Fa-f]{4})/g, (_match, group) => 
        String.fromCharCode(parseInt(group, 16))
    );
    
    // Maneja secuencias de escape Unicode con doble backslash (\\u1234)
    const doubleBackslash = standardUnicode.replace(/\\\\u([\dA-Fa-f]{4})/g, (_match, group) => 
        String.fromCharCode(parseInt(group, 16))
    );
    
    // Decodifica caracteres URI-encoded (%20, %C3%B1, etc.)
    try {
        return decodeURIComponent(doubleBackslash);
    } catch {
        return doubleBackslash; // Si falla el decodeURIComponent, devuelve el texto con Unicode decodificado
    }
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
            // console.log(data);
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
                // console.log(decodeUnicode(message.introText.slice(0, -1)));
                useChatStore.getState().editLastMessage({
                    id: "xd",
                    isBot: true,
                    content: {
                        ...message,
                        introText: decodeUnicode(message.introText),
                    },
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