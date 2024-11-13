import React from 'react'

export const ResultHeader = () => {
    return (
        <div className="flex max-w-7xl w-[90%] mx-auto justify-between items-center mb-4 mt-6 text-sm text-gray-600">
            <div>Mostrando 1 a 10 de 96 productos para crema de manos</div>
            <div className="flex gap-4">
                <label className="flex items-center gap-2">
                    <input type="checkbox" />
                    Ocultar los precios
                </label>
                <select className="rounded-full px-3 py-2">
                    <option>Artículos de la A-Z</option>
                </select>
                <select className="rounded-full px-3 py-2">
                    <option>Ascendente</option>
                </select>
            </div>
        </div>
    )
}
