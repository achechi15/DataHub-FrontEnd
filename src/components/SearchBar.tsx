import { Plus } from 'lucide-react';

interface Props {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
  }


export const SearchBar = ({ searchQuery, setSearchQuery }: Props) => {
    return (
        <div className="bg-white pl-4 pr-4 pb-6">
          <div className="flex gap-2">
            <div className="flex-2">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full border rounded-full px-5 py-2"
                placeholder="Buscar productos..."
              />
              <div className="text-xs text-gray-500 mt-1 pl-4">
                Busca por CN o EAN. Usa espacios para búsquedas múltiples, ej: 017950 213898 345555
              </div>
            </div>
            <div className="flex-1">
              <input
                type="text"
                value=""
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full border rounded-full px-5 py-2"
                placeholder="Laboratorio"
              />
            </div>
            <div className="flex-1">
              <input
                type="text"
                value=""
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full border rounded-full px-5 py-2"
                placeholder="Agrupación homogénea"
              />
            </div>
            
            {/* <select className="border rounded px-3 py-2 bg-white">
              <option>Agrupación homogénea</option>
            </select> */}
            <div>
              <button className="px-2 py-2 text-black rounded hover:scale-105 transition-all duration-200 ease-in-out transform text-black">
                <div className="flex items-center">
                  <Plus />
                  Más filtros
                </div>
              </button>
            </div>
            <div className="px-2">
              <button className="px-8 py-2 bg-[#fb2070] text-white rounded-full hover:scale-105 transition-all duration-200 ease-in-out transform">
                Buscar
              </button>

            </div>
          </div>
        </div>
      );
}
