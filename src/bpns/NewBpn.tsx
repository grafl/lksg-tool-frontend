import { useContext, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import uuid from 'react-uuid';

import api from '../api/lksg_tool';
import DataContext from '../context/DataContext';

import {Typeahead} from "react-bootstrap-typeahead";
import {bpnRegex} from "../App";

const NewBpn = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    // @ts-ignore
    const { bpns, setBpns } = useContext(DataContext);
    // @ts-ignore
    const { companies, setCompanies } = useContext(DataContext);

    const [bpn, setBpn] = useState('');
    const [company, setCompany] = useState('');

    const handleCreate = async () => {
        // if(bpn.match(bpnRegex) != null) {
        const newBpn = { bpn: bpn };
        try {
            await api.post(`/lksg_tool/bpns/`, [newBpn]);
            const bpnList = [...bpns, newBpn];
            setBpns(bpnList);
            await api.put(`/lksg_tool/companies/${company}/${bpn}`, [newBpn]);
            navigate('/bpns/');
        } catch (err) {
            // @ts-ignore
            console.log(`Error: ${err.message}`);
        }
        /* } else {
            alert("Invalid BPN format!");
        } */
    };

    // @ts-ignore
    // @ts-ignore
    // @ts-ignore
    // @ts-ignore
    // @ts-ignore
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
                                    <h1 className="display-6 fw-normal">Create new BPN</h1>
                                </div>
                                <div className="col-sm-1"></div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-sm-2"></div>
                                <div className="col-sm-8">
                                    <div className="row mt-2">
                                        <div className="col-sm-2 text-end">
                                            <label htmlFor="company_name" className="form-label">BPN:</label>
                                        </div>
                                        <div className="col-sm-10">
                                            <input type="text" autoFocus className="form-control" id="bpn" placeholder=""
                                                   required value={bpn}
                                                   onChange={(e) =>
                                                       setBpn(e.target.value)} />
                                            <div className="invalid-feedback">Valid BPN is required.</div>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-sm-2 text-end">
                                            <label htmlFor="company" className="form-label">Company:</label>
                                        </div>
                                        <div className="col-sm-10">
                                            <Typeahead id="company"
                                                       options={ companies }
                                                       filterBy={['name']}
                                                        // @ts-ignore
                                                       labelKey={option => `${option.name} `}
                                                       onChange={(selected) => {
                                                           // @ts-ignore
                                                           setCompany(selected[0].id);
                                                       }}
                                                        // @ts-ignore
                                                       renderMenuItemChildren={(option: Option) => (
                                                           <div>
                                                               <b>{option.name}</b>
                                                               <div>
                                                                   <small>{option.street} {option.nr},&nbsp;
                                                                       {option.zipCode}&nbsp;
                                                                       {option.location}&nbsp;
                                                                       {option.country}&nbsp;
                                                                   </small>&nbsp;
                                                               </div>
                                                           </div>
                                                       )}
                                            />
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

export default NewBpn;
