import express from 'express';
import metodosPedidos from '../controllers/pedidosController.js';

const router = express.Router();

//Rutas relacionadas al deposito

router.route('/deposito')
  .get(metodosPedidos.getAllPedidosDeposito) // Obtener todos los pedidos en el depósito

router.route('/deposito/:id')
  .get(metodosPedidos.getPedidoById) // Obtener un pedido específico por ID

  .patch(metodosPedidos.patchEstadoPedido); // Modificar el estado de un pedido en el depósito

//Rutas relacionadas al delivery

router.route('/delivery')
  .get(metodosPedidos.getAllPedidosDelivery) // Obtener todos los pedidos disponibles para delivery

router.route('/delivery/:id')
  .post(metodosPedidos.postPedido) //Asigna un repartidor a un pedido
  
  .patch(metodosPedidos.patchEstadoPedido); // Modificar el estado de un pedido en delivery

export default router;