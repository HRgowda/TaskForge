"use client";

export const Input = ({ label, placeholder, onChange, type = "text" }: { 
  label: string;
  placeholder: string;
  onChange: (e: any) => void;
  type?: "text" | "password";
}) => {
  return (
    <div className="w-full">
      <div className="text-sm pb-1 pt-2">
        * <label>{label}</label>
      </div>
      <input 
        className="w-full sm:min-w-[20rem] md:min-w-[24rem] lg:min-w-[28rem] px-4 py-3 border border-slate-500 rounded-lg bg-[#1c1c1c] text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        type={type} 
        placeholder={placeholder} 
        onChange={onChange} 
      />
    </div>
  );
};
