import { useState } from "react";
import axios from "axios";
import { useUser } from "@auth0/nextjs-auth0";

export const useUserData = () => {
  const { user } = useUser();
  const [userDetails, setUserDetails] = useState(null);

  const fetchUserDetails = async () => {
    if (!user) return;

    try {
      const res = await axios.get(`/user/${user.sub}`);
      setUserDetails(res.data);
      console.log("Show user data", user);
    } catch (error) {
      console.log("Error in fetchUserDetails", error);
    }
  };

  const performAction = async (userId, pokemon, action) => {
    try {
      setUserDetails((prev) => {
        const updatedBookmarks =
          action === "bookmark"
            ? prev.user.bookmarks.includes(pokemon)
              ? prev.user.bookmarks.filter((p) => p !== pokemon)
              : [...prev.user.bookmarks, pokemon]
            : prev.user.bookmarks;

      const updatedLikes =
        action === "like"
          ? prev.user.liked.includes(pokemon)
            ? prev.user.liked.filter((p) => p !== pokemon)
            : [...prev.liked, pokemon]
          : prev.liked;

          return {
            ...prev, 
            bookmarks: updatedBookmarks,
            liked: updatedLikes
          };
        });

      await axios.post("/pokemon", {
        userId,
        pokemon,
        action,
      });
      await fetchUserDetails();
    } catch (error) {
      console.log("Error in performAction", error);
      fetchUserDetails(userId);
    }
  };

  return { userDetails, performAction, fetchUserDetails };
};
