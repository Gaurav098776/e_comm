import Product from "@/db/model/Product";
import { NextResponse, NextRequest } from "next/server";
// import Product from "@/db/model/Product";


export async function GET() {
  try {
    const products = await Product.findAll();
    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}


export async function POST(request) {
  try {
    const body = await request.json();
    console.log('Received request body:', body);

    const product = await Product.create({
      name: body.name,
      description: body.description,
      price: body.price,
      imageUrl: body.imageUrl
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}