import { useState, useEffect } from 'react';
import axios from 'axios';

import config from '../config.json';
import {useLocation} from "react-router-dom";

const useAxiosFetchVBpns = () => {
    const dataUrl = config.baseURL + '/lksg_tool/bpns/v/';
    const [vBpnsData, setVBpnsData] = useState([]);
    const [fetchVBpnsError, setFetchVBpnsError] = useState(null);
    const [isVBpnsLoading, setIsVBpnsLoading] = useState(false);
    const { pathname } = useLocation();
    //console.log(pathname);

    useEffect(() => {
        let isMounted = true;
        const source = axios.CancelToken.source();
        const fetchData = async (url: string) => {
            setIsVBpnsLoading(true);
            try {
                const response = await axios.get(url, {
                    cancelToken: source.token
                });
                if (isMounted) {
                    setVBpnsData(response.data);
                    setFetchVBpnsError(null);
                }
            } catch (err) {
                if (isMounted) {
                    // @ts-ignore
                    setFetchVBpnsError(err.message);
                    setVBpnsData([]);
                }
            } finally {
                isMounted && setIsVBpnsLoading(false);
            }
        }
        fetchData(dataUrl);
        const cleanUp = () => {
            isMounted = false;
            source.cancel();
        }
        return cleanUp;
    }, [dataUrl, pathname]);
    return { vBpnsData, fetchVBpnsError, isVBpnsLoading };
}

export default useAxiosFetchVBpns;
