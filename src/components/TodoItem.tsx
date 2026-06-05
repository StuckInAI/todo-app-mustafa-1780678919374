import { useState } from 'react';
import { Todo, Priority } from '@/types';
import { Trash2, Pencil, Check, X } from 'lucide-react';
import clsx from 'clsx';

type TodoItemProps = {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string, priority: Priority, category: string) => void;
};

const PRIORITY_STYLES: Record<Priority, string> = {
  low: 'bg-green-100 text-green-600',
  medium: 'bg-yellow-100 text-yellow-600',
  high: 'bg-red-100 text-red-600',
};

const PRIORITY_DOT: Record<Priority, string> = {
  low: 'bg-green-400',
  medium: 'bg-yellow-400',
  high: 'bg-red-400',
};

export default function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoItemProps) {
  const [editing, setEditing] = useState<boolean>(false);
  const [editText, setEditText] = useState<string>(todo.text);
  const [editPriority, setEditPriority] = useState<Priority>(todo.priority);
  const [editCategory, setEditCategory] = useState<string>(todo.category);

  function handleSave() {
    if (!editText.trim()) return;
    onEdit(todo.id, editText, editPriority, editCategory);
    setEditing(false);
  }

  function handleCancel() {
    setEditText(todo.text);
    setEditPriority(todo.priority);
    setEditCategory(todo.category);
    setEditing(false);
  }

  if (editing) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-brand/30 p-4">
        <input
          type="text"
          value={editText}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditText(e.target.value)}
          className="w-full bg-gray-50 rounded-xl px-4 py-2.5 text-gray-800 text-sm outline-none focus:ring-2 focus:ring-brand/30 border border-gray-200 mb-3"
          autoFocus
        />
        <div className="flex flex-wrap gap-3 items-center mb-3">
          <div className="flex gap-1">
            {(['low', 'medium', 'high'] as Priority[]).map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setEditPriority(p)}
                className={clsx(
                  'px-2.5 py-1 rounded-lg text-xs font-medium border transition-all capitalize',
                  editPriority === p
                    ? 'border-brand bg-indigo-50 text-brand'
                    : 'border-gray-200 text-gray-400 hover:border-gray-300'
                )}
              >
                {p}
              </button>
            ))}
          </div>
          <input
            type="text"
            value={editCategory}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditCategory(e.target.value)}
            placeholder="Category"
            className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-1 text-xs text-gray-700 outline-none focus:ring-2 focus:ring-brand/20 w-32"
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleSave}
            className="flex items-center gap-1.5 px-4 py-2 bg-brand text-white rounded-xl text-sm font-medium hover:bg-brand-dark transition-colors"
          >
            <Check className="w-3.5 h-3.5" /> Save
          </button>
          <button
            onClick={handleCancel}
            className="flex items-center gap-1.5 px-4 py-2 bg-gray-100 text-gray-600 rounded-xl text-sm font-medium hover:bg-gray-200 transition-colors"
          >
            <X className="w-3.5 h-3.5" /> Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={clsx(
        'bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex items-start gap-3 group transition-all duration-200 hover:shadow-md hover:border-gray-200',
        todo.completed && 'opacity-60'
      )}
    >
      {/* Checkbox */}
      <button
        onClick={() => onToggle(todo.id)}
        className={clsx(
          'mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all duration-200',
          todo.completed
            ? 'bg-brand border-brand'
            : 'border-gray-300 hover:border-brand'
        )}
      >
        {todo.completed && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
      </button>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p
          className={clsx(
            'text-sm text-gray-800 break-words',
            todo.completed && 'line-through text-gray-400'
          )}
        >
          {todo.text}
        </p>
        <div className="flex flex-wrap gap-2 mt-1.5 items-center">
          <span className={clsx('inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium', PRIORITY_STYLES[todo.priority])}>
            <span className={clsx('w-1.5 h-1.5 rounded-full', PRIORITY_DOT[todo.priority])} />
            {todo.priority}
          </span>
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-indigo-50 text-indigo-400">
            {todo.category}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 shrink-0">
        <button
          onClick={() => setEditing(true)}
          className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-brand hover:bg-indigo-50 transition-colors"
        >
          <Pencil className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={() => onDelete(todo.id)}
          className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
