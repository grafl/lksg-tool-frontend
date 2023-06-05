import {SetStateAction, useContext, useState} from 'react';
import Spinner from "react-bootstrap/Spinner";

import Item from './investigations/Item';
import Ertesito from "./modals/Ertesito";
import api from './api/lksg_tool';
import ViewDataContext from "./context/ViewDataContext";

const Investigations = () => {

    // @ts-ignore
    const {vInvestigations, isVInvestigationsLoading} = useContext(ViewDataContext);
    const [ertesitendoInvestigation, setErtesitendoInvestigation] = useState({});

    const [showErtesito, setShowErtesito] = useState(false);
    const handleShowErtesito = (investigation: SetStateAction<{}>) => { setShowErtesito(true); setErtesitendoInvestigation(investigation); };
    const handleMegsemErtesito = () => { setShowErtesito(false); };

    const [investigation, setInvestigation ] = useState('');

    const handleKuldes = (e: { req_id?: any; }) => {
        return async () => {
            //console.log("Küldés: ", e);
            setShowErtesito(false);
            try {
                const rv = await api.put(`/lksg_tool/incidents/${e.req_id}`, e);
                //console.log("PUT rv: ", rv);
                // setInvestigation(kiadvanyokList);
            } catch (err) {
                // @ts-ignore
                console.log(`Error: ${err.message}`);
            }
        }
    };

    return (
        <main>
            <div className="pricing-header p-1 pb-md-0 mx-auto text-center">
                <div className="dropdown">
                    <a href="/#"
                        className="d-flex align-items-center col-lg-4 mb-2 mb-lg-0 link-dark text-decoration-none dropdown-toggle"
                        data-bs-toggle="dropdown" aria-expanded="false">
                        <svg className="bi text-muted flex-shrink-0" width="2.1em" height="2.1em">
                            <use xlinkHref="#Incidents" /></svg>&nbsp;
                        <h1 className="display-6 fw-normal">Investigations</h1>
                    </a>
                    <ul className="dropdown-menu text-small shadow">
                        <li><a className="dropdown-item" href="/investigations/reg" aria-current="page">Register new investigation job</a></li>
                    </ul>
                </div>
            </div>
            {isVInvestigationsLoading ? (
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-1 py-1">
                    <Spinner animation="border" />
                </div>
            ) : vInvestigations.length > 0 ? (
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-1 py-1">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Company name</th>
                                <th scope="col">BPN</th>
                                <th scope="col">Global Asset ID</th>
                                <th scope="col">Job ID</th>
                                <th scope="col">Job status</th>
                                <th scope="col">Impacted</th>
                                <th scope="col">Response</th>
                                <th scope="col">+</th>
                                <th scope="col">-</th>
                                <th scope="col">?</th>
                            </tr>
                        </thead>
                        <tbody>
                            {vInvestigations.map((investigation: { i: any; id: any; }) => (
                                <Item investigation={investigation}
                                      key={`inv_${investigation.i}_${investigation.id}`} />
                            ))}
                        </tbody>
                    </table>
                    <Ertesito show={showErtesito} handleSend={handleKuldes(ertesitendoInvestigation)}
                              handleCancel={handleMegsemErtesito} investigation={ertesitendoInvestigation} />
                </div>
            ) : (
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-1 py-1">
                    &nbsp;No investigation registered<br />
                    &nbsp;<br />
                    &nbsp;<br />
                    &nbsp;<br />
                    &nbsp;<br />
                    &nbsp;<br />
                    &nbsp;<br />
                </div>
            )}
        </main >
    );
}

export default Investigations;
