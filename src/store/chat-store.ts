import { create } from "zustand";
import { Message } from "../entities/MessageEntity";

interface ChatState {
    chat: Message[],

    addMessage: (message: Message) => void;
}

export const useChatStore = create<ChatState>()( (set, get) => ({
    chat: [
        {
        id: "abc",
        isBot: true,
        content: "Hola soy un bot hecho para ayudarteHola soy un bot hecho para ayudarteHola soy un bot hecho para ayudarteHola soy un bot hecho para ayudarteHola soy un bot hecho para ayudarteHola soy un bot hecho para ayudarteHola soy un bot hecho para ayudarteHola soy un bot hecho para ayudarteHola soy un bot hecho para ayudarteHola soy un bot hecho para ayudarte"
        },
        {
        id: "abc",
        isBot: true,
        content: "Hola soy un bot hecho para ayudarteHola soy un bot hecho para ayudarteHola soy un bot hecho para ayudarteHola soy un bot hecho para ayudarteHola soy un bot hecho para ayudarteHola soy un bot hecho para ayudarteHola soy un bot hecho para ayudarteHola soy un bot hecho para ayudarteHola soy un bot hecho para ayudarteHola soy un bot hecho para ayudarte"
        },
        {
        id: "abc",
        isBot: true,
        content: "Hola soy un bot hecho para ayudarteHola soy un bot hecho para ayudarteHola soy un bot hecho para ayudarteHola soy un bot hecho para ayudarteHola soy un bot hecho para ayudarteHola soy un bot hecho para ayudarteHola soy un bot hecho para ayudarteHola soy un bot hecho para ayudarteHola soy un bot hecho para ayudarteHola soy un bot hecho para ayudarte"
        },
        {
        id: "abc",
        isBot: true,
        content: "Hola soy un bot hecho para ayudarteHola soy un bot hecho para ayudarteHola soy un bot hecho para ayudarteHola soy un bot hecho para ayudarteHola soy un bot hecho para ayudarteHola soy un bot hecho para ayudarteHola soy un bot hecho para ayudarteHola soy un bot hecho para ayudarteHola soy un bot hecho para ayudarteHola soy un bot hecho para ayudarte"
        },
    ],
    addMessage: (message: Message) => {

        set(state => ({
                chat: [
                    ...state.chat,
                    message,
                ]
        }))
        // console.log(get());
    }
}))