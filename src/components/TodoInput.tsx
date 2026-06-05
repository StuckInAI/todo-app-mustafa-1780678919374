import { useState } from 'react';
import { Priority } from '@/types';
import { Plus, ChevronDown } from 'lucide-react';
import clsx from 'clsx';

type TodoInputProps = {
  onAdd: (text: string, priority: Priority, category: string) => void;
};

const PRIORITY_OPTIONS: { value: Priority; label: string; color: string }[] = [
  { value: 'low', label: 'Low', color: 'text-green-500' },
  { value: 'medium', label: 'Medium', color: 'text-yellow-500' },
  { value: 'high', label: 'High', color: 'text-red-500' },
];

export default function TodoInput({ onAdd }: TodoInputProps) {
  const [text, setText] = useState<string>('');
  const [priority, setPriority] = useState<Priority>('medium');
  const [category, setCategory] = useState<string>('');
  const [expanded, setExpanded] = useState<boolean>(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!text.trim()) return;
    onAdd(text, priority, category);
    setText('');
    setCategory('');
    setPriority('medium');
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-5">
      <div className="flex gap-3">
        <input
          type="text"
          value={text}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1 bg-gray-50 rounded-xl px-4 py-3 text-gray-800 placeholder-gray-400 text-sm outline-none focus:ring-2 focus:ring-brand/30 focus:bg-white transition-all"
        />
        <button
          type="submit"
          className="w-12 h-12 rounded-xl bg-brand hover:bg-brand-dark flex items-center justify-center text-white shadow-sm transition-colors duration-200 shrink-0"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>

      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="mt-3 flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600 transition-colors"
      >
        <ChevronDown className={clsx('w-3 h-3 transition-transform', expanded && 'rotate-180')} />
        {expanded ? 'Less options' : 'More options'}
      </button>

      {expanded && (
        <div className="mt-3 flex flex-wrap gap-3">
          {/* Priority */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 font-medium">Priority:</span>
            <div className="flex gap-1">
              {PRIORITY_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setPriority(opt.value)}
                  className={clsx(
                    'px-3 py-1 rounded-lg text-xs font-medium border transition-all',
                    priority === opt.value
                      ? 'border-brand bg-indigo-50 text-brand'
                      : 'border-gray-200 text-gray-500 hover:border-gray-300'
                  )}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Category */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 font-medium">Category:</span>
            <input
              type="text"
              value={category}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCategory(e.target.value)}
              placeholder="e.g. Work, Personal"
              className="bg-gray-50 rounded-lg px-3 py-1 text-xs text-gray-700 placeholder-gray-400 outline-none focus:ring-2 focus:ring-brand/20 focus:bg-white border border-gray-200 transition-all w-36"
            />
          </div>
        </div>
      )}
    </form>
  );
}
