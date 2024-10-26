import { create } from "zustand";
import { Message } from "../entities/MessageEntity";

interface ChatState {
    chat: Message[],
    id: string,

    addMessage: (message: Message) => void;
}

export const useChatStore = create<ChatState>()( (set) => ({
    chat: [
        {
        id: "abc",
        isBot: true,
        content: "Hola soy un bot hecho para ayudarte"
        },
    ],
    id: "1234567890",



    
    addMessage: (message: Message) => {

        set(state => ({
                chat: [
                    ...state.chat,
                    message,
                ]
        }))
    }
}))