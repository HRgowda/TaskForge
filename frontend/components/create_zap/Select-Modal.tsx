import { useState } from "react";
import { EmailSelector, SolanaSelector } from "./Selectors";

export function Modal({
    index,
    onSelect,
    availableItems,
}: {
    index: number;
    onSelect: (props: null | { name: string; id: string; metadata: any }) => void;
    availableItems: { id: string; name: string; image: string }[];
}) {
    const [step, setStep] = useState(0);
    const [selectedAction, setSelectedAction] = useState<{id: string; name: string;}>();
    const isTrigger = index === 1;

    return (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-slate-800 bg-opacity-50 backdrop-blur-lg">
            <div className="relative w-full max-w-2xl bg-white rounded-lg shadow-xl p-6">
                <div className="flex justify-between items-center border-b border-gray-200 pb-4">
                    <div className="text-2xl font-semibold text-gray-800">
                        Select {isTrigger ? "Trigger" : "Action"}
                    </div>
                    <button onClick={() => onSelect(null)} type="button" className="text-gray-500 hover:text-gray-700 p-2 rounded-full">
                        <svg
                            className="w-4 h-4"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 14"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                            />
                        </svg>
                    </button>
                </div>
                <div className="mt-4">
                    {step === 1 && selectedAction?.name === "Email" && (
                        <EmailSelector
                            setMetadata={(metadata) => {
                                onSelect({
                                    ...selectedAction,
                                    metadata,
                                });
                            }}
                        />
                    )}
                    {step === 1 && selectedAction?.name === "Send_Solana" && (
                        <SolanaSelector
                            setMetadata={(metadata) => {
                                onSelect({
                                    ...selectedAction,
                                    metadata,
                                });
                            }}
                        />
                    )}
                    {step === 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {availableItems.map(({ id, name, image }) => (
                                <div onClick={() => {   
                                    if (isTrigger) {
                                        onSelect({
                                            id,
                                            name,
                                            metadata: {},
                                    });
                                    } else {
                                        setStep(1);
                                        setSelectedAction({ id, name });
                                    }
                                    }}
                                    key={id} className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-slate-100 transition duration-300 ease-in-out transform hover:scale-105" >
                                    <img
                                        src={image}
                                        alt={name}
                                        width={40}
                                        height={40}
                                        className="rounded-full mr-4"
                                    />
                                    <div className="flex flex-col">
                                        <span className="font-medium text-gray-800">{name}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
