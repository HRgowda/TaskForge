interface alertProps {
  message: string;
  status: "success" | "failure"
}

export function AlertMessage ({message, status}: alertProps) {
  const alertColor = status == "success" ? "bg-green-500" : "bg-red-500"
  return <div className={`fixed bottom-4 right-4 z-50 max-w-sm text-white rounded-lg p-4 transition-all transform ease-in-out duration-300 ${alertColor}`}>
    <div className="text-sm font-medium">
      {message}
    </div>
  </div>
}