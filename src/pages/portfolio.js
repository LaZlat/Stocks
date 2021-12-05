import React, {useState} from 'react'
import Navbar from '../components/Navbar-Main';
import { Portfolio } from '../components/Portfolio';
import Sidebar from '../components/Sidebar-Main';

const PortfolioPage = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => {
        setIsOpen(!isOpen)
    };

    return (
        <>
        <Sidebar isOpen={isOpen} toggle={toggle} />
        <Navbar toggle={toggle} />
        <Portfolio />
        </>
    );
};

export default PortfolioPage;
