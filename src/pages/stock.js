import React, {useState} from 'react'
import { StockDetails } from '../components/StockDetails'
import Navbar from '../components/Navbar-Main';

const StockDetailsPage = () => {

    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => {
        setIsOpen(!isOpen)
    };

    return (
        <>
        <Navbar toggle={toggle} />
        <StockDetails />
        </>
    )
}

export default StockDetailsPage
