import { createConnection, Connection } from "mysql2/promise";
import { Err, Ok, Result } from "../types/index.type";

export const getConnection = async (): Promise<Result<Error, Connection>> => {
  try {
    const connection = await createConnection({
      password: process.env.MYSQL_PASSWORD,
      host: process.env.MYSQL_URL,
      user: process.env.MYSQL_USERNAME,
    });
    return Ok(connection);
  } catch (e) {
    return Err(e);
  }
};
