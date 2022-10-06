import {useNavigate,useLocation} from "react-router-dom";
import React, {useEffect, useState} from 'react'
import {ReactComponent as HistoryIcon} from "../assets/svg/localOfferIcon.svg";
import {ReactComponent as SettingsIcon} from "../assets/svg/icons8-settings.svg";
import {ReactComponent as ExploreIcon} from "../assets/svg/exploreIcon.svg";
import {ReactComponent as PersonOutlineIcon} from "../assets/svg/personOutlineIcon.svg";
import AuthService from "../services/auth.service";

function Navbar () {
    const navigate = useNavigate();
    const location= useLocation();
    const [role,setRole]= useState('ROLE_USER')

    const pathMatchRoute = (route) => {
        if(route===location.pathname){
            return true;
        }
    }
    useEffect(()=>{
        try {
            if(AuthService.getCurrentUser().roles[0]==="ROLE_ADMIN"){
                setRole("ROLE_ADMIN")
            }else if(AuthService.getCurrentUser().roles[1]==="ROLE_ADMIN"){
                setRole("ROLE_ADMIN")
            }

        }catch (e) {
            setRole('ROLE_USER')
        }
    })


return (
    <footer className={"navbar"}>
        <nav className={"navbarNav"}>
            <ul className={"navbarListItems"}>
                <li className={"navbarListItem"} onClick={()=>navigate('/')}>
                    <ExploreIcon fill={pathMatchRoute('/') ? '#2c2c2c':'#8f8f8f'} width={'36px'} height={'36px'}/>
                    <p className={pathMatchRoute('/') ?'navbarListItemNameActive':'navbarListItemName'}>Explore</p>
                </li>
                <li className={"navbarListItem"} onClick={()=> navigate('/history')}>
                    <HistoryIcon fill={pathMatchRoute('/history')?'#2c2c2c': '#8f8f8f'} width={'36px'} height={'36px'}/>
                    <p className={pathMatchRoute('/history')? 'navbarListItemNameActive':'navbarListItemName'}>History</p>
                </li>
                { role==='ROLE_ADMIN' &&
                <li className={"navbarListItem"} onClick={()=>navigate('/admin')}>
                    <SettingsIcon fill={pathMatchRoute('/admin')?'#2c2c2c': '#8f8f8f'} width={'36px'} height={'36px'}/>
                    <p className={pathMatchRoute('/admin') ? 'navbarListItemNameActive':'navbarListItemName'}>Admin</p>
                </li>
                }
                <li className={"navbarListItem"} onClick={()=>navigate('/profile')}>
                    <PersonOutlineIcon fill={pathMatchRoute('/profile')?'#2c2c2c': '#8f8f8f'} width={'36px'} height={'36px'}/>
                    <p className={pathMatchRoute('/profile') ? 'navbarListItemNameActive':'navbarListItemName'}>Profile</p>
                </li>
            </ul>
        </nav>
    </footer>
)
}
export default Navbar