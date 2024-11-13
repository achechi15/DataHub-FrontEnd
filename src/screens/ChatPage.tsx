import { SearchHeader } from '../components/SearchHeader';
import { NavBar } from '../components/NavBar';
import { SearchBar } from '../components/SearchBar';
import { useState } from 'react';
import { ResultHeader } from '../components/ResultHeader';

export interface producto {
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
    products: producto[]; // Esto es lo importante para mostrar en el front
}

const products = [
    {
      id: "199450",
      name: "FARLINE CREMA MANOS ANTI-AGE 50ML",
      image: "/placeholder.svg?height=100&width=100",
      price: 1.69,
      nextDelivery: "18/10/2024"
    },
    {
      id: "181547",
      name: "FARLINE CR MANOS REPARAD 50 ML",
      image: "/placeholder.svg?height=100&width=100",
      price: 1.11,
      nextDelivery: "18/10/2024"
    },
    {
      id: "208685",
      name: "FARLINE CR MANOS BIO 50 ML",
      image: "/placeholder.svg?height=100&width=100",
      price: 1.94,
      nextDelivery: "18/10/2024"
    }
  ]

export const ChatPage = () => {

    // const [searchQuery, setSearchQuery] = useState('crema de manos');

    return (
        <>
            <NavBar />
            <div className="bg-white min-h-[100%] pt-6">
                <div className="max-w-7xl w-[90%] mx-auto shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-xl  overflow-hidden">
                    <SearchHeader />
                    {/* <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} /> */}
                </div>
                <ResultHeader />
                <div className="max-w-7xl w-[90%] mx-auto">
                    <hr className="h-1 border-0 bg-gray-200 mb-6" />
                    {products.map((product) => (
                    <div key={product.id} className="flex items-center gap-4 p-4 bg-white rounded-sm border">
                        <div className="w-24 h-24 relative">
                            <img
                                src="https://via.placeholder.com/150"
                                alt={product.name}
                                className="w-full h-full object-contain"
                            />
                        </div>
                        <div className="flex-1">
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-xs text-gray-500">Farline/Aposan</p>
                                    <h3 className="font-medium">{product.name}</h3>
                                    <p className="text-sm text-gray-600">CN {product.id}</p>
                                </div>
                                <div className="text-right">
                                    <div className="flex items-center justify-end gap-1">
                                        <span className="text-xs text-black">NEXO</span>
                                        <span className="text-lg font-bold text-[#fb2070]">{product.price.toFixed(2)}€</span>
                                        <span className="text-xs text-gray-500">ud.</span>
                                    </div>
                                    <p className="text-xs text-gray-500">CATÁLOGO GENERAL</p>
                                    <p className="text-sm">{product.price.toFixed(2)} €</p>
                                </div>
                            </div>
                            <div className="flex items-center justify-between mt-4">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-medium">En Stock</span>
                                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                                        Siguiente puesta {product.nextDelivery}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="border border-gray-300 rounded-full px-4 py-1 flex items-center gap-2">
                                        <button className="w-6 h-6 flex items-center justify-center">-</button>
                                        {/* <input 
                                            type="number"
                                            className="w-8 text-center appearance-none" 
                                            defaultValue={1}
                                            min="1"
                                        /> */}
                                        <p className="w-2 text-center">1</p>
                                        <button className="w-6 h-6 flex items-center justify-center">+</button>

                                    </div>
                                    <button className="border border-black rounded-full px-4 py-1">
                                        Añadir
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    ))}
                </div>
            </div>
        </>
    )
}
