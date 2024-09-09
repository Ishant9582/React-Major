import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { login as authlogin } from "../store/authslice"
import {Input} from "./index"
import { useDispatch } from "react-redux";
import {fetchUserData} from "../appwrite/auth"
import {login} from "../appwrite/auth"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm()
    const [error, setError] = useState("")

    const loginn = async (data) => {
        setError("")
        try {
            const session = await login(data)
            if (session) {
                const userData = await fetchUserData()
                // userData ki spelling vhi likho jo authslice m likhi hai
                if (userData){ dispatch(authlogin({userData})) 
                    toast.success("Log in successfully!");
                    navigate("/");
                }
                 ////////////////   
            }
        }
        catch (err) {
            setError(err.message)
            toast.error(`${err.message}`)
        }
    }
    return (
        <div className="flex items-center justify-center w-full mt-8" >
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <p>LOGO</p>
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight ">
                    Sign in to your account
                </h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account ? &nbsp;
                    <Link to={"/signup"} className="font-medium text-primary transition-all duration-200 hover:underline">
                        Sign up
                    </Link>
                </p>

                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}


                <form onSubmit={handleSubmit(loginn)} className="mt-8">
                    <div className="space-y-5">
                        <Input
                        label = "Email"
                        placeholder = "enter email"
                        type = "email"
                        {...register("email",{
                            required : true ,
                            validate : {
                                matchpattern: (value) => 
                                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || 
                                    "email address not valid",     
                            }
                        })} 
                        />
                        <Input
                        label="Password: "
                        type="password"
                        placeholder="enter your password" 
                        {...register("password",{
                            required : true ,
                        })}
                        />
                        <button className="w-full btn btn-outline btn-primary">Submit</button>
                    </div>
                </form>
            </div>

        </div>
    )
}
export default Login 


