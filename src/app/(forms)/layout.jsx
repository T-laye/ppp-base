"use client";
import Logo from "@/components/Logo";
import React, { Suspense, useEffect, useState } from "react";
// import { IoIosMenu } from "react-icons/io";
// import Navbar from "../components/Navbar";
// import Header from "../components/Header";
import { useRouter } from "next/navigation";
import { ImSpinner9 } from "react-icons/im";
import axios from "axios";
import { setCredentials } from "@/redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";

export default function Layout({ children }) {
  const [isAuth, setIsAuth] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);

  // console.log(userInfo);

  useEffect(() => {
    (async () => {
      const { user } = await getUser();

      if (
        !user 
      ) {
        router.push("/");
        setIsAuth(false);
        return;
      } else {
        dispatch(setCredentials({ ...user.user }));
        setIsAuth(true);
      }
      //   console.log(user);
    })();
  }, [dispatch, router]);
  // console.log(isAuth);

  if (!isAuth) {
    return (
      <section className="h-screen">
        <div className="flex justify-center items-center h-full">
          <div className="text-primaryActive ">
            <ImSpinner9 size={100} className="animate-spin" />
          </div>
        </div>
      </section>
    );
  } else {
    return (
      <div className="">
        {/* <Header /> */}
        <Suspense>
          <main className="">{children}</main>
        </Suspense>

        {/* <footer>
          <Navbar />
        </footer> */}
      </div>
    );
  }
}

async function getUser() {
  try {
    const { data } = await axios.get("/api/auth");
    // console.log(res);
    return {
      user: data,
      // error: null,
    };
  } catch (e) {
    // console.log(e);
    return {
      user: null,
      // error,
    };
  }
}
