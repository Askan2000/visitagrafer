import React from 'react';
import { NavDropdown, Navbar } from 'react-bootstrap';
import { Link, Routes, Route } from 'react-router-dom';
import FetchDataMonthlyKPI from './FetchData/FetchDataMonthlyChange';
import FetchDataYearlyKPI from './FetchData/FetchDataYearlyChange';
import FetchDataYearlyChangeTotAndRest from './FetchData/FetchDataYearlyChangeTotAndRest'
import Home from './Home';
import FetchEurostatData from './FetchData/FetchEurostatKpi';
import FetchSpiKpi from './FetchData/FetchSpiKpi';
import OrganizeSpiDelindex from './OrganizeData/OrganizeSpiDelindex';

const Navigation: React.FC = () => {
  return (
    <>
    <Navbar data-cy="navbar" bg="light" expand="lg">
      <Navbar.Brand href="/visitagrafer">Visita grafer</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <NavDropdown data-cy="dropdown" title="Välj graf" id="basic-nav-dropdown">
          <NavDropdown.Item>
            <Link to="/visitagrafer">Hem</Link>
          </NavDropdown.Item>
          <NavDropdown.Item data-cy="dropdown-item2">
            <Link to="/kpimonthlyrestaurants">Restaurangpriser månadstakt</Link>
          </NavDropdown.Item>
          <NavDropdown.Item>
            <Link to="/kpiyearlyrestaurants">Restaurangpriser årstakt</Link>
          </NavDropdown.Item>
          <NavDropdown.Item>
            <Link to="/kpirestaurantsandtotal">KPI och restaurangpriserna</Link>
          </NavDropdown.Item>
          <NavDropdown.Item>
            <Link to="/spi">SPI per produktkategori</Link>
          </NavDropdown.Item>
          <NavDropdown.Item>
            <Link to="/kpiandspi">KPI och SPI</Link>
          </NavDropdown.Item>
          <NavDropdown.Item data-cy="dropdown-item6">
            <Link to="/eurostat">Prisutveckling restaurang norden</Link>
          </NavDropdown.Item>
        </NavDropdown>
      </Navbar.Collapse>
    </Navbar>
    <div>
      <Routes>
        <Route path="/visitagrafer" element = {<Home/>}/>
        <Route path="/kpimonthlyrestaurants" element = {<FetchDataMonthlyKPI/>}/>
        <Route path="/kpiyearlyrestaurants" element = {<FetchDataYearlyKPI/>}/>
        <Route path="/kpirestaurantsandtotal" element = {<FetchDataYearlyChangeTotAndRest/>}/>
        <Route path="/spi" element = {<OrganizeSpiDelindex/>}/>
        <Route path="/kpiandspi" element = {<FetchSpiKpi/>}/>
        <Route path="/eurostat" element = {<FetchEurostatData/>}/>
      </Routes>
    </div>
    </>
  );
}

export default Navigation;