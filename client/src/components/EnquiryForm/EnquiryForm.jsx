// Step 1: React se useState aur API function ko import kiya
import { useState } from 'react';
import { submitEnquiry } from '../../api/watches';

function EnquiryForm({ watchName }) {
  // Step 2: Form ke teeno inputs ke liye controlled state banayi
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  // Form submit hone ke baad user ka naam yaad rakhne ke liye state
  const [submitName, setSubmitName] = useState('');

  // Request flow ko handle karne ke states (loading status, success status, error text)
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  // Step 3: Form submit hone par chalne wala function
  const handleSubmit = async (e) => {
    // Browser ka default page-reload behavior roka
    e.preventDefault();

    // Request start: loading true kiya aur purana error saaf kiya
    setLoading(true);
    setError('');

    try {
      // Backend POST endpoint par data bheja
      await submitEnquiry({
        name,
        email,
        message,
        watch: watchName // Pata chal sake kis watch ke page se form submit hua
      });

      // Name ko submitName state me store kiya taaki screen pe dikha sakein
      setSubmitName(name);

      // Agar call successfully chali gayi toh success flag on kiya
      setSuccess(true);

      // Inputs ko clean/empty kiya
      setName('');
      setEmail('');
      setMessage('');
    } catch (err) {
      // Agar backend se error aaye toh state me save kiya taaki UI pe dikhe
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      // Chahe success ho ya fail, loading stop kiya
      setLoading(false);
    }
  };

  // Step 4: Submission successful hone par form ki jagah confirmation message
  if (success) {
    return (
      <div className="enquiry-success" style={{ textAlign: 'center', padding: '30px 20px', border: '1px solid #d4af37' }}>
        <h3 style={{ color: '#d4af37', fontFamily: 'serif', marginBottom: '10px' }}>Consultation Requested</h3>
        <p style={{ color: '#a1a1aa', fontSize: '0.9rem', lineHeight: '1.6' }}>
          Thank you, {submitName || 'Client'}. Our horology specialist will be in touch with you shortly regarding the {watchName || 'timepiece'}.
        </p>
      </div>
    );
  }

  // Step 5: Normal Form View (Jab tak submit na hua ho)
  return (
    <form className="enquiry-form" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '450px' }}>
      <h3 style={{ fontFamily: 'serif', color: '#fff', fontSize: '1.4rem', margin: 0 }}>
        Reserve a Consultation
      </h3>

      {/* Agar koi error aaya toh red text dikhega */}
      {error && (
        <p style={{ color: '#e11d48', fontSize: '0.85rem', margin: 0 }}>
          {error}
        </p>
      )}

      {/* Name Field */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <label style={{ fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#a1a1aa' }}>
          Full Name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{
            background: '#111',
            border: '1px solid #333',
            color: '#fff',
            padding: '10px',
            outline: 'none'
          }}
        />
      </div>

      {/* Email Field */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <label style={{ fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#a1a1aa' }}>
          Email Address
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{
            background: '#111',
            border: '1px solid #333',
            color: '#fff',
            padding: '10px',
            outline: 'none'
          }}
        />
      </div>

      {/* Message Field */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <label style={{ fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#a1a1aa' }}>
          Inquiry / Preferences
        </label>
        <textarea
          rows="4"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          style={{
            background: '#111',
            border: '1px solid #333',
            color: '#fff',
            padding: '10px',
            outline: 'none',
            resize: 'vertical'
          }}
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        style={{
          background: loading ? '#333' : '#d4af37',
          color: '#000',
          border: 'none',
          padding: '12px',
          fontWeight: 600,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          cursor: loading ? 'not-allowed' : 'pointer',
          marginTop: '8px'
        }}
      >
        {loading ? 'Transmitting...' : 'Submit Request'}
      </button>
    </form>
  );
}

export default EnquiryForm;
