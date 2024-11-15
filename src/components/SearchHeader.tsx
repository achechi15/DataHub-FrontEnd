import { useState } from 'react';
import { Chat } from './Chat';
import { SearchBar } from './SearchBar';

export const SearchHeader: React.FC = () => {
    const [isChatbotOpen, setIsChatbotOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('crema de manos');

    // useEffect(() => {
    //     console.log("Se ha montado el componente");

    //     return () => {
    //         console.log("Se ha desmontado el componente");
    //     };
    // }, []);


    return (
        <>
            <div className='bg-white p-4 '>
                <div className="flex flex-wrap gap-4 mb-2">
                    <button
                        onClick={() => setIsChatbotOpen(!isChatbotOpen)}
                        className="bg-blue-600 text-white ml-4 px-4 py-2 rounded-full hover:scale-95 transition-all duration-200 ease-in-out transform flex flex-1 justify-center items-center gap-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                            <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
                        </svg>
                        Asistente Virtual
                    </button>
                    <div className="flex items-center gap-8 mt-2 ml-4">
                        <select className="rounded-full px-3 py-2">
                            <option>Todos los catálogos</option>
                        </select>
                        <select className="rounded-full px-3 py-2">
                            <option>Todas las familias</option>
                        </select>
                        <label className="flex items-center gap-2">
                            <input type="checkbox" />
                            Buscar en descripción
                        </label>
                        <label className="flex items-center gap-2">
                            <input type="checkbox" />
                            Excluir encargo
                        </label>
                        <label className="flex items-center gap-2">
                            <input type="checkbox" />
                            Mostrar bajas
                        </label>
                        <label className="flex items-center gap-2">
                            <input type="checkbox" />
                            Descuentos
                        </label>
                        <label className="flex items-center gap-2">
                            <input type="checkbox" />
                            En promoción
                        </label>
                    </div>
                </div>

                <Chat isOpen={isChatbotOpen} />
            </div>
            {!isChatbotOpen && <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />}
        </>
    );
}