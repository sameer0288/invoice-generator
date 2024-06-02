import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, fetchProducts, updateProduct, deleteProduct } from '../store/productSlice';
import { RootState } from '../store';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddProductPage: React.FC = () => {
  const [name, setName] = useState('');
  const [qty, setQty] = useState(0);
  const [rate, setRate] = useState(0);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, status, error } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    dispatch<any>(fetchProducts());
  }, [dispatch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || qty <= 0 || rate <= 0) {
      toast.error("Please fill out all fields correctly.");
      return;
    }

    if (editingProductId) {
      dispatch<any>(updateProduct({ id: editingProductId, product: {
        name, qty, rate,
        _id: ''
      } }));
      toast.success("Product updated successfully!");
      setEditingProductId(null);
    } else {
      dispatch<any>(addProduct({
        name, qty, rate,
        _id: ''
      }));
      toast.success("Product added successfully!");
    }

    setName('');
    setQty(0);
    setRate(0);
  };

  const handleEdit =(product:any) => {
    setName(product.name);
    setQty(product.qty);
    setRate(product.rate);
    setEditingProductId(product._id);
  };

  const handleDelete = (id:any) => {
    dispatch<any>(deleteProduct(id));
    toast.success("Product deleted successfully!");
  };

  const handleNext = () => {
    if (products.length === 0) {
      toast.error("Please add at least one product before proceeding.");
    } else {
      navigate('/generate-pdf');
    }
  };
  const handleLogout = () => {
    // Clear token and refresh the page
    localStorage.removeItem('token');
    window.location.href = "/";
  };
  return (
    <div className="container mx-auto p-6">
        <button
        onClick={handleLogout}
        className="absolute top-0 right-0 mt-4 mr-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Logout 
      </button>
      <h1 className="text-2xl font-bold mb-4">Add Products</h1>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Product Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Product Quantity
          </label>
          <input
            type="number"
            value={qty}
            onChange={(e) => setQty(Number(e.target.value))}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
            min="0"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Product Rate
          </label>
          <input
            type="number"
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
            min="1"
            step="1"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {editingProductId ? 'Update Product' : 'Add Product'}
          </button>
        </div>
      </form>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-xl font-bold mb-4">Products</h2>
        {status === 'loading' ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="px-4 py-2">Product Name</th>
                <th className="px-4 py-2">Quantity</th>
                <th className="px-4 py-2">Rate</th>
                <th className="px-4 py-2">Total</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
            {products && products.length > 0 ? (
                products.map((product:any) => (
      <tr key={product._id}>
      <td className="border px-4 py-2">{product.name}</td>
      <td className="border px-4 py-2">{product.qty}</td>
      <td className="border px-4 py-2">{product.rate}</td>
      <td className="border px-4 py-2">{product.qty * product.rate}</td>
      <td className="border px-4 py-2 text-center">
        <button
          onClick={() => handleEdit(product)}
          className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
        >
          Edit
        </button>
        <button
          onClick={() => handleDelete(product._id)}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Delete
        </button>
      </td>
    </tr>
  ))
) : (

    <td className="px-4 py-2 text-red-600">No Product data</td>
 
)}

            </tbody>
          </table>
        )}
      </div>
      <div className="flex items-center justify-between">
        <button
          onClick={handleNext}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Next
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddProductPage;
