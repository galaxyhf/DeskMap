import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import type { Atendimento, CreateAtendimentoInput } from '@/types/atendimento';
import { useState } from 'react';

const schema = z.object({
  referencia: z.string().min(1, 'Data de referência é obrigatória'),
  numeroAtendimento: z.union([
    z.number().int().positive('Número de atendimento deve ser positivo'),
    z.string().transform((val) => parseInt(val)).pipe(
      z.number().int().positive('Número de atendimento deve ser positivo')
    ),
  ]),
  tipoAtendimento: z.string().min(1, 'Tipo de atendimento é obrigatório'),
  motivoReconversao: z.string().optional().default(''),
  sistema: z.string().min(1, 'Sistema é obrigatório'),
  tecnicoResponsavel: z.string().min(1, 'Técnico responsável é obrigatório'),
  dataColeta: z.string().min(1, 'Data de coleta é obrigatória'),
  dataConclusao: z.string().optional().default(''),
  conferenciaPor: z.string().optional().default(''),
});

type FormDataValues = z.infer<typeof schema>;

interface AtendimentoFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: CreateAtendimentoInput | { id: number; data: Partial<CreateAtendimentoInput> }) => void;
  initialData?: Atendimento;
  isLoading?: boolean;
}

export const AtendimentoForm = ({
  open,
  onOpenChange,
  onSubmit,
  initialData,
  isLoading,
}: AtendimentoFormProps) => {
  const [dataColetaDate, setDataColetaDate] = useState<Date | undefined>(
    initialData?.dataColeta ? new Date(initialData.dataColeta) : undefined
  );
  const [dataConclusaoDate, setDataConclusaoDate] = useState<Date | undefined>(
    initialData?.dataConclusao ? new Date(initialData.dataConclusao) : undefined
  );

  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: initialData
      ? {
          referencia: initialData.referencia,
          numeroAtendimento: initialData.numeroAtendimento,
          tipoAtendimento: initialData.tipoAtendimento,
          motivoReconversao: initialData.motivoReconversao || '',
          sistema: initialData.sistema,
          tecnicoResponsavel: initialData.tecnicoResponsavel,
          dataColeta: initialData.dataColeta,
          dataConclusao: initialData.dataConclusao || '',
          conferenciaPor: initialData.conferenciaPor || '',
        }
      : undefined,
  });

  const handleFormSubmit = (data: FormDataValues) => {
    const formData: CreateAtendimentoInput = {
      referencia: data.referencia,
      numeroAtendimento: typeof data.numeroAtendimento === 'number' ? data.numeroAtendimento : parseInt(data.numeroAtendimento),
      tipoAtendimento: data.tipoAtendimento,
      motivoReconversao: data.motivoReconversao || undefined,
      sistema: data.sistema,
      tecnicoResponsavel: data.tecnicoResponsavel,
      dataColeta: dataColetaDate ? format(dataColetaDate, 'yyyy-MM-dd') : data.dataColeta,
      dataConclusao: dataConclusaoDate ? format(dataConclusaoDate, 'yyyy-MM-dd') : (data.dataConclusao || undefined),
      conferenciaPor: data.conferenciaPor || undefined,
    };

    if (initialData) {
      onSubmit({ id: initialData.id, data: formData });
    } else {
      onSubmit(formData as CreateAtendimentoInput);
    }

    reset();
    setDataColetaDate(undefined);
    setDataConclusaoDate(undefined);
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      reset();
      setDataColetaDate(undefined);
      setDataConclusaoDate(undefined);
    }
    onOpenChange(newOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto border-2 border-blue-300">
        <DialogHeader className="bg-linear-to-r from-blue-50 to-blue-100 -m-6 mb-6 p-6 border-b-2 border-blue-200">
          <DialogTitle className="text-2xl font-bold text-blue-900">
            {initialData ? '✏️ Editar Atendimento' : '➕ Novo Atendimento'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6 px-1">
          {/* Seção de Identificação */}
          <div className="border-l-4 border-blue-500 pl-4 py-2">
            <h3 className="font-bold text-blue-900 mb-3">📌 Identificação</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-bold text-gray-700">Data Referência *</label>
                <Controller
                  name="referencia"
                  control={control}
                  render={({ field }) => (
                    <Input type="date" {...field} className="mt-1 border-gray-300 font-medium" />
                  )}
                />
                {errors.referencia && <span className="text-red-600 text-xs font-semibold">{errors.referencia.message}</span>}
              </div>

              <div>
                <label className="text-sm font-bold text-gray-700">Número Atendimento *</label>
                <Controller
                  name="numeroAtendimento"
                  control={control}
                  render={({ field }) => (
                    <Input type="number" {...field} className="mt-1 border-gray-300 font-medium" />
                  )}
                />
                {errors.numeroAtendimento && <span className="text-red-600 text-xs font-semibold">{errors.numeroAtendimento.message}</span>}
              </div>

              <div>
                <label className="text-sm font-bold text-gray-700">Tipo Atendimento *</label>
                <Controller
                  name="tipoAtendimento"
                  control={control}
                  render={({ field }) => (
                    <Select value={field.value || ''} onValueChange={field.onChange}>
                      <SelectTrigger className="mt-1 border-gray-300 font-medium">
                        <SelectValue placeholder="Selecione um tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Suporte">Suporte</SelectItem>
                        <SelectItem value="Incidente">Incidente</SelectItem>
                        <SelectItem value="Manutenção">Manutenção</SelectItem>
                        <SelectItem value="Implementação">Implementação</SelectItem>
                        <SelectItem value="Unificação">Unificação</SelectItem>
                        <SelectItem value="Limpeza">Limpeza</SelectItem>
                        <SelectItem value="Conversão">Conversão</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.tipoAtendimento && <span className="text-red-600 text-xs font-semibold">{errors.tipoAtendimento.message}</span>}
              </div>

              <div>
                <label className="text-sm font-bold text-gray-700">Motivo Reconversão</label>
                <Controller
                  name="motivoReconversao"
                  control={control}
                  render={({ field }) => (
                    <Input {...field} placeholder="Opcional" className="mt-1 border-gray-300" />
                  )}
                />
              </div>
            </div>
          </div>

          {/* Seção de Sistemas */}
          <div className="border-l-4 border-green-500 pl-4 py-2">
            <h3 className="font-bold text-green-900 mb-3">🖥️ Informações Técnicas</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-bold text-gray-700">Sistema *</label>
                <Controller
                  name="sistema"
                  control={control}
                  render={({ field }) => (
                    <Input {...field} placeholder="Ex: SAP, Salesforce" className="mt-1 border-gray-300 font-medium" />
                  )}
                />
                {errors.sistema && <span className="text-red-600 text-xs font-semibold">{errors.sistema.message}</span>}
              </div>

              <div>
                <label className="text-sm font-bold text-gray-700">Técnico Responsável *</label>
                <Controller
                  name="tecnicoResponsavel"
                  control={control}
                  render={({ field }) => (
                    <Input {...field} placeholder="Nome do técnico" className="mt-1 border-gray-300 font-medium" />
                  )}
                />
                {errors.tecnicoResponsavel && <span className="text-red-600 text-xs font-semibold">{errors.tecnicoResponsavel.message}</span>}
              </div>
            </div>
          </div>

          {/* Seção de Datas */}
          <div className="border-l-4 border-orange-500 pl-4 py-2">
            <h3 className="font-bold text-orange-900 mb-3">📅 Cronograma</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-bold text-gray-700">Data Coleta *</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full mt-1 border-gray-300 justify-start font-medium hover:bg-blue-50">
                      {dataColetaDate ? format(dataColetaDate, 'dd/MM/yyyy', { locale: ptBR }) : 'Selecionar data'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar mode="single" selected={dataColetaDate} onSelect={setDataColetaDate} />
                  </PopoverContent>
                </Popover>
                {errors.dataColeta && <span className="text-red-600 text-xs font-semibold">{errors.dataColeta.message}</span>}
              </div>

              <div>
                <label className="text-sm font-bold text-gray-700">Data Conclusão</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full mt-1 border-gray-300 justify-start font-medium hover:bg-green-50">
                      {dataConclusaoDate ? format(dataConclusaoDate, 'dd/MM/yyyy', { locale: ptBR }) : 'Opcional'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar mode="single" selected={dataConclusaoDate} onSelect={setDataConclusaoDate} />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>

          {/* Seção de Conferência */}
          <div className="border-l-4 border-purple-500 pl-4 py-2">
            <h3 className="font-bold text-purple-900 mb-3">✅ Conferência</h3>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="text-sm font-bold text-gray-700">Conferência Por</label>
                <Controller
                  name="conferenciaPor"
                  control={control}
                  render={({ field }) => (
                    <Input {...field} placeholder="Nome da pessoa que conferiu" className="mt-1 border-gray-300" />
                  )}
                />
              </div>
            </div>
          </div>

          <div className="flex gap-3 justify-end pt-6 border-t-2 border-gray-200">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => handleOpenChange(false)}
              className="border-gray-300 hover:bg-gray-50 font-semibold"
            >
              Cancelar
            </Button>
            <Button 
              type="submit" 
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8" 
              disabled={isLoading}
            >
              {isLoading ? '⏳ Salvando...' : '💾 Salvar'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
