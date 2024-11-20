import { create } from "zustand";
import { Message } from "../../entities/MessageEntity";
import { useWebSocketsDeepDive } from "./useWebSocketsDeepDive";

interface ChatState {
    chat: Message[];
    isLoading: boolean;
    index: number;

    resetChat: () => void;
    setIndex: (index: number) => void,
    editLastMessage: (message: Message) => void;
    addMessage: (message: Message) => void;
    setIsLoading: (isLoading: boolean) => void;
}

export const useChatStoreDeepDive = create<ChatState>()( (set) => ({
    chat: [],
    isLoading: false,
    index: 1,

    setIndex: (index: number) => set({ index }),
    editLastMessage: (message: Message) => {
        set(state => ({
            chat: [...state.chat.slice(0, -1), message]
        }))
    },
    addMessage: (message: Message) => {
        set(state => ({
                chat: [
                    ...state.chat,
                    message,
                ]
        }))
    },
    setIsLoading: (isLoading: boolean) => set({ isLoading }),

    resetChat: () => {
        useWebSocketsDeepDive.getState().disconnect();
        
        console.log("Chat reseted");
        set({ chat: [], index: 1, isLoading: false })
    },
}));


