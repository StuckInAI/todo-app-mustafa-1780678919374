type StatsBarProps = {
  activeCount: number;
  completedCount: number;
};

export default function StatsBar({ activeCount, completedCount }: StatsBarProps) {
  const total = activeCount + completedCount;
  const percent = total === 0 ? 0 : Math.round((completedCount / total) * 100);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-5">
      <div className="flex justify-between items-center mb-3">
        <div className="flex gap-6">
          <div>
            <p className="text-2xl font-bold text-gray-800">{activeCount}</p>
            <p className="text-xs text-gray-400 font-medium">Active</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-800">{completedCount}</p>
            <p className="text-xs text-gray-400 font-medium">Completed</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-brand">{percent}%</p>
            <p className="text-xs text-gray-400 font-medium">Done</p>
          </div>
        </div>
      </div>
      {/* Progress Bar */}
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-brand to-purple-400 rounded-full transition-all duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
