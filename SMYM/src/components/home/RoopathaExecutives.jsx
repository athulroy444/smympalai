import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import memberPlaceholder from '../../assets/member_placeholder.png';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { Pencil, Trash, Plus, Save, X } from 'react-bootstrap-icons';

function RoopathaExecutives() {
    const { user } = useAuth();
    const { roopathaExecutives, addRoopathaExecutive, updateRoopathaExecutive, deleteRoopathaExecutive } = useData();
    const isAdmin = user && user.role === 'admin';

    // Edit Mode State
    const [editingId, setEditingId] = useState(null);
    const [editForm, setEditForm] = useState({ name: '', position: '', image: '' });
    const [isAdding, setIsAdding] = useState(false);
    const [newForm, setNewForm] = useState({ name: '', position: '', image: '' });

    const [uploadKey, setUploadKey] = useState(0);

    const handleEditClick = (exec) => {
        setEditingId(exec.id);
        setEditForm({ name: exec.name, position: exec.position, image: exec.image || '' });
    };

    const handleSaveEdit = (id) => {
        updateRoopathaExecutive(id, editForm);
        setEditingId(null);
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to remove this executive?")) {
            deleteRoopathaExecutive(id);
        }
    };

    const handleImageUpload = (e, isEdit = false) => {
        const file = e.target.files[0];
        if (file) {
            // Basic size check (skip if > 10MB just in case)
            if (file.size > 10 * 1024 * 1024) {
                alert("File size is too large (over 10MB). please choose a smaller image.");
                return;
            }

            const reader = new FileReader();
            reader.onload = (event) => {
                const img = document.createElement('img');
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    let width = img.width;
                    let height = img.height;
                    const MAX_WIDTH = 800;
                    const MAX_HEIGHT = 800;

                    if (width > height) {
                        if (width > MAX_WIDTH) {
                            height *= MAX_WIDTH / width;
                            width = MAX_WIDTH;
                        }
                    } else {
                        if (height > MAX_HEIGHT) {
                            width *= MAX_HEIGHT / height;
                            height = MAX_HEIGHT;
                        }
                    }

                    canvas.width = width;
                    canvas.height = height;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, width, height);

                    // Compress to JPEG at 70% quality
                    const dataUrl = canvas.toDataURL('image/jpeg', 0.7);

                    if (isEdit) {
                        setEditForm(prev => ({ ...prev, image: dataUrl }));
                    } else {
                        setNewForm(prev => ({ ...prev, image: dataUrl }));
                    }
                };
                img.src = event.target.result;
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAdd = async () => {
        if (!newForm.name || !newForm.position) {
            alert("Please enter Name and Position");
            return;
        }
        try {
            await addRoopathaExecutive(newForm);
            setNewForm({ name: '', position: '', image: '' });
            setUploadKey(prev => prev + 1); // Reset file input
            setIsAdding(false);
            alert("Executive Added Successfully!");
        } catch (error) {
            console.error("Error adding executive:", error);
            const errMsg = error.response?.data?.message || error.message || "Unknown error";
            alert(`Failed to add executive. Error: ${errMsg}`);
        }
    };

    return (
        <section className="py-5 position-relative">
            <Container>
                <div className="text-center mb-5 position-relative">
                    <h2 className="display-5 fw-bold text-primary mb-2">Roopatha Executives</h2>
                    <p className="text-muted lead">Leading the Syro-Malabar Youth Movement with Vision and Faith</p>
                    {isAdmin && (
                        <div className="position-absolute top-0 end-0">
                            <Button variant="primary" onClick={() => setIsAdding(!isAdding)}>
                                <Plus size={20} className="me-1" /> Add Executive
                            </Button>
                        </div>
                    )}
                </div>

                {/* Add New Form (Admin Only) */}
                {isAdmin && isAdding && (
                    <Card className="mb-4 shadow-sm border-primary slide-in-top">
                        <Card.Body>
                            <h5 className="mb-3 text-primary">Add New Executive</h5>
                            <Row className="align-items-end">
                                <Col md={3}>
                                    <Form.Group className="mb-2">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter Name"
                                            value={newForm.name}
                                            onChange={(e) => setNewForm({ ...newForm, name: e.target.value })}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={3}>
                                    <Form.Group className="mb-2">
                                        <Form.Label>Position</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter Position"
                                            value={newForm.position}
                                            onChange={(e) => setNewForm({ ...newForm, position: e.target.value })}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={4}>
                                    <Form.Group className="mb-2">
                                        <Form.Label>Image Upload</Form.Label>
                                        <Form.Control
                                            key={uploadKey}
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => handleImageUpload(e, false)}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={2} className="mb-2">
                                    <Button variant="success" className="w-100" onClick={handleAdd}>Save</Button>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                )}



                <Row className="g-4 justify-content-center">
                    {roopathaExecutives.length === 0 && (
                        <Col xs={12} className="text-center">
                            <p className="text-muted">No executives data found. Please check your network connection or try refreshing the page.</p>
                        </Col>
                    )}
                    {roopathaExecutives.map((exec) => (
                        <Col key={exec.id} xs={12} sm={6} md={4} lg={3}>
                            <Card className={`h-100 border-0 shadow-sm hover-card text-center pb-3 ${editingId === exec.id ? 'border border-warning' : ''}`}>

                                {/* Admin Controls Overlay */}
                                {isAdmin && editingId !== exec.id && (
                                    <div className="position-absolute top-0 end-0 p-2">
                                        <Button variant="light" size="sm" className="me-1 shadow-sm text-primary" onClick={() => handleEditClick(exec)}>
                                            <Pencil size={14} />
                                        </Button>
                                        <Button variant="light" size="sm" className="shadow-sm text-danger" onClick={() => handleDelete(exec.id)}>
                                            <Trash size={14} />
                                        </Button>
                                    </div>
                                )}

                                <div className="pt-4 pb-3">
                                    <div className="mx-auto" style={{ width: '120px', height: '120px', borderRadius: '50%', overflow: 'hidden', border: '4px solid #fff', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
                                        <Image
                                            src={exec.image || memberPlaceholder}
                                            alt={exec.name}
                                            fluid
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        />
                                    </div>
                                </div>
                                <Card.Body className="d-flex flex-column">
                                    {editingId === exec.id ? (
                                        // Edit Mode Inputs
                                        <div className="d-flex flex-column gap-2">
                                            <Form.Control
                                                size="sm"
                                                placeholder="Name"
                                                value={editForm.name}
                                                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                                            />
                                            <Form.Control
                                                size="sm"
                                                placeholder="Position"
                                                value={editForm.position}
                                                onChange={(e) => setEditForm({ ...editForm, position: e.target.value })}
                                            />
                                            <Form.Control
                                                size="sm"
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => handleImageUpload(e, true)}
                                            />
                                            <div className="d-flex justify-content-center gap-2 mt-2">
                                                <Button size="sm" variant="success" onClick={() => handleSaveEdit(exec.id)}><Save size={14} /></Button>
                                                <Button size="sm" variant="secondary" onClick={() => setEditingId(null)}><X size={14} /></Button>
                                            </div>
                                        </div>
                                    ) : (
                                        // View Mode
                                        <>
                                            <h5 className="card-title fw-bold mb-1">{exec.name}</h5>
                                            <p className="card-text text-primary fw-medium mb-0">{exec.position}</p>
                                        </>
                                    )}
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>

            <style>
                {`
                .hover-card {
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                }
                .hover-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 10px 20px rgba(0,0,0,0.15) !important;
                }
                .slide-in-top {
                    animation: slide-in-top 0.4s ease-out both;
                }
                @keyframes slide-in-top {
                    0% {
                        transform: translateY(-20px);
                        opacity: 0;
                    }
                    100% {
                        transform: translateY(0);
                        opacity: 1;
                    }
                }
                `}
            </style>
        </section>
    );
}

export default RoopathaExecutives;
