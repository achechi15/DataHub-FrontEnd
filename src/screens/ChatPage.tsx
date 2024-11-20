import { SearchHeader } from '../components/SearchHeader';
import { NavBar } from '../components/NavBar';
import { ResultHeader } from '../components/ResultHeader';
import { ListProductsCofares } from '../components/ListProductsCofares';
import { useState } from 'react';

export interface Product {
    name: string;
    id: string;
    score: number;
    reason: string;
    image?: string;
    stock: boolean;
    price: number;
}

export interface response {
    introText: string; // Esto es información que se va a definir más adelante y que no se sabe si se va a incluir en el chat
    productCount: number;
    products: Product[]; // Esto es lo importante para mostrar en el front
}

export const ChatPage = () => {

    // const [searchQuery, setSearchQuery] = useState('crema de manos');

    const  [isChatbotOpen, setIsChatbotOpen] = useState(false);

    return (
        <>
            <NavBar />
            <div className="bg-white min-h-[100%] pt-6">
                <div className="max-w-7xl w-[90%] mx-auto shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-xl  overflow-hidden">
                    <SearchHeader isChatbotOpen={isChatbotOpen} setIsChatbotOpen={setIsChatbotOpen} />
                </div>

                { !isChatbotOpen && <ResultHeader /> }
                { !isChatbotOpen && <ListProductsCofares />}
            </div>
        </>
    )
}


