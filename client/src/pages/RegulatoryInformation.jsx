import React from "react";
import PageHero from "../components/PageHero";
import CTASection from "../components/CTASection";

const RegulatoryInformation = () => {
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
        title="Regulatory Information"
        subtitle="Corporate overview, GST identifier, and regulatory disclosure standards."
        badge="LEGAL DISCLOSURE"
        breadcrumbs={[
          { label: "Trust & Compliance", path: "/trust-compliance" },
          { label: "Regulatory Info" },
        ]}
      />

      <section className="sec">
        <div className="wrap">
          <div className="legal-content-card">
            <span className="last-updated">LAST UPDATED: SEPTEMBER 2026</span>

            <p className="legal-p">
              INVESTNOW FINANCIAL SERVICES PRIVATE LIMITED operates as a professional financial services company providing financial consultation, loan assistance guidance, mutual fund planning support, insurance coordination, and land documentation services.
            </p>

            <h2 className="legal-h2">1. Corporate Identification</h2>
            <p className="legal-p">
              <strong>Entity Name:</strong> INVESTNOW FINANCIAL SERVICES PRIVATE LIMITED<br />
              <strong>GST / Registration Identifier:</strong> 29AAICI5060P1ZX<br />
              <strong>Head Office Location:</strong> Kundapura, Karnataka, India<br />
              <strong>Contact Email:</strong> meetinvenstnow@gmail.com
            </p>

            <h2 className="legal-h2">2. Regulatory & Distribution Framework</h2>
            <p className="legal-p">
              INVESTNOW acts as an intermediary financial consultant facilitating financial products issued by third-party financial institutions, asset management companies (AMCs), banks, and insurance issuers.
            </p>
            <p className="legal-p">
              Please contact INVESTNOW directly for applicable regulatory registration details and service-specific information corresponding to individual product lines.
            </p>

            <h2 className="legal-h2">3. Issuer Terms & Responsibilities</h2>
            <p className="legal-p">
              All financial products (such as loans, insurance policies, and mutual fund units) are subject to the specific terms, conditions, eligibility, and underwriting guidelines set by the respective product issuers. INVESTNOW does not guarantee product approval or independent issuer decisions.
            </p>
          </div>
        </div>
      </section>

      <CTASection
        title="Have Questions Regarding Regulatory Information?"
        primaryBtnText="Contact Our Office"
        primaryBtnLink="/contact"
      />
    </div>
  );
};

export default RegulatoryInformation;
