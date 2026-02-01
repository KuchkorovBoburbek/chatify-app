
import { create } from "zustand"; //Zustand — React uchun yengil state manager
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { Annoyed } from "lucide-react";
export const useAuthStore = create((set) => ({
  authUser: null,
  isCheckingAuth: true,
  isSigningUp: false,
  isLoggingIn: false, 

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");

      if (typeof res.data !== "object") {
        throw new Error("Invalid auth response");
      }

      set({ authUser: res.data });
    } catch (err) {
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data)=>{
    set({ isSigningUp : true});
     try {
      const res = await axiosInstance.post("auth/signup", data)
      set({authUser: res.data});

      toast.success("Account created successfully 🥳🥳🥳");
     } catch (error) {
      toast.error(error.response.data.message)
     } finally{
    set({ isSigningUp: false });
     }
  },


    login: async (data)=>{
    set({ isLoggingIn: true });
     try {
      const res = await axiosInstance.post("auth/login", data)
      set({authUser: res.data});

      toast.success("Logged in  successfully");
     } catch (error) {
      toast.error(error.response.data.message)
     } finally{
    set({ isLoggingIn: false });
     }
  }, 

  logout: async(data)=>{
    try {
      await axiosInstance.post("/auth/logout");
      set({authUser: null});
      console.log("Logged out successfully");
      toast.success("Logged out successfully")
    } catch (error) {
      toast.success("Error logging out");
      console.log("Logput error:", error)
    }
  } ,
  updateProfile : async(data)=>{
    try {
      const res = await axiosInstance.put("/auth/update-profile", data);
      set({ authUser: res.data });
      toast.success("Profile updated successfuly");
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
      } else {
        console.log(error.message);
      }
    }
  }


}));

