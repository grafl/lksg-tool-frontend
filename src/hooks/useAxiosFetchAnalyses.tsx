import { useState, useEffect } from 'react';
import axios from 'axios';

import config from '../config.json';

const useAxiosFetchAnalyses = () => {
    const dataUrl = config.baseURL + '/lksg_tool/analyses/';
    const [analysesData, setAnalysesData] = useState([]);
    const [fetchAnalysesError, setFetchAnalysesError] = useState(null);
    const [isAnalysesLoading, setIsAnalysesLoading] = useState(false);

    useEffect(() => {
        let isMounted = true;
        const source = axios.CancelToken.source();
        const fetchData = async (url: string) => {
            setIsAnalysesLoading(true);
            try {
                const response = await axios.get(url, {
                    cancelToken: source.token
                });
                if (isMounted) {
                    setAnalysesData(response.data);
                    setFetchAnalysesError(null);
                }
            } catch (err) {
                if (isMounted) {
                    // @ts-ignore
                    setFetchAnalysesError(err.message);
                    setAnalysesData([]);
                }
            } finally {
                isMounted && setIsAnalysesLoading(false);
            }
        }
        fetchData(dataUrl);
        const cleanUp = () => {
            isMounted = false;
            source.cancel();
        }
        return cleanUp;
    }, [dataUrl]);
    return { analysesData, fetchAnalysesError, isAnalysesLoading };
}

export default useAxiosFetchAnalyses;
