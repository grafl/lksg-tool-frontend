import { useState, useEffect } from 'react';
import axios from 'axios';

import config from '../config.json';

const useAxiosFetchInvestigations = () => {
    const dataUrl = config.baseURL + '/lksg_tool/investigations/';
    const [investigationsData, setInvestigationsData] = useState([]);
    const [fetchInvestigationsError, setFetchInvestigationsError] = useState(null);
    const [isInvestigationsLoading, setIsInvestigationsLoading] = useState(false);

    useEffect(() => {
        let isMounted = true;
        const source = axios.CancelToken.source();
        const fetchData = async (url: string) => {
            setIsInvestigationsLoading(true);
            try {
                const response = await axios.get(url, {
                    cancelToken: source.token
                });
                if (isMounted) {
                    setInvestigationsData(response.data);
                    setFetchInvestigationsError(null);
                }
            } catch (err) {
                if (isMounted) {
                    // @ts-ignore
                    setFetchInvestigationsError(err.message);
                    setInvestigationsData([]);
                }
            } finally {
                isMounted && setIsInvestigationsLoading(false);
            }
        }
        fetchData(dataUrl);
        const cleanUp = () => {
            isMounted = false;
            source.cancel();
        }
        return cleanUp;
    }, [dataUrl]);
    return { investigationsData, fetchInvestigationsError, isInvestigationsLoading };
}

export default useAxiosFetchInvestigations;
