import React, {useState} from 'react'
import { Settings } from '../components/Settings'
import Navbar from '../components/Navbar-Main';

const SettingsPage = () => {

    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => {
        setIsOpen(!isOpen)
    };

    return (
        <>
        <Navbar toggle={toggle} />
        <Settings />
        </>
    )
}

export default SettingsPage
