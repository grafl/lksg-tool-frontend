import { useState, useEffect } from 'react';
import axios from 'axios';

import config from '../config.json';

const useAxiosFetchCompanies = () => {
    const dataUrl = config.baseURL + '/lksg_tool/companies/';
    const [companiesData, setCompaniesData] = useState([]);
    const [fetchCompaniesError, setFetchCompaniesError] = useState(null);
    const [isCompaniesLoading, setIsCompaniesLoading] = useState(false);

    useEffect(() => {
        let isMounted = true;
        const source = axios.CancelToken.source();
        const fetchData = async (url: string) => {
            setIsCompaniesLoading(true);
            try {
                const response = await axios.get(url, {
                    cancelToken: source.token
                });
                if (isMounted) {
                    setCompaniesData(response.data);
                    setFetchCompaniesError(null);
                }
            } catch (err) {
                if (isMounted) {
                    // @ts-ignore
                    setFetchCompaniesError(err.message);
                    setCompaniesData([]);
                }
            } finally {
                isMounted && setIsCompaniesLoading(false);
            }
        }
        fetchData(dataUrl);
        const cleanUp = () => {
            isMounted = false;
            source.cancel();
        }
        return cleanUp;
    }, [dataUrl]);
    return { companiesData, fetchCompaniesError, isCompaniesLoading };
}

export default useAxiosFetchCompanies;
