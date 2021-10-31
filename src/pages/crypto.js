import React, {useState} from 'react'
import { CryptoDetails } from '../components/CryptoDetails'
import Navbar from '../components/Navbar-Main';

const CryptoDetailsPage = () => {

    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => {
        setIsOpen(!isOpen)
    };

    return (
        <>
        <Navbar toggle={toggle} />
        <CryptoDetails />
        </>
    )
}

export default CryptoDetailsPage
