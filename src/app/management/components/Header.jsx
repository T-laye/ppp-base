"use client";
import Logo from "@/components/Logo";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BsCardList, BsPersonFillGear } from "react-icons/bs";
import { FaListAlt } from "react-icons/fa";
import { BsPersonPlus } from "react-icons/bs";
import { GiGasPump } from "react-icons/gi";
import { IoIosMenu } from "react-icons/io";
import { FaHistory } from "react-icons/fa";
import { PiDropFill } from "react-icons/pi";
import { MdVerifiedUser } from "react-icons/md";
import { TbLogout2 } from "react-icons/tb";
import { useLogoutMutation } from "@/redux/slices/usersApiSlice";
import { logout } from "../../../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Header() {
  const [openNav, setOpenNav] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const [logoutApiCall] = useLogoutMutation();
  const { userInfo } = useSelector((state) => state.auth);
  const [user, setUser] = useState({});
  const [greeting, setGreeting] = useState("");

  // console.log(userInfo);

  useEffect(() => {
    const getWorkerDetails = async () => {
      const res = await axios.get(`/api/admin/staff/${userInfo?.id}`);
      // console.log(res?.data?.data);
      setUser(res?.data?.data);
    };

    getWorkerDetails();
  }, [userInfo?.id]);

  useEffect(() => {
    const getGreeting = () => {
      const now = new Date();
      const hours = now.getHours();

      if (hours < 12) {
        return "Good morning!";
      } else if (hours < 18) {
        return "Good afternoon!";
      } else {
        return "Good evening!";
      }
    };

    setGreeting(getGreeting());
  }, []);

  function getLastWord(sentence) {
    // if (typeof sentence !== "string") {
    //   throw new Error("Input must be a string");
    // }
    if (user?.name) {
      const words = sentence?.trim().split(/\s+/);
      return words[words?.length - 1];
    }
  }

  function capitalizeWords(sentence) {
    // Split the sentence into an array of words
    let words = sentence?.split(" ");

    // Iterate over each word
    for (let i = 0; i < words?.length; i++) {
      // Capitalize the first letter of each word
      words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
    }

    // Join the words back into a sentence
    return words?.join(" ");
  }

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      router.push("/");
      //  console.log("log out");
    } catch (err) {
      //  console.log(err);
    }
  };

  const handleNav = () => {
    setOpenNav(!openNav);
  };
  return (
    <header className=" lg:max-w-2xl mx-auto bg-white h-14 fixed top-0 left-0 right-0 shadow-sm    z-10">
      <div className="relative flex justify-between items-center px-4 py-1">
        <Logo />
        <div className="flex items-center gap-3">
          {user?.gender && (
            <p>
              <span className="text-xl">👋</span> {greeting}{" "}
              {user?.gender === "MALE" ? "Mr." : "Ma."}{" "}
              {capitalizeWords(getLastWord(user?.name))}
            </p>
          )}
          <div className="text-error cursor-pointer">
            <TbLogout2 size={28} onClick={logoutHandler} />
          </div>
        </div>
      </div>
    </header>
  );
}
