import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';
import { Calendar, ArrowRight, Plus, Pencil, Trash, GeoAlt, CloudUpload } from 'react-bootstrap-icons';
import cardImage from '../../assets/NavLogo.png';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { useState } from 'react';

function NewsSection() {
  const { news, eventsList, addNews, updateNews, deleteNews, addEvent, updateEvent, deleteEvent, uploadImage, API_BASE } = useData();
  const { user } = useAuth();
  const isAdmin = user && user.role === 'admin';

  // --- MERGE LISTS ---
  const combinedList = [
    ...news.map(n => ({ ...n, type: 'news' })),
    ...eventsList.map(e => ({ ...e, type: 'event' }))
  ].sort((a, b) => new Date(b.event_date || 0) - new Date(a.event_date || 0));

  // --- STATE ---
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [itemType, setItemType] = useState('news');
  const [currentId, setCurrentId] = useState(null);
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    event_date: '',
    description: '',
    location: '',
    image_url: ''
  });

  const truncate = (str, n) => {
    return (str?.length > n) ? str.substr(0, n - 1) + '...' : str;
  };

  const getImageUrl = (url) => {
    if (!url) return cardImage;
    if (url.startsWith('http')) return url;
    return `${API_BASE}${url}`;
  };

  const handleAddNew = () => {
    setModalMode('add');
    setItemType('news');
    setFormData({ title: '', event_date: '', description: '', location: '', image_url: '' });
    setShowModal(true);
  };

  const handleDelete = (id, type) => {
    if (window.confirm(`Delete this ${type}?`)) {
      if (type === 'news') deleteNews(id);
      else deleteEvent(id);
    }
  };

  const handleEdit = (item) => {
    setModalMode('edit');
    setItemType(item.type);
    setCurrentId(item.id);
    setFormData({
      title: item.title || '',
      event_date: item.event_date ? item.event_date.split('T')[0] : '',
      description: item.description || '',
      location: item.location || '',
      image_url: item.image_url || ''
    });
    setShowModal(true);
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const url = await uploadImage(file);
    if (url) {
      setFormData(prev => ({ ...prev, image_url: url }));
    } else {
      alert("Upload failed");
    }
    setUploading(false);
  };

  const handleSubmit = () => {
    if (modalMode === 'add') {
      if (itemType === 'news') addNews(formData);
      else addEvent(formData);
    } else {
      if (itemType === 'news') updateNews(currentId, formData);
      else updateEvent(currentId, formData);
    }
    setShowModal(false);
  };

  return (
    <div className="section-padding" style={{ backgroundColor: '#ffffff' }}>
      <Container>
        <div className="text-center mb-5 pb-4 position-relative">
          <span className="section-subtitle">Stay Updated</span>
          <h2 className="section-title">Latest News & Events</h2>
          <div style={{ width: '80px', height: '4px', background: 'var(--primary)', margin: '0 auto' }}></div>

          {isAdmin && (
            <div className="mt-4">
              <button className="btn-premium" onClick={handleAddNew}>
                <Plus size={24} /> Post New Update
              </button>
            </div>
          )}
        </div>

        <Row className="g-4">
          {combinedList.length === 0 ? (
            <div className="text-center w-100 py-5">
              <div className="glass-card p-5 d-inline-block">
                <Spinner animation="grow" variant="primary" className="mb-3" />
                <p className="text-muted">Waiting for exciting updates...</p>
              </div>
            </div>
          ) : (
            combinedList.slice(0, 4).map((item) => (
              <Col key={`${item.type}-${item.id}`} lg={3} md={6}>
                <div className="news-card h-100 position-relative">
                  {isAdmin && (
                    <div className="position-absolute top-0 end-0 p-3 z-3 d-flex gap-2">
                      <button className="btn btn-sm btn-white glass-card border-0 p-2" onClick={() => handleEdit(item)}>
                        <Pencil size={14} className="text-primary" />
                      </button>
                      <button className="btn btn-sm btn-white glass-card border-0 p-2" onClick={() => handleDelete(item.id, item.type)}>
                        <Trash size={14} className="text-danger" />
                      </button>
                    </div>
                  )}

                  <div className="news-img-box">
                    <img
                      src={getImageUrl(item.image_url)}
                      alt={item.title}
                      className="news-img w-100 h-100 object-fit-cover"
                    />
                    <div className="position-absolute bottom-0 start-0 p-3 w-100">
                      <span className={`badge ${item.type === 'news' ? 'bg-primary' : 'bg-dark'} px-3 py-2 rounded-pill shadow-sm`}>
                        {item.type === 'news' ? 'NEWS' : 'EVENT'}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 d-flex flex-column h-100">
                    <div className="d-flex align-items-center mb-3 text-muted small fw-600">
                      <Calendar size={14} className="me-2 text-primary" />
                      {item.event_date ? new Date(item.event_date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Upcoming'}
                    </div>

                    <h5 className="fw-bold mb-3 text-dark" style={{ lineHeight: '1.4' }}>{item.title}</h5>

                    <div className="text-muted small mb-4 flex-grow-1" style={{ opacity: 0.8 }}>
                      {item.type === 'news' ? truncate(item.description, 90) : (
                        <div className="d-flex align-items-center">
                          <GeoAlt className="me-2 text-primary" />
                          <span className="text-truncate">{item.location}</span>
                        </div>
                      )}
                    </div>

                    <a href="#" className="btn-outline-premium btn-sm text-center text-decoration-none mt-auto">
                      View Details <ArrowRight size={14} className="ms-1" />
                    </a>
                  </div>
                </div>
              </Col>
            ))
          )}
        </Row>

        <div className="text-center mt-5">
          <button className="btn-premium btn-lg">Explore All Updates</button>
        </div>

        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title className="fw-bold">{modalMode === 'add' ? 'Add Update' : 'Edit Update'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              {modalMode === 'add' && (
                <Form.Group className="mb-3">
                  <Form.Label className="small fw-bold">Type</Form.Label>
                  <Form.Select value={itemType} onChange={(e) => setItemType(e.target.value)}>
                    <option value="news">News Update</option>
                    <option value="event">Upcoming Event</option>
                  </Form.Select>
                </Form.Group>
              )}

              <Form.Group className="mb-3">
                <Form.Label className="small fw-bold">Title</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Enter title"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="small fw-bold">Date</Form.Label>
                <Form.Control
                  type="date"
                  value={formData.event_date}
                  onChange={(e) => setFormData({ ...formData, event_date: e.target.value })}
                />
              </Form.Group>

              {itemType === 'news' && (
                <Form.Group className="mb-3">
                  <Form.Label className="small fw-bold">Description</Form.Label>
                  <Form.Control
                    as="textarea" rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </Form.Group>
              )}

              {itemType === 'event' && (
                <Form.Group className="mb-3">
                  <Form.Label className="small fw-bold">Location</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="Event location"
                  />
                </Form.Group>
              )}

              <Form.Group className="mb-3">
                <Form.Label className="small fw-bold">Image Cover</Form.Label>

                {formData.image_url && (
                  <div className="mb-2">
                    <img src={getImageUrl(formData.image_url)} className="rounded w-100" style={{ height: '120px', objectFit: 'cover' }} alt="Preview" />
                  </div>
                )}

                <div className="d-grid mt-2">
                  <input
                    type="file"
                    id="newsImgHome"
                    hidden
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={() => document.getElementById('newsImgHome').click()}
                    disabled={uploading}
                  >
                    {uploading ? <Spinner animation="border" size="sm" /> : <><CloudUpload className="me-2" /> Browse File</>}
                  </Button>
                </div>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="small fw-bold text-muted">Or Image URL</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="https://..."
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
            <Button variant="primary" onClick={handleSubmit} disabled={uploading}>Save Changes</Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
}

export default NewsSection;