import { Router } from "express";

import {
  index,
  category,
  show,
  create,
  update,
  destroy,
} from "../handlers/products";
import verifyAuthToken from "../middlewares/verifyAuthToken";

const routes = Router();

routes.get("/products", index);
routes.get("/products/category", category);
routes.get("/products/:id", show);
routes.post("/products", verifyAuthToken, create);
routes.put("/products/:id", verifyAuthToken, update);
routes.delete("/products/:id", verifyAuthToken, destroy);

export default routes;
