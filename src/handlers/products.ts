import { Request, Response } from "express";

import { Product } from "../types/product-type";
import { ProductStore } from "./../models/product";

const productModel = new ProductStore();

export const index = async (_req: Request, res: Response) => {
  try {
    const products = await productModel.index();
    res.json(products);
  } catch (error) {
    res.status(500);
    res.json(error);
  }
};

export const show = async (req: Request, res: Response) => {
  try {
    const product = await productModel.show(req.params.id as string);
    res.json(product);
  } catch (error) {
    res.status(500);
    res.json(error);
  }
};

export const category = async (req: Request, res: Response) => {
  try {
    const product = await productModel.category(req.body.category);
    return res.send(product);
  } catch (error) {
    console.log(error);
    res.status(401).json(error);
  }
};

export const create = async (req: Request, res: Response) => {
  const product: Product = {
    name: req.body.name,
    des: req.body.des,
    image: req.body.image,
    price: req.body.price,
    category: req.body.category,
  };
  try {
    const newProduct = await productModel.create(product);
    res.json(newProduct);
  } catch (error) {
    res.status(500);
    res.json(error);
  }
};

export const update = async (req: Request, res: Response) => {
  const user: Product = {
    name: req.body.name,
    des: req.body.des,
    image: req.body.image,
    price: req.body.price,
    category: req.body.category,
  };
  try {
    const newProduct = await productModel.update(user, req.params.id as string);
    res.json(newProduct);
  } catch (error) {
    res.status(500);
    res.json(error);
  }
};

export const destroy = async (req: Request, res: Response) => {
  try {
    const newProduct = await productModel.delete(req.params.id as string);
    res.json(newProduct);
  } catch (error) {
    res.status(500);
    res.json(error);
  }
};
