import {useState, useEffect, useContext} from 'react';
import axios from 'axios';

import config from '../config.json';

const useAxiosFetchSupplyChainImpactedInformation = (job_id: unknown) => {
    const dataUrl = config.baseURL + '/lksg_tool/investigations/irs/' + job_id;
    const [supplyChainImpactedInformation, setSupplyChainImpactedInformation] = useState({});
    const [supplyChainImpactedInformationData, setSupplyChainImpactedInformationData] = useState({});
    const [fetchSupplyChainImpactedInformationError, setFetchSupplyChainImpactedInformationError] = useState(null);
    const [isSupplyChainImpactedInformationLoading, setIsSupplyChainImpactedInformationLoading] = useState(false);

    useEffect(() => {
        let isMounted = true;
        const source = axios.CancelToken.source();
        const fetchData = async (url: string, id: any) => {
            setIsSupplyChainImpactedInformationLoading(true);
            try {
                const response = await axios.get(url, {
                    cancelToken: source.token
                });
                if (isMounted) {
                    setSupplyChainImpactedInformationData(response.data);
                    setFetchSupplyChainImpactedInformationError(null);
                }
            } catch (err) {
                if (isMounted) {
                    // @ts-ignore
                    setFetchSupplyChainImpactedInformationError(err.message);
                    setSupplyChainImpactedInformationData({});
                }
            } finally {
                isMounted && setIsSupplyChainImpactedInformationLoading(false);
            }
        }
        fetchData(dataUrl, job_id);
        const cleanUp = () => {
            isMounted = false;
            source.cancel();
        }
        return cleanUp;
    }, [dataUrl, job_id]);

    useEffect(() => {
        setSupplyChainImpactedInformation(supplyChainImpactedInformationData);
    }, [supplyChainImpactedInformationData]);

    return { supplyChainImpactedInformation, fetchSupplyChainImpactedInformationError, isSupplyChainImpactedInformationLoading };
}

export default useAxiosFetchSupplyChainImpactedInformation;
