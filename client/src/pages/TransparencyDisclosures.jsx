import React from "react";
import PageHero from "../components/PageHero";
import CTASection from "../components/CTASection";

const TransparencyDisclosures = () => {
  return (
    <div className="lg-page">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,500;0,9..144,600;1,9..144,500&family=Inter:wght@400;500;600&display=swap');

        .lg-page {
          --primary:#073B2A; --secondary:#0B6045; --accent:#D4AF37; --bg:#F5F8F6;
          --ivory:#FBF8F1; --text:#17231E; --muted:#5B6B63; --deep:#04241A;
          background:var(--bg); color:var(--text); overflow-x:hidden;
          font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;
        }
        .lg-page h2,.lg-page h3 { font-family:'Fraunces',Georgia,serif; margin:0; }
        .lg-page .wrap { max-width:920px; margin:0 auto; }
        .lg-page section.sec { padding:90px 5%; position:relative; }

        .legal-content-card {
          background:#fff; border:1px solid rgba(7,59,42,.12); border-radius:28px; padding:54px;
          box-shadow:0 18px 40px rgba(7,59,42,.05); position:relative; overflow:hidden;
        }
        .legal-content-card::before { content:''; position:absolute; top:0; left:0; right:0; height:4px; background:var(--accent); }

        .last-updated {
          font-family:'Fraunces',serif; font-style:italic; font-size:13px; color:var(--accent); font-weight:600;
          letter-spacing:.05em; margin-bottom:28px; display:block; text-transform:uppercase;
        }

        .legal-h2 { font-size:24px; font-weight:600; color:var(--primary); margin:36px 0 14px 0; }
        .legal-p { font-size:15.5px; color:var(--muted); line-height:1.75; margin-bottom:18px; max-width:68ch; }
        .legal-p strong { color:var(--text); }

        @media (max-width:600px) {
          .lg-page section.sec { padding:64px 6%; }
          .legal-content-card { padding:32px 22px; }
        }
      `}</style>

      <PageHero
        title="Transparency & Disclosures"
        subtitle="Our commitment to open communication, fair practices, and clear client relationship standards."
        badge="TRANSPARENCY POLICY"
        breadcrumbs={[
          { label: "Trust & Compliance", path: "/trust-compliance" },
          { label: "Transparency" },
        ]}
      />

      <section className="sec">
        <div className="wrap">
          <div className="legal-content-card">
            <span className="last-updated">LAST UPDATED: SEPTEMBER 2026</span>

            <p className="legal-p">
              At INVESTNOW FINANCIAL SERVICES PRIVATE LIMITED, transparency is one of our fundamental core values. We strive to provide clear, accessible, and accurate information regarding all service offerings.
            </p>

            <h2 className="legal-h2">1. Intermediary Disclosure</h2>
            <p className="legal-p">
              INVESTNOW operates as an independent financial consultancy firm. We coordinate between clients and authorized financial institutions, fund houses, banks, and insurance providers. As an intermediary, commission or brokerage arrangements may apply in accordance with industry standards.
            </p>

            <h2 className="legal-h2">2. Clear Communication</h2>
            <p className="legal-p">
              We ensure that clients receive complete details regarding product features, lock-in periods, surrender charges, potential market risks, and loan processing fees prior to finalizing decisions.
            </p>

            <h2 className="legal-h2">3. Conflict of Interest Policy</h2>
            <p className="legal-p">
              Our consultants prioritize client goals and objective suitability when recommending financial options. We do not promote products that contradict a client's stated risk profile or monetary capacity.
            </p>

            <h2 className="legal-h2">4. Client Verification & Feedback</h2>
            <p className="legal-p">
              Clients are encouraged to verify all policy documentation, bond certificates, and loan agreements directly with the respective issuing institutions.
            </p>
          </div>
        </div>
      </section>

      <CTASection
        title="Want to Learn More About Our Standards?"
        primaryBtnText="Contact Support"
        primaryBtnLink="/contact"
      />
    </div>
  );
};

export default TransparencyDisclosures;
