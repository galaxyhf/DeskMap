import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import type { Atendimento } from '@/types/atendimento';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useState } from 'react';
import * as XLSX from 'xlsx';

interface AtendimentoTableProps {
  data?: Atendimento[];
  isLoading: boolean;
  onEdit: (atendimento: Atendimento) => void;
  onDelete: (id: number) => void;
}

const getTipoColor = (tipo: string) => {
  const colors: Record<string, string> = {
    Suporte: 'bg-blue-100 text-blue-800 border-blue-200',
    Incidente: 'bg-red-100 text-red-800 border-red-200',
    Manutenção: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    Implementação: 'bg-green-100 text-green-800 border-green-200',
    Unificação: 'bg-purple-100 text-purple-800 border-purple-200',
    Limpeza: 'bg-orange-100 text-orange-800 border-orange-200',
    Conversão: 'bg-cyan-100 text-cyan-800 border-cyan-200',
  };
  return colors[tipo] || 'bg-gray-100 text-gray-800 border-gray-200';
};

export const AtendimentoTable = ({
  data = [],
  isLoading,
  onEdit,
  onDelete,
}: AtendimentoTableProps) => {
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const handleExportToExcel = () => {
    if (!data || data.length === 0) return;

    const exportData = data.map((item) => ({
      'ID': item.id,
      'Referência': format(new Date(item.referencia), 'dd/MM/yyyy', { locale: ptBR }),
      'Número': item.numeroAtendimento,
      'Tipo': item.tipoAtendimento,
      'Motivo Reconversão': item.motivoReconversao || '-',
      'Sistema': item.sistema,
      'Técnico': item.tecnicoResponsavel,
      'Data Coleta': format(new Date(item.dataColeta), 'dd/MM/yyyy', { locale: ptBR }),
      'Data Conclusão': item.dataConclusao ? format(new Date(item.dataConclusao), 'dd/MM/yyyy', { locale: ptBR }) : '-',
      'Dias': item.quantidadeDias,
      'Conferência Por': item.conferenciaPor || '-',
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Atendimentos');
    XLSX.writeFile(workbook, `atendimentos-${format(new Date(), 'dd-MM-yyyy')}.xlsx`);
  };

  if (isLoading) {
    return (
      <div className="space-y-2">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <div className="text-sm text-gray-600">
          <strong>{data?.length || 0}</strong> atendimento{data && data.length !== 1 ? 's' : ''} encontrado{data && data.length !== 1 ? 's' : ''}
        </div>
        <Button
          onClick={handleExportToExcel}
          disabled={!data || data.length === 0}
          className="bg-green-600 hover:bg-green-700 text-white"
          size="sm"
        >
          📊 Exportar Excel
        </Button>
      </div>

      <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
        <Table>
          <TableHeader className="bg-linear-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200">
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-16 font-semibold text-gray-700">ID</TableHead>
              <TableHead className="font-semibold text-gray-700">Número</TableHead>
              <TableHead className="font-semibold text-gray-700">Tipo</TableHead>
              <TableHead className="font-semibold text-gray-700">Técnico</TableHead>
              <TableHead className="font-semibold text-gray-700">Sistema</TableHead>
              <TableHead className="font-semibold text-gray-700">Coleta</TableHead>
              <TableHead className="font-semibold text-gray-700">Conclusão</TableHead>
              <TableHead className="text-center font-semibold text-gray-700">Dias</TableHead>
              <TableHead className="text-right font-semibold text-gray-700">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data && data.length > 0 ? (
              data.map((item, index) => (
                <TableRow 
                  key={item.id} 
                  className={`border-b border-gray-200 transition-colors ${
                    index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                  } hover:bg-blue-50`}
                >
                  <TableCell className="font-medium text-gray-900">{item.id}</TableCell>
                  <TableCell className="text-gray-700 font-medium">{item.numeroAtendimento}</TableCell>
                  <TableCell>
                    <Badge className={`${getTipoColor(item.tipoAtendimento)} border`}>
                      {item.tipoAtendimento}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-gray-700">{item.tecnicoResponsavel}</TableCell>
                  <TableCell className="text-gray-700">{item.sistema}</TableCell>
                  <TableCell className="text-gray-700 text-sm">
                    {format(new Date(item.dataColeta), 'dd/MM', { locale: ptBR })}
                  </TableCell>
                  <TableCell className="text-gray-700 text-sm">
                    {item.dataConclusao
                      ? format(new Date(item.dataConclusao), 'dd/MM', { locale: ptBR })
                      : '-'}
                  </TableCell>
                  <TableCell className="text-center font-bold text-gray-900 bg-blue-50">
                    {item.quantidadeDias}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex gap-1 justify-end">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => onEdit(item)}
                        className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                      >
                        ✏️
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setDeleteId(item.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        🗑️
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={9} className="text-center text-gray-500 py-12">
                  <div className="space-y-2">
                    <p className="text-lg">📭 Nenhum atendimento encontrado</p>
                    <p className="text-sm">Crie um novo ou ajuste os filtros</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <AlertDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent className="border-2 border-red-200">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-red-600">Confirmar Exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja deletar este atendimento? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex gap-2 justify-end">
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (deleteId) onDelete(deleteId);
                setDeleteId(null);
              }}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Deletar
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
