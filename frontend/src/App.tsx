import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import { AtendimentosPage } from '@/pages/AtendimentosPage';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AtendimentosPage />
      <Toaster position="top-right" richColors />
    </QueryClientProvider>
  );
}
