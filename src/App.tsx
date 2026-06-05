import { BrowserRouter } from 'react-router-dom';
import TodoPage from '@/pages/TodoPage';

export default function App() {
  return (
    <BrowserRouter>
      <TodoPage />
    </BrowserRouter>
  );
}
