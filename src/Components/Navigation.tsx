import React from 'react';
import { NavDropdown, Navbar } from 'react-bootstrap';
import { Routes, Route, Link } from 'react-router-dom';
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
          <NavDropdown.Item  to="/visitagrafer" as={Link}> Hem </NavDropdown.Item>
          <NavDropdown.Item data-cy="dropdown-item2" to="/kpimonthlyrestaurants" as={Link}>
            Restaurangpriser månadstakt
          </NavDropdown.Item>
          <NavDropdown.Item to="/kpiyearlyrestaurants" as={Link}>
            Restaurangpriser årstakt
          </NavDropdown.Item>
          <NavDropdown.Item to="/kpirestaurantsandtotal" as={Link}>
            KPI och restaurangpriserna
          </NavDropdown.Item>
          <NavDropdown.Item to="/spi" as={Link}>
            SPI per produktkategori
          </NavDropdown.Item>
          <NavDropdown.Item to="/kpiandspi" as={Link}>
            KPI och SPI
          </NavDropdown.Item>
          <NavDropdown.Item data-cy="dropdown-item6" to="/eurostat" as={Link}>
            Prisutveckling restaurang norden
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