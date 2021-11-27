import React, {useState} from 'react'
import Navbar from '../components/Navbar-Main';
import { News } from '../components/News';

const NewsPage = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => {
        setIsOpen(!isOpen)
    };

    return (
        <>
        <Navbar toggle={toggle} />
        <News />
        </>
    );
};

export default NewsPage
