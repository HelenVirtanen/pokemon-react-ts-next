import { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "@auth0/nextjs-auth0";

export const useUserData = () => {
  const {user} = useUser();
  const [userDetails, setUserDetails] = useState(null);

  const fetchUserDetails = async () => {
    if (!user) return;

    try {
      const res = await axios.get(`/user/${user.sub}`);
      setUserDetails(res.data);
      console.log("Fetched User Details Res DATA", userDetails, res.data);
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
      await fetchUserDetails(); 
      console.log("User Details after perform action", userDetails);  
    } catch (error) {
      console.log("Error in performAction", error);
      fetchUserDetails(userId);
    }
  };

  return { userDetails, performAction, fetchUserDetails };
};