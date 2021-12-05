import React, {useState} from 'react'
import Navbar from '../components/Navbar-Main';
import { Homepage } from '../components/Main';
import Sidebar from '../components/Sidebar-Main';

const Main = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => {
        setIsOpen(!isOpen)
    };

    return (
        <>
        <Sidebar isOpen={isOpen} toggle={toggle} />
        <Navbar toggle={toggle} />
        <Homepage />
        </>
    );
};

export default Main
