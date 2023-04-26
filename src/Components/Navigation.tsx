import React from 'react';
import { NavDropdown, Navbar } from 'react-bootstrap';
import { Link, Routes, Route } from 'react-router-dom';
import FetchDataMonthlyKPI from './FetchDataMonthlyChange';
import FetchDataYearlyKPI from './FetchDataYearlyChange';
import FetchDataYearlyChangeTotAndRest from './FetchDataYearlyChangeTotAndRest'
import Home from './Home';
import KpiAndSPI from './KpiAndSPI'


const Navigation: React.FC = () => {
  return (
    <>
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/">Visita grafer</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <NavDropdown title="Välj graf" id="basic-nav-dropdown">
          <NavDropdown.Item>
            <Link to="/">Home</Link>
          </NavDropdown.Item>
          <NavDropdown.Item>
            <Link to="/FetchDataMonthlyKPI">Restaurangpriser månadstakt</Link>
          </NavDropdown.Item>
          <NavDropdown.Item>
            <Link to="/FetchDataYearlyKPI">Restaurangpriser årstakt</Link>
          </NavDropdown.Item>
          <NavDropdown.Item>
            <Link to="/FetchDataYearlyTotAndRest">KPI och restaurangpriserna</Link>
          </NavDropdown.Item>
          <NavDropdown.Item>
            <Link to="/KPI_SPI">KPI och SPI</Link>
          </NavDropdown.Item>
        </NavDropdown>
      </Navbar.Collapse>
    </Navbar>
    <div>
      <Routes>
        <Route path="/" element = {<Home/>}/>
        <Route path="/FetchDataMonthlyKPI" element = {<FetchDataMonthlyKPI/>}/>
        <Route path="/FetchDataYearlyKPI" element = {<FetchDataYearlyKPI/>}/>
        <Route path="/FetchDataYearlyTotAndRest" element = {<FetchDataYearlyChangeTotAndRest/>}/>
        <Route path="/KPI_SPI" element = {<KpiAndSPI/>}/>

      </Routes>
    </div>
    </>
  );
}

export default Navigation;