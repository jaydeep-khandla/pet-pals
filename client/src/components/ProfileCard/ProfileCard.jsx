import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import useUserInfo from "@/hooks/useUserInfo";
import useAuth from "@/hooks/useAuth";
import useLogout from "@/hooks/useLogout";
import useToggle from "@/hooks/useToggle";
import { Button } from "../ui/button";

export default function ProfileCard() {
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();
  const user = useUserInfo(auth);
  const logout = useLogout();
  const { handleToggleClick } = useToggle();

  const signOut = async () => {
    try {
      await logout();

      handleToggleClick("profile");
      await setAuth(() => {
        return null;
      });

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className=" absolute right-0 top-16 mr-4 flex flex-col gap-1 p-4 bg-white border-2 border-black rounded-md h-auto w-48 items-center">
      <Avatar className="cursor-pointer border-2 border-black" onClick={() => handleToggleClick("profile")}>
        <AvatarImage src="/placeholder-user.jpg" />
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
      <p className="text-black font-bold">{user?.username}</p>
      <Link to={`/user/${user?.id}`}>
        <span className="text-slate-500">view profile</span>
      </Link>
      <p className="text-black">{user?.email}</p>
      <Button className="w-full mt-1" onClick={() => signOut()}>
        Logout
      </Button>
    </section>
  );
}
