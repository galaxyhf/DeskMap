-- Criar database com charset UTF-8
CREATE DATABASE IF NOT EXISTS deskmap CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE deskmap;

-- Criar tabela atendimentos com charset UTF-8
CREATE TABLE IF NOT EXISTS atendimentos (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  referencia DATE NOT NULL,
  numeroAtendimento BIGINT NOT NULL UNIQUE,
  tipoAtendimento VARCHAR(100) NOT NULL,
  motivoReconversao VARCHAR(255),
  sistema VARCHAR(100) NOT NULL,
  tecnicoResponsavel VARCHAR(100) NOT NULL,
  dataColeta DATE NOT NULL,
  dataConclusao DATE,
  quantidadeDias INT NOT NULL DEFAULT 0,
  conferenciaPor VARCHAR(100),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  CONSTRAINT chk_data_conclusao CHECK (dataConclusao IS NULL OR dataConclusao >= dataColeta)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Criar índices para melhor performance
CREATE INDEX idx_tecnico ON atendimentos(tecnicoResponsavel);
CREATE INDEX idx_sistema ON atendimentos(sistema);
CREATE INDEX idx_tipo ON atendimentos(tipoAtendimento);
CREATE INDEX idx_data_coleta ON atendimentos(dataColeta);

-- Inserir dados de exemplo
INSERT INTO atendimentos (
  referencia, 
  numeroAtendimento, 
  tipoAtendimento, 
  motivoReconversao, 
  sistema, 
  tecnicoResponsavel, 
  dataColeta, 
  dataConclusao, 
  quantidadeDias, 
  conferenciaPor
) VALUES
(
  '2025-01-06',
  1000001,
  'Suporte',
  NULL,
  'Sistema A',
  'João Silva',
  '2025-01-01',
  '2025-01-03',
  3,
  'Maria Santos'
),
(
  '2025-01-06',
  1000002,
  'Incidente',
  'Erro de conexão',
  'Sistema B',
  'Carlos Oliveira',
  '2025-01-02',
  NULL,
  5,
  NULL
),
(
  '2025-01-06',
  1000003,
  'Manutenção',
  NULL,
  'Sistema A',
  'João Silva',
  '2024-12-28',
  '2025-01-04',
  8,
  'Pedro Costa'
),
(
  '2025-01-06',
  1000004,
  'Implementação',
  NULL,
  'Sistema C',
  'Ana Paula',
  '2025-01-05',
  NULL,
  2,
  NULL
);
