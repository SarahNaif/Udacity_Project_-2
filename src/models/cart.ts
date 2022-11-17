import Client from "../database";
import { orderProdType } from "../types/order-type";

export class OrdersProductsModel {
  async create(
    order_id: number,
    product_id: number,
    quantity: number
  ): Promise<orderProdType> {
    try {
      const connection = await Client.connect();
      const sql =
        "INSERT INTO orders_products (order_id, product_id, quantity) VALUES($1, $2, $3) RETURNING *";
      const result = await connection.query(sql, [
        order_id,
        product_id,
        quantity,
      ]);
      connection.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(`Could not add product. Error: ${error}`);
    }
  }
}
