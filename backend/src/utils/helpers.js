export const calcularQuantidadeDias = (dataColeta, dataConclusao) => {
  const inicio = new Date(dataColeta);
  const fim = dataConclusao ? new Date(dataConclusao) : new Date();

  inicio.setHours(0, 0, 0, 0);
  fim.setHours(0, 0, 0, 0);

  const diferenca = fim - inicio;
  return Math.floor(diferenca / (1000 * 60 * 60 * 24)) + 1;
};

export const validarDatas = (dataColeta, dataConclusao) => {
  const coleta = new Date(dataColeta);
  const conclusao = dataConclusao ? new Date(dataConclusao) : null;

  if (conclusao && conclusao < coleta) {
    throw new Error('dataConclusao não pode ser menor que dataColeta');
  }
};
