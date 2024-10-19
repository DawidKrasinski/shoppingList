import mysql from "mysql2/promise";
import { NextRequest, NextResponse } from "next/server";

//Create the connection to database
function getDB() {
  return mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "dawid132009",
    database: "shoppinglistdb",
    port: 3306,
  });
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
  return NextResponse.json({}, { status: 201 });
}

//DELETE method
export async function DELETE(req: NextRequest) {
  const connection = await getDB();
  const body = await req.json();
  const [results] = await connection.query(
    `DELETE FROM products WHERE id = ${body.id};`
  );
  return NextResponse.json(results);
}
