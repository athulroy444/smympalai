import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { Calendar, ArrowRight, Plus, Pencil, Trash, GeoAlt } from 'react-bootstrap-icons';
import cardImage from '../../assets/NavLogo.png';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { useState } from 'react';

function NewsSection() {
  const { news, eventsList, addNews, updateNews, deleteNews, addEvent, deleteEvent } = useData();
  const { user } = useAuth();
  const isAdmin = user && user.role === 'admin';

  // --- MERGE LISTS ---
  // We want to show both News and Events in the same list
  const combinedList = [
    ...news.map(n => ({ ...n, type: 'news' })),
    ...eventsList.map(e => ({ ...e, type: 'event' }))
  ].sort((a, b) => new Date(b.event_date || 0) - new Date(a.event_date || 0)); // Sort by date desc

  // --- STATE FOR EDITING/ADDING ---
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add' or 'edit' (edit only for news demo)
  const [itemType, setItemType] = useState('news'); // 'news' or 'event'

  const [currentId, setCurrentId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    event_date: '',
    description: '',
    location: ''
  });

  // Limit content for display
  const truncate = (str, n) => {
    return (str?.length > n) ? str.substr(0, n - 1) + '...' : str;
  };

  // HANDLERS
  const handleAddNew = () => {
    setModalMode('add');
    setItemType('news');
    setFormData({ title: '', event_date: '', description: '', location: '' });
    setShowModal(true);
  };

  const handleDelete = (id, type) => {
    if (window.confirm(`Delete this ${type}?`)) {
      if (type === 'news') deleteNews(id);
      else deleteEvent(id);
    }
  };

  // Note: Edit currently implemented fully only for News in DataContext, 
  // but we can add Edit for events later. For now, we allow Adding both.
  const handleEdit = (item) => {
    // Basic edit support
    if (item.type === 'event') {
      alert("Editing events is coming soon. You can delete and re-add for now.");
      return;
    }
    setModalMode('edit');
    setItemType('news');
    setCurrentId(item.id);
    setFormData({
      title: item.title,
      event_date: item.event_date,
      description: item.description,
      location: ''
    });
    setShowModal(true);
  };

  const handleSubmit = () => {
    if (modalMode === 'add') {
      if (itemType === 'news') {
        addNews(formData);
      } else {
        addEvent({
          title: formData.title,
          event_date: formData.event_date,
          location: formData.location
        });
      }
    } else {
      if (itemType === 'news') updateNews(currentId, formData);
      // Event update not yet wired
    }
    setShowModal(false);
  };

  return (
    <div className="section-padding">
      <Container>
        <div className="text-center mb-5 position-relative">
          <h5 className="text-primary text-uppercase fw-bold mb-2">Updates</h5>
          <h2 className="mb-3">Latest News & Events</h2>
          <div style={{ width: '60px', height: '3px', background: '#E14B1F', margin: '0 auto' }}></div>

          {isAdmin && (
            <div className="position-absolute top-0 end-0">
              <Button variant="primary" onClick={handleAddNew}>
                <Plus size={20} className="me-1" /> Add Item
              </Button>
            </div>
          )}
        </div>

        <Row>
          {combinedList.length === 0 ? (
            <div className="text-center">No news or events found.</div>
          ) : (
            combinedList.slice(0, 4).map((item, idx) => (
              <Col key={`${item.type}-${item.id}`} lg={3} md={6} className="mb-4">
                <Card className="h-100 shadow-sm border-0 h-100-hover-effect position-relative">

                  {isAdmin && (
                    <div className="position-absolute top-0 end-0 p-2 z-1">
                      {item.type === 'news' && (
                        <Button variant="light" size="sm" className="me-1 shadow-sm text-primary" onClick={() => handleEdit(item)}>
                          <Pencil size={12} />
                        </Button>
                      )}
                      <Button variant="light" size="sm" className="shadow-sm text-danger" onClick={() => handleDelete(item.id, item.type)}>
                        <Trash size={12} />
                      </Button>
                    </div>
                  )}

                  <Card.Img
                    variant="top"
                    src={cardImage}
                    style={{ height: '200px', objectFit: 'contain', padding: '20px', backgroundColor: '#f9f9f9' }}
                  />
                  <Card.Body className="d-flex flex-column">
                    <div className="d-flex align-items-center mb-2 text-muted small">
                      <Calendar size={14} className="me-2 text-primary" />
                      {item.event_date ? new Date(item.event_date).toLocaleDateString() : 'Date TBD'}
                      {item.type === 'event' && <span className='ms-auto badge bg-warning text-dark'>Event</span>}
                      {item.type === 'news' && <span className='ms-auto badge bg-info'>News</span>}
                    </div>

                    <Card.Title className="fw-bold mb-3 fs-6">{item.title}</Card.Title>

                    <Card.Text className="text-secondary small mb-4 flex-grow-1">
                      {item.type === 'news' ? truncate(item.description, 100) : (
                        <span><GeoAlt className="me-1" /> {item.location}</span>
                      )}
                    </Card.Text>

                    <a href="#" className="text-primary fw-bold text-decoration-none small d-flex align-items-center">
                      Read More <ArrowRight className="ms-1" />
                    </a>
                  </Card.Body>
                </Card>
              </Col>
            )))}
        </Row>

        <div className="text-center mt-4">
          <Button variant="outline-primary" className="rounded-0">View All Updates</Button>
        </div>

        {/* ADMIN MODAL */}
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>{modalMode === 'add' ? 'Add Item' : 'Edit News'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              {modalMode === 'add' && (
                <Form.Group className="mb-3">
                  <Form.Label>Type</Form.Label>
                  <Form.Select value={itemType} onChange={(e) => setItemType(e.target.value)}>
                    <option value="news">News (General Update)</option>
                    <option value="event">Event (For Registration)</option>
                  </Form.Select>
                </Form.Group>
              )}

              <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Date</Form.Label>
                <Form.Control
                  type="date"
                  value={formData.event_date}
                  onChange={(e) => setFormData({ ...formData, event_date: e.target.value })}
                />
              </Form.Group>

              {itemType === 'news' && (
                <Form.Group className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea" rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </Form.Group>
              )}

              {itemType === 'event' && (
                <Form.Group className="mb-3">
                  <Form.Label>Location</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  />
                </Form.Group>
              )}
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
            <Button variant="primary" onClick={handleSubmit}>Save Changes</Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
}

export default NewsSection;