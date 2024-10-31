import { NextRequest, NextResponse } from "next/server";
import { getDB } from "./db";

<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
// GET method
>>>>>>> 4f2ec62580b927f7f1db9d91176051aa2e53ea81
>>>>>>> bae6b88bd0a72300038668276a144ef8549557c9
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
