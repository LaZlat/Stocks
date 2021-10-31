import React, {useState} from 'react'
import { Cryptos } from '../components/Cryptos'
import Navbar from '../components/Navbar-Main';

const CryptosPage = () => {

    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => {
        setIsOpen(!isOpen)
    };

    return (
        <>
        <Navbar toggle={toggle} />
        <Cryptos />
        </>
    )
}

export default CryptosPage
