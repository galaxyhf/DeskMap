const errorMiddleware = (err, req, res, next) => {
  console.error(err);

  if (err.name === 'SequelizeValidationError') {
    return res.status(400).json({
      error: 'Erro de validação',
      details: err.errors.map((e) => ({
        field: e.path,
        message: e.message,
      })),
    });
  }

  if (err.name === 'SequelizeUniqueConstraintError') {
    return res.status(409).json({
      error: 'Campo duplicado',
      field: err.errors[0].path,
    });
  }

  if (err.name === 'SequelizeForeignKeyConstraintError') {
    return res.status(400).json({
      error: 'Violação de chave estrangeira',
    });
  }

  res.status(err.status || 500).json({
    error: err.message || 'Erro interno do servidor',
  });
};

export default errorMiddleware;
