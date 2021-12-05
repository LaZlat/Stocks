import React, {useState} from 'react'
import { Cryptos } from '../components/Cryptos'
import Navbar from '../components/Navbar-Main';
import Sidebar from '../components/Sidebar-Main';


const CryptosPage = () => {

    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => {
        setIsOpen(!isOpen)
    };

    return (
        <>
        <Sidebar isOpen={isOpen} toggle={toggle} />
        <Navbar toggle={toggle} />
        <Cryptos />
        </>
    )
}

export default CryptosPage
