import React, { useEffect, useState } from 'react';
import './ProductList.css';
import { Container, Row, Col, Card, Button, Modal, Form } from 'react-bootstrap';

function ProductList() {
    const [products, setProducts] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [currentProduct, setCurrentProduct] = useState({ name: '', description: '', price: '' });

    // Fetch products from server
    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = () => {
        fetch('http://localhost:5000/products')
            .then(response => response.json())
            .then(data => setProducts(data))
            .catch(err => console.error('Error fetching products:', err));
    };

    // Handle add product
    const handleAddProduct = (e) => {
        e.preventDefault();
        fetch('http://localhost:5000/products', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(currentProduct),
        })
            .then(() => {
                setShowAddModal(false);
                fetchProducts();
            })
            .catch(err => console.error('Error adding product:', err));
    };

    // Handle delete product
    const handleDeleteProduct = (id) => {
        fetch(`http://localhost:5000/products/${id}`, {
            method: 'DELETE',
        })
            .then(() => fetchProducts())
            .catch(err => console.error('Error deleting product:', err));
    };

    // Handle edit product
    const handleEditProduct = (e) => {
        e.preventDefault();
        fetch(`http://localhost:5000/products/${currentProduct._id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(currentProduct),
        })
            .then(() => {
                setShowEditModal(false);
                fetchProducts();
            })
            .catch(err => console.error('Error editing product:', err));
    };

    return (
        <Container className="my-5">
            <h2 className="text-center mb-4">Product List</h2>
            <Button variant="primary" className="mb-4" onClick={() => {
                setCurrentProduct({ name: '', description: '', price: '' });
                setShowAddModal(true);
            }}>Add Product</Button>
            <Row>
                {products.length > 0 ? (
                    products.map(product => (
                        <Col md={4} sm={6} xs={12} key={product._id} className="mb-4">
                            <Card>
                                <Card.Body>
                                    <Card.Title>{product.name}</Card.Title>
                                    <Card.Text>{product.description}</Card.Text>
                                    <Card.Text><strong>Price:</strong> ${product.price}</Card.Text>
                                    <Button variant="danger" onClick={() => handleDeleteProduct(product._id)}>Delete</Button>
                                    <Button variant="primary" className="ms-2" onClick={() => {
                                        setCurrentProduct(product);
                                        setShowEditModal(true);
                                    }}>Edit</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                ) : (
                    <p className="text-center">No products available</p>
                )}
            </Row>

            {/* Add Product Modal */}
            <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleAddProduct}>
                        <Form.Group controlId="productName" className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter product name"
                                value={currentProduct.name}
                                onChange={(e) => setCurrentProduct({ ...currentProduct, name: e.target.value })}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="productDescription" className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter product description"
                                value={currentProduct.description}
                                onChange={(e) => setCurrentProduct({ ...currentProduct, description: e.target.value })}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="productPrice" className="mb-3">
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter product price"
                                value={currentProduct.price}
                                onChange={(e) => setCurrentProduct({ ...currentProduct, price: e.target.value })}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="productCategory" className="mb-3">
                            <Form.Label>Category</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter product category"
                                value={currentProduct.category}
                                onChange={(e) => setCurrentProduct({ ...currentProduct, category: e.target.value })}
                                required
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit">Add Product</Button>
                    </Form>
                </Modal.Body>
            </Modal>

            {/* Edit Product Modal */}
            <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleEditProduct}>
                        <Form.Group controlId="productName" className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter product name"
                                value={currentProduct.name}
                                onChange={(e) => setCurrentProduct({ ...currentProduct, name: e.target.value })}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="productDescription" className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter product description"
                                value={currentProduct.description}
                                onChange={(e) => setCurrentProduct({ ...currentProduct, description: e.target.value })}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="productPrice" className="mb-3">
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter product price"
                                value={currentProduct.price}
                                onChange={(e) => setCurrentProduct({ ...currentProduct, price: e.target.value })}
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">Save Changes</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </Container>
    );
}

export default ProductList;
