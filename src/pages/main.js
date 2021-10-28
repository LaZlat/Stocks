import React, {useState} from 'react'
import Navbar from '../components/Navbar-Main';
import { Homepage } from '../components/Main';

const Main = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => {
        setIsOpen(!isOpen)
    };

    return (
        <>
        <Navbar toggle={toggle} />
        <Homepage />
        </>
    );
};

export default Main
