import React from 'react'
import { Nav, NavbarContainer, NavLogo, MobileIcon, NavMenu, NavItem, NavLinks2, NavBtn, NavBtnLink} from '../Navbar/NavbarElements';
import {FaBars} from 'react-icons/fa';
import { animateScroll as scroll } from 'react-scroll';

const NavbarMain = ({toggle}) => {

    const toggleHome = () => {
        scroll.scrollToTop();
    }
    
    return (
        <>
            <Nav>
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
                            <NavLinks2 to='/exchanges'>Discover</NavLinks2>
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
