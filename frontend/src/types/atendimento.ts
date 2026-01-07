export interface Atendimento {
  id: number;
  referencia: string;
  numeroAtendimento: number;
  tipoAtendimento: string;
  motivoReconversao?: string | null;
  sistema: string;
  tecnicoResponsavel: string;
  dataColeta: string;
  dataConclusao?: string | null;
  quantidadeDias: number;
  conferenciaPor?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface PaginationData {
  total: number;
  page: number;
  limit: number;
  pages: number;
}

export interface ApiResponse<T> {
  data: T;
  pagination: PaginationData;
}

export interface CreateAtendimentoInput {
  referencia: string;
  numeroAtendimento: number;
  tipoAtendimento: string;
  motivoReconversao?: string;
  sistema: string;
  tecnicoResponsavel: string;
  dataColeta: string;
  dataConclusao?: string;
  conferenciaPor?: string;
}
