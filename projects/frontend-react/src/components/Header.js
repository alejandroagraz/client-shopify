import React  from 'react';
import { useDispatch } from 'react-redux'
import logo from '../assets/images/logo.svg';
import { NavLink } from 'react-router-dom';
import { logout } from '../features/login/loginSlice'
function Header() {
    const dispatch = useDispatch()
    return (
        <header id="header">
            <nav className="bg-white border-gray-200 dark:bg-gray-900">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl px-4 md:px-6 py-2.5">
                    <a href="https://flowbite.com" className="flex items-center">
                        <img src={logo} className="app-logo"
                             alt="Logo"/>
                        <span
                            className="self-center text-xl whitespace-nowrap dark:text-white"><strong>Shopify</strong>Client</span>
                    </a>
                    <div className="flex items-center pr-8">
                        <NavLink to={'/login'} onClick={() => dispatch(logout())}>
                            <svg className="h-15 w-15 text-blue-500" width="40" height="40" viewBox="0 0 24 24"
                                 strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round"
                                 strokeLinejoin="round" >
                                <path stroke="none" d="M0 0h24v24H0z"/>
                                <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2"/>
                                <path d="M7 12h14l-3 -3m0 6l3 -3"/>
                            </svg>
                        </NavLink>
                    </div>
                </div>
            </nav>
            <div className="clearfix"></div>
         </header>
    );
}
export default Header;