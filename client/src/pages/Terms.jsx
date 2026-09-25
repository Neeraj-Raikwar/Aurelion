
function Terms() {
  const sections = [
    {
      num: '01',
      title: 'Atelier Consultation Protocol',
      desc: 'Submitting an enquiry or booking a consultation initiates a direct dialogue with Atelier Aurelion. It confirms your consent to receive confidential correspondence regarding piece availability, private showings, and bespoke craftsmanship.',
    },
    {
      num: '02',
      title: 'Timepiece Allocations & Commissions',
      desc: 'Due to the rigorous hand-finishing and limited annual production of Aurelion horological movements, submitting an expression of interest does not guarantee piece allocation until confirmed formally by our master horologist.',
    },
    {
      num: '03',
      title: 'Intellectual Property & Heritage',
      desc: 'All mechanical designs, horological blueprints, insignia, celestial motifs, and multimedia assets featured across this platform are the exclusive intellectual property of Atelier Aurelion Horlogerie.',
    },
    {
      num: '04',
      title: 'Discretion & Sovereign Jurisdiction',
      desc: 'All consultations, bespoke commissions, and acquisition agreements adhere strictly to Swiss luxury manufacturing standards and are subject to the sovereign jurisdiction of the Atelier registry.',
    },
  ];

  return (
    <main
      style={{
        backgroundColor: '#050505',
        color: '#E0E0E0',
        minHeight: '100vh',
        padding: '160px 24px 120px',
        fontFamily: "'Cinzel', 'Playfair Display', serif, sans-serif",
      }}
    >
      <div style={{ maxWidth: '840px', margin: '0 auto' }}>
        {/* Header Tag */}
        <p
          style={{
            fontSize: '11px',
            textTransform: 'uppercase',
            letterSpacing: '0.35em',
            color: '#dfba73',
            marginBottom: '16px',
            fontWeight: 500,
          }}
        >
          Legal & Atelier Standards
        </p>

        {/* Main Title */}
        <h1
          style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 400,
            letterSpacing: '0.08em',
            color: '#F4F4F4',
            margin: '0 0 20px 0',
            lineHeight: 1.2,
          }}
        >
          Terms of Service
        </h1>

        {/* Accent Golden Line */}
        <div
          style={{
            width: '60px',
            height: '1px',
            background: 'linear-gradient(90deg, #dfba73, transparent)',
            marginBottom: '40px',
          }}
        />

        {/* Intro */}
        <p
          style={{
            fontSize: '16px',
            lineHeight: '1.9',
            color: '#A0A0A0',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            fontWeight: 300,
            marginBottom: '64px',
            maxWidth: '720px',
          }}
        >
          Accessing the Aurelion digital atelier implies adherence to the bespoke standards
          and ethical craftsmanship tenets established across our horological legacy.
        </p>

        {/* Sections Grid */}
        <div
          style={{
            display: 'grid',
            gap: '36px',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            paddingTop: '48px',
          }}
        >
          {sections.map((item) => (
            <div
              key={item.num}
              style={{
                display: 'grid',
                gridTemplateColumns: '60px 1fr',
                gap: '24px',
                alignItems: 'baseline',
              }}
            >
              <span
                style={{
                  fontSize: '12px',
                  letterSpacing: '0.2em',
                  color: '#dfba73',
                  fontFamily: 'monospace',
                }}
              >
                {item.num}
              </span>

              <div>
                <h2
                  style={{
                    fontSize: '17px',
                    fontWeight: 500,
                    letterSpacing: '0.06em',
                    color: '#FFFFFF',
                    margin: '0 0 10px 0',
                  }}
                >
                  {item.title}
                </h2>
                <p
                  style={{
                    fontSize: '14px',
                    lineHeight: '1.8',
                    color: '#8E8E8E',
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                    margin: 0,
                    fontWeight: 300,
                  }}
                >
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Legal Concierge Card */}
        <div
          style={{
            marginTop: '80px',
            padding: '28px 32px',
            backgroundColor: '#0c0c0c',
            border: '1px solid rgba(223, 186, 115, 0.2)',
            borderRadius: '2px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          <div>
            <h4
              style={{
                margin: '0 0 6px',
                fontSize: '14px',
                letterSpacing: '0.05em',
                color: '#FFFFFF',
              }}
            >
              Horological Governance
            </h4>
            <p
              style={{
                margin: 0,
                fontSize: '13px',
                color: '#777',
                fontFamily: 'system-ui, -apple-system, sans-serif',
              }}
            >
              For formal contracts or corporate acquisition guidelines, consult legal affairs.
            </p>
          </div>

          <a
            href="mailto:atelier@aurelion.com"
            style={{
              color: '#dfba73',
              fontSize: '12px',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              borderBottom: '1px solid rgba(223, 186, 115, 0.4)',
              paddingBottom: '2px',
            }}
          >
            atelier@aurelion.com
          </a>
        </div>
      </div>
    </main>
  );
}

export default Terms;
