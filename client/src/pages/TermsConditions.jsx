import React from "react";
import PageHero from "../components/PageHero";
import CTASection from "../components/CTASection";

const TermsConditions = () => {
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
        title="Terms & Conditions"
        subtitle="Standard terms governing website usage, consultations, and corporate interactions."
        badge="TERMS OF SERVICE"
        breadcrumbs={[
          { label: "Trust & Compliance", path: "/trust-compliance" },
          { label: "Terms & Conditions" },
        ]}
      />

      <section className="sec">
        <div className="wrap">
          <div className="legal-content-card">
            <span className="last-updated">LAST UPDATED: SEPTEMBER 2026</span>

            <p className="legal-p">
              Welcome to the website of INVESTNOW FINANCIAL SERVICES PRIVATE LIMITED. By browsing or utilizing information on this website, you agree to comply with and be bound by the following terms of use.
            </p>

            <h2 className="legal-h2">1. Use of Website Content</h2>
            <p className="legal-p">
              All text, graphic layouts, logo designs, and content on this site are property of INVESTNOW FINANCIAL SERVICES PRIVATE LIMITED. Content is provided for general informational and educational purposes only.
            </p>

            <h2 className="legal-h2">2. No Investment Guarantee or Binding Offer</h2>
            <p className="legal-p">
              Information on this website does not constitute a legally binding offer or guarantee of financial returns. Final financial transactions, policy issuances, or loan approvals depend on formal agreement execution with respective product issuers or financial institutions.
            </p>

            <h2 className="legal-h2">3. Limitation of Liability</h2>
            <p className="legal-p">
              INVESTNOW shall not be liable for any direct, indirect, or consequential losses arising from the reliance on website information or market fluctuations affecting third-party financial products.
            </p>

            <h2 className="legal-h2">4. Jurisdiction</h2>
            <p className="legal-p">
              These terms are governed by the laws of India, and disputes shall be subject to the exclusive jurisdiction of applicable courts in Karnataka.
            </p>
          </div>
        </div>
      </section>

      <CTASection
        title="Need Further Clarification on Terms?"
        primaryBtnText="Contact Us"
        primaryBtnLink="/contact"
      />
    </div>
  );
};

export default TermsConditions;
