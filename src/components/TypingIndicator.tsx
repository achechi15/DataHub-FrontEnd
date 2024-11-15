    
export const TypingIndicator = () => {
    return (
        <div className="flex space-x-2 p-3 my-4 bg-white rounded-2xl border border-gray-200 shadow-sm">
            <div className="flex space-x-1 items-center">
                <div className="w-2 h-2 bg-gray-300 rounded-full animate-[bounce_1.4s_infinite_0.2s]"></div>
                <div className="w-2 h-2 bg-gray-300 rounded-full animate-[bounce_1.4s_infinite_0.4s]"></div>
                <div className="w-2 h-2 bg-gray-300 rounded-full animate-[bounce_1.4s_infinite_0.6s]"></div>
            </div>
        </div>
    )
}
