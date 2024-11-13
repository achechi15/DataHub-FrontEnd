import { create } from "zustand";
import { Message } from "../entities/MessageEntity";

interface ChatState {
    chat: Message[],
    isLoading: boolean,
    index: number,

    setIndex: (index: number) => void,
    editLastMessage: (message: Message) => void;
    addMessage: (message: Message) => void;
    setIsLoading: (isLoading: boolean) => void;
}

export const useChatStore = create<ChatState>()( (set) => ({
    chat: [
        {
        id: "abc",
        isBot: true,
        content: "Hola soy un bot hecho para ayudarte",
        timestamp: new Date(),
        },
    ],
    index: 1,
    isLoading: false,

    editLastMessage: (message: Message) => {
        set(state => ({
            chat: [...state.chat.slice(0, -1), message]
        }))
    },
    
    setIndex: (index: number) => {
        set({ index })
    },
    
    addMessage: (message: Message) => {

        set(state => ({
                chat: [
                    ...state.chat,
                    message,
                ]
        }))
    },

    setIsLoading: (isLoading: boolean) => {
        set({ isLoading })
    }
}))