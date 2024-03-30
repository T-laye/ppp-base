"use client";
import Logo from "@/components/Logo";
import React, { Suspense, useEffect, useState } from "react";
// import { IoIosMenu } from "react-icons/io";
// import Navbar from "../components/Navbar";
// import Header from "../components/Header";
import { useRouter } from "next/navigation";
import { ImSpinner9 } from "react-icons/im";
import axios from "axios";

export default function Layout({ children }) {
  const [isAuth, setIsAuth] = useState(false);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const { user } = await getUser();

      if (!user || user.user.role !== "ADMIN") {
        router.push("/admin");
        setIsAuth(false);
        return;
      } else {
        // if no error
        setIsAuth(true);
      }
      console.log(user);
    })();
  }, [router]);
  // console.log(isAuth);

  //   if (!isAuth) {
  //     return (
  //       <section className="h-screen">
  //         <div className="flex justify-center items-center h-full">
  //           <div className="text-primaryActive ">
  //             <ImSpinner9 size={100} className="animate-spin" />
  //           </div>
  //         </div>
  //       </section>
  //     );
  //   } else {
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
// }

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
