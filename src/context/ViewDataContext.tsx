import {createContext, useContext, useEffect, useState} from 'react';

import useAxiosFetchVCompaniesAndBpns from "../hooks/useAxiosFetchVCompaniesAndBpns";
import useAxiosFetchVInvestigations from "../hooks/useAxiosFetchVInvestigations";
import useAxiosFetchVBpns from "../hooks/useAxiosFetchVBpns";

const ViewDataContext = createContext({});

// @ts-ignore
export const ViewDataProvider = ({ children }) => {

    const [vInvestigations, setVInvestigations] = useState([]);
    const [vCompaniesAndBpns, setVCompaniesAndBpns] = useState([]);
    const [vBpns, setVBpns] = useState([]);

    const { vInvestigationsData, fetchVInvestigationsError, isVInvestigationsLoading } = useAxiosFetchVInvestigations();
    const { vCompaniesAndBpnsData, fetchVCompaniesAndBpnsError, isVCompaniesAndBpnsLoading } = useAxiosFetchVCompaniesAndBpns();
    const { vBpnsData, fetchVBpnsError, isVBpnsLoading } = useAxiosFetchVBpns();

    useEffect(() => {
        setVInvestigations(vInvestigationsData);
        setVCompaniesAndBpns(vCompaniesAndBpnsData);
        setVBpns(vBpnsData);
    }, [vInvestigationsData, vCompaniesAndBpnsData, vBpnsData]);
    return (
        <ViewDataContext.Provider value={{
            vInvestigations, setVInvestigations, fetchVInvestigationsError, isVInvestigationsLoading,
            vCompaniesAndBpns, setVCompaniesAndBpns, fetchVCompaniesAndBpnsError, isVCompaniesAndBpnsLoading,
            vBpns, setVBpns, fetchVBpnsError, isVBpnsLoading
        }}>
            {children}
        </ViewDataContext.Provider>
    );
}

export default ViewDataContext;
