import { Router } from "express";

import {
  index,
  show,
  create,
  update,
  destroy,
  authenticate,
} from "../handlers/users";
import verifyAuthToken from "../middlewares/verifyAuthToken";

const routes = Router();

routes.get("/users", verifyAuthToken, index);
routes.get("/users/:id", verifyAuthToken, show);
routes.post("/signin", authenticate);
routes.post("/register", create);
routes.put("/users/:id", verifyAuthToken, update);
routes.delete("/users/:id", verifyAuthToken, destroy);

export default routes;
