import React, {useState} from 'react'
import { Auto } from '../components/Auto'
import Navbar from '../components/Navbar-Main';

const AutoPage = () => {

    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => {
        setIsOpen(!isOpen)
    };

    return (
        <>
        <Navbar toggle={toggle} />
        <Auto />
        </>
    )
}

export default AutoPage
