import {useContext, useState} from 'react';
import Spinner from "react-bootstrap/Spinner";

import DataContext from './context/DataContext';
import Item from './companies/Item';

const Companies = () => {

    // @ts-ignore
    const { companies, isCompaniesLoading } = useContext(DataContext);

    const handle1 = (e: any) => {
        console.log("handle1: ", e);
    };

    return (
        <main>
            <div className="pricing-header p-1 pb-md-0 mx-auto text-center">
                <div className="dropdown">
                    <a href="/#"
                       className="d-flex align-items-center col-lg-4 mb-2 mb-lg-0 link-dark text-decoration-none dropdown-toggle"
                       data-bs-toggle="dropdown" aria-expanded="false">
                        <svg className="bi text-muted flex-shrink-0" width="2.2em" height="2.2em"><use xlinkHref="#Companies" /></svg>&nbsp;
                        <h1 className="display-6 fw-normal">Companies</h1>
                    </a>
                    <ul className="dropdown-menu text-small shadow">
                        <li><a className="dropdown-item" href="/companies/reg" aria-current="page">New company</a></li>
                    </ul>
                </div>
            </div>
            {isCompaniesLoading ? (
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-1 py-1">
                    <Spinner animation="border" />
                </div>
            ) : companies.length > 0 ? (
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-1 py-1">
                    <table className="table">
                        <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Street</th>
                            <th scope="col">Nr.</th>
                            <th scope="col">ZIP code</th>
                            <th scope="col">Location</th>
                            <th scope="col">Country</th>
                        </tr>
                        </thead>
                        <tbody>
                        {companies.map((company: { id: any; }) => (
                            <Item company={company} handle1={handle1} key={`coi_${company.id}`} />
                        ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-1 py-1">
                    &nbsp;Empty list<br />
                    &nbsp;<br />
                    &nbsp;<br />
                    &nbsp;<br />
                    &nbsp;<br />
                </div>
            )}
        </main >

    );
}

export default Companies;
