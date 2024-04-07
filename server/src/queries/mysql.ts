import { createConnection, Connection } from "mysql2/promise";
import { println } from "../log";
import { Severity } from "../log/types";

export const getConnection = async (): Promise<Connection> => {
  return await createConnection({
    password: process.env.MYSQL_PASSWORD,
    host: process.env.MYSQL_URL,
    user: process.env.MYSQL_USERNAME,
  });
};
