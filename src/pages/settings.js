import React, {useState} from 'react'
import { Settings } from '../components/Settings'
import Navbar from '../components/Navbar-Main';
import Sidebar from '../components/Sidebar-Main';

const SettingsPage = () => {

    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => {
        setIsOpen(!isOpen)
    };

    return (
        <>
        <Sidebar isOpen={isOpen} toggle={toggle} />
        <Navbar toggle={toggle} />
        <Settings />
        </>
    )
}

export default SettingsPage
