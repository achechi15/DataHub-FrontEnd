import { create } from "zustand";
import { useChatStoreDeepDive } from "./useChatStoreDeepDive";
// import { decodeUnicode } from "../useWebSocketStore";

interface WebSocketState {
    ws: WebSocket | null;
    connect: (url: string) => void;
    disconnect: () => void;
    sendMessage: (message: string) => void;
}

export const useWebSocketsDeepDive = create<WebSocketState>()( (set, get) => ({
    ws: null,
    connect: (url: string) => {
        try {
            const ws = new WebSocket(url);
            ws.onopen = () => {
                console.log('ws conectado');
                useChatStoreDeepDive.getState().setIsLoading(false);
            }
            ws.onmessage = (event: MessageEvent) => {
                // console.log(event.data);
                const data = JSON.parse(event.data);
                console.log(data);
                if (data.type === 'start') {
                    useChatStoreDeepDive.getState().setIsLoading(true);
                    useChatStoreDeepDive.getState().addMessage({
                        id: "xd",
                        isBot: true,
                        content: "",
                        timestamp: new Date(),
                    })
                }
                else if (data.type === 'stream') {
                    const message = JSON.parse(data.textPart);
                    // console.log(decodeUnicode(message.introText.slice(0, -1)));
                    useChatStoreDeepDive.getState().editLastMessage({
                        id: "xd",
                        isBot: true,
                        content: {
                            ...message,
                            // introText: decodeUnicode(message.introText),
                            introText: message.introText,
                        },
                        timestamp: new Date(),
                    })
                }
                else if (data.type === 'end') {
                    console.log("finalizo el mensaje");
                    useChatStoreDeepDive.getState().setIsLoading(false);
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
}));

