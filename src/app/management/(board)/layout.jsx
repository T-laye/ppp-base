"use client";
// import Logo from "@/components/Logo";
import React, { useState, Suspense, useEffect } from "react";
// import { IoIosMenu } from "react-icons/io";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import { useRouter } from "next/navigation";
import { ImSpinner9 } from "react-icons/im";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "@/redux/slices/authSlice";
import {
  handlePocName,
  handleProductName,
  handleSearch,
  handleStaffName,
} from "@/redux/slices/variableSlice";
import { fetchProducts } from "@/redux/slices/fetchProductsSlice";
import { fetchCustomers } from "@/redux/slices/fetchCustomersSlice";
import { fetchPocs } from "@/redux/slices/fetchPocsSlice";
import { getWorker } from "@/redux/slices/getWorkerSlice";
import { fetchPersonnels } from "@/redux/slices/fetchPersonnelsSlice";
import { fetchVouchers } from "@/redux/slices/fetchVouchersSlice";

export default function Layout({ children }) {
  const [isAuth, setIsAuth] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const { pageNumber, take, search, productName, staffName, pocName } =
    useSelector((state) => state.variables);
  const { userInfo } = useSelector((state) => state.auth);
  // console.log(userInfo.email);

  useEffect(() => {
    (async () => {
      const { user } = await getUser();
      if (!user || user.user.role !== "MANAGEMENT") {
        router.push("/");
        setIsAuth(false);
        return;
      } else {
        // console.log(user);
        dispatch(setCredentials({ ...user.user }));
        setIsAuth(true);
        dispatch(handleSearch(""));
        dispatch(handleProductName(""));
        dispatch(handlePocName(""));
        dispatch(handleStaffName(""));
      }
    })();
  }, [dispatch, router]);

  useEffect(() => {
    (async () => {
      if (isAuth) {
        const resProducts = await axios.get(
          `/api/product?take=${take}&pageNumber=${pageNumber}&name`
        );
        // console.log(resProducts);
        dispatch(fetchProducts({ ...resProducts?.data }));
      } else {
        return;
      }
    })();
  }, [dispatch, isAuth, pageNumber, take, productName]);

    useEffect(() => {
      (async () => {
        if (isAuth) {
          try {
            const resPersonnels = await axios.get(
              `/api/admin/staff?name=${staffName}&take=${take}&pageNumber=${pageNumber}`
            );
            dispatch(fetchPersonnels({ ...resPersonnels?.data }));
            // console.log(resPersonnels);
            // console.log(resPocs)
          } catch (e) {
            // console.log(e);
          }
        } else {
          return;
        }
      })();
    }, [dispatch, isAuth, pageNumber, staffName, take]);

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

  useEffect(() => {
    (async () => {
      if (isAuth) {
        const resCustomers = await axios.get(
          `/api/customer?take=${take}&pageNumber=${pageNumber}&name=${search}`
        );
        dispatch(fetchCustomers({ ...resCustomers?.data }));
        // console.log(resCustomers);
      } else {
        return;
      }
    })();
  }, [dispatch, isAuth, pageNumber, search, take]);

  useEffect(() => {
    (async () => {
      if (isAuth) {
        const resPocs = await axios.get(
          `/api/poc?name=${pocName}&take=${take}&pageNumber=${pageNumber}&productName=${productName}`
        );
        // console.log(resPocs);
        dispatch(fetchPocs({ ...resPocs?.data }));
      } else {
        return;
      }
    })();
  }, [dispatch, isAuth, pageNumber, pocName, productName, take]);

   useEffect(() => {
     (async () => {
       if (isAuth) {
         try {
           const resVouchers = await axios.get(
             `/api/admin/voucher?product_name=${productName}&collected&customer=${search}&take=${take}&pageNumber=${pageNumber}`
           );
           dispatch(fetchVouchers({ ...resVouchers?.data }));
           // console.log(resVouchers);
           // console.log(resPocs)
         } catch (e) {
           console.log(e);
         }
       } else {
         return;
       }
     })();
   }, [dispatch, isAuth, pageNumber, productName, search, take]);
  //

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
