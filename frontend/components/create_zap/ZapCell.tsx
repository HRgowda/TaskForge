import { BoltIcon, Cog6ToothIcon } from '@heroicons/react/24/solid';

export const ZapCell = ({
  name,
  index,
  onClick,
}: {
  name?: string;
  index: number;
  onClick: () => void;
}) => {
  return (
    <div
      onClick={onClick}
      className="border border-black bg-white p-4 w-[400px] flex flex-col justify-center rounded-lg cursor-pointer shadow-md hover:shadow-gray-600 transition-transform transform hover:scale-105 duration-300">
      <div className="flex flex-col text-xl space-y-2">
        <div className="font-bold text-start">
          {index}. {name}
        </div>
        <div className="flex items-start space-x-2">
          {name === "Trigger" ? (
            <>
              <BoltIcon className="h-6 w-6 text-yellow-500" />
              <div className="text-sm">An event that triggers your task.</div>
            </>
          ) : (
            <>
              <Cog6ToothIcon className="h-6 w-6 text-gray-500" />
              <div className="text-sm">An event that executes when the task is triggered.</div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
