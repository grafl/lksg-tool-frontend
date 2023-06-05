import { useState, useEffect } from 'react';
import axios from 'axios';

import config from '../config.json';

const useAxiosFetchVCompaniesAndBpns = () => {
    const dataUrl = config.baseURL + '/lksg_tool/lookup/companiesAndBpns/';
    const [vCompaniesAndBpnsData, setVCompaniesAndBpnsData] = useState([]);
    const [fetchVCompaniesAndBpnsError, setFetchVCompaniesAndBpnsError] = useState(null);
    const [isVCompaniesAndBpnsLoading, setIsVCompaniesAndBpnsLoading] = useState(false);

    useEffect(() => {
        let isMounted = true;
        const source = axios.CancelToken.source();
        const fetchData = async (url: string) => {
            setIsVCompaniesAndBpnsLoading(true);
            try {
                const response = await axios.get(url, {
                    cancelToken: source.token
                });
                if (isMounted) {
                    setVCompaniesAndBpnsData(response.data);
                    setFetchVCompaniesAndBpnsError(null);
                }
            } catch (err) {
                if (isMounted) {
                    // @ts-ignore
                    setFetchVCompaniesAndBpnsError(err.message);
                    setVCompaniesAndBpnsData([]);
                }
            } finally {
                isMounted && setIsVCompaniesAndBpnsLoading(false);
            }
        }
        fetchData(dataUrl);
        const cleanUp = () => {
            isMounted = false;
            source.cancel();
        }
        return cleanUp;
    }, [dataUrl]);
    return { vCompaniesAndBpnsData, fetchVCompaniesAndBpnsError, isVCompaniesAndBpnsLoading };
}

export default useAxiosFetchVCompaniesAndBpns;
