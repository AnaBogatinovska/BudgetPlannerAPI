import mysql, { Connection } from "mysql";
import util from "util";

const dbConfig: object = {
  host: "localhost",
  user: "root",
  password: "Badgirl2802!",
  database: "budget_planner_db",
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
