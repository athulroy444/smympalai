import React, { useState } from 'react';
import { Container, Table, Button, Modal, Form, Badge } from 'react-bootstrap';
import { Calendar, Pencil, Trash, Plus, Newspaper, ArrowLeft } from 'react-bootstrap-icons';
import { useData } from '../context/DataContext';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../components/common/PageHeader';

function AdminNews() {
    const { news, eventsList, addNews, updateNews, deleteNews, addEvent, updateEvent, deleteEvent, loading } = useData();
    const navigate = useNavigate();

    const [showModal, setShowModal] = useState(false);
    const [modalMode, setModalMode] = useState('add');
    const [itemType, setItemType] = useState('news');
    const [currentId, setCurrentId] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        event_date: '',
        description: '',
        location: '',
        image_url: ''
    });

    const combinedList = [
        ...news.map(n => ({ ...n, type: 'news' })),
        ...eventsList.map(e => ({ ...e, type: 'event' }))
    ].sort((a, b) => new Date(b.event_date || 0) - new Date(a.event_date || 0));

    const handleAdd = (type) => {
        setModalMode('add');
        setItemType(type);
        setFormData({ title: '', event_date: '', description: '', location: '', image_url: '' });
        setShowModal(true);
    };

    const handleEdit = (item) => {
        setModalMode('edit');
        setItemType(item.type);
        setCurrentId(item.id);
        setFormData({
            title: item.title,
            event_date: item.event_date ? item.event_date.split('T')[0] : '',
            description: item.description || '',
            location: item.location || '',
            image_url: item.image_url || ''
        });
        setShowModal(true);
    };

    const handleDelete = (id, type) => {
        if (window.confirm(`Are you sure you want to delete this ${type}?`)) {
            if (type === 'news') deleteNews(id);
            else deleteEvent(id);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (modalMode === 'add') {
                if (itemType === 'news') await addNews(formData);
                else await addEvent({ title: formData.title, event_date: formData.event_date, location: formData.location });
            } else {
                if (itemType === 'news') await updateNews(currentId, formData);
                else await updateEvent(currentId, { title: formData.title, event_date: formData.event_date, location: formData.location });
            }
            setShowModal(false);
        } catch (err) {
            alert("Error saving item");
        }
    };

    return (
        <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
            <PageHeader
                title="News & Updates"
                subtitle="Manage home page news and upcoming events."
            />

            <Container className="mt-n4">
                <div className="d-flex justify-content-between align-items-center mb-4 p-3 bg-white shadow-sm rounded-4">
                    <Button variant="outline-dark" onClick={() => navigate('/admin-dashboard')} className="rounded-pill">
                        <ArrowLeft className="me-2" /> Back to Dashboard
                    </Button>
                    <div>
                        <Button variant="primary" onClick={() => handleAdd('news')} className="me-2 rounded-pill px-4">
                            <Plus size={20} /> Add News
                        </Button>
                        <Button variant="success" onClick={() => handleAdd('event')} className="rounded-pill px-4">
                            <Plus size={20} /> Add Event
                        </Button>
                    </div>
                </div>

                <div className="bg-white shadow-sm rounded-4 overflow-hidden">
                    <Table responsive hover className="mb-0 align-middle">
                        <thead className="bg-light">
                            <tr>
                                <th className="ps-4">Type</th>
                                <th>Title</th>
                                <th>Date</th>
                                <th>Details</th>
                                <th className="text-end pe-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {combinedList.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="text-center py-5 text-muted">No items found. Add some news or events!</td>
                                </tr>
                            ) : (
                                combinedList.map((item) => (
                                    <tr key={`${item.type}-${item.id}`}>
                                        <td className="ps-4">
                                            <Badge bg={item.type === 'news' ? 'info' : 'warning'} className="text-capitalize">
                                                {item.type}
                                            </Badge>
                                        </td>
                                        <td className="fw-bold">{item.title}</td>
                                        <td>
                                            <div className="d-flex align-items-center">
                                                <Calendar size={14} className="me-2 text-muted" />
                                                {item.event_date ? new Date(item.event_date).toLocaleDateString() : 'N/A'}
                                            </div>
                                        </td>
                                        <td className="small text-muted">
                                            {item.type === 'news' ?
                                                (item.description?.substring(0, 50) + '...') :
                                                item.location}
                                        </td>
                                        <td className="text-end pe-4">
                                            <Button variant="outline-primary" size="sm" className="me-2 border-0" onClick={() => handleEdit(item)}>
                                                <Pencil size={14} />
                                            </Button>
                                            <Button variant="outline-danger" size="sm" className="border-0" onClick={() => handleDelete(item.id, item.type)}>
                                                <Trash size={14} />
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </Table>
                </div>
            </Container>

            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Form onSubmit={handleSubmit}>
                    <Modal.Header closeButton className="border-0">
                        <Modal.Title className="fw-bold">
                            {modalMode === 'add' ? `Add ${itemType === 'news' ? 'News' : 'Event'}` : 'Edit Item'}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="px-4">
                        <Form.Group className="mb-3">
                            <Form.Label className="small fw-bold text-muted text-uppercase">Title</Form.Label>
                            <Form.Control
                                type="text"
                                required
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                className="rounded-3"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label className="small fw-bold text-muted text-uppercase">Date</Form.Label>
                            <Form.Control
                                type="date"
                                required
                                value={formData.event_date}
                                onChange={(e) => setFormData({ ...formData, event_date: e.target.value })}
                                className="rounded-3"
                            />
                        </Form.Group>
                        {itemType === 'news' ? (
                            <Form.Group className="mb-3">
                                <Form.Label className="small fw-bold text-muted text-uppercase">Description</Form.Label>
                                <Form.Control
                                    as="textarea" rows={4}
                                    required
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="rounded-3"
                                />
                            </Form.Group>
                        ) : (
                            <Form.Group className="mb-3">
                                <Form.Label className="small fw-bold text-muted text-uppercase">Location</Form.Label>
                                <Form.Control
                                    type="text"
                                    required
                                    value={formData.location}
                                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                    className="rounded-3"
                                />
                            </Form.Group>
                        )}

                        <Form.Group className="mb-3">
                            <Form.Label className="small fw-bold text-muted text-uppercase">Image URL</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Paste image link (e.g. https://...)"
                                value={formData.image_url}
                                onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                                className="rounded-3"
                            />
                            <Form.Text className="text-muted small">Leave blank to use default logo.</Form.Text>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer className="border-0 px-4 pb-4">
                        <Button variant="light" onClick={() => setShowModal(false)} className="rounded-pill px-4">Cancel</Button>
                        <Button variant="primary" type="submit" className="rounded-pill px-4">
                            {modalMode === 'add' ? 'Add Item' : 'Save Changes'}
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </div>
    );
}

export default AdminNews;
