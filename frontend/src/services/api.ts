import axios from 'axios';
import type { Atendimento, ApiResponse, CreateAtendimentoInput } from '../types/atendimento';

const API_BASE_URL = import.meta.env.VITE_API_URL;

if (!API_BASE_URL) {
  throw new Error('VITE_API_URL não está definida nas variáveis de ambiente');
}

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const atendimentoService = {
  getAll: async (params?: {
    page?: number;
    limit?: number;
    tecnicoResponsavel?: string;
    sistema?: string;
    tipoAtendimento?: string;
    dataInicio?: string;
    dataFim?: string;
  }): Promise<ApiResponse<Atendimento[]>> => {
    const response = await api.get('/atendimentos', { params });
    return response.data;
  },

  getById: async (id: number): Promise<Atendimento> => {
    const response = await api.get(`/atendimentos/${id}`);
    return response.data;
  },

  create: async (data: CreateAtendimentoInput): Promise<Atendimento> => {
    const response = await api.post('/atendimentos', data);
    return response.data;
  },

  update: async (id: number, data: Partial<CreateAtendimentoInput>): Promise<Atendimento> => {
    const response = await api.put(`/atendimentos/${id}`, data);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/atendimentos/${id}`);
  },
};
