import { useState } from 'react';
import { useTodos } from '@/hooks/useTodos';
import TodoInput from '@/components/TodoInput';
import TodoItem from '@/components/TodoItem';
import FilterBar from '@/components/FilterBar';
import StatsBar from '@/components/StatsBar';
import { CheckSquare } from 'lucide-react';

export default function TodoPage() {
  const {
    todos,
    filter,
    setFilter,
    search,
    setSearch,
    categoryFilter,
    setCategoryFilter,
    categories,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    clearCompleted,
    activeCount,
    completedCount,
  } = useTodos();

  const [showClearConfirm, setShowClearConfirm] = useState<boolean>(false);

  function handleClearCompleted() {
    if (completedCount === 0) return;
    setShowClearConfirm(true);
  }

  function confirmClear() {
    clearCompleted();
    setShowClearConfirm(false);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-2xl mx-auto px-4 py-10">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-brand flex items-center justify-center shadow-md">
            <CheckSquare className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My To-Do List</h1>
            <p className="text-sm text-gray-500">Stay organized, stay productive</p>
          </div>
        </div>

        {/* Stats */}
        <StatsBar activeCount={activeCount} completedCount={completedCount} />

        {/* Input */}
        <TodoInput onAdd={addTodo} />

        {/* Filter Bar */}
        <FilterBar
          filter={filter}
          onFilterChange={setFilter}
          search={search}
          onSearchChange={setSearch}
          categoryFilter={categoryFilter}
          onCategoryChange={setCategoryFilter}
          categories={categories}
        />

        {/* Todo List */}
        <div className="space-y-3">
          {todos.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-indigo-50 flex items-center justify-center">
                <CheckSquare className="w-8 h-8 text-indigo-300" />
              </div>
              <p className="text-gray-400 font-medium">No tasks found</p>
              <p className="text-gray-300 text-sm mt-1">Add a task above to get started</p>
            </div>
          ) : (
            todos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
                onEdit={editTodo}
              />
            ))
          )}
        </div>

        {/* Clear Completed */}
        {completedCount > 0 && (
          <div className="mt-6 text-center">
            <button
              onClick={handleClearCompleted}
              className="text-sm text-gray-400 hover:text-red-400 transition-colors duration-200 underline underline-offset-2"
            >
              Clear {completedCount} completed {completedCount === 1 ? 'task' : 'tasks'}
            </button>
          </div>
        )}

        {/* Confirm Modal */}
        {showClearConfirm && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-6 shadow-2xl w-80 mx-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Clear completed?</h3>
              <p className="text-sm text-gray-500 mb-6">
                This will permanently remove {completedCount} completed {completedCount === 1 ? 'task' : 'tasks'}.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowClearConfirm(false)}
                  className="flex-1 py-2 rounded-xl border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmClear}
                  className="flex-1 py-2 rounded-xl bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition-colors"
                >
                  Clear All
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
