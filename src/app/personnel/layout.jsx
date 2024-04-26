"use client";
import Logo from "@/components/Logo";
import React, { useState, Suspense, useEffect } from "react";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import { useRouter } from "next/navigation";
import { ImSpinner9 } from "react-icons/im";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getWorker } from "@/redux/slices/getWorkerSlice";
import { setCredentials } from "@/redux/slices/authSlice";

export default function Layout({ children }) {
  const [isAuth, setIsAuth] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const { pageNumber, take, search, productName, staffName, pocName } =
    useSelector((state) => state.variables);

  const { userInfo } = useSelector((state) => state.auth);
  // console.log(userInfo);

  useEffect(() => {
    (async () => {
      const { user } = await getUser();

      if (!user || user.user.role !== "PERSONNEL") {
        router.push("/");
        setIsAuth(false);
        return;
      } else {
        // if no error
        dispatch(setCredentials({ ...user.user }));
        setIsAuth(true);
      }
      // console.log(user);
    })();
  }, [dispatch, router]);

  useEffect(() => {
    (async () => {
      if (isAuth) {
        const resWorker = await axios.get(
          `/api/admin/staff/${userInfo?.id}?email=${userInfo?.email}`
        );
        // console.log(resProducts);
        dispatch(getWorker({ ...resWorker?.data.data }));
      } else {
        return;
      }
    })();
  }, [dispatch, isAuth, userInfo?.email, userInfo?.id]);
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
        <Header />
        <Suspense>
          <main className="pt-12">{children}</main>
        </Suspense>
        <footer>
          <Navbar />
        </footer>
      </div>
    );
  }
}

async function getUser() {
  try {
    const { data } = await axios.get("/api/auth");
    return {
      user: data,
      // error: null,
    };
    // console.log(res);
  } catch (e) {
    return {
      user: null,
      // error,
    };
  }
}
