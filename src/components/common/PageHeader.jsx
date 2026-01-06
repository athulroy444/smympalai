import Container from 'react-bootstrap/Container';

function PageHeader({ title, subtitle }) {
    return (
        <div style={{ backgroundColor: '#F8F8F8', padding: '60px 0', borderBottom: '1px solid #eee' }}>
            <Container>
                <h1 className="fw-bold mb-2" style={{ color: '#1A1A1A' }}>{title}</h1>
                {subtitle && <p className="text-secondary mb-0 lead">{subtitle}</p>}
            </Container>
        </div>
    );
}

export default PageHeader;
