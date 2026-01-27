import axios from "axios"


export const axiosInstance = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? "http://localhost:5003/api" //axiosInstance.get("/users") => http://localhost:5003/api/users
      : "/api",
  withCredentials: true, //cookie’larni so‘rov bilan birga yuborish
});