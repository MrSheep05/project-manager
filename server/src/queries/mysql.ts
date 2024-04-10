import { createConnection, Connection } from "mysql2/promise";

export const getDatabaseConnection = async (): Promise<Connection> => {
  return await createConnection({
    password: process.env.MYSQL_PASSWORD,
    host: process.env.MYSQL_URL,
    user: process.env.MYSQL_USERNAME,
  });
};
