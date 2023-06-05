import { useContext } from 'react';
import DataContext from './context/DataContext';
import Dashboard from "./Dashboard";

const Home = () => {

    const {
        // @ts-ignore
        investigations,
        // @ts-ignore
        bpns,
        // @ts-ignore
        companies,
    } = useContext(DataContext);

    return (
        <main className="Home">
            <Dashboard investigations={investigations.length} bpns={bpns.length} companies={companies.length} />
        </main>
    );
}

export default Home;
