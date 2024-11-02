import { NextRequest, NextResponse } from "next/server";
import { getDB } from "./db";

<<<<<<< HEAD
// GET method
=======
>>>>>>> 23c59acd73b5a3eb46d941afc808d978004193de
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
