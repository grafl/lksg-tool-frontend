import { useState, useEffect } from 'react';
import axios from 'axios';

import config from '../config.json';

const useAxiosFetchInvestigation = (id: unknown) => {
    const dataUrl = config.baseURL + '/lksg_tool/incidents/' + id;
    const [investigation, setInvestigation] = useState({});
    const [investigationData, setInvestigationData] = useState({});
    const [fetchInvestigationError, setFetchInvestigationError] = useState(null);
    const [isInvestigationLoading, setIsInvestigationLoading] = useState(false);

    useEffect(() => {
        let isMounted = true;
        const source = axios.CancelToken.source();
        const fetchData = async (url: string, id: unknown) => {
            setIsInvestigationLoading(true);
            try {
                const response = await axios.get(url, {
                    cancelToken: source.token
                });
                if (isMounted) {
                    setInvestigationData(response.data);
                    setFetchInvestigationError(null);
                }
            } catch (err) {
                if (isMounted) {
                    // @ts-ignore
                    setFetchInvestigationError(err.message);
                    setInvestigationData({});
                }
            } finally {
                isMounted && setIsInvestigationLoading(false);
            }
        }
        fetchData(dataUrl, id);
        const cleanUp = () => {
            isMounted = false;
            source.cancel();
        }
        return cleanUp;
    }, [dataUrl, id]);

    useEffect(() => {
        setInvestigation(investigationData);
    }, [investigationData]);

    return { investigation, fetchInvestigationError, isInvestigationLoading };
}

export default useAxiosFetchInvestigation;
