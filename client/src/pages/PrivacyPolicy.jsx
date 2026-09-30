import React from "react";
import PageHero from "../components/PageHero";
import CTASection from "../components/CTASection";

const PrivacyPolicy = () => {
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
        title="Privacy Policy"
        subtitle="How we collect, protect, and handle client information responsibly."
        badge="DATA PRIVACY"
        breadcrumbs={[
          { label: "Trust & Compliance", path: "/trust-compliance" },
          { label: "Privacy Policy" },
        ]}
      />

      <section className="sec">
        <div className="wrap">
          <div className="legal-content-card">
            <span className="last-updated">LAST UPDATED: SEPTEMBER 2026</span>

            <p className="legal-p">
              INVESTNOW FINANCIAL SERVICES PRIVATE LIMITED ("Company", "We", "Us") respects your privacy and is committed to protecting personal data submitted through our website or consultation process.
            </p>

            <h2 className="legal-h2">1. Information We Collect</h2>
            <p className="legal-p">
              We collect information provided voluntarily when you fill out contact forms or request services, including: Name, Phone Number, Email Address, Selected Service Interest, and Consultation Notes.
            </p>

            <h2 className="legal-h2">2. How We Use Information</h2>
            <p className="legal-p">
              - To respond to service enquiries and schedule financial consultations.<br />
              - To facilitate loan, insurance, or mutual fund documentation with authorized partner institutions.<br />
              - To communicate updates regarding your requested financial services.
            </p>

            <h2 className="legal-h2">3. Data Security & Protection</h2>
            <p className="legal-p">
              We implement appropriate technical and organizational measures to safeguard your personal details against unauthorized access, loss, or disclosure. We do not sell or rent client lists to third-party marketers.
            </p>

            <h2 className="legal-h2">4. Contact Privacy Officer</h2>
            <p className="legal-p">
              If you have any questions regarding our privacy practices, please contact us at <strong>meetinvenstnow@gmail.com</strong>.
            </p>
          </div>
        </div>
      </section>

      <CTASection
        title="Questions About Data Protection?"
        primaryBtnText="Contact Privacy Team"
        primaryBtnLink="/contact"
      />
    </div>
  );
};

export default PrivacyPolicy;
