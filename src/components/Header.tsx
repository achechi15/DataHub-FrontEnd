export const Header = () => {
    return (
        <div className="bg-[#1B2A4E] p-4 rounded-t-xl shadow-sm border-b flex justify-between items-center pl-8">
            <div className="flex items-center space-x-4">
                {/* <FaUserMd size={32} color="white" /> */}
                <div className="h-10 w-10 ring-2 ring-white shadow-md rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                    <img 
                        src="https://pbs.twimg.com/profile_images/1488857444013027330/kpyepi0k_400x400.jpg" 
                        alt="Profile"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div>
                    <h2 className="text-white font-bold text-lg">Asistente Virtual (CofAsist)</h2>
                    <p className="text-[#fb2070] text-sm flex items-center">
                        <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                        En línea
                    </p>
                </div>
            </div>
        </div>
    )
}
