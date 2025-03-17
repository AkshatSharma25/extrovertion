import mysql from "mysql2/promise";

export async function connectDB() {
  const connection = await mysql.createConnection({
    host: "extrovertion.mysql.database.azure.com",
    user: "extrovertion2025",
    password: "createpassword@123",
    database: "extrovertion",
    ssl: {
      rejectUnauthorized: true, // Enforces secure SSL connections
    },
  });
  return connection;
}