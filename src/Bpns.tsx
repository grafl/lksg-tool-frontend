import {useContext, useState} from 'react';
import Spinner from "react-bootstrap/Spinner";


import Item from './bpns/Item';
import ViewDataContext from "./context/ViewDataContext";

const Bpns = () => {

    // @ts-ignore
    const { vBpns, isVBpnsLoading } = useContext(ViewDataContext);

    const handle1 = (e: any) => {
        console.log("handle1: ", e);
    };

    // @ts-ignore
    // @ts-ignore
    return (
        <main>
            <div className="pricing-header p-1 pb-md-0 mx-auto text-center">
                <div className="dropdown">
                    <a href="/#"
                       className="d-flex align-items-center col-lg-4 mb-2 mb-lg-0 link-dark text-decoration-none dropdown-toggle"
                       data-bs-toggle="dropdown" aria-expanded="false">
                        <svg className="bi text-muted flex-shrink-0" width="2.2em" height="2.2em"><use xlinkHref="#Bpns" /></svg>&nbsp;
                        <h1 className="display-6 fw-normal">BPNs</h1>
                    </a>
                    <ul className="dropdown-menu text-small shadow">
                        <li><a className="dropdown-item" href="/bpns/reg" aria-current="page">New BPN</a></li>
                    </ul>
                </div>
            </div>
            {isVBpnsLoading ? (
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-1 py-1">
                    <Spinner animation="border" />
                </div>
            ) : vBpns.length > 0 ? (
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-1 py-1">
                    <table className="table">
                        <thead>
                        <tr>
                            <th scope="col">BPN</th>
                            <th scope="col">Company</th>
                        </tr>
                        </thead>
                        <tbody>
                        {vBpns.map((bpn: { bpn: any; }) => (
                            // @ts-ignore
                            <Item bpn={bpn} handle1={handle1} key={`bpni_${bpn.bpn}`} />
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

export default Bpns;
