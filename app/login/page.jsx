"use client"
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation';
import { useState } from 'react'
import { toastOptions } from '../components/toast'
import { ToastContainer, toast } from "react-toastify";
import axios from 'axios';
import Link from 'next/link'
const Login = () => {
    const load = true;
    const router = useRouter();
    useEffect(() => {
        // console.log("hell")
        const token = localStorage.getItem('token');
        if (token) {
            router.replace('/profile');
        }
        // console.log(token);
    }, [load]);

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(userName,password);
        toast.success("Waiting for server response!", toastOptions);
        try {
            const data = await axios.post('/api/auth/login', {
                userName: userName,
                password: password
            })
            // console.log(data);
            const token = data.data.token;
            // console.log(token);
            if (!token) {
                toast.error("Invalid Credentials", toastOptions);
                console.log("Invalid credentials");
                return;
            }
            else {
                toast.success("Login Successful!", toastOptions);
                localStorage.setItem('token', token);
                // console.log("Login Successful");
                router.replace('/profile')
            }
        }
        catch (error) {
            toast.error("Invalid credentials", toastOptions);
            console.log(error);
        }

    }
    return (
        <div>

            <section className="bg-gray-200">
                <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
                    <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
                        <img
                            alt=""
                            src="https://images.unsplash.com/photo-1617195737496-bc30194e3a19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
                            className="absolute inset-0 h-full w-full object-cover opacity-80"
                        />

                        <div className="hidden lg:relative lg:block lg:p-12">
                            <a className="block text-white" href="#">
                                <span className="sr-only">Home</span>

                            </a>

                            <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
                                Welcome to Extrovertion
                            </h2>

                            <p className="mt-4 leading-relaxed text-white/90">
                                Bringing people closer, one connection at a time
                            </p>
                        </div>
                    </section>

                    <main
                        className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6"
                    >
                        <div className="max-w-xl lg:max-w-3xl">
                            <div className="relative -mt-16 block lg:hidden">
                                <div className='h-8'>

                                </div>

                                <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                                    Welcome to Extrovertion
                                </h1>

                                <p className="mt-4 leading-relaxed text-gray-500">
                                    Bringing people closer, one connection at a time.
                                </p>
                            </div>
                            <div className='sm:hidden lg:block text-3xl font-extrabold '>
                                LogIn to your Extrovertion Account
                            </div>

                            <form action="#" className="mt-8 grid grid-cols-6 gap-6">

                                <div className="col-span-6 h-8 sm:col-span-6">
                                    <label htmlFor="FirstName" className="block text-sm font-medium text-gray-700">
                                        Username
                                    </label>

                                    <input
                                        onChange={(e) => setUserName(e.target.value)}
                                        type="text"
                                        id="FirstName"
                                        name="first_name"
                                        className="px-2 mt-1 w-full h-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                                    />
                                </div>

                                <div className='h-[1/2]'></div>


                                <div className="col-span-6 h-8 sm:col-span-6">
                                    <label htmlFor="Password" className="block text-sm font-medium text-gray-700"> Password </label>

                                    <input
                                        onChange={(e) => setPassword(e.target.value)}
                                        type="password"
                                        id="Password"
                                        name="password"
                                        className="mt-1 px-2 w-full h-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                                    />
                                </div>


                                <div className='h-2'></div>


                                <div className="col-span-6">
                                    <p className="text-sm text-gray-500">
                                        By creating an account, you agree to our
                                        terms and conditions
                                        and
                                        privacy policy
                                    </p>
                                </div>

                                <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                                    <button
                                        onClick={(e) => handleSubmit(e)}
                                        className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
                                    >
                                        Create an account
                                    </button>

                                    <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                                        Don't have an account?
                                        <Link href="/register" className="text-gray-700 underline">Create Account</Link>.
                                    </p>
                                </div>
                            </form>
                        </div>
                    </main>
                </div>
            </section>
            <ToastContainer />
        </div>
    )
}

export default Login
