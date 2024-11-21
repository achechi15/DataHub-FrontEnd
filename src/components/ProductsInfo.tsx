import { Product } from "../screens/ChatPage";
import { SingleProductInfo } from "./SingleProductInfo";

interface Props {
    products: Product[];
    isExpanded: boolean;
}

export const ProductsInfo = ({products, isExpanded}: Props) => {
    
    return (
        <div
            className={`transition-all duration-300 ease-in-out ${
            isExpanded ? 'opacity-100' : 'max-h-0 opacity-0'
            } overflow-hidden`}
        >
            {products.map((product, index) => (
                <SingleProductInfo key={index} product={product} length={products.length} index={index} />
            ))}
        </div>
    )
}
