import express, { Request, Response } from "express";

import { Order, orderProdType, orderType } from "../types/order-type";
import { OrderStore } from "./../models/order";
import { OrdersProductsModel } from "./../models/cart";

const orderModel = new OrderStore();
const orderProductModel = new OrdersProductsModel();

export const index = async (_req: Request, res: Response) => {
  try {
    const orders = await orderModel.index();
    res.json(orders);
  } catch (error) {
    res.status(500);
    res.json(error);
  }
};

export const show = async (req: Request, res: Response) => {
  try {
    const order = await orderModel.show(req.params.id as string);
    res.json(order);
  } catch (error) {
    res.status(500);
    res.json(error);
  }
};

export const create = async (req: Request, res: Response) => {
  const order: Order = {
    status: req.body.status,
    user_id: parseInt(req.body.user_id),
  };
  try {
    const newOrder = await orderModel.create(order);
    res.json(newOrder);
  } catch (error) {
    res.status(500);
    res.json(error);
  }
};

export const update = async (req: Request, res: Response) => {
  const order: Order = {
    status: req.body.status,
    user_id: req.body.user_id,
  };
  try {
    const newOrder = await orderModel.update(order, req.params.id as string);
    res.json(newOrder);
  } catch (error) {
    res.status(500);
    res.json(error);
  }
};

export const destroy = async (req: Request, res: Response) => {
  try {
    const order = await orderModel.delete(req.params.id as string);
    res.json(order);
  } catch (error) {
    res.status(500);
    res.json(error);
  }
};

export const showByUser = async (req: Request, res: Response) => {
  try {
    const order = await orderModel.ordersByUser(req.params.id as string);
    res.json(order);
  } catch (error) {
    res.status(500);
    res.json(error);
  }
};

export const addProduct = async (req: Request, res: Response) => {
  const order: orderProdType = {
    quantity: parseInt(req.body.quantity),
    product_id: parseInt(req.body.product_id),
    order_id: parseInt(req.body.order_id),
  };

  try {
    const product = await orderProductModel.create(
      order.product_id,
      order.order_id,
      order.quantity
    );
    res.json(product);
  } catch (error) {
    res.status(500);
    res.json(error);
  }
};
