import { FilterType } from '@/types';
import { Search } from 'lucide-react';
import clsx from 'clsx';

type FilterBarProps = {
  filter: FilterType;
  onFilterChange: (f: FilterType) => void;
  search: string;
  onSearchChange: (s: string) => void;
  categoryFilter: string;
  onCategoryChange: (c: string) => void;
  categories: string[];
};

const FILTERS: { value: FilterType; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'completed', label: 'Done' },
];

export default function FilterBar({
  filter,
  onFilterChange,
  search,
  onSearchChange,
  categoryFilter,
  onCategoryChange,
  categories,
}: FilterBarProps) {
  return (
    <div className="mb-5 space-y-3">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          value={search}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => onSearchChange(e.target.value)}
          placeholder="Search tasks..."
          className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-100 rounded-xl text-sm text-gray-700 placeholder-gray-400 outline-none focus:ring-2 focus:ring-brand/20 shadow-sm transition-all"
        />
      </div>

      <div className="flex flex-wrap gap-3 items-center">
        {/* Status Filters */}
        <div className="flex bg-gray-100 rounded-xl p-1 gap-1">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => onFilterChange(f.value)}
              className={clsx(
                'px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-200',
                filter === f.value
                  ? 'bg-white text-brand shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              )}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Category Filter */}
        {categories.length > 1 && (
          <div className="flex gap-1 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => onCategoryChange(cat)}
                className={clsx(
                  'px-3 py-1.5 rounded-lg text-xs font-medium border transition-all',
                  categoryFilter === cat
                    ? 'bg-brand text-white border-brand'
                    : 'bg-white text-gray-500 border-gray-200 hover:border-brand hover:text-brand'
                )}
              >
                {cat === 'all' ? 'All Categories' : cat}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
