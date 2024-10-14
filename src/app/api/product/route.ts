import mysql from "mysql2/promise";
import { NextRequest, NextResponse } from "next/server";

// Create the connection to database
// function getDB() {
//   return mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "dawid132009",
//     database: "shoppinglistdb",
//     port: 3306,
//   });
// }

async function getDB() {
  try {
    const connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "dawid132009",
      database: "shoppinglistdb",
      port: 3306,
    });
    console.log("Connected to the database successfully");
    return connection;
  } catch (error) {
    console.error("Failed to connect to the database:", error);
    throw error;
  }
}

// GET method
export async function GET() {
  const connection = await getDB();
  const [results] = await connection.query("SELECT * FROM products;");
  return NextResponse.json(results);
}

// POST method
export async function POST(req: NextRequest) {
  const connection = await getDB();
  const body = await req.json();
  const [results] = await connection.query(
    `INSERT INTO products (name) VALUES ("${body.name}");`
  );

  return NextResponse.json(
    {},
    {
      status: 201,
    }
  );
}
