import { Route, Routes } from 'react-router-dom';
import './App.css';
import Bpns from "./Bpns";
import Home from "./Home";
import Layout from "./Layout";
import Missing from "./Missing";
import NewBpn from "./bpns/NewBpn";
import {DataProvider} from "./context/DataContext";
import {ViewDataProvider} from "./context/ViewDataContext";
import Investigations from "./Investigations";
import Investigation from "./investigations/Investigation";
import NewInvestigation from "./investigations/NewInvestigation";
import Companies from "./Companies";
import NewCompany from "./companies/NewCompany";

export const bpnRegex = /^BPN[ALS][0-9A-Za-z]{10}[0-9A-Za-z]{2}$/;

function App() {
  return (
      <DataProvider>
          <ViewDataProvider>
              <Routes>
                  <Route path="/" element={<Layout />}>
                      <Route index element={<Home />} />
                      <Route path="investigations">
                          <Route index element={<Investigations />} />
                          <Route path=":id" element={<Investigation />} />
                          <Route path="reg" element={<NewInvestigation />} />
                      </Route>
                      <Route path="companies">
                          <Route index element={<Companies />} />
                          <Route path="reg" element={<NewCompany />} />
                      </Route>
                      <Route path="bpns">
                          <Route index element={<Bpns />} />
                          <Route path="reg" element={<NewBpn />} />
                      </Route>
                      <Route path="*" element={<Missing />} />
                  </Route>
              </Routes>
          </ViewDataProvider>
      </DataProvider>
  );
}

export default App;
