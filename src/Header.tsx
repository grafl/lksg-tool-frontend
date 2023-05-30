import React from 'react';

const Header = () => {
    return (
        <header className="p-1">
            <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 text-dark text-decoration-none">
                    <svg className="bi me-2" width="40" height="32" role="img" aria-label="ESS Incidents">
                        <use xlinkHref="#bibliothecae" />
                    </svg>
                </a>
                <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                    <li><a href="/investigations" className="nav-link px-2 link-secondary">Investigations</a></li>
                    <li><a href="/companies" className="nav-link px-2 link-secondary">Companies</a></li>
                    <li><a href="/bpns" className="nav-link px-2 link-secondary">BPNs</a></li>
                </ul>
            </div>
        </header>

    );
}

export default Header;
