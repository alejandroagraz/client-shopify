import React from 'react';
import Slider from './Slider';
import Sidebar from './Sidebar';
import Products from "./Products";
import Footer from "./Footer";
import Header from "./Header";
function Home() {
    return (
        <>
            <Header />
            <Slider />
            <div className="center">
                <div id="content">
                    <h1 className="subheader">List Products</h1>
                    <Products/>
                </div>
                <Sidebar />
            </div>
            <Footer />
        </>
    );
}
export default Home;