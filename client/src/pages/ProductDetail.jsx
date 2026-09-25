import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getWatchBySlug, submitEnquiry } from '../api/watches';
import './ProductDetail.css';

function ProductDetail() {
  const { slug } = useParams();

  const [watch, setWatch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Modal open/close state
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitName, setSubmitName] = useState('');
  const [formLoading, setFormLoading] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [formError, setFormError] = useState('');

  useEffect(() => {
    const fetchWatch = async () => {
      setLoading(true);
      try {
        const data = await getWatchBySlug(slug);
        setWatch(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWatch();
  }, [slug]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    setFormError('');

    try {
      await submitEnquiry({
        name,
        email,
        message,
        watch: watch?.name || slug,
      });

      setSubmitName(name);
      setFormSuccess(true);
      setName('');
      setEmail('');
      setMessage('');
    } catch (err) {
      setFormError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setFormLoading(false);
    }
  };

  if (loading) return <p className="detail-status">Loading...</p>;
  if (error) return <p className="detail-status">{error}</p>;
  if (!watch) return null;

  return (
    <div className="product-detail-page">
      <img src={watch.images.hero} alt={watch.name} className="detail-image" />

      <h1 className="detail-name">{watch.name}</h1>
      <p className="detail-subtitle">{watch.subtitle}</p>
      <p className="detail-description">{watch.description}</p>

      <table className="specs-table">
        <tbody>
          <tr>
            <td>Case Size</td>
            <td>{watch.specs.caseSize}</td>
          </tr>
          <tr>
            <td>Movement</td>
            <td>{watch.specs.movement}</td>
          </tr>
          <tr>
            <td>Water Resistance</td>
            <td>{watch.specs.waterResistance}</td>
          </tr>
          <tr>
            <td>Material</td>
            <td>{watch.specs.material}</td>
          </tr>
          <tr>
            <td>Strap</td>
            <td>{watch.specs.strap}</td>
          </tr>
        </tbody>
      </table>

      <div className="reserve-cta">
        <button
          className="reserve-cta-btn"
          onClick={() => {
            setFormSuccess(false);
            setFormError('');
            setIsModalOpen(true);
          }}
        >
          Reserve a Consultation
        </button>
      </div>

      {isModalOpen && (
        <div
          onClick={() => setIsModalOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
            backdropFilter: 'blur(6px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '20px',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'relative',
              backgroundColor: '#0c0c0c',
              border: '1px solid rgba(223, 186, 115, 0.4)',
              padding: '36px 30px',
              maxWidth: '460px',
              width: '100%',
              borderRadius: '2px',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.9)',
            }}
          >
            <button
              onClick={() => setIsModalOpen(false)}
              aria-label="Close"
              style={{
                position: 'absolute',
                top: '14px',
                right: '18px',
                background: 'transparent',
                border: 'none',
                color: '#dfba73',
                fontSize: '20px',
                cursor: 'pointer',
              }}
            >
              ✕
            </button>

            {formSuccess ? (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <h3 style={{ color: '#dfba73', fontFamily: 'serif', marginBottom: '10px' }}>
                  Consultation Requested
                </h3>
                <p style={{ color: '#a1a1aa', fontSize: '0.9rem', lineHeight: '1.6' }}>
                  Thank you, {submitName || 'Client'}. Our specialist will contact you shortly regarding the {watch.name}.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <h3 style={{ fontFamily: 'serif', color: '#fff', fontSize: '1.3rem', margin: 0 }}>
                  Reserve — {watch.name}
                </h3>

                {formError && (
                  <p style={{ color: '#e11d48', fontSize: '0.85rem', margin: 0 }}>
                    {formError}
                  </p>
                )}

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#a1a1aa' }}>
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    style={{ background: '#111', border: '1px solid #333', color: '#fff', padding: '10px', outline: 'none' }}
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#a1a1aa' }}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{ background: '#111', border: '1px solid #333', color: '#fff', padding: '10px', outline: 'none' }}
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#a1a1aa' }}>
                    Inquiry / Preferences
                  </label>
                  <textarea
                    rows="3"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    style={{ background: '#111', border: '1px solid #333', color: '#fff', padding: '10px', outline: 'none', resize: 'vertical' }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={formLoading}
                  style={{
                    background: formLoading ? '#333' : '#dfba73',
                    color: '#000',
                    border: 'none',
                    padding: '12px',
                    fontWeight: 600,
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    cursor: formLoading ? 'not-allowed' : 'pointer',
                    marginTop: '8px',
                  }}
                >
                  {formLoading ? 'Transmitting...' : 'Submit Request'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetail;


