import express from "express";
import morgan from "morgan";
import usersRoutes from "./routes/userRoute";
import productRoutes from "./routes/productRoute";
import orderRoutes from "./routes/orderRoute";
const app: express.Application = express();
const address: string = "0.0.0.0:3000";
app.use(express.json());
app.use(morgan("dev"));

app.use(usersRoutes);
app.use(productRoutes);
app.use(orderRoutes);

app.get("/", async (_req, res) => {
  res.json({ Message: "am here" });
});

app.listen(3000, function () {
  console.log(`starting app on: ${address}`);
});

export default app;
