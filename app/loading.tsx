export default function Loading() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        <div className="text-3xl font-bold text-yellow-400 animate-pulse">Hintify</div>
        <div className="h-16 w-16 rounded-full border-4 border-yellow-400/20 animate-spin"></div>
        <div className="text-gray-400 text-sm animate-pulse">Loading...</div>
      </div>
    </div>
  )
}