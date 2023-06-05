import { useState, useEffect } from 'react';
import axios from 'axios';

import config from '../config.json';

const useAxiosFetchBpns = () => {
    const dataUrl = config.baseURL + '/lksg_tool/bpns/';
    const [bpnsData, setBpnsData] = useState([]);
    const [fetchBpnsError, setFetchBpnsError] = useState(null);
    const [isBpnsLoading, setIsBpnsLoading] = useState(false);

    useEffect(() => {
        let isMounted = true;
        const source = axios.CancelToken.source();
        // @ts-ignore
        const fetchData = async (url) => {
            setIsBpnsLoading(true);
            try {
                const response = await axios.get(url, {
                    cancelToken: source.token
                });
                if (isMounted) {
                    setBpnsData(response.data);
                    setFetchBpnsError(null);
                }
            } catch (err) {
                if (isMounted) {
                    // @ts-ignore
                    setFetchBpnsError(err.message);
                    setBpnsData([]);
                }
            } finally {
                isMounted && setIsBpnsLoading(false);
            }
        }
        fetchData(dataUrl);
        const cleanUp = () => {
            isMounted = false;
            source.cancel();
        }
        return cleanUp;
    }, [dataUrl]);
    return { bpnsData, fetchBpnsError, isBpnsLoading };
}

export default useAxiosFetchBpns;
