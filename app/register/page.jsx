"use client"
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';
import { toastOptions } from '../components/toast'
import { ToastContainer, toast } from "react-toastify";
const Register = () => {
    const router = useRouter();
    const load = true;
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            router.replace('/profile');
        }
    }, [load]);
    const [name, setName] = useState("");
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    function isAlphanumeric(str) {
        return /^[a-zA-Z0-9]+$/.test(str);
    }
    const [confirmPassword, setConfirmPassword] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // console.log(password.length);
            if (password.length < 8 || password.length > 12) {
                toast.error('Passwords should atleast 8 digits and at most 12.', toastOptions);
                return;
            }
            if (password !== confirmPassword) {
                toast.error('Passwords do not match!', toastOptions);
                return;
            }
            if (!isAlphanumeric(userName)) { 
                toast.error('Username should be alphanumeric!', toastOptions);
                return;
            }
            toast.success("Waiting for server response!", toastOptions);
            const token = await axios.post('/api/auth/register', {
                fullName: name,
                userName: userName,
                email: email,
                password: password,
                profileImage: imageUrl,
                description: "Hey there! I am using Extrovertion"
            })
            // console.log(token.data.data);
            localStorage.setItem('token', token.data.data);
            toast.success("Account Created Successfully!", toastOptions);
            router.push('/');
            // console.log(name, userName, email, password, confirmPassword, imageUrl);
        }
        catch (error) {
            console.log(error);
            toast.error("An Error Occured", toastOptions);
        }
    };
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
                                Create an Extrovertion Account
                            </div>

                            <form className="mt-8 grid grid-cols-6 gap-6">
                                <div className="col-span-6 mb-6 h-8 sm:col-span-6">
                                    <label htmlFor="FirstName" className="block text-sm font-medium text-gray-700">
                                        Full Name
                                    </label>

                                    <input
                                        onChange={(e) => setName(e.target.value)}
                                        type="text"
                                        id="FirstName"
                                        name="first_name"
                                        className="px-2 mt-1 w-full h-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                                    />
                                </div>
                                <div className="col-span-6 h-8 sm:col-span-6">
                                    <label htmlFor="FirstName" className="block text-sm font-medium text-gray-700">
                                        Username
                                    </label>

                                    <input
                                        onChange={(e) => setUserName(e.target.value)}
                                        type="text"
                                        id="userName"
                                        name="first_name"
                                        className="px-2 mt-1 w-full h-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                                    />
                                </div>

                                <div className='h-[1/2]'></div>
                                <div className="col-span-6">
                                    <label htmlFor="Email" className="block h-4 text-sm font-medium text-gray-700"> Email </label>

                                    <input
                                        onChange={(e) => setEmail(e.target.value)}
                                        type="email"
                                        id="Email"
                                        name="email"
                                        className="mt-1 px-2 w-full h-[80%] rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                                    />
                                </div>

                                <div className="col-span-6 h-8 sm:col-span-3">
                                    <label htmlFor="Password" className="block text-sm font-medium text-gray-700"> Password </label>

                                    <input
                                        onChange={(e) => setPassword(e.target.value)}
                                        type="password"
                                        id="Password"
                                        name="password"
                                        className="mt-1 px-2 w-full h-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                                    />
                                </div>

                                <div className="col-span-6 h-8 sm:col-span-3">
                                    <label htmlFor="PasswordConfirmation" className="block text-sm font-medium text-gray-700">
                                        Password Confirmation
                                    </label>

                                    <input
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        type="password"
                                        id="PasswordConfirmation"
                                        name="password_confirmation"
                                        className="mt-1 px-2 w-full h-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                                    />
                                </div>
                                <div className='h-2'></div>
                                <div class="p-4 max-w-md mx-auto">
                                    <h2 class="text-lg font-semibold mb-3 text-center">Select Your Avatar</h2>
                                    <div class="flex w-[100%] gap-2">
                                        <button
                                            onClick={(e) => { e.preventDefault(); setImageUrl('/avatars/man.png') }}
                                            class="w-16 h-16 rounded-full border-2 border-transparent hover:border-blue-500 focus:border-blue-500 focus:outline-none">
                                            <img src="/avatars/man.png" alt="Avatar 1" class="w-full h-full rounded-full" />
                                        </button>
                                        <button
                                            onClick={(e) => { e.preventDefault(); setImageUrl('/avatars/man2.png') }}
                                            class="w-16 h-16 rounded-full border-2 border-transparent hover:border-blue-500 focus:border-blue-500 focus:outline-none">
                                            <img src="/avatars/man2.png" alt="Avatar 2" class="w-full h-full rounded-full" />
                                        </button>
                                        <button
                                            onClick={(e) => { e.preventDefault(); setImageUrl('/avatars/woman.png') }}
                                            class="w-16 h-16 rounded-full border-2 border-transparent hover:border-blue-500 focus:border-blue-500 focus:outline-none">
                                            <img src="/avatars/woman.png" alt="Avatar 3" class="w-full h-full rounded-full" />
                                        </button>
                                        <button
                                            onClick={(e) => { e.preventDefault(); setImageUrl('/avatars/woman2.png') }}
                                            class="w-16 h-16 rounded-full border-2 border-transparent hover:border-blue-500 focus:border-blue-500 focus:outline-none">
                                            <img src="/avatars/woman2.png" alt="Avatar 3" class="w-full h-full rounded-full" />
                                        </button>
                                        <button
                                            onClick={(e) => { e.preventDefault(); setImageUrl('/avatars/rabbit.png') }}
                                            class="w-16 h-16 rounded-full border-2 border-transparent hover:border-blue-500 focus:border-blue-500 focus:outline-none">
                                            <img src="/avatars/rabbit.png" alt="Avatar 3" class="w-full h-full rounded-full" />
                                        </button>
                                        <button
                                            onClick={(e) => { e.preventDefault(); setImageUrl('/avatars/chicken.png') }}
                                            class="w-16 h-16 rounded-full border-2 border-transparent hover:border-blue-500 focus:border-blue-500 focus:outline-none">
                                            <img src="/avatars/chicken.png" alt="Avatar 3" class="w-full h-full rounded-full" />
                                        </button>
                                    </div>
                                </div>


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
                                        onClick={(e) => { handleSubmit(e) }}
                                        className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
                                    >
                                        Create an account
                                    </button>

                                    <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                                        Already have an account?
                                        <Link href="/login" className="text-gray-700 underline">Log in</Link>.
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

export default Register
