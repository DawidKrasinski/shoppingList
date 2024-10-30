import { NextRequest, NextResponse } from "next/server";
import { getDB } from "../db";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const connection = await getDB();
  if (!connection) {
    return NextResponse.json(
      { error: "cant connect with database" },
      { status: 500 }
    );
  }
  try {
    const [results] = await connection.query(
      `DELETE FROM products WHERE id = ?;`,
      [params.id]
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

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
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
      [body.name, params.id]
    );
    return NextResponse.json({}, { status: 200 });
  } catch (error) {
    console.log("cant use put method", error);
    return NextResponse.json({ error: "cant use put method" }, { status: 500 });
  }
}
