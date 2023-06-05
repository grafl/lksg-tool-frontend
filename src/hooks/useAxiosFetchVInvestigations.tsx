import { useState, useEffect } from 'react';
import axios from 'axios';

import config from '../config.json';
import {useLocation} from "react-router-dom";

const useAxiosFetchVInvestigations = () => {
    const dataUrl = config.baseURL + '/lksg_tool/investigations/v/';
    const [vInvestigationsData, setVInvestigationsData] = useState([]);
    const [fetchVInvestigationsError, setFetchVInvestigationsError] = useState(null);
    const [isVInvestigationsLoading, setIsVInvestigationsLoading] = useState(false);
    const { pathname } = useLocation();
    //console.log(pathname);

    useEffect(() => {
        let isMounted = true;
        const source = axios.CancelToken.source();
        const fetchData = async (url: string) => {
            setIsVInvestigationsLoading(true);
            try {
                const response = await axios.get(url, {
                    cancelToken: source.token
                });
                if (isMounted) {
                    setVInvestigationsData(response.data);
                    setFetchVInvestigationsError(null);
                }
            } catch (err) {
                if (isMounted) {
                    // @ts-ignore
                    setFetchVInvestigationsError(err.message);
                    setVInvestigationsData([]);
                }
            } finally {
                isMounted && setIsVInvestigationsLoading(false);
            }
        }
        if(pathname === '/investigations') {
            fetchData(dataUrl);
        }
        const cleanUp = () => {
            isMounted = false;
            source.cancel();
        }
        return cleanUp;
    }, [dataUrl, pathname]);
    return { vInvestigationsData, fetchVInvestigationsError, isVInvestigationsLoading };
}

export default useAxiosFetchVInvestigations;
