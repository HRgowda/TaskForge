import { BoltIcon, Cog6ToothIcon } from "@heroicons/react/24/solid";

export const ZapCell = ({
  name,
  index,
  onClick,
  image,
  isSelected,
}: {
  name?: string;
  index: number;
  onClick: () => void;
  image?: string;
  isSelected?: boolean;
}) => {
  return (
    <div
      onClick={onClick}
      className="border border-gray-700 bg-[#1E1E1E] p-5 w-[400px] flex flex-col justify-center rounded-2xl cursor-pointer shadow-md hover:shadow-md hover:shadow-[#40e0d0] transition-all transform hover:scale-105 duration-300 ease-in-out hover:bg-[#252525]"
    >
      <div className="flex flex-col text-xl space-y-3">
        {isSelected ? (
          <div className="flex items-center space-x-3">
            {image && <img src={image} alt={name} className="h-10 w-10 rounded-full border border-gray-600" />}
            <div className="text-lg font-semibold text-gray-200">{name}</div>
          </div>
        ) : (
          <div>
            <div className="font-bold text-gray-300 text-lg">
              {index}. {name}
            </div>
            <div className="flex items-center space-x-2 mt-3">
              {name === "Trigger" ? (
                <>
                  <BoltIcon className="h-6 w-6 text-yellow-400" />
                  <span className="text-sm text-gray-400">An event that triggers your task.</span>
                </>
              ) : (
                <>
                  <Cog6ToothIcon className="h-6 w-6 text-blue-400" />
                  <span className="text-sm text-gray-400">An event that executes when the task is triggered.</span>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
