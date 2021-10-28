import mysql, { Connection } from "mysql";
import util from "util";

const dbConfig: object = {
  host: process.env.DB_HOST,
  user:  process.env.DB_USER ,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
};

const dbConnection = (config: object): any => {
  const connection: Connection = mysql.createConnection(config);
  return {
    query(sql: string): any {
      return util.promisify(connection.query).call(connection, sql);
    },
    close(): any {
      return util.promisify(connection.end).call(connection);
    },
  };
};

export = dbConnection(dbConfig);
