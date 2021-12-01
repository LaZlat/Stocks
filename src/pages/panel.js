import React, {useState} from 'react'
import Navbar from '../components/Navbar-Main';
import { Panel } from '../components/Panel';

const PanelPage = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => {
        setIsOpen(!isOpen)
    };

    return (
        <>
        <Navbar toggle={toggle} />
        <Panel />
        </>
    );
};

export default PanelPage;
