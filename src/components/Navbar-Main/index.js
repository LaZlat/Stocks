import React, {useState, useEffect} from 'react'
import { Nav, NavbarContainer, NavLogo, MobileIcon, NavMenu, NavItem, NavLinks2, NavBtn, NavBtnLink} from '../Navbar/NavbarElements';
import {FaBars} from 'react-icons/fa';
import { animateScroll as scroll } from 'react-scroll';

const NavbarMain = ({toggle}) => {

    const toggleHome = () => {
        scroll.scrollToTop();
    }

    const [scrollNav, setScrollNav] = useState(false);

    const changeNav = () => {
        if(window.scrollY >= 80) {
            setScrollNav(true);
        } else {
            setScrollNav(false)
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', changeNav)
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
                            <NavLinks2 to='/main'>Main</NavLinks2>
                        </NavItem>
                        <NavItem>
                            <NavLinks2 to='/stocks'>Stocks</NavLinks2>
                        </NavItem>
                        <NavItem>
                            <NavLinks2 to='services'>Services</NavLinks2>
                        </NavItem>
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
