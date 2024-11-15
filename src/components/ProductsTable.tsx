import React, { useEffect, useState } from 'react'
import { producto } from '../screens/ChatPage';
import { useChatStore } from '../store/chat-store';

interface Props {
    products: producto[];
    isLastMessage: number;
    productCount: number;
}

export const ProductsTable = ({ products, isLastMessage, productCount }: Props) => {

    const { chat } = useChatStore();
    const [isExpanded, setIsExpanded] = useState(isLastMessage === chat.length - 1);
    useEffect(() => {
        setIsExpanded(isLastMessage === chat.length - 1);
    }, [isLastMessage, chat.length])

    return (
        <div className="overflow-hidden rounded-lg border min-w-[80vh] border-gray-200 bg-white">
            <div className="flex flex-col">
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="w-full p-3 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                    <span className="text-sm font-medium text-[#1B355E]">
                        {productCount} productos encontrados
                    </span>
                    {isExpanded ? (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-500">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-500">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
                    )}
                </button>

                {/* Preview when collapsed */}
                {!isExpanded && (
                    <div className="px-4 py-2 space-y-1">
                        {products.map((product) => (
                            <div key={product.id} className="flex items-center justify-between text-sm">
                                <span className="text-[#1B355E] font-medium">{product.name}</span>
                                <span className="text-[#fb2070] font-semibold">{product.price.toFixed(2)}€</span>
                            </div>
                        ))}
                    </div>
                )}
        
                {/* Full details when expanded */}
                <div
                    className={`transition-all duration-300 ease-in-out ${
                        isExpanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
                    } overflow-hidden`}
                >
                    {products.map((product, index) => (
                        <div 
                            key={product.id}
                            className={`p-4 ${
                        index !== products.length - 1 ? 'border-b border-gray-200' : ''
                            } hover:bg-gray-50 transition-colors animate-expandHeight`}
                            style={{ animationDelay: `$0.1s` }}
                        >
                            <div className="flex gap-4">
                                {/* Product Image */}
                                {/* <div className="w-16 h-16 flex-shrink-0">
                                    {product.image ? (
                                        <img 
                                            src={product.image} 
                                            alt={product.name}
                                            className="w-full h-full rounded-lg object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full rounded-lg bg-gray-100 flex items-center justify-center">
                                            <img src="https://via.placeholder.com/150" alt={product.name} className="w-full h-full rounded-lg object-cover" />
                                        </div>
                                    )}
                                </div> */}
        
                                {/* Product Info */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between mb-1">
                                        <div>
                                            <h3 className="font-medium text-[#1B355E]">{product.name}</h3>
                                            <span className="text-sm text-gray-500">CN {product.id}</span>
                                        </div>
                                        {/* <span className="text-2xl font-bold text-[#fb2070]">{product.price.toFixed(2)}€</span> */}
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

                                    <p className="text-sm text-gray-600 mb-3 max-w-[85%]">{product.reason}</p>

                                    <div className="flex items-center gap-2">
                                        <div className="px-2 py-1 rounded-full bg-[#E3F3FF] text-[#1B355E] text-xs font-medium">
                                            Score: {product.score.toFixed(2)}
                                        </div>
                                        {product.stock ? (
                                            <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-800">
                                                En stock
                                            </span>
                                        ) : (
                                            <span className="text-xs px-2 py-1 rounded-full bg-yellow-50 text-yellow-800">
                                                Próxima entrega: Proximamente
                                            </span>
                                        )}
                                    
                                        <div className="ml-auto">
                                            {/* <button className="flex items-center gap-2 px-4 py-2 bg-[#fb2070] text-white rounded-lg hover:bg-[#fb2070] transition-colors">
                                                <ShoppingCart className="w-4 h-4" />
                                                Añadir
                                            </button> */}
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
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );    
}
