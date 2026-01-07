import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { atendimentoService } from '../services/api';
import type { Atendimento, CreateAtendimentoInput, ApiResponse } from '../types/atendimento';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

export const useAtendimentos = (params?: {
  page?: number;
  limit?: number;
  tecnicoResponsavel?: string;
  sistema?: string;
  tipoAtendimento?: string;
  dataInicio?: string;
  dataFim?: string;
}) => {
  return useQuery<ApiResponse<Atendimento[]>>({
    queryKey: ['atendimentos', params],
    queryFn: () => atendimentoService.getAll(params),
  });
};

export const useCreateAtendimento = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateAtendimentoInput) => atendimentoService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['atendimentos'] });
      toast.success('Atendimento criado com sucesso');
    },
    onError: (error: unknown) => {
      const axiosError = error as AxiosError<{ error: string }> | undefined;
      toast.error(axiosError?.response?.data?.error || 'Erro ao criar atendimento');
    },
  });
};

export const useUpdateAtendimento = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<CreateAtendimentoInput> }) =>
      atendimentoService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['atendimentos'] });
      toast.success('Atendimento atualizado com sucesso');
    },
    onError: (error: unknown) => {
      const axiosError = error as AxiosError<{ error: string }> | undefined;
      toast.error(axiosError?.response?.data?.error || 'Erro ao atualizar atendimento');
    },
  });
};

export const useDeleteAtendimento = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => atendimentoService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['atendimentos'] });
      toast.success('Atendimento deletado com sucesso');
    },
    onError: (error: unknown) => {
      const axiosError = error as AxiosError<{ error: string }> | undefined;
      toast.error(axiosError?.response?.data?.error || 'Erro ao deletar atendimento');
    },
  });
};
