import React, {useState, useEffect} from 'react'
import { Nav, NavbarContainer, NavLogo, MobileIcon, NavMenu, NavItem, NavLinks2, NavBtn, NavBtnLink} from '../Navbar-Main/NavbarMainElements';
import {FaBars} from 'react-icons/fa';
import { animateScroll as scroll } from 'react-scroll';
import { HomeOutlined, MoneyCollectOutlined, BulbOutlined, FundOutlined, CiOutlined, StarOutlined, KeyOutlined } from '@ant-design/icons';


const NavbarMain = ({toggle}) => {

    const toggleHome = () => {
        scroll.scrollToTop();
    }

    const [scrollNav, setScrollNav] = useState(false);
    const [isAdmin, setAdmin] = useState(false);

    const changeNav = () => {
        if(window.scrollY >= 80) {
            setScrollNav(true);
        } else {
            setScrollNav(false)
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', changeNav)

        if (localStorage.getItem("email") == "admin@admin.com") {
            setAdmin(true);
        }
    }, []);

    
    return (
        <>
            <Nav scrollNav={scrollNav}>
                <NavbarContainer>
                    <NavLogo to="/main" onClick={toggleHome}>Elektroniniai Mainai</NavLogo>
                    <MobileIcon onClick={toggle}>
                        <FaBars />
                    </MobileIcon>
                    <NavMenu>
                        <NavItem>
                            <NavLinks2 to='/main'><HomeOutlined/> Pagrindinis</NavLinks2>
                        </NavItem>
                        <NavItem>
                            <NavLinks2 to='/cryptos'><MoneyCollectOutlined/> Virtualios valiutos</NavLinks2>
                        </NavItem>
                        <NavItem>
                            <NavLinks2 to='/stocks'><BulbOutlined /> Vertybiniai popieriai</NavLinks2>
                        </NavItem>
                        <NavItem>
                            <NavLinks2 to='/portfolio'><FundOutlined /> Portfelis</NavLinks2>
                        </NavItem>
                        <NavItem>
                            <NavLinks2 to='/auto'><CiOutlined /> Automatizavimas</NavLinks2>
                        </NavItem>
                        <NavItem>
                            <NavLinks2 to='/news'><StarOutlined /> Mokomoji medžiaga</NavLinks2>
                        </NavItem>
                        <NavItem>
                            <NavLinks2 to='/settings'><KeyOutlined /> Nustatymai</NavLinks2>
                        </NavItem>
                        {isAdmin && (
                            <NavItem>
                            <NavLinks2 to='/admin'><KeyOutlined /> Kontrolė</NavLinks2>
                        </NavItem>
                        )}
                    </NavMenu>
                    <NavBtn>
                        <NavBtnLink to='/'>Atsijungti</NavBtnLink>
                    </NavBtn>
                </NavbarContainer>
            </Nav>
        </>
    )
}

export default NavbarMain
