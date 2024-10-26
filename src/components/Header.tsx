import { FaUserMd } from "react-icons/fa";

export const Header = () => {
    return (
        <div className="bg-white p-4 shadow-lg flex justify-between items-center pl-8">
            <div className="flex items-center space-x-4">
                <FaUserMd size={32} />
                <div>
                    <h2 className="text-lg font-semibold">Asistente de Cofares (CofAsist)</h2>
                    <p className="text-sm text-green-500">En línea</p>
                </div>
            </div>
        </div>
    )
}
