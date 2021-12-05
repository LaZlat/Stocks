import React, {useState} from 'react'
import { StockDetails } from '../components/StockDetails'
import Navbar from '../components/Navbar-Main';
import Sidebar from '../components/Sidebar-Main';

const StockDetailsPage = () => {

    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => {
        setIsOpen(!isOpen)
    };

    return (
        <>
        <Sidebar isOpen={isOpen} toggle={toggle} />
        <Navbar toggle={toggle} />
        <StockDetails />
        </>
    )
}

export default StockDetailsPage
