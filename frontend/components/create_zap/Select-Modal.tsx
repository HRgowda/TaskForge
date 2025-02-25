import { useState } from "react";
import { EmailSelector, InrSelector, SolanaSelector } from "./Selectors";

export function Modal({
  index,
  onSelect,
  availableItems,
}: {
  index: number;
  onSelect: (props: null | { name: string; id: string; metadata: string; image?: string }) => void;
  availableItems: { id: string; name: string; image: string }[];
}) {
  const [step, setStep] = useState(0);
  const [selectedAction, setSelectedAction] = useState<{ id: string; name: string; image?: string }>({ id: "", name: "" });
  const isTrigger = index === 1;

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-[#121212] bg-opacity-80 backdrop-blur-md">
      <div className="relative w-full max-w-sm sm:max-w-lg md:max-w-lg lg:max-w-xl bg-[#1c1c1c] rounded-lg shadow-2xl border border-slate-600 p-8">
        <div className="flex justify-between items-center border-b border-gray-700 pb-4 mb-6">
          <div className="text-2xl font-semibold text-white">
            Select {isTrigger ? "Trigger" : "Action"}
          </div>
          <button onClick={() => onSelect(null)} type="button" className="text-gray-300 hover:text-white p-2 rounded-full">
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
            </svg>
          </button>
        </div>
        <div className="mt-4">
          {step === 1 && selectedAction?.name === "Email" && (
            <EmailSelector setMetadata={(metadata) => onSelect({ ...selectedAction, metadata })} />
          )}
          {step === 1 && selectedAction?.name === "Solana" && (
            <SolanaSelector setMetadata={(metadata) => onSelect({ ...selectedAction, metadata })} />
          )}
          {step === 1 && selectedAction?.name === "INR" && (
            <InrSelector setMetadata={(metadata) => onSelect({ ...selectedAction, metadata })} />
          )}
          {step === 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {availableItems.map(({ id, name, image }) => (
                <div
                  onClick={() => {
                    if (isTrigger) {
                      onSelect({ id, name, metadata: "", image });
                    } else {
                      setStep(1);
                      setSelectedAction({ id, name, image });
                    }
                  }}
                  key={id}
                  className="flex items-center p-6 border border-gray-600 rounded-lg cursor-pointer  transition-all transform hover:scale-105"
                >
                  <img src={image} alt={name} width={45} height={45} className="rounded-full mr-4" />
                  <div className="flex flex-col">
                    <span className="font-medium text-white">{name}</span>
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
