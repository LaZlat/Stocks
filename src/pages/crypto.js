import React, {useState} from 'react'
import { CryptoDetails } from '../components/CryptoDetails'
import Navbar from '../components/Navbar-Main';
import Sidebar from '../components/Sidebar-Main';

const CryptoDetailsPage = () => {

    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => {
        setIsOpen(!isOpen)
    };

    return (
        <>
        <Sidebar isOpen={isOpen} toggle={toggle} />
        <Navbar toggle={toggle} />
        <CryptoDetails />
        </>
    )
}

export default CryptoDetailsPage
