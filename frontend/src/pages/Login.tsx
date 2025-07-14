import React, { useEffect, useState } from "react";
import { replace, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Checkbox } from "../components/ui/checkbox";
import { Label } from "../components/ui/label";
import {BASE_URL}  from "../constants/index";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  useEffect(()=>{
    const storedUser = localStorage.getItem("user");
    const isAuthenticated = document.cookie.includes("token");
    if(storedUser && isAuthenticated){
      navigate("/",{ replace: true});
    }
  },[navigate]);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${BASE_URL}/auth/login`,
        { email, password },
        { withCredentials: true }
      );
      
      if(response.data.status){
        const user = response.data.user;
        localStorage.setItem("user",JSON.stringify(user));
        window.location.href = "/dashboard";
      }
      else {
        alert("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="bg-white text-foreground">
     
      
      <div className="flex items-center justify-center py-12"> 
        
        <div className="w-full max-w-md p-4 space-y-6">
          <h2 className="mb-4 text-2xl font-semibold text-center">
            Log in to your VirtualHire account
          </h2>
          <form onSubmit={handleSubmit} className="p-6 space-y-4 border rounded-lg shadow-sm">
            
            <div>
              <Label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </Label>
              <Input
                type="email"
                id="email"
                placeholder="Enter your email"
                className="mt-1"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            
            <div>
              <Label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </Label>
              <Input
                type="password"
                id="password"
                placeholder="Enter your password"
                className="mt-1"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox id="remember-me" />
                <Label htmlFor="remember-me" className="text-sm text-gray-700">
                  Remember me
                </Label>
              </div>
              <a href="#" className="text-sm text-gray-600 hover:underline">
                Forgot password?
              </a>
            </div>

            
            <Button
              type="submit"
              className="w-full mt-2 text-white bg-green-500 hover:bg-green-600"
            >
              Log in
            </Button>

            
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 text-gray-400 bg-white">
                  Or continue with
                </span>
              </div>
            </div>
          </form>

          
          <div className="mt-4 text-sm text-center">
            <p className="text-gray-600">
              Don’t have an account?{" "}
              <a href="/signup" className="font-semibold text-green-600 hover:underline">
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
