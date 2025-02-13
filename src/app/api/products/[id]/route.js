import Product from "@/db/model/Product";
import { NextResponse, NextRequest } from "next/server";


// UPDATE Product
export async function PUT(request, { params }) {
  try {
    const body = await request.json();
    const product = await Product.findByPk(params.id);
    
    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    const updatedProduct = await product.update(body);
    return NextResponse.json(updatedProduct);
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}


// DELETE Product
export async function DELETE(request, { params }) {
  try {
    const product = await Product.findByPk(params.id);
    
    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    await product.destroy();
    return NextResponse.json(
      { message: 'Product deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}