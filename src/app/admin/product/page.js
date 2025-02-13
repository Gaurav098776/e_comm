'use client';
import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

const API_URL = 'http://localhost:3000/api/products';

const AdminDashboard = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [products, setProducts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({});

  const fetchProducts = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      toast.error('Failed to fetch products');
    }
  };

  useEffect(() => {
    setIsMounted(true);
    fetchProducts();
  }, []);

  if (!isMounted) return null;

 

  const handleSubmit = async (e) => {
    e.preventDefault();
    const productData = {
      ...currentProduct,
      price: Number(currentProduct.price),
    };

    try {
      if (isEditing && currentProduct.id) {
        await fetch(`${API_URL}/${currentProduct.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(productData),
        });
        toast.success('Product updated successfully');
      } else {
        await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(productData),
        });
        toast.success('Product created successfully');
      }
      fetchProducts();
      setCurrentProduct({});
      setIsEditing(false);
    } catch (error) {
      toast.error('Operation failed');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      toast.success('Product deleted successfully');
      fetchProducts();
    } catch (error) {
      toast.error('Failed to delete product');
    }
  };

  
    return (
      <div className="flex flex-col md:flex-row gap-6 p-6 bg-gray-50 min-h-screen">
        {/* Product Form */}
        <div className="bg-white rounded-lg shadow-md p-6 w-full md:w-1/2">
          <h2 className="text-lg font-semibold mb-4">{isEditing ? 'Edit Product' : 'Add New Product'}</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input type="text" value={currentProduct.name || ''} onChange={(e) => setCurrentProduct({ ...currentProduct, name: e.target.value })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Image URL</label>
                <input type="url" value={currentProduct.imageUrl || ''} onChange={(e) => setCurrentProduct({ ...currentProduct, imageUrl: e.target.value })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Price</label>
                <input type="number" step="0.01" value={currentProduct.price || ''} onChange={(e) => setCurrentProduct({ ...currentProduct, price: e.target.value })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" required />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea value={currentProduct.description || ''} onChange={(e) => setCurrentProduct({ ...currentProduct, description: e.target.value })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" rows={3} />
            </div>
            <div className="flex justify-end space-x-3">
              {isEditing && <button type="button" onClick={() => { setIsEditing(false); setCurrentProduct({}); }} className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">Cancel</button>}
              <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">{isEditing ? 'Update Product' : 'Add Product'}</button>
            </div>
          </form>
        </div>
    
        {/* Product List */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden w-full md:w-1/2">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold">Product List</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {products.map((product) => (
                  <tr key={product.id}>
                    <td className="px-6 py-4 flex items-center space-x-3">
                      <img src={product.imageUrl} alt={product.name} className="w-12 h-12 object-cover rounded-md" />
                      <span>{product.name}</span>
                    </td>
                    <td className="px-6 py-4">${product.price}</td>
                    <td className="px-6 py-4 flex space-x-2">
                      <button onClick={() => { setIsEditing(true); setCurrentProduct(product); }} className="text-blue-500"><Edit2 /></button>
                      <button onClick={() => handleDelete(product.id)} className="text-red-500"><Trash2 /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
    
  
};

export default AdminDashboard;
