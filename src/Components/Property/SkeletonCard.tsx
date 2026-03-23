const SkeletonCard = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 flex flex-col h-full animate-pulse">
      <div className="h-52 bg-gray-200 dark:bg-gray-700" />
      <div className="p-4 flex flex-col gap-3">
        <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded-md" />
        <div className="h-5 w-3/4 bg-gray-200 dark:bg-gray-700 rounded-md" />
        <div className="h-4 w-1/2 bg-gray-200 dark:bg-gray-700 rounded-md" />
        <div className="flex gap-4">
          <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded-md" />
          <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded-md" />
          <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded-md" />
        </div>
        <div className="flex justify-between items-center pt-3 border-t border-gray-100 dark:border-gray-700">
          <div className="h-6 w-24 bg-gray-200 dark:bg-gray-700 rounded-md" />
          <div className="h-8 w-24 bg-gray-200 dark:bg-gray-700 rounded-lg" />
        </div>
      </div>
    </div>
  )
}

export default SkeletonCard