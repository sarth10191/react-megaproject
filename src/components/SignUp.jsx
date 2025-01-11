import React, {useState} from "react";
import {Input, Button, Logo} from "./index.js"
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth.js";
import { login } from "../store/authSlice";
import { useForm } from "react-hook-form";

function SignUp(){
    const [error, setError]= useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {register, handleSubmit} = useForm()

    const SignUp = async (data)=>{
        setError("")
        try{
            const userAccount = await authService.createAccount(data)
            if(userAccount){
                userdata = await authService.getCurrentUser()
                if(userdata){dispatch(login(userdata)) 
            }
            navigate('/')}   

        }
        catch(error){
            setError(error.message)
        }
    }
    return (
        <div className="flex items-center justify-center">
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <div className="mb-2 flex justify-center">
                        <span className="inline-block w-full max-w-[100px]">
                            <Logo width="100%" />
                        </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Already have a account?&nbsp;
                    <Link to={"/login"}
                     className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                    Login</Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
                <form onSubmit={handleSubmit(SignUp)}>
                    <div className='space-y-5'>
                        <Input
                            label="Full name"
                            placeholder="Enter your Name"
                            {...register("name", {
                                requried:true
                            })}
                        ></Input>
                        <Input 
                            label="Email:"
                            placeholder="Enter your email:"
                            type="email"
                            {...register("email", {
                                required: true,
                                validate: {
                                matchPattern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                "Email address must be a valid address",
                            }
                        })}
                        />
                        <Input
                        label = "password"
                        placeholder = "Enter your passwords"
                        type = "password"
                        {...register("password",{
                            required:true
                        })}
                        ></Input>
                        <Button
                        type="submit" className="w-full">Sign up  </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignUp