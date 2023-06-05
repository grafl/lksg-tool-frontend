import {useNavigate, useParams} from "react-router-dom";
import useAxiosFetchInvestigation from "../hooks/useAxiosFetchInvestigation";
import {useEffect} from "react";
import {Button} from "react-bootstrap";

const Investigation = () => {
    const { id } = useParams();
    const { investigation } = useAxiosFetchInvestigation(id);
    const navigate = useNavigate();
    useEffect(() => {
    }, [investigation]);
    return (
        <>
            <div className="pricing-header p-1 pb-md-0 mx-auto">
                <div className="dropdown">
                    <h1 className="display-6 fw-normal">Investigation</h1>
                </div>
                <div className="col-md-7 col-lg-8">
                    <form className="needs-validation" noValidate>
                        <div className="row g-3">
                            <div className="col-sm-4">
                                <label htmlFor="datum" className="form-label">BPN</label>
                            </div>
                        </div>
                        <div>&nbsp;</div>
                        <div></div>
                        <div>&nbsp;</div>
                        <div className="row g-3">
                            <div className="col-sm-6">
                                <Button variant="primary">Save</Button>
                            </div>
                        </div>
                    </form >
                </div >
            </div>
        </>
    );
}

export default Investigation;
