import express, { Request, Response } from "express";
import jwt, { Secret } from "jsonwebtoken";
import { User } from "../types/user-type";
import { UserStore } from "./../models/user";

const userModel = new UserStore();

export const index = async (_req: Request, res: Response) => {
  try {
    const users = await userModel.index();
    res.json(users);
  } catch (error) {
    res.status(500);
    res.json(error);
  }
};

export const show = async (req: Request, res: Response) => {
  try {
    const user = await userModel.show(req.params.id as string);
    res.json(user);
  } catch (error) {
    res.status(500);
    res.json(error);
  }
};

export const create = async (req: Request, res: Response) => {
  const user: User = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: req.body.password,
  };
  try {
    const newUser = await userModel.create(user);
    res.json(newUser);
  } catch (error) {
    res.status(500);
    res.json(error);
  }
};

export const update = async (req: Request, res: Response) => {
  const user: User = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: req.body.password,
  };
  try {
    const newUser = await userModel.update(user, req.params.id as string);
    res.json(newUser);
  } catch (error) {
    res.status(500);
    res.json(error);
  }
};

export const destroy = async (req: Request, res: Response) => {
  try {
    const newUser = await userModel.delete(req.params.id as string);
    res.json(newUser);
  } catch (error) {
    res.status(500);
    res.json(error);
  }
};

export const authenticate = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email, password } = {
      email: _req.body.email,
      password: _req.body.password,
    };
    const SECRET: Secret = process.env.TOKEN_SECRET as Secret;
    const u = await userModel.authenticate(email, password);
    if (u) {
      const token = jwt.sign({ user: u }, SECRET);
      res.json(token);
    } else {
      throw new Error();
    }
  } catch (err) {
    res.status(401);
    res.json("invalid username or password");
    return;
  }
};
