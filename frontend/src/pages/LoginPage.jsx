import React from 'react'
import { useState } from "react";
import BorderAnimatedContainer from '../components/BorderAnimatedContainer';
import {  LockIcon, MailIcon, MessageCircleCodeIcon } from 'lucide-react';
import { LoaderIcon } from 'react-hot-toast';
import { Link } from "react-router";
import { useAuthStore } from '../store/useAuthStore';

  function LoginPage() {
    const [formData, setFormData] = useState({
      email: "",
      password: "",
    });
  
    const { login, isLoggingIn } = useAuthStore()
    const handleSubmit = (e) => {
      e.preventDefault();
      login(formData);
    };
  
  return (
    <div className="w-full flex items-center justify-center p-4 bg-slate-900">
      <div className="relative w-full max-w-6xl md:h -[800px] h-[650px]">
        <BorderAnimatedContainer>
          <div className="w-full flex flex-col md:flex-row">
            {/** FORM CLOUMN - LEFT SIDE */}
            <div className="md:w-1/2 p-8 flex items-center justify-center md:border-r border-slate-600/30">
              <div className="w-full max-w-md">
                {/** Heading text*/}
                <div className="text-center mb-8">
                  <MessageCircleCodeIcon className="w-12  h-12 mx-auto text-slate-400 mb-4" />
                  <h2 className="text-2xl font-bold text-slate-200 mb-2">
                    Welcome Back
                  </h2>
                  <p className="text-slate-400">
                    Login to access to your account
                  </p>
                </div>
                {/** FORM */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="">
                    <label className="auth-label ">Email</label>
                    <div className="relative">
                      <MailIcon className="auth-input-icon" />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="input"
                        placeholder="mark@gmail.com"
                      />
                    </div>
                  </div>

                  {/** PASSWORD INPUT */}
                  <div className="">
                    <label className="auth-label ">Password</label>
                    <div className="relative">
                      <LockIcon className="auth-input-icon" />
                      <input
                        type="password"
                        value={formData.password}
                        onChange={(e) =>
                          setFormData({ ...formData, password: e.target.value })
                        }
                        className="input"
                        placeholder="Enter your password"
                      />
                    </div>
                  </div>

                  {/** SUBMIT BUTTON */}
                  <button
                    className="auth-btn  flex items-center justify-center"
                    type="submit"
                    disabled={isLoggingIn}
                  >
                    {isLoggingIn ? (
                      <LoaderIcon className="w-full h-5 animate-spin text-center flex justify-center align-middle" />
                    ) : (
                      "Sign In"
                    )}
                  </button>

                  {/** GO TO LOGIN PAGE */}
                  <div className="mt-6 text-center">
                    <Link to="/signup" className="auth-link">
                      Dont have an account? Sign Up
                    </Link>
                  </div>
                </form>
              </div>
            </div>

            {/** FORM ILLUSTRATION - RIGHT SIDE */}
            <div className="hidden md:w-1/2 md:flex items-center justify-center p-6 bg-gradient-to-bl from-slate-800/20 to-transparent">
              <div>
                <img
                  src="/login.png"
                  alt="People using mobile devise"
                  className="w-full h-auto object-contain transparent"
                />
                <div className="mt-6 text-center">
                  <h3 className="text-xl font-medium text-cyan-400">
                    Connect anytime and anywhere
                  </h3>

                  <div className="mt-4 flex justify-center gap-4">
                    <span className="auth-badge">Free</span>
                    <span className="auth-badge">Easy Setup</span>
                    <span className="auth-badge">Privative</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </BorderAnimatedContainer>
      </div>
    </div>
  );
}

export default LoginPage;