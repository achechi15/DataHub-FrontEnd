import React from 'react'

export const NavBar = () => {
    return (
        <nav className="bg-[#1e2a4a] text-white p-4">
            <div className="max-w-[100%] mx-auto flex justify-between items-center">
                <div className="text-xl font-bold">
                Logito de cofares bien guapo
                </div>
                <div className="flex gap-6 items-center">
                    <a href="#" className="hover:text-gray-300">Algo</a>
                    <a href="#" className="hover:text-gray-300">Noticias</a>
                    <a href="#" className="hover:text-gray-300">Buscador</a>
                    <button className="bg-[#fb2070] hover:scale-105 transition-all duration-200 ease-in-out transform px-6 py-2 rounded-full">
                        Area cliente
                    </button>
                </div>
            </div>
        </nav>
    )
}
