import Container from 'react-bootstrap/Container';
import { Envelope, Telephone, Facebook, Youtube, Instagram } from 'react-bootstrap-icons';

function TopBar() {
    return (
        <div className="py-2 text-white" style={{ backgroundColor: '#111', fontSize: '0.9rem' }}>
            <Container className="d-flex justify-content-between align-items-center">
                <div className="d-flex gap-3">
                    <span className="d-flex align-items-center gap-2">
                        <Envelope size={14} color="#E14B1F" /> smympalai@gmail.com
                    </span>
                    <span className="d-flex align-items-center gap-2">
                        <Telephone size={14} color="#E14B1F" /> +91 9876543210
                    </span>
                </div>
                <div className="d-flex gap-3">
                    <a href="#" className="text-white"><Facebook size={16} /></a>
                    <a href="#" className="text-white"><Instagram size={16} /></a>
                    <a href="#" className="text-white"><Youtube size={16} /></a>
                </div>
            </Container>
        </div>
    );
}

export default TopBar;
