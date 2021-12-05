import React, {useEffect, useState} from 'react'
import { SidebarContainer, Icon, CloseIcon, SidebarWrapper, SidebarMenu, SidebarLink, SideBtnWrap, SidebarRoute} from './SidebarMainElements';


const Sidebar = ({isOpen,toggle}) => {

    const [isAdmin, setAdmin] = useState(false);

    useEffect(() => {
        if (localStorage.getItem("email") == `${process.env.REACT_APP_ADMIN}`) {
            setAdmin(true);
        }
    }, []);

    return (
        <SidebarContainer isOpen={isOpen} onClick={toggle}>
            <Icon onClick={toggle}>
                <CloseIcon />
            </Icon>
            <SidebarWrapper>
                <SidebarMenu>
                    <SidebarLink to='/main' onClick={toggle}>Pagrindinis</SidebarLink>
                    <SidebarLink to='/cryptos' onClick={toggle}>Virtualios valiutos</SidebarLink>
                    <SidebarLink to='/stocks' onClick={toggle}>Vertybiniai popieriai</SidebarLink>
                    <SidebarLink to='/portfolio' onClick={toggle}>Portfelis</SidebarLink>
                    <SidebarLink to='/auto' onClick={toggle}>Automatizavimas</SidebarLink>
                    <SidebarLink to='/news' onClick={toggle}>Mokomoji medžiaga</SidebarLink>
                    <SidebarLink to='/settings' onClick={toggle}>Nustatymai</SidebarLink>
                    {isAdmin && (
                        <SidebarLink to='/admin' onClick={toggle}>Kontrolė</SidebarLink>
                        )}
                </SidebarMenu>
                <SideBtnWrap>
                    <SidebarRoute to='/' >Atsijungti</SidebarRoute>
                </SideBtnWrap>
            </SidebarWrapper>
        </SidebarContainer>
    )
}

export default Sidebar
