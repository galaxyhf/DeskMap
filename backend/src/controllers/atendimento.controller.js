import { Atendimento } from '../models/index.js';
import { Op } from 'sequelize';
import { calcularQuantidadeDias, validarDatas } from '../utils/helpers.js';

export const getAtendimentos = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 10,
      tecnicoResponsavel,
      sistema,
      tipoAtendimento,
      dataInicio,
      dataFim,
    } = req.query;

    const where = {};

    if (tecnicoResponsavel) {
      where.tecnicoResponsavel = { [Op.like]: `%${tecnicoResponsavel}%` };
    }

    if (sistema) {
      where.sistema = { [Op.like]: `%${sistema}%` };
    }

    if (tipoAtendimento) {
      where.tipoAtendimento = { [Op.like]: `%${tipoAtendimento}%` };
    }

    if (dataInicio || dataFim) {
      where.dataColeta = {};
      if (dataInicio) {
        where.dataColeta[Op.gte] = new Date(dataInicio);
      }
      if (dataFim) {
        where.dataColeta[Op.lte] = new Date(dataFim);
      }
    }

    const { count, rows } = await Atendimento.findAndCountAll({
      where,
      offset: (parseInt(page) - 1) * parseInt(limit),
      limit: parseInt(limit),
      order: [['createdAt', 'DESC']],
    });

    res.json({
      data: rows,
      pagination: {
        total: count,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(count / parseInt(limit)),
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getAtendimentoById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const atendimento = await Atendimento.findByPk(id);

    if (!atendimento) {
      return res.status(404).json({ error: 'Atendimento não encontrado' });
    }

    res.json(atendimento);
  } catch (error) {
    next(error);
  }
};

export const createAtendimento = async (req, res, next) => {
  try {
    const {
      referencia,
      numeroAtendimento,
      tipoAtendimento,
      motivoReconversao,
      sistema,
      tecnicoResponsavel,
      dataColeta,
      dataConclusao,
      conferenciaPor,
    } = req.body;

    // Validações
    if (
      !referencia ||
      !numeroAtendimento ||
      !tipoAtendimento ||
      !sistema ||
      !tecnicoResponsavel ||
      !dataColeta
    ) {
      return res.status(400).json({
        error: 'Campos obrigatórios faltando',
      });
    }

    validarDatas(dataColeta, dataConclusao);

    const quantidadeDias = calcularQuantidadeDias(dataColeta, dataConclusao);

    const atendimento = await Atendimento.create({
      referencia,
      numeroAtendimento,
      tipoAtendimento,
      motivoReconversao,
      sistema,
      tecnicoResponsavel,
      dataColeta,
      dataConclusao,
      quantidadeDias,
      conferenciaPor,
    });

    res.status(201).json(atendimento);
  } catch (error) {
    next(error);
  }
};

export const updateAtendimento = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      referencia,
      numeroAtendimento,
      tipoAtendimento,
      motivoReconversao,
      sistema,
      tecnicoResponsavel,
      dataColeta,
      dataConclusao,
      conferenciaPor,
    } = req.body;

    const atendimento = await Atendimento.findByPk(id);

    if (!atendimento) {
      return res.status(404).json({ error: 'Atendimento não encontrado' });
    }

    if (dataColeta || dataConclusao) {
      validarDatas(
        dataColeta || atendimento.dataColeta,
        dataConclusao || atendimento.dataConclusao
      );
    }

    const quantidadeDias = calcularQuantidadeDias(
      dataColeta || atendimento.dataColeta,
      dataConclusao || atendimento.dataConclusao
    );

    await atendimento.update({
      referencia: referencia || atendimento.referencia,
      numeroAtendimento: numeroAtendimento || atendimento.numeroAtendimento,
      tipoAtendimento: tipoAtendimento || atendimento.tipoAtendimento,
      motivoReconversao:
        motivoReconversao !== undefined
          ? motivoReconversao
          : atendimento.motivoReconversao,
      sistema: sistema || atendimento.sistema,
      tecnicoResponsavel: tecnicoResponsavel || atendimento.tecnicoResponsavel,
      dataColeta: dataColeta || atendimento.dataColeta,
      dataConclusao:
        dataConclusao !== undefined ? dataConclusao : atendimento.dataConclusao,
      quantidadeDias,
      conferenciaPor:
        conferenciaPor !== undefined
          ? conferenciaPor
          : atendimento.conferenciaPor,
    });

    res.json(atendimento);
  } catch (error) {
    next(error);
  }
};

export const deleteAtendimento = async (req, res, next) => {
  try {
    const { id } = req.params;

    const atendimento = await Atendimento.findByPk(id);

    if (!atendimento) {
      return res.status(404).json({ error: 'Atendimento não encontrado' });
    }

    await atendimento.destroy();

    res.json({ message: 'Atendimento deletado com sucesso' });
  } catch (error) {
    next(error);
  }
};
