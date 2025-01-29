import { BoltIcon, Cog6ToothIcon } from '@heroicons/react/24/solid';

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
  image?: string; // Image URL
  isSelected?: boolean; // To toggle selected state
}) => {
  return (
    <div
      onClick={onClick}
      className="border border-black bg-white p-4 w-[400px] flex flex-col justify-center rounded-lg cursor-pointer shadow-md hover:shadow-gray-600 transition-transform transform hover:scale-105 duration-300"
    >
      <div className="flex flex-col text-xl space-y-2">
        {/* Display index and name at the top */}
        <div className="font-bold text-start">
          {index}. {name}
        </div>

        {/* When selected, display only the image and name */}
        {isSelected ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <img src={image} alt={name} className="h-8 w-8 rounded-full" />
              <div>{name}</div>
            </div>
          </div>
        ) : (
          // Display icon and description at the bottom
          <div className="flex flex-col items-start space-y-1 mt-2">
            {name === 'Trigger' ? (
              <div className="flex">
                <BoltIcon className="h-6 w-6 text-yellow-500" />
                <div className="text-sm">An event that triggers your task.</div>
              </div>
            ) : (
              <div className='flex'>
                <Cog6ToothIcon className="h-6 w-6 text-gray-500" />
                <div className="text-sm">An event that executes when the task is triggered.</div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
