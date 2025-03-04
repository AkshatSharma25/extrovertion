import mysql from "mysql2/promise";

export async function connectDB() {
  const connection = await mysql.createConnection({
    host: "localhost", 
    user: "root", 
    password: "root", 
    database: "extrovertion", 
  });
  return connection;
}