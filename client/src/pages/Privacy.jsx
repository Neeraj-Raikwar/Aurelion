
function Privacy() {
  const sections = [
    {
      num: '01',
      title: 'Information We Collect',
      desc: 'When you request a private consultation or commission an Aurelion timepiece, we collect your name, email address, phone number, and specific horological preferences solely to curate your bespoke acquisition experience.',
    },
    {
      num: '02',
      title: 'Discretion & Data Stewardship',
      desc: 'Atelier Aurelion operates with absolute discretion. We do not sell, rent, or trade your personal dossiers to external parties or third-party advertisers. All information remains strictly within our secure atelier archives.',
    },
    {
      num: '03',
      title: 'Concierge Communications',
      desc: 'Your contact credentials are utilized exclusively by our horology specialists to facilitate private showings, status reports on timepiece reservations, and pertinent craftsmanship updates.',
    },
    {
      num: '04',
      title: 'Digital Security',
      desc: 'All data transmissions are safeguarded using enterprise-grade cryptographic standards. Access to acquisition records is restricted strictly to authorized atelier personnel.',
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
        {/* Subtle Header Tag */}
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
          Legal & Atelier Discretion
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
          Privacy Policy
        </h1>

        {/* Accent Golden Rule */}
        <div
          style={{
            width: '60px',
            height: '1px',
            background: 'linear-gradient(90deg, #dfba73, transparent)',
            marginBottom: '40px',
          }}
        />

        {/* Intro Mission Statement */}
        <p
          style={{
            fontSize: '16px',
            lineHeight: '1.9',
            color: '#A0A0A0',
            fontFamily: "system-ui, -apple-system, sans-serif",
            fontWeight: 300,
            marginBottom: '64px',
            maxWidth: '720px',
          }}
        >
          At Aurelion, precision and privacy share equal distinction. Every interaction
          is treated with the profound confidentiality customary of high Swiss horology.
        </p>

        {/* Policy Sections Grid */}
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
                    fontFamily: "system-ui, -apple-system, sans-serif",
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

        {/* Atelier Contact Footer Note */}
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
              Direct Privacy Inquiries
            </h4>
            <p
              style={{
                margin: 0,
                fontSize: '13px',
                color: '#777',
                fontFamily: "system-ui, -apple-system, sans-serif",
              }}
            >
              For record deletion or dossier questions, reach our concierge.
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

export default Privacy;
