import Client from "../database";
import { User, User_test } from "../types/user-type";

import bcrypt from "bcrypt";

const saltRounds = process.env.SALT_ROUND;
const pepper = process.env.BCRYPT_PASSWORD;

const hash = (password: string) => {
  const salt = parseInt(saltRounds as string);
  return bcrypt.hashSync(password + pepper, salt);
};
export class UserStore {
  async index(): Promise<User_test[]> {
    try {
      const conection = await Client.connect();
      const sql = "SELECT id,firstname,lastname,email FROM users";

      const result = await conection.query(sql);
      conection.release();

      return result.rows;
    } catch (error) {
      throw new Error(`Error Cannot show users ${error}`);
    }
  }

  async show(id: string): Promise<User_test> {
    try {
      const sql =
        "SELECT  id,firstname,lastname,email FROM users WHERE id=($1);";
      const conection = await Client.connect();

      const result = await conection.query(sql, [id]);

      conection.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find user ${id}. Error: ${err}`);
    }
  }

  //  create a user and hash the password
  async create(user: User): Promise<User_test> {
    try {
      const conection = await Client.connect();
      const sql = `INSERT INTO users (firstname,lastname,email, password) VALUES($1, $2, $3, $4) RETURNING id, firstname, lastname ,email ;`;

      const result = await conection.query(sql, [
        user.firstname,
        user.lastname,
        user.email,
        hash(user.password),
      ]);

      conection.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could not add new user ${user.firstname} . Error: ${err}`
      );
    }
  }

  async update(user: User, id: string): Promise<User_test> {
    try {
      const connection = await Client.connect();
      const sql = `UPDATE users
                       SET firstname=$1, lastname=$2, password=$3 , email=$4
                       WHERE id=($5)
                       RETURNING id, firstname, lastname, email`;

      const result = await connection.query(sql, [
        user.firstname,
        user.lastname,
        user.password,
        user.email,
        id,
      ]);

      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Unable to update the user with the id ${id}, ${error}`);
    }
  }

  async delete(id: string): Promise<User_test> {
    try {
      const conection = await Client.connect();
      const sql =
        "DELETE FROM users WHERE id=($1) RETURNING id, firstname, lastname, email;";

      const result = await conection.query(sql, [id]);

      conection.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not delete user ${id}. Error: ${err}`);
    }
  }

  async authenticate(email: string, password: string): Promise<User | null> {
    try {
      const conn = await Client.connect();
      const sql = "SELECT password FROM users WHERE email=($1)";
      const result = await conn.query(sql, [email]);

      conn.release();
      if (result.rows.length) {
        const user = result.rows[0];
        console.log(user);
        if (bcrypt.compareSync(password + pepper, user.password)) {
          return user;
        }
      }
      return null;
    } catch (err) {
      throw new Error(`Error: ${err}`);
    }
  }
}
