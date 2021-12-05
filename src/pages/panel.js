import React, {useState} from 'react'
import Navbar from '../components/Navbar-Main';
import { Panel } from '../components/Panel';
import Sidebar from '../components/Sidebar-Main';

const PanelPage = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => {
        setIsOpen(!isOpen)
    };

    return (
        <>
        <Sidebar isOpen={isOpen} toggle={toggle} />
        <Navbar toggle={toggle} />
        <Panel />
        </>
    );
};

export default PanelPage;
