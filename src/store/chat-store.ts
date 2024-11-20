import { create } from "zustand";
import { Message } from "../entities/MessageEntity";
import { useWebSocketStore } from "./useWebSocketStore";
import { Product } from "../screens/ChatPage";

interface ChatState {
    chat: Message[],
    isLoading: boolean,
    index: number,
    chatId: string,
    filter: string[],
    selectedProducts: Product[],
    isModalOpen: boolean,

    setFilter: (filter: string[]) => void,
    setIndex: (index: number) => void,
    editLastMessage: (message: Message) => void;
    addMessage: (message: Message) => void;
    setIsLoading: (isLoading: boolean) => void;
    resetChat: () => void;
    AddSelectedProducts: (product: Product) => void;
    DeleteSelectedProducts: (product: Product) => void;
    resetSelectedProducts: () => void;
    setIsModalOpen: (isModalOpen: boolean) => void;
}

const DEFAULT_FILTER = ['TodosCatalogos', 'TodasFamilias'];


export const useChatStore = create<ChatState>()( (set, get) => ({
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
    chatId: "",
    filter: DEFAULT_FILTER,
    selectedProducts: [],
    isModalOpen: false,

    setFilter: (filter: string[]) => {
        set({ filter })
    },

    editLastMessage: (message: Message) => {
        set(state => ({
            chat: [...state.chat.slice(0, -1), message]
        }))
    },
    
    AddSelectedProducts: (product: Product) => {
        const tempProducts = get().selectedProducts;
        if (!tempProducts.find(p => p.id === product.id)) {
            set(state => ({
                selectedProducts: [...state.selectedProducts, product]
            }))
        }
    },

    DeleteSelectedProducts: (product: Product) => {
        set(state => ({
            selectedProducts: state.selectedProducts.filter(p => p.id !== product.id)
        }))
    },

    resetSelectedProducts: () => {
        set({ selectedProducts: [] })
    },

    setIsModalOpen: (isModalOpen: boolean) => {
        set({ isModalOpen })
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
    },

    resetChat: () => {
        const chatId = crypto.randomUUID();
        useWebSocketStore.getState().disconnect();
        try {
            useWebSocketStore.getState().connect(`${import.meta.env.VITE_WEBSOCKET_URL}/chat/search/${chatId}`);
        } catch (error) {
            console.log({error})
        }
        console.log("Chat reseted and connected successfully");
        set({ chat: [], index: 1, chatId, isLoading: false, selectedProducts: []})
    },
}))