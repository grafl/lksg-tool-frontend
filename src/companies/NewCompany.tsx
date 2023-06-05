import { useContext, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import uuid from 'react-uuid';

import api from '../api/lksg_tool';
import DataContext from '../context/DataContext';

import useAxiosFetchCompany from "../hooks/useAxiosFetchCompany";
import {Typeahead} from "react-bootstrap-typeahead";

const NewCompany = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    // @ts-ignore
    const { companies, setCompanies } = useContext(DataContext);

    const [name, setName] = useState('');
    const [street, setStreet] = useState('');
    const [nr, setNr] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [location, setLocation] = useState('');
    const [country, setCountry] = useState('');

    const handleCreate = async () => {
        const newCompany = {
            id: uuid(), name: name, street: street, nr: nr, zipCode: zipCode,
            location: location, country: country};
        console.log(newCompany);
        try {
            await api.post(`/lksg_tool/companies/`, [newCompany]);
            const companyList = [...companies, newCompany];
            setCompanies(companyList);
            console.log(companies);
            navigate('/companies/');
        } catch (err) {
            // @ts-ignore
            console.log(`Error: ${err.message}`);
        }
    };

    return (
        <>
            <form className="needs-validation">
                <div className="row mt-5">
                    <div className="col-sm-1"></div>
                    <div className="col-sm-10">
                        <div className="row form-control">
                            <div className="row">
                                <div className="col-sm-1"></div>
                                <div className="col-sm-10">
                                    <h1 className="display-6 fw-normal">Create new company</h1>
                                </div>
                                <div className="col-sm-1"></div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-sm-2"></div>
                                <div className="col-sm-8">
                                    <div className="row mt-2">
                                        <div className="col-sm-2 text-end">
                                            <label htmlFor="company_name" className="form-label">Name:</label>
                                        </div>
                                        <div className="col-sm-10">
                                            <input type="text" autoFocus className="form-control" id="name" placeholder=""
                                                   required value={name}
                                                   onChange={(e) =>
                                                       setName(e.target.value)} />
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
                                            <input type="text" className="form-control" id="no" placeholder=""
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
                                            <label htmlFor="location" className="form-label">City:</label>
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
                                        <div className="col-sm-6"></div>
                                        <div className="col-sm-6">
                                            <Button variant="primary"
                                                    onClick={() => handleCreate()}>
                                                Save</Button>
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

export default NewCompany;
