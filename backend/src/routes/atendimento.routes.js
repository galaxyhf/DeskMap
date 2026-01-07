import express from 'express';
import {
  getAtendimentos,
  getAtendimentoById,
  createAtendimento,
  updateAtendimento,
  deleteAtendimento,
} from '../controllers/atendimento.controller.js';

const router = express.Router();

/**
 * @swagger
 * /api/atendimentos:
 *   get:
 *     summary: Listar todos os atendimentos
 *     tags: [Atendimentos]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Número da página
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Itens por página
 *       - in: query
 *         name: tecnicoResponsavel
 *         schema:
 *           type: string
 *         description: Filtrar por técnico
 *       - in: query
 *         name: sistema
 *         schema:
 *           type: string
 *         description: Filtrar por sistema
 *       - in: query
 *         name: tipoAtendimento
 *         schema:
 *           type: string
 *         description: Filtrar por tipo
 *       - in: query
 *         name: dataInicio
 *         schema:
 *           type: string
 *         description: Data inicial (YYYY-MM-DD)
 *       - in: query
 *         name: dataFim
 *         schema:
 *           type: string
 *         description: Data final (YYYY-MM-DD)
 *     responses:
 *       200:
 *         description: Lista de atendimentos
 */
router.get('/', getAtendimentos);

/**
 * @swagger
 * /api/atendimentos/{id}:
 *   get:
 *     summary: Obter atendimento por ID
 *     tags: [Atendimentos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Atendimento encontrado
 *       404:
 *         description: Atendimento não encontrado
 */
router.get('/:id', getAtendimentoById);

/**
 * @swagger
 * /api/atendimentos:
 *   post:
 *     summary: Criar novo atendimento
 *     tags: [Atendimentos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [referencia, numeroAtendimento, tipoAtendimento, sistema, tecnicoResponsavel, dataColeta]
 *             properties:
 *               referencia:
 *                 type: string
 *                 format: date
 *               numeroAtendimento:
 *                 type: number
 *               tipoAtendimento:
 *                 type: string
 *               motivoReconversao:
 *                 type: string
 *               sistema:
 *                 type: string
 *               tecnicoResponsavel:
 *                 type: string
 *               dataColeta:
 *                 type: string
 *                 format: date
 *               dataConclusao:
 *                 type: string
 *                 format: date
 *               conferenciaPor:
 *                 type: string
 *     responses:
 *       201:
 *         description: Atendimento criado
 *       400:
 *         description: Erro de validação
 */
router.post('/', createAtendimento);

/**
 * @swagger
 * /api/atendimentos/{id}:
 *   put:
 *     summary: Atualizar atendimento
 *     tags: [Atendimentos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               referencia:
 *                 type: string
 *                 format: date
 *               numeroAtendimento:
 *                 type: number
 *               tipoAtendimento:
 *                 type: string
 *               motivoReconversao:
 *                 type: string
 *               sistema:
 *                 type: string
 *               tecnicoResponsavel:
 *                 type: string
 *               dataColeta:
 *                 type: string
 *                 format: date
 *               dataConclusao:
 *                 type: string
 *                 format: date
 *               conferenciaPor:
 *                 type: string
 *     responses:
 *       200:
 *         description: Atendimento atualizado
 *       404:
 *         description: Atendimento não encontrado
 */
router.put('/:id', updateAtendimento);

/**
 * @swagger
 * /api/atendimentos/{id}:
 *   delete:
 *     summary: Deletar atendimento
 *     tags: [Atendimentos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Atendimento deletado
 *       404:
 *         description: Atendimento não encontrado
 */
router.delete('/:id', deleteAtendimento);

export default router;
