import React from "react";
import PageHero from "../components/PageHero";
import CTASection from "../components/CTASection";

const RiskDisclosures = () => {
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
          letter-spacing:.05em; margin-bottom:24px; display:block; text-transform:uppercase;
        }

        .risk-alert-box {
          background:rgba(212,175,55,.12); border:1px solid var(--accent); padding:20px 24px;
          border-radius:18px; color:var(--primary); font-weight:600; font-size:14.5px; margin:24px 0 32px; line-height:1.6;
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
        title="Risk Disclosures"
        subtitle="Important disclosures regarding financial market volatility and investment risks."
        badge="RISK WARNING"
        breadcrumbs={[
          { label: "Trust & Compliance", path: "/trust-compliance" },
          { label: "Risk Disclosures" },
        ]}
      />

      <section className="sec">
        <div className="wrap">
          <div className="legal-content-card">
            <span className="last-updated">LAST UPDATED: SEPTEMBER 2026</span>

            <div className="risk-alert-box">
              WARNING: Financial investments, equities, and market-linked instruments involve risk of capital loss. Past performance does not guarantee future results.
            </div>

            <h2 className="legal-h2">1. Market Risk Disclosure</h2>
            <p className="legal-p">
              Investments in mutual funds, stocks, and equity markets are subject to market risks, interest rate fluctuations, macroeconomic factors, and liquidity dynamics. The net asset value (NAV) of investments can go up or down based on market behavior.
            </p>

            <h2 className="legal-h2">2. Non-Guarantee of Returns</h2>
            <p className="legal-p">
              INVESTNOW FINANCIAL SERVICES PRIVATE LIMITED does not promise, offer, or guarantee fixed returns, risk-free returns, or assured appreciation on any market-linked financial products. Any illustrated returns or historical projections are purely informative.
            </p>

            <h2 className="legal-h2">3. Product Specific Terms</h2>
            <p className="legal-p">
              - <strong>Insurance:</strong> Subject to policy terms, exclusions, waiting periods, and underwriting approval by the insurance issuer.<br />
              - <strong>Loans:</strong> Approval, interest rates, tenure, and eligibility criteria are determined solely by lending banks and financial institutions.<br />
              - <strong>Land Links / Real Estate:</strong> Property title, regulatory approvals, and land pricing must be independently verified by buyers.
            </p>

            <h2 className="legal-h2">4. Investor Responsibility</h2>
            <p className="legal-p">
              Investors and clients are encouraged to carefully assess their personal financial goals, risk capacity, and liquidity requirements before entering into any financial transaction or commitment.
            </p>
          </div>
        </div>
      </section>

      <CTASection
        title="Need Advice Regarding Investment Risks?"
        primaryBtnText="Speak with an Advisor"
        primaryBtnLink="/contact"
      />
    </div>
  );
};

export default RiskDisclosures;
