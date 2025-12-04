import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Dco from './interfaces/dco/Dco';
import Arf from './interfaces/dco/forms/Arf';
import Login from './interfaces/login/Login';
import RoaForm from './interfaces/dco/forms/RoaForm';
import Home from './interfaces/dco/components/Home';
import Analysts from './interfaces/analysts/Analysts';
import Home2 from './interfaces/analysts/components/Home2';
import ForAnalysis from './interfaces/analysts/renderPage/ForAnalysis';
import SampleData from './interfaces/analysts/viewdata/SampleData';
import Report from './interfaces/analysts/renderPage/Report';
import AddReport from './interfaces/analysts/forms/AddReport';
import Roa from './interfaces/analysts/renderPage/Roa';
import WalkinPage from './interfaces/dco/pages/WalkinPage';
import RegulatoryPage from './interfaces/dco/pages/RegulatoryPage';
import CornPage from './interfaces/dco/pages/CornPage';
import LguPage from './interfaces/dco/pages/LguPage';
import ResearchPage from './interfaces/dco/pages/ResearchPage';
import ReportsPage from './interfaces/dco/pages/ReportsPage';
import RoaData from './interfaces/dco/viewData/RoaData';
import UpdateRequest from './interfaces/dco/pages/UpdateRequest';
import UpdateReport from './interfaces/dco/pages/UpdateReport';
import Released from './interfaces/dco/pages/Released';
import ArfData from './interfaces/dco/viewData/ArfData';
import ForReleaseRoa from './interfaces/dco/pages/ForReleaseRoa';
import HVCpage from './interfaces/dco/pages/HVCpage';
import RicePage from './interfaces/dco/pages/RicePage';
import GApage from './interfaces/dco/pages/GApage';
import GenerateRoa from './interfaces/dco/forms/GenerateRoa';

const router = createBrowserRouter([

  {
    path: "/", element: <Login />,
  },

  {
    path: "/Dco",
    element: <Dco />,
    children: [
      { path: "Home", element: <Home /> },
      { path: "RoaForm", element: <RoaForm /> },
      { path: "Arf", element: <Arf /> },
      { path: "Walkin", element: <WalkinPage /> },
      { path: "Regulatory", element: <RegulatoryPage /> },
      { path: "CornProgram", element: <CornPage /> },
      { path: "LGU", element: <LguPage /> },
      { path: "Research", element: <ResearchPage /> },
      { path: "Reports", element: <ReportsPage /> },
      { path: "reportDetails/:id", element: <RoaData /> },
      { path: "requestDetails/:id", element: <ArfData /> },
      { path: "updateArf/:id", element: <UpdateRequest /> },
      { path: "updateRoa/:id", element: <UpdateReport /> },
      { path: "Released", element: <Released /> },
      { path: "ForRelease", element: <ForReleaseRoa /> },
      { path: "HVCrops", element: <HVCpage /> },
      { path: "Rice Program", element: <RicePage /> },
      { path: "Government Agency", element: <GApage/> },
      { path: "GenerateRoa/:id", element: <GenerateRoa />}
    ],
  },

  {
    path: "/Analysts",
    element: <Analysts />,
    children: [
      { path: "Home", element: <Home2 /> },
      { path: "Analysis", element: <ForAnalysis /> },
      { path: "display/:id", element: <SampleData /> },
      { path: "Report", element: <Report /> },
      { path: "AddReport", element: <AddReport /> },
      { path: "Roa", element: <Roa /> }
    ]
  }


]);



function App() {
  return <RouterProvider router={router} />;
}

export default App
