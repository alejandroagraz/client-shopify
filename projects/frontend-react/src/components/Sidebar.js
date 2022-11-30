import React from 'react';
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form';
import {getProducts, searchProducts} from '../features/product/productAction'
function Sidebar() {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const dispatch = useDispatch()
    const onSubmit = async (data, e) => {
        dispatch(searchProducts(data))
        e.target.reset();
    }
    return (
        <aside id="sidebar">
            <div id="search" className="sidebar-item">
                <h3>searcher</h3>
                <p>Find your product</p>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        {...register("search", {
                            required: "Please enter your text",
                        })}/>
                    {
                        errors.search &&
                        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
                            {errors.search.message}
                        </div>
                    }
                    <input
                        type="submit"
                        className="bg-gray-700 w-20 mt-5 p-2 mr-2 rounded-md text-white hover:cursor-pointer hover:bg-gray-900"
                        value="Search"
                    />
                    <input
                        type="button"
                        className="bg-yellow-700 w-20 mt-5 p-2 ml-2 rounded-md text-white hover:cursor-pointer hover:bg-yellow-900"
                        value="Clean"
                        onClick={() => dispatch(getProducts())}
                    />
                </form>
            </div>
        </aside>
    );
}
export default Sidebar;