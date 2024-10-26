import React from 'react'
import { Header } from '../components/Header'
import { ChatContent } from '../components/ChatContent'
import { ChatInput } from '../components/ChatInput'
import { useChatStore } from '../store/chat-store'

interface producto {
    name: string;
    id: string;
    score: number;
    reason: string;
}

interface response {
    txt: string; // Esto es información que se va a definir más adelante y que no se sabe si se va a incluir en el chat
    productos: producto[]; // Esto es lo importante para mostrar en el front
}

export const ChatPage = () => {

    const { addMessage } = useChatStore();

    const handleAddMessage = async (content: string) => {
        // Añade el mensaje dado por el usuario
        addMessage({
            content,
            id: crypto.randomUUID(),
            isBot: false,
        })

        // Petición a la API
        const respuesta = await fetch('http://localhost:3000/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({mensaje: content})
        })

        const data: response = await respuesta.json();
        const result: string = data.productos.map(producto => `${producto.name}\t${producto.id} \t ${producto.score}\n${producto.reason}`).join('\n');

        // El resultado de la API se muestra en el chat
        addMessage({
            content: result,
            id: crypto.randomUUID(),
            isBot: true,
        })
    }


    return (
        <div className='flex flex-col h-[100vh]'>
            <Header />
            <ChatContent />
            <ChatInput onClick={ handleAddMessage } />
        </div>
    )
}
