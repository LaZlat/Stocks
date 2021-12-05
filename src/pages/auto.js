import React, {useState} from 'react'
import { Auto } from '../components/Auto'
import Navbar from '../components/Navbar-Main';
import Sidebar from '../components/Sidebar-Main';

const AutoPage = () => {

    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => {
        setIsOpen(!isOpen)
    };

    return (
        <>
        <Sidebar isOpen={isOpen} toggle={toggle} />
        <Navbar toggle={toggle} />
        <Auto />
        </>
    )
}

export default AutoPage
