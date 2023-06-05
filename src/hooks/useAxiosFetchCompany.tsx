import { useState, useEffect } from 'react';
import axios from 'axios';

import config from '../config.json';

const useAxiosFetchCompany = (id: unknown) => {
    const dataUrl = config.baseURL + '/kiadvanyok/' + id;
    const [kiadvany, setKiadvany] = useState({});
    const [kiadvanyData, setKiadvanyData] = useState({});
    const [fetchKiadvanyError, setFetchKiadvanyError] = useState(null);
    const [isKiadvanyLoading, setIsKiadvanyLoading] = useState(false);

    useEffect(() => {
        let isMounted = true;
        const source = axios.CancelToken.source();
        const fetchData = async (url: string, id: any) => {
            setIsKiadvanyLoading(true);
            try {
                const response = await axios.get(url, {
                    cancelToken: source.token
                });
                if (isMounted) {
                    setKiadvanyData(response.data);
                    setFetchKiadvanyError(null);
                }
            } catch (err) {
                if (isMounted) {
                    // @ts-ignore
                    setFetchKiadvanyError(err.message);
                    setKiadvanyData({});
                }
            } finally {
                isMounted && setIsKiadvanyLoading(false);
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
        setKiadvany(kiadvanyData);
    }, [kiadvanyData]);

    return { kiadvany, fetchKiadvanyError, isKiadvanyLoading };
}

export default useAxiosFetchCompany;
