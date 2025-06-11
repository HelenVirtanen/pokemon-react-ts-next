import { useState } from "react";
import axios from "axios";
import { useUser } from "@auth0/nextjs-auth0";

export const useUserData = () => {
  const [userDetails, setUserDetails] = useState(null);
  const {user} = useUser();

  const fetchUserDetails = async () => {
    if (!user) return;

    try {
      const res = await axios.get(`/user/${user.sub}`);
      setUserDetails(res.data);
    } catch (error) {
      console.log("Error in fetchUserDetails", error);
    }
  }

  const performAction = async (userId, pokemon, action) => {
    try {  
      await axios.post("/pokemon", {
        userId,
        pokemon,
        action,
      });
    } catch (error) {
      console.log("Error in performAction", error);
    }
  };

  console.log("User Details", userDetails);

  return { userDetails, performAction, fetchUserDetails };
};