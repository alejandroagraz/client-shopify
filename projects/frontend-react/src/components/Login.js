import React, {useEffect} from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../features/login/loginAction'
import { getProducts } from '../features/product/productAction'
function Login() {
    const navigate = useNavigate();
    const { register, formState: { errors }, handleSubmit } = useForm();
    const { loading, error, userToken } = useSelector((state) => state.login)
    const { products } = useSelector((state) => state.product)
    const dispatch = useDispatch()
    useEffect(() => {
        if (userToken) {
            dispatch(getProducts())
            if (products)
                navigate('/home')
        }
    }, [navigate, userToken, products, dispatch])
    const onSubmit = async (data, e) => {
        dispatch(login(data))
        e.target.reset();
        // debugger
    };

    const viewMessage = (loading) => {
        return(
            <div className="bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto">
                <p>{loading}</p>
            </div>
        )
    }
    return (
        <div className="bg-gray-800 min-h-screen flex flex-col justify-center">
            <h1 className="text-center text-2xl text-white font-light">Login</h1>

            {loading && viewMessage(loading)}
            {error && viewMessage(error)}

            <div className="flex justify-center mt-5">
                <div className="w-full max-w-sm">
                    <form
                        className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                                Username
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Email Or Username"
                                {...register("username", {
                                    required: "Please check the Username",
                                })}
                            ></input>
                        </div>
                        {
                            errors.username &&
                            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
                                {errors.username.message}
                            </div>
                        }

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                Password
                            </label>
                            <input
                                type="password"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Password Usuario"
                                {...register("password", {
                                    required: "Please enter your password",
                                })}
                            ></input>
                        </div>
                        {
                            errors.password &&
                            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
                                {errors.password.message}
                            </div>
                        }
                        <input
                            type="submit"
                            className="block bg-gray-800 w-full mt-5 p-2 text-white uppercas hover:cursor-pointer hover:bg-gray-900"
                            value="Iniciar Sesión"
                        />
                    </form>
                </div>
            </div>
        </div>
    );
}
export default Login;