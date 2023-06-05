import {useNavigate, useParams} from "react-router-dom";
import {SetStateAction, useContext, useState} from "react";

import Button from "react-bootstrap/Button";
import uuid from "react-uuid";
import {Typeahead} from "react-bootstrap-typeahead";
import DataContext from "../context/DataContext";
import ViewDataContext from "../context/ViewDataContext";
import api from '../api/lksg_tool';
import useAxiosFetchCompany from "../hooks/useAxiosFetchCompany";

const NewInvestigation = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    // @ts-ignore
    const {investigations, setInvestigations} = useContext(DataContext);
    // @ts-ignore
    const {vCompaniesAndBpns, setVCompaniesAndBpns} = useContext(ViewDataContext);

    const [bpns, setBpns] = useState([]);
    const [req_id, setReqId] = useState(uuid());
    const [company_id, setCompanyId] = useState('');
    const [company_name, setCompanyName] = useState('');
    const [street, setStreet] = useState('');
    const [nr, setNr] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [location, setLocation] = useState('');
    const [country, setCountry] = useState('');
    const [bpn, setBpn] = useState('');

    const handleCreate = async () => {
        if (req_id !== null && company_id !== null && bpn !== null) {
            const newInvestigation =
                {id: req_id, company: company_id, bpn: bpn};
            try {
                console.log([newInvestigation]);
                await api.post(`/lksg_tool/investigations/`, [newInvestigation]);
                const investigationsList = [...investigations, newInvestigation];
                setInvestigations(investigationsList);
                navigate('/investigations');
            } catch (err) {
                // @ts-ignore
                console.log(`Error: ${err.message}`);
            }
        }
    };

    const handleSetBpn = (selected: { bpn: SetStateAction<string>; }[]) => {
        console.log(selected);
        setBpn(selected[0].bpn);
    };

    const handleSetBpns = (selected: any[]) => {
        const xCompanyId = selected[0].company_id;
        setCompanyId(xCompanyId);
        const xCompanyName = selected[0].company_name;
        setCompanyName(xCompanyName);
        const xCompanyStreet = selected[0].street;
        setStreet(xCompanyStreet);
        const xCompanyNr = selected[0].nr;
        setNr(xCompanyNr);
        const xCompanyZipCode = selected[0].zip_code;
        setZipCode(xCompanyZipCode);
        const xCompanyLocation = selected[0].location;
        setLocation(xCompanyLocation);
        const xCompanyCountry = selected[0].country;
        setCountry(xCompanyCountry);
        const xBpns = selected.flatMap(x => x.bpns.split(', ')).map(y => ({
            "bpn": y
        }));
        // @ts-ignore
        setBpns(xBpns);
    };

    // @ts-ignore
    // @ts-ignore
    // @ts-ignore
    return (
        <>
            <form className="needs-validation" noValidate>
                <div className="row mt-5">
                    <div className="col-sm-1"></div>
                    <div className="col-sm-10">
                        <div className="row form-control">
                            <div className="row">
                                <div className="col-sm-1"></div>
                                <div className="col-sm-10">
                                    <h1 className="display-6 fw-normal">Create new investigation</h1>
                                </div>
                                <div className="col-sm-1"></div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-sm-2"></div>
                                <div className="col-sm-8">
                                    <div className="row mt-3">
                                        <div className="col-sm-12">
                                            <h4 className="display-10 fw-normal">Investigated product</h4>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-sm-2 text-end">
                                            <label htmlFor="req_id" className="form-label">UUID:</label>
                                        </div>
                                        <div className="col-sm-10">
                                            <input type="text" className="form-control" id="req_id" placeholder=""
                                                   required value={req_id}
                                                   onChange={(e) =>
                                                       setReqId(e.target.value)} />
                                            <div className="invalid-feedback">Valid ID is required.</div>
                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col-sm-12">
                                            <h4 className="display-10 fw-normal">Incident data</h4>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-sm-2 text-end">
                                            <label htmlFor="company_name" className="form-label">Name:</label>
                                        </div>
                                        <div className="col-sm-10">
                                            <Typeahead
                                                id="company_name"
                                                options={ vCompaniesAndBpns }
                                                minLength={1}// @ts-ignore

                                                labelKey={option => `${option.company_name} {${option.bpns}} `}
                                                filterBy={['company_name', 'bpns']}
                                                placeholder="Search a company ..."
                                                onChange={
                                                    handleSetBpns
                                                }
                                                /* renderMenuItemChildren={(option: Option) => (
                                                    <div>
                                                        {option.company_name}
                                                        <div>
                                                            <small><b>Company:</b> {option.company_name}</small>&nbsp;
                                                            <small><b>BPN(s):</b> {option.bpn}</small>&nbsp;
                                                        </div>
                                                    </div>
                                                )} */
                                            />
                                            <div className="invalid-feedback">Valid company name is required.</div>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-sm-2 text-end">
                                            <label htmlFor="street" className="form-label">Street:</label>
                                        </div>
                                        <div className="col-sm-6">
                                            <input type="text" className="form-control" id="street" placeholder=""
                                                   required value={street}
                                                   onChange={(e) =>
                                                       setStreet(e.target.value)} />
                                            <div className="invalid-feedback">Valid street name is required.</div>
                                        </div>
                                        <div className="col-sm-2 text-end">
                                            <label htmlFor="no" className="form-label">No:</label>
                                        </div>
                                        <div className="col-sm-2">
                                            <input type="text" className="form-control" id="nr" placeholder=""
                                                   required value={nr}
                                                   onChange={(e) =>
                                                       setNr(e.target.value)} />
                                            <div className="invalid-feedback">Valid street number is required.</div>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-sm-2 text-end">
                                            <label htmlFor="zipCode" className="form-label">Postal code:</label>
                                        </div>
                                        <div className="col-sm-2">
                                            <input type="text" className="form-control" id="zipCode" placeholder=""
                                                   required value={zipCode}
                                                   onChange={(e) =>
                                                       setZipCode(e.target.value)} />
                                            <div className="invalid-feedback">Valid postal code is required.</div>
                                        </div>
                                        <div className="col-sm-2 text-end">
                                            <label htmlFor="location" className="form-label">Location:</label>
                                        </div>
                                        <div className="col-sm-6">
                                            <input type="text" className="form-control" id="location" placeholder=""
                                                   required value={location}
                                                   onChange={(e) =>
                                                       setLocation(e.target.value)} />
                                            <div className="invalid-feedback">Valid location is required.</div>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-sm-2 text-end">
                                            <label htmlFor="country" className="form-label">Country:</label>
                                        </div>
                                        <div className="col-sm-10">
                                            <input type="text" className="form-control" id="country" placeholder=""
                                                   required value={country}
                                                   onChange={(e) =>
                                                       setCountry(e.target.value)} />
                                            <div className="invalid-feedback">Valid country name is required.</div>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-sm-2 text-end">
                                            <label htmlFor="bpn" className="form-label">BPN:</label>
                                        </div>
                                        <div className="col-sm-10">
                                            <Typeahead id="bpn"
                                                       options={ bpns }
                                                       filterBy={['bpn']}// @ts-ignore

                                                       labelKey={option => `${option.bpn} `}// @ts-ignore

                                                       onChange={
                                                           handleSetBpn
                                                       }
                                            />
                                            <div className="invalid-feedback">Valid BPN is required.</div>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-sm-6"></div>
                                        <div className="col-sm-6">
                                            <Button variant="primary"
                                                    onClick={() => handleCreate()}>
                                                Start new investigation job</Button>
                                        </div>
                                        <div className="col-sm-6"></div>
                                    </div>
                                </div>
                                <div className="col-sm-2"></div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-1"></div>
                </div>
            </form>
        </>
    );
}
export default NewInvestigation;
