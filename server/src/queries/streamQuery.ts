// import { getDatabaseConnection } from "./mysql";
// import { CsvProjectsProcedure } from "./types";

// const streamQuery = async (query: CsvProjectsProcedure) => {
//   const connection = await getDatabaseConnection();
//   const values = Object.values(query.payload);
//   const response = connection.query(
//     `CALL ${process.env.MYSQL_DATABASE}.${query.type}(${Array.from(
//       { length: values.length },
//       () => "?"
//     ).join(",")})`,
//     values
//   );
// };
