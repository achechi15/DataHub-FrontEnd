import { useState, useEffect } from "react";
import { Product } from "../screens/ChatPage";
import { useChatStore } from "../store/chat-store";

interface Props {
    product: Product;
    index: number;
    length: number;
}

export const SingleProductInfo = ({product, index, length}: Props) => {

    const [checkboxValues, setCheckboxValues] = useState<boolean>(false);
    const [isVisible, setIsVisible] = useState<boolean>(true);

    useEffect(() => {
        const unsubscribe = useChatStore.subscribe((state, prevState) => {
            if (state.selectedProducts.length === 0 && prevState.selectedProducts.length > 0) {
                setCheckboxValues(false);
            }
        });

        return () => unsubscribe();
    }, []);

    const handleCheckboxChange = () => {
        const newValue = !checkboxValues;
        setCheckboxValues(newValue);
        
        if (newValue) {
            useChatStore.getState().AddSelectedProducts(product);
            console.log(useChatStore.getState().selectedProducts);
        } else {
            useChatStore.getState().DeleteSelectedProducts(product);
            console.log(useChatStore.getState().selectedProducts);
        }
    }


    return (
        <div 
            key={product.id}
            className={`p-4 ${
            index !== length - 1 ? 'border-b border-gray-200' : ''
            } hover:bg-gray-50 transition-colors animate-expandHeight`}
            style={{ animationDelay: `0.1s` }}
            onClick={() => handleCheckboxChange()}
        >
            <div className="flex gap-4">
                {/* Product Image */}
                <div className="w-16 h-16 flex-shrink-0">
                    {(product.image && isVisible) && (
                        <img
                            src={`${import.meta.env.VITE_API_URL}/image/${product.image}`}
                            alt={product.name}
                            className="w-full h-full rounded-lg object-cover"
                            onError={(e) => {
                                // e.currentTarget.src = "https://fotostilfondo.com/9014-home_default/fondo-vinilo-blanco.jpg";
                                setIsVisible(false);
                            }}
                        />
                    )}
                </div>

                {/* Product Info */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-1">
                        <div>
                            <div className="flex items-center">
                                <input type="checkbox" checked={checkboxValues} onChange={() => handleCheckboxChange()} className="mr-2" name={product.id} value={product.id} />
                                <h3 className="font-medium text-[#1B355E]">{product.name}</h3>
                            </div>
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
                            Distance: {product.score.toFixed(2)}
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
    )
}
