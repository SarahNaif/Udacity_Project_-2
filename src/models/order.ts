import Client from "../database";
import { Order, orderType } from "../types/order-type";

export class OrderStore {
  async index(): Promise<Order[]> {
    try {
      const connection = await Client.connect();
      const sql = "SELECT * FROM orders";
      const result = await connection.query(sql);
      connection.release();
      return result.rows;
    } catch (err) {
      throw new Error(`cant show index orders ${err}`);
    }
  }

  async show(id: string): Promise<Order> {
    try {
      const connection = await Client.connect();
      const sql = "SELECT * FROM orders WHERE id=($1);";
      const result = await connection.query(sql, [id]);

      connection.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find order with ${id}. Error: ${err}`);
    }
  }

  async create(order: Order): Promise<Order> {
    try {
      const connection = await Client.connect();
      const sql = `INSERT INTO orders (status, user_id)  VALUES ($1, $2) RETURNING * ;`;

      const result = await connection.query(sql, [order.status, order.user_id]);

      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could not create an new order ${order.user_id} ,${order.id}. Error: ${err}`
      );
    }
  }

  async update(order: Order, id: string): Promise<Order> {
    try {
      const connection = await Client.connect();
      const sql = `UPDATE orders
                   SET status=$1, user_id=$2
                   WHERE id=($3)
                   RETURNING *`;

      const result = await connection.query(sql, [
        order.status,
        order.user_id,
        id,
      ]);

      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Unable to update the order with the id ${id}, ${error}`);
    }
  }

  async delete(id: string): Promise<Order> {
    try {
      const connection = await Client.connect();
      const sql = "DELETE FROM orders WHERE id=($1) RETURNING *;";
      // const SQL = 'DELETE FROM orders_products WHERE order_id=($1)'
      // await connection.query(SQL, [id])
      const result = await connection.query(sql, [id]);

      connection.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not delete order ${id}. Error: ${err}`);
    }
  }

  // show list of orders by the user id
  async ordersByUser(userId: string): Promise<Order[]> {
    try {
      const connection = await Client.connect();
      const sql = `SELECT * FROM orders WHERE user_id=($1)`;

      const result = await connection.query(sql, [userId]);

      connection.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Unable to show orders by user ${userId}, ${error}`);
    }
  }

  // async addProduct(order: Order, orderId: string ):Promise<Order>{
  //     try {
  //         const connection = await Client.connect()
  //         const orderSql = 'SELECT * FROM orders WHERE id=($1)'
  //         const result = await connection.query(orderSql, [orderId])

  //         if (result.rows[0].status !== 'active') {
  //           throw new Error(
  //             `Could not add product ${order.product_id} to order ${orderId} because the order status is not active`
  //           )
  //         }

  //         connection.release()
  //       } catch (error) {
  //         throw new Error(`${error}`)
  //       }

  //       try {
  //         const connection = await Client.connect()
  //         const sql = `INSERT INTO orders_products (quantity, product_Id, order_Id)
  //                        VALUES ($1, $2, $3)
  //                        Returning *`

  //         const result = await connection.query(sql, [order.quantity, order.product_id, orderId])

  //         connection.release()
  //         return result.rows[0]
  //       } catch (error) {
  //         throw new Error(`Could not add product ${order.product_id} to order ${orderId}: ${error}`)
  //       }

  // }
}
