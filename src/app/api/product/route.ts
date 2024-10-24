import mysql from "mysql2/promise";
import { NextRequest, NextResponse } from "next/server";

//Create the connection to database
async function getDB() {
  try {
    const connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "dawid132009",
      database: "shoppinglistdb",
      port: 3306,
    });
    console.log("Database connection created");
    return connection;
  } catch (error) {
    console.log("Error connecting to database", error);
    return null;
  }
}

// GET method
export async function GET() {
  const connection = await getDB();
  if (!connection) {
    return NextResponse.json(
      { error: "cant connect with database" },
      { status: 500 }
    );
  }
  try {
    const [results] = await connection.query("SELECT * FROM products;");
    return NextResponse.json(results);
  } catch (error) {
    console.log("cant use get method", error);
    return NextResponse.json({ error: "cant use get method" }, { status: 500 });
  }
}

// POST method
export async function POST(req: NextRequest) {
  const connection = await getDB();
  if (!connection) {
    return NextResponse.json(
      { error: "cant connect with database" },
      { status: 500 }
    );
  }
  try {
    const body = await req.json();
    const [results] = await connection.query(
      `INSERT INTO products (name) VALUES (?);`,
      [body.name]
    );
    return NextResponse.json({}, { status: 201 });
  } catch (error) {
    console.log("cant use post method", error);
    return NextResponse.json(
      { error: "cant use post method" },
      { status: 500 }
    );
  }
}

//DELETE method
export async function DELETE(req: NextRequest) {
  const connection = await getDB();
  if (!connection) {
    return NextResponse.json(
      { error: "cant connect with database" },
      { status: 500 }
    );
  }
  try {
    const body = await req.json();
    const [results] = await connection.query(
      `DELETE FROM products WHERE id = ?;`,
      [body.id]
    );
    return NextResponse.json({}, { status: 200 });
  } catch (error) {
    console.log("cant use delete method", error);
    return NextResponse.json(
      { error: "cant use delete method" },
      { status: 500 }
    );
  }
}

// PUT method
export async function PUT(req: NextRequest) {
  const connection = await getDB();
  if (!connection) {
    return NextResponse.json(
      { error: "cant connect with database" },
      { status: 500 }
    );
  }
  try {
    const body = await req.json();
    const [results] = await connection.query(
      `UPDATE products SET name = ? WHERE id = ?;`,
      [body.name, body.id]
    );
    return NextResponse.json({}, { status: 200 });
  } catch (error) {
    console.log("cant use put method", error);
    return NextResponse.json({ error: "cant use put method" }, { status: 500 });
  }
}
