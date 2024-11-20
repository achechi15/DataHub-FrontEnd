import { create } from "zustand";
import { useChatStore } from "./chat-store";

interface WebSocketState {
    ws: WebSocket | null;
    
    connect: (url: string) => void;
    disconnect: () => void;
    sendMessage: (message: string) => void;
}

export function decodeUnicode(text: string): string {
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
        try {
            const ws = new WebSocket(url);
            ws.onopen = () => {
                console.log('ws conectado');
            }
            ws.onmessage = (event: MessageEvent) => {
                console.log(event.data);
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
                    console.log(message);
                    // console.log(decodeUnicode(message.introText.slice(0, -1)));
                    useChatStore.getState().editLastMessage({
                        id: "xd",
                        isBot: true,
                        content: {
                            ...message,
                            introText: message.introText,
                        },
                        timestamp: new Date(),
                    })
                }
                else if (data.type === 'end') {
                    console.log("finalizo el mensaje");
                    useChatStore.getState().setIsLoading(false);
                }
            }
    
            set(() => ({ ws }));
        } catch (error) {
            console.log({error})
            get().connect(url);
        }

    },
    disconnect: () => {
        const ws = get().ws;
        if (ws && ws.readyState === WebSocket.OPEN) {
            ws.close();
            console.log('ws desconectado');  
            set(() => ({ ws: null }));
        }
    },
    sendMessage: (message: string) => {
        get().ws?.send(message);
    },
}))