import React, { useState } from 'react';
import './CreateProduct.css';

function CreateProduct() {
    const [product, setProduct] = useState({
        name: '',
        price: '',
        description: '',
        category: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://localhost:5000/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Product created:', data);
            setProduct({ name: '', price: '', description: '', category: '' });
        })
        .catch(err => console.error('Error creating product:', err));
    };

    return (
        <div className="create-product">
            <h2>Create a New Product</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Product Name"
                    value={product.name}
                    onChange={handleChange}
                    required
                />
                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={product.price}
                    onChange={handleChange}
                    required
                />
                <textarea
                    name="description"
                    placeholder="Description"
                    value={product.description}
                    onChange={handleChange}
                    required
                ></textarea>
                <input
                    type="text"
                    name="category"
                    placeholder="Category"
                    value={product.category}
                    onChange={handleChange}
                />
                <button type="submit">Create Product</button>
            </form>
        </div>
    );
}

export default CreateProduct;
