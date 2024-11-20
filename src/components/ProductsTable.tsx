import { useEffect, useState } from 'react'
import { Product } from '../screens/ChatPage';
import { useChatStore } from '../store/chat-store';
import { ProductsInfo } from './ProductsInfo';

interface Props {
    products: Product[];
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
                <ProductsInfo products={products} isExpanded={isExpanded} />
            </div>
        </div>
    );    
}
