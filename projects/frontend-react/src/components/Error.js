import React from 'react';
import { useNavigate } from "react-router-dom";
import '../assets/css/error.css'
function Error() {
    const navigate = useNavigate();
    return (
        <div className='fourohfour'>
            <div className='img-404'></div>
            <div className='text'>
                <p className="p1-err">404 Error</p>
                <p className='p2-err'>Couldn't launch :(</p>
                <p className='p3-err'>Page Not Found - lets take you <button className='button-err' onClick={() => navigate(-1)}> BACK</button></p>
            </div>
        </div>
    );
}
export default Error;