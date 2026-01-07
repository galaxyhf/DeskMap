import { useState } from 'react';
import { Layout } from '@/components/Layout';
import type { FilterValues } from '@/components/Filters';
import { Filters } from '@/components/Filters';
import { AtendimentoForm } from '@/components/AtendimentoForm';
import { AtendimentoTable } from '@/components/AtendimentoTable';
import { Button } from '@/components/ui/button';
import {
  useAtendimentos,
  useCreateAtendimento,
  useUpdateAtendimento,
  useDeleteAtendimento,
} from '@/hooks/useAtendimentos';
import type { Atendimento, CreateAtendimentoInput } from '@/types/atendimento';
import { Plus } from 'lucide-react';

export const AtendimentosPage = () => {
  const [filters, setFilters] = useState<FilterValues>({});
  const [page, setPage] = useState(1);
  const [formOpen, setFormOpen] = useState(false);
  const [editingAtendimento, setEditingAtendimento] = useState<Atendimento | null>(null);

  const { data, isLoading } = useAtendimentos({
    page,
    limit: 15,
    ...filters,
  });

  const createMutation = useCreateAtendimento();
  const updateMutation = useUpdateAtendimento();
  const deleteMutation = useDeleteAtendimento();

  const handleFormSubmit = (
    data: CreateAtendimentoInput | { id: number; data: Partial<CreateAtendimentoInput> }
  ) => {
    if ('id' in data) {
      updateMutation.mutate(data);
    } else {
      createMutation.mutate(data);
    }
    setFormOpen(false);
    setEditingAtendimento(null);
  };

  const handleEdit = (atendimento: Atendimento) => {
    setEditingAtendimento(atendimento);
    setFormOpen(true);
  };

  const handleDelete = (id: number) => {
    deleteMutation.mutate(id);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          {/* Header minimalista */}
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h1 className="text-3xl font-light text-gray-900 tracking-tight">Atendimentos</h1>
              <p className="text-sm text-gray-500">Gerencie seus atendimentos técnicos</p>
            </div>
            <Button
              onClick={() => {
                setEditingAtendimento(null);
                setFormOpen(true);
              }}
              className="bg-gray-900 hover:bg-gray-800 text-white rounded-lg px-5 py-2.5 flex items-center gap-2 shadow-sm transition-all"
            >
              <Plus className="w-4 h-4" />
              Novo atendimento
            </Button>
          </div>

          {/* Filtros minimalistas */}
          <div className="bg-white rounded-xl border border-gray-200/60 shadow-sm p-6">
            <Filters onFilter={setFilters} />
          </div>

          {/* Tabela clean */}
          <div className="bg-white rounded-xl border border-gray-200/60 shadow-sm overflow-hidden">
            <AtendimentoTable
              data={data?.data}
              isLoading={
                isLoading ||
                createMutation.isPending ||
                updateMutation.isPending ||
                deleteMutation.isPending
              }
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>

          {/* Paginação minimalista */}
          {data?.pagination && data.pagination.pages > 1 && (
            <div className="flex justify-center gap-2">
              <Button
                variant="ghost"
                onClick={() => setPage(Math.max(1, page - 1))}
                disabled={page === 1}
                className="text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              >
                Anterior
              </Button>
              <div className="flex gap-1 items-center">
                {Array.from({ length: data.pagination.pages }, (_, i) => i + 1).map((p) => (
                  <Button
                    key={p}
                    variant={p === page ? 'default' : 'ghost'}
                    onClick={() => setPage(p)}
                    className={
                      p === page
                        ? 'bg-gray-900 hover:bg-gray-800 text-white min-w-[40px]'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100 min-w-[40px]'
                    }
                  >
                    {p}
                  </Button>
                ))}
              </div>
              <Button
                variant="ghost"
                onClick={() => setPage(Math.min(data.pagination.pages, page + 1))}
                disabled={page === data.pagination.pages}
                className="text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              >
                Próxima
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Modal de Formulário */}
      <AtendimentoForm
        open={formOpen}
        onOpenChange={setFormOpen}
        onSubmit={handleFormSubmit}
        initialData={editingAtendimento || undefined}
        isLoading={createMutation.isPending || updateMutation.isPending}
      />
    </Layout>
  );
};
