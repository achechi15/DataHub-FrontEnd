import { useState } from "react";

interface Props {
    onClick: (a: string) => void;
}


export const ChatInput = ({ onClick }: Props) => {

    const [textValue, setTextValue] = useState('');
    const handleSubmit = () => {
        if (textValue.length >= 1) {
            onClick(textValue);
            setTextValue('');
        }
    }

    return (
        <div className="flex items-center py-2 px-3 bg-white dark:bg-gray-700 w-full border-t border-gray-200">
            <input className="block resize-none mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Escribe tu mensaje..." 
                value={ textValue }
                onChange={ (event) => setTextValue(event.target.value)}
                onKeyDown={ (event) => {
                    if (event.key === 'Enter') handleSubmit()
                }}
            />
            <button type="submit" className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600"
                onClick={() => {
                        handleSubmit()
                    }
                }
            >
                <svg className="w-6 h-6 rotate-90" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path></svg>
            </button>
        </div>
    )
}