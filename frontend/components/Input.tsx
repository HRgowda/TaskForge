"use client";

export const Input = ({label, placeholder, onChange, type = "text"}: {
    label: string;
    placeholder: string;
    onChange: (e: any) => void;
    type?: "text" | "password"
}) => {
    return <div className="w-full px-4 py-3 border border-slate-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all">
        <div className="text-sm pb-1 pt-2">
            * <label>{label}</label>
        </div>
        <input className="border rounded px-4 py-2 w-full border-slate-500 bg-[#1c1c1c]" type={type} placeholder={placeholder} onChange={onChange} />
    </div>
}   