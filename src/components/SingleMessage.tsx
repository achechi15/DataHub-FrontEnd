import { Message } from "../entities/MessageEntity";
import { useChatStore } from "../store/chat-store";
// import { useChatStore } from "../store/chat-store";

interface Props {
    message: Message;
}



export const SingleMessage = ({ message }: Props) => {

    return (
        (!message.isBot && (typeof message.content === "string" )) ? (
            <li className="flex ms-auto gap-x-4 sm:gap-x-4 max-w-xl pb-1">
                <div className="grow text-end space-y-3">
                    <div className="inline-block flex-col justify-end">
                        {/*  Card  */}
                        <div className="inline-block whitespace-pre-wrap w-fit bg-blue-600 rounded-2xl p-4 shadow-md">
                            <p className="block text-sm text-white">
                                { message.content }
                            </p>
                        </div>
                        {/*  End Card */}
                        <span className="mt-1.5 ms-auto flex items-center gap-x-1 text-xs text-gray-500 dark:text-neutral-500">
                            {/* { `${message.timestamp.toLocaleString()}` } */}
                            time
                        </span>
                    </div>
                </div>

                <span className="shrink-0 inline-flex items-center justify-center size-[38px] rounded-full bg-gray-600">
                    <span className="text-sm font-medium text-white leading-none">
                        {/* { message.senderId.substring(0,3) } */}
                        User
                    </span>
                </span>
            </li>

        ) : (
            (typeof message.content !== "string") ? (
                <li className="max-w-xl flex gap-x-4 sm:gap-x-4 pb-1">
                    <span className="shrink-0 inline-flex items-center justify-center size-[38px] rounded-full bg-gray-600">
                        <span className="text-sm font-medium text-white leading-none">
                            {/* { message.senderId.substring(0,3) } */}
                            Cof
                        </span>
                    </span>
                    <div>
                        <div className="bg-white w-fit border whitespace-pre-wrap border-gray-200 rounded-2xl p-4 space-y-3 dark:bg-neutral-900 dark:border-neutral-700 shadow-md">
                            <table className="min-w-full">
                                <thead>
                                <tr className="border-b border-gray-200">
                                    {/* <th className="py-2 px-3 text-left">Producto</th> */}
                                    <th className="py-2 px-3 text-left">ID</th>
                                    <th className="py-2 px-3 text-left">Score</th>
                                    <th className="py-2 px-3 text-left">Razón</th>
                                </tr>
                                </thead> 
                                <tbody>
                                { message.content.productos.map((row, rowIndex) => (
                                    <tr key={rowIndex} className="border-b border-gray-200 last:border-b-0">
                                    {/* <td className="py-2 px-3">{row.name}</td> */}
                                    <td className="py-2 px-3">{row.id}</td>
                                    <td className="py-2 px-3">{row.score}</td>
                                    <td className="py-2 px-3">{row.reason}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                        <span className="mt-1.5 ms-auto flex items-center gap-x-1 text-xs text-gray-500 dark:text-neutral-500">
                            {/* { `${message.timestamp.toLocaleString()}` } */}
                            time
                        </span>
                    </div>

                </li>
            ) : (
                <li className="max-w-xl flex gap-x-4 sm:gap-x-4 pb-1">
                <span className="shrink-0 inline-flex items-center justify-center size-[38px] rounded-full bg-gray-600">
                    <span className="text-sm font-medium text-white leading-none">
                        {/* { message.senderId.substring(0,3) } */}
                        Cof
                    </span>
                </span>
                <div>
                    <div className="bg-white w-fit border whitespace-pre-wrap border-gray-200 rounded-2xl p-4 space-y-3 dark:bg-neutral-900 dark:border-neutral-700 shadow-md">
                        { message.content }
                    </div>
                    <span className="mt-1.5 ms-auto flex items-center gap-x-1 text-xs text-gray-500 dark:text-neutral-500">
                        {/* { `${message.timestamp.toLocaleString()}` } */}
                        time
                    </span>
                </div>

            </li>
            )
        )
        
        
    )
}