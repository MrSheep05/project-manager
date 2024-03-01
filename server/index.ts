import mysql from "mysql2/promise";
import "dotenv/config";
import { Procedure } from "./queries/types";
import { runProcedure } from "./queries/queries";
const adminUserId = "1d3cfe9f-b53a-11ee-9810-3cecef7ae862";
const normalUserId = "00b1343e-b120-11ee-9810-3cecef7ae862";
const statusId = "7036d8cd-af20-11ee-99f6-3cecef7a";
const test = async () => {
  try {
    const connection = await mysql.createConnection({
      password: process.env.MYSQL_PASSWORD,
      host: process.env.MYSQL_URL,
      user: process.env.MYSQL_USERNAME,
    });
    const res = await runProcedure(connection, {
      type: Procedure.AddStatus,
      payload: {
        uid: adminUserId,
        name: "",
        color: parseInt("9ff26e", 16),
      },
    });
    console.log(res);
  } catch (e) {
    console.log(process.env.MYSQL_URL);
    console.log(e);
  }
};

test();
