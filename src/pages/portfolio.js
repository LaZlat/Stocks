import React, {useState} from 'react'
import Navbar from '../components/Navbar-Main';
import { Portfolio } from '../components/Portfolio';

const PortfolioPage = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => {
        setIsOpen(!isOpen)
    };

    return (
        <>
        <Navbar toggle={toggle} />
        <Portfolio />
        </>
    );
};

export default PortfolioPage;
