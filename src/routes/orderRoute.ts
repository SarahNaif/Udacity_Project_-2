import { Router } from "express";

import {
  index,
  show,
  create,
  update,
  destroy,
  showByUser,
  addProduct,
} from "../handlers/orders";
import verifyAuthToken from "../middlewares/verifyAuthToken";
const routes = Router();

routes.get("/orders", verifyAuthToken, index);
routes.get("/orders/:id", verifyAuthToken, show);
routes.post("/orders", verifyAuthToken, create);
routes.put("/orders/:id", verifyAuthToken, update);
routes.delete("/orders/:id", verifyAuthToken, destroy);

routes.get("/orders/:id/users", verifyAuthToken, showByUser);
routes.post("/orders/:id/products", verifyAuthToken, addProduct);

export default routes;
