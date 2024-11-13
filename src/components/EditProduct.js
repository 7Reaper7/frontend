import React, { useState } from 'react';

function EditProduct({ product, onUpdate }) {
    const [updatedProduct, setUpdatedProduct] = useState(product);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedProduct({ ...updatedProduct, [name]: value });
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        fetch(`http://localhost:5000/products/${product._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedProduct)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Product updated:', data);
            onUpdate();
        })
        .catch(err => console.error('Error updating product:', err));
    };

    return (
        <form onSubmit={handleUpdate}>
            <input
                type="text"
                name="name"
                value={updatedProduct.name}
                onChange={handleChange}
            />
            <input
                type="number"
                name="price"
                value={updatedProduct.price}
                onChange={handleChange}
            />
            <textarea
                name="description"
                value={updatedProduct.description}
                onChange={handleChange}
            ></textarea>
            <input
                type="text"
                name="category"
                value={updatedProduct.category}
                onChange={handleChange}
            />
            <button type="submit">Update Product</button>
        </form>
    );
}

export default EditProduct;
