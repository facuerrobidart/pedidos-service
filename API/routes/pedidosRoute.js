import express from 'express';
import metodosPedidos from '../controllers/pedidosController.js';

const router = express.Router();

//Rutas relacionadas al deposito

router.route('/deposito')
  .get(metodosPedidos.getAllPedidosDeposito(req, res)) // Obtener todos los pedidos en el depósito

  .get('/:id', metodosPedidos.getPedidoById(req, res)) // Obtener un pedido específico por ID

  .patch('/:id', metodosPedidos.patchEstadoPedido(req, res)); // Modificar el estado de un pedido en el depósito

//Rutas relacionadas al delivery

router.route('/delivery')
  .get(metodosPedidos.getAllPedidosDelivery(req, res)) // Obtener todos los pedidos disponibles para delivery

  .post('/:id', metodosPedidos.postPedido(req, res)) //Asigna un repartidor a un pedido
  
  .patch('/:id', metodosPedidos.patchEstadoPedido(req, res)); // Modificar el estado de un pedido en delivery

export default router;