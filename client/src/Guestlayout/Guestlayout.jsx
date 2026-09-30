import React from 'react';
import { Outlet } from 'react-router-dom';
import GuestNavbar from './GuestNavbar';
import GuestFooter from './GuestFotter';
import ScrollToTop from '../components/ScrollToTop';

const GuestLayout = () => {
    return (
        <div className="guest-layout-shell">
            <style>{`
                .guest-layout-shell {
                    display: flex;
                    flex-direction: column;
                    min-height: 100vh;
                    background-color: var(--bg);
                    color: var(--text);
                    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                }

                .guest-content-wrapper {
                    flex: 1;
                    padding-top: 125px; /* Offset for fixed header */
                    width: 100%;
                }

                /* Generous Section Spacing & Layout Rules */
                .guest-content-wrapper section {
                    padding: 85px 5%;
                }

                .guest-content-wrapper .container {
                    max-width: 1200px;
                    margin: 0 auto;
                }

                @media (max-width: 768px) {
                    .guest-content-wrapper {
                        padding-top: 75px;
                    }

                    .guest-content-wrapper section {
                        padding: 60px 5%;
                    }
                }
            `}</style>
            <ScrollToTop />
            <GuestNavbar />
            <main className="guest-content-wrapper">
                <Outlet />
            </main>
            <GuestFooter />
        </div>
    );
};

export default GuestLayout;