import React  from 'react';
import { NavLink,  } from 'react-router-dom'
import '../assets/css/error.css'

const ProtectedRoute = () => {
    return (
        <div className='fourohfour'>
            <div className='img-401'></div>
            <div className='text'>
                <p className="p1-err">401 Error</p>
                <p className='p2-err'>"Oops, you can't pass there! Sorry" :(</p>
                <NavLink to='/login' className='button-err'>Login</NavLink> to gain access
            </div>
        </div>
    )

}

export default ProtectedRoute
