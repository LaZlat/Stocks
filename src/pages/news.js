import React, {useState} from 'react'
import Navbar from '../components/Navbar-Main';
import { News } from '../components/News';
import Sidebar from '../components/Sidebar-Main';

const NewsPage = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => {
        setIsOpen(!isOpen)
    };

    return (
        <>
        <Sidebar isOpen={isOpen} toggle={toggle} />
        <Navbar toggle={toggle} />
        <News />
        </>
    );
};

export default NewsPage
