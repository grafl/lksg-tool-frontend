import { createContext, useEffect, useState } from 'react';

import useAxiosFetchBpns from '../hooks/useAxiosFetchBpns';
import useAxiosFetchCompanies from '../hooks/useAxiosFetchCompanies';
import useAxiosFetchInvestigations from '../hooks/useAxiosFetchInvestigations';
import useAxiosFetchAnalyses from "../hooks/useAxiosFetchAnalyses";
import useAxiosFetchVCompaniesAndBpns from "../hooks/useAxiosFetchVCompaniesAndBpns";

const DataContext = createContext({});

// @ts-ignore
export const DataProvider = ({ children }) => {

    const [bpns, setBpns] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [investigations, setInvestigations] = useState([]);
    const [analyses, setAnalyses] = useState([]);
    const [supplyChainImpactedInformation, setSupplyChainImpactedInformation] = useState([]);

    const { bpnsData, fetchBpnsError, isBpnsLoading } = useAxiosFetchBpns();
    const { companiesData, fetchCompaniesError, isCompaniesLoading } = useAxiosFetchCompanies();
    const { investigationsData, fetchInvestigationsError, isInvestigationsLoading } = useAxiosFetchInvestigations();
    const { analysesData, fetchAnalysesError, isAnalysesLoading } = useAxiosFetchAnalyses();
    // @ts-ignore
    const { supplyChainImpactedInformationData, fetchSupplyChainImpactedInformationError, isSupplyChainImpactedInformationLoading } = useAxiosFetchVCompaniesAndBpns();

    useEffect(() => {
        setBpns(bpnsData);
        setCompanies(companiesData);
        setInvestigations(investigationsData);
        setAnalyses(analysesData);
        setSupplyChainImpactedInformation(supplyChainImpactedInformationData);
    }, [bpnsData, companiesData, investigationsData, analysesData,
        supplyChainImpactedInformationData
    ]);
    return (
        <DataContext.Provider value={{
            bpns, setBpns, fetchBpnsError, isBpnsLoading,
            companies, setCompanies, fetchCompaniesError, isCompaniesLoading,
            investigations, setInvestigations, fetchInvestigationsError, isInvestigationsLoading,
            analyses, setAnalyses, fetchAnalysesError, isAnalysesLoading,
            supplyChainImpactedInformation, setSupplyChainImpactedInformation, fetchSupplyChainImpactedInformationError, isSupplyChainImpactedInformationLoading
        }}>
            {children}
        </DataContext.Provider>
    );
}

export default DataContext;
