import { createContext, useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { userActor } from "./Actors/UserActor";

const AppContext = createContext()
export const AppProvider = ({ children }) => {
    const [currTime, setCurrTime] = useState("00:00")
    const [duration, setDuration] = useState("00:00")
    const [progress, setProgress] = useState(0)
    const [songIdx, setSongIdx] = useState(0)
    const [filteredSongs, setFilteredSongs] = useState([])
    const dispatch = useDispatch()

    const resetEverything = () => {
        setProgress(0)
        setCurrTime("00:00");
        setDuration("00:00");
        // setSongIdx((prevState) => prevState+1)
    }

    const getUser = async () => {
        const token = JSON.parse(localStorage.getItem("token"))
        if (token) {
          const res = await fetch("http://localhost:5000/api/user/me", {
            method: "GET",
            headers: { "Content-Type": "application/json", token }
          })
    
          const data = await res.json()
          if (data.success) {
            toast.success(data.message, {
              position: "bottom-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });
            dispatch(userActor(data.user))
          }
          else {
            toast.error(data.message, {
              position: "bottom-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });
          }
        }
      }

    return <AppContext.Provider value={{
        currTime, setCurrTime,
        duration, setDuration,
        progress, setProgress,
        resetEverything,
        songIdx, setSongIdx,
        getUser,
        filteredSongs, setFilteredSongs
    }}>{children}</AppContext.Provider>
}

export const useGlobalContext = () => {
    return useContext(AppContext)
}