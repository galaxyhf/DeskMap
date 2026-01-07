import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useState } from 'react';

interface FiltersProps {
  onFilter: (filters: FilterValues) => void;
}

export interface FilterValues {
  tecnicoResponsavel?: string;
  sistema?: string;
  tipoAtendimento?: string;
  dataInicio?: string;
  dataFim?: string;
}

export const Filters = ({ onFilter }: FiltersProps) => {
  const [filters, setFilters] = useState<FilterValues>({});
  const [dataInicio, setDataInicio] = useState<Date | undefined>();
  const [dataFim, setDataFim] = useState<Date | undefined>();
  const [activeFilters, setActiveFilters] = useState(0);

  const handleFilter = () => {
    const newFilters = {
      ...filters,
      dataInicio: dataInicio ? format(dataInicio, 'yyyy-MM-dd') : undefined,
      dataFim: dataFim ? format(dataFim, 'yyyy-MM-dd') : undefined,
    };
    
    const count = Object.values(newFilters).filter(v => v).length;
    setActiveFilters(count);
    
    onFilter(newFilters);
  };

  const handleClear = () => {
    setFilters({});
    setDataInicio(undefined);
    setDataFim(undefined);
    setActiveFilters(0);
    onFilter({});
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
        <Input
          placeholder="Técnico Responsável"
          value={filters.tecnicoResponsavel || ''}
          onChange={(e) => setFilters({ ...filters, tecnicoResponsavel: e.target.value })}
          className="border-gray-300 bg-white"
        />

        <Input
          placeholder="Sistema"
          value={filters.sistema || ''}
          onChange={(e) => setFilters({ ...filters, sistema: e.target.value })}
          className="border-gray-300 bg-white"
        />

        <Select 
          value={filters.tipoAtendimento || 'all'} 
          onValueChange={(value) => setFilters({ ...filters, tipoAtendimento: value === 'all' ? undefined : value })}
        >
          <SelectTrigger className="border-gray-300 bg-white">
            <SelectValue placeholder="Tipo Atendimento" />
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

        <Popover>
          <PopoverTrigger asChild>
            <Button 
              variant="outline" 
              className="border-gray-300 bg-white hover:bg-gray-50 justify-start text-left font-normal"
            >
              {dataInicio ? format(dataInicio, 'dd/MM', { locale: ptBR }) : 'Data Início'}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar 
              mode="single" 
              selected={dataInicio} 
              onSelect={setDataInicio} 
              disabled={(date) => date > new Date()}
            />
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <Button 
              variant="outline" 
              className="border-gray-300 bg-white hover:bg-gray-50 justify-start text-left font-normal"
            >
              {dataFim ? format(dataFim, 'dd/MM', { locale: ptBR }) : 'Data Fim'}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar 
              mode="single" 
              selected={dataFim} 
              onSelect={setDataFim} 
              disabled={(date) => date > new Date()}
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="flex gap-2 items-center flex-wrap">
        <Button 
          onClick={handleFilter} 
          className="bg-blue-600 hover:bg-blue-700 text-white"
          size="sm"
        >
          🔍 Filtrar
        </Button>
        <Button 
          onClick={handleClear} 
          variant="outline"
          className="border-gray-300 hover:bg-gray-50"
          size="sm"
        >
          Limpar
        </Button>
        {activeFilters > 0 && (
          <Badge variant="secondary" className="ml-auto bg-blue-100 text-blue-800 border-blue-300">
            {activeFilters} filtro{activeFilters > 1 ? 's' : ''} ativo{activeFilters > 1 ? 's' : ''}
          </Badge>
        )}
      </div>
    </div>
  );
};
