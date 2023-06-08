import useAxiosFetchSupplyChainImpactedInformation from "../hooks/useAxiosFetchSupplyChainImpactedInformation";
import Spinner from "react-bootstrap/Spinner";
import {useEffect, useState} from "react";
import api from "../api/lksg_tool";
import {useNavigate} from "react-router-dom";
import { AxiosResponse } from "axios";

// @ts-ignore
const Item = ({investigation}) => {
    const navigate = useNavigate();

    const [trColor, setTrColor] = useState('table-light ');

    const [isCOMPLETED_NOWorking, setIsCOMPLETED_NOWorking] = useState(false);
    const [isCOMPLETED_YESWorking, setIsCOMPLETED_YESWorking] = useState(false);
    const [isCOMPLETED_UNKNOWNWorking, setIsCOMPLETED_UNKNOWNWorking] = useState(false);

    useEffect(() => {
        handleTrColor();
    }, [])

    const handleTrColor = () => {
        let color = '';
        if (investigation.impacted === 'YES') {
            color = 'text-danger';
        } else if (investigation.impacted === 'NO') {
            color = 'text-success';
        } else if (investigation.impacted === 'Unknown') {
            color = 'text-muted';
        }
        color = 'table-light ' + color;
        setTrColor(color);
    };

    const handleTrColorByPutResponse = (response: AxiosResponse<any, any>) => {
        setIsCOMPLETED_NOWorking(false);
        setIsCOMPLETED_YESWorking(false);
        setIsCOMPLETED_UNKNOWNWorking(false);
        let color = '';
        if(response.data.submodels[0].payload.supply_chain_impacted === 'YES') {
            color = 'text-danger';
        } else if(response.data.submodels[0].payload.supply_chain_impacted === 'NO') {
            color = 'text-success';
        } else if(response.data.submodels[0].payload.supply_chain_impacted === 'Unknown') {
            color = 'text-muted';
        }
        color = 'table-light ' + color;
        setTrColor(color);
    };

    const { supplyChainImpactedInformation } =
        useAxiosFetchSupplyChainImpactedInformation(investigation.job_id);

    const handleJsonDownload = () => {
        const link = document.createElement("a");
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const json = JSON.stringify(supplyChainImpactedInformation);
        const file = new Blob([json], { type: 'application/json' });
        link.href = URL.createObjectURL(file);
        link.download =
            investigation.co_name + "_" + investigation.bpn + "_" +
            investigation.job_status + "_" + investigation.impacted + ".json";
        link.click();
        URL.revokeObjectURL(link.href);
    };

    const handleIrsPutRequest = async (irsPutRequest: { job_id: any; state: any; impacted: any; }) => {
        try {
            const response =
                await api.get(`/lksg_tool/investigations/irs/${irsPutRequest.job_id}/${irsPutRequest.state}/${irsPutRequest.impacted}`, {});
            handleTrColorByPutResponse(response);
        } catch (err) {
            // @ts-ignore
            console.log(`Error: ${err.message}`);
        }
    };

    // @ts-ignore
    const setAnalysisState = (job_id, state, impacted) => {
        if(state === 'COMPLETED' && impacted === 'NO') {
            setIsCOMPLETED_NOWorking(true);
        }
        if(state === 'COMPLETED' && impacted === 'YES') {
            setIsCOMPLETED_YESWorking(true);
        }
        if(state === 'COMPLETED' && impacted === 'UNKNOWN') {
            setIsCOMPLETED_UNKNOWNWorking(true);
        }
        const irsPutRequest =
            { job_id: job_id, state: state, impacted: impacted};
        handleIrsPutRequest(irsPutRequest);
        navigate('/investigations/');
    };

    return (
        <tr className={`${trColor}`} key={`inv_${investigation.i}`}>
            <td>{investigation.co_name}</td>
            <td>{investigation.bpn}</td>
            <td>{investigation.req_id}</td>
            <td>{investigation.job_id}</td>
            <td>{investigation.job_status}</td>
            <td>{investigation.impacted}</td>
            {'INITIAL' !== investigation.job_status && 'RUNNING' !== investigation.job_status ? (
                <td>
                    <div onClick={(e) => { handleJsonDownload(); }}>
                        <svg className="bi text-muted flex-shrink-0" width="1em" height="1em">
                            <use xlinkHref="#bibliothecae" />
                        </svg>
                    </div>
                </td>
            ) :(<td>&nbsp;</td>)}
            {'INITIAL' === investigation.job_status ? (
                <td>
                    <div onClick={(e) => { setAnalysisState(investigation.job_id, "COMPLETED", "NO"); }}>
                        {isCOMPLETED_NOWorking ? (
                            <Spinner animation="border" size="sm" variant="success" />
                        ) : (
                            <svg className="bi text-success flex-shrink-0" width="1em" height="1em">
                                <use xlinkHref="#COMPLETED_NO" />
                            </svg>
                        )}
                    </div>
                </td>
            ) :(<td><div onClick={(e) => { setAnalysisState(investigation.job_id, "COMPLETED", "NO"); }}>
                {isCOMPLETED_NOWorking ? (
                    <Spinner animation="border" size="sm" variant="success" key={`inv_${investigation.i}_spinner_SUCCESS`} />
                ) : (
                    <svg className="bi text-success flex-shrink-0" width="1em" height="1em">
                        <use xlinkHref="#COMPLETED_NO" />
                    </svg>
                )}
            </div>&nbsp;</td>)}
            {'INITIAL' === investigation.job_status ? (
                <td>
                    <div onClick={(e) => { setAnalysisState(investigation.job_id, "COMPLETED", "YES"); }}>
                        {isCOMPLETED_YESWorking ? (
                            <Spinner animation="border" size="sm" variant="danger" />
                        ) : (
                            <svg className="bi text-danger flex-shrink-0" width="1em" height="1em">
                                <use xlinkHref="#COMPLETED_YES" />
                            </svg>
                        )}
                    </div>
                </td>
            ) :(<td><div onClick={(e) => { setAnalysisState(investigation.job_id, "COMPLETED", "YES"); }}>
                {isCOMPLETED_YESWorking ? (
                    <Spinner animation="border" size="sm" variant="danger" />
                ) : (
                    <svg className="bi text-danger flex-shrink-0" width="1em" height="1em">
                        <use xlinkHref="#COMPLETED_YES" />
                    </svg>
                )}
            </div>&nbsp;</td>)}
            {'INITIAL' === investigation.job_status ? (
                <td>
                    <div onClick={(e) => { setAnalysisState(investigation.job_id, "COMPLETED", "UNKNOWN"); }}>
                        {isCOMPLETED_UNKNOWNWorking ? (
                            <Spinner animation="border" size="sm" />
                        ) : (
                            <svg className="bi text-muted flex-shrink-0" width="1em" height="1em">
                                <use xlinkHref="#UNKNOWN" />
                            </svg>
                        )}
                    </div>
                </td>
            ) :(<td>
                <div onClick={(e) => { setAnalysisState(investigation.job_id, "COMPLETED", "UNKNOWN"); }}>
                    {isCOMPLETED_UNKNOWNWorking ? (
                        <Spinner animation="border" size="sm" />
                    ) : (
                        <svg className="bi text-muted flex-shrink-0" width="1em" height="1em">
                            <use xlinkHref="#UNKNOWN" />
                        </svg>
                    )}
                </div>&nbsp;</td>)}
        </tr>
    );
}

export default Item;
