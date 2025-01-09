
interface DesignProps {
  description: string
  title: string
}

export function Design({ description, title }: DesignProps) {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-900 to-gray-700">
      <div className="text-white p-12 space-y-6">
        <div className="font-semibold text-2xl text-blue-500">
          {title}
        </div>
        <div className="font-semibold mt-6 text-5xl leading-tight">
          {description}
        </div>
      </div>
    </div>
  );
}
