"use client";
import Logo from "@/components/Logo";
import React, { Suspense, useEffect, useState } from "react";
import { IoIosMenu } from "react-icons/io";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import { useRouter } from "next/navigation";
import { ImSpinner9 } from "react-icons/im";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchCustomers } from "@/redux/slices/fetchCustomersSlice";
import {
  handlePageNumber,
  handlePocName,
  handleProductName,
  handleSearch,
  handleStaffName,
  handleTake,
} from "@/redux/slices/variableSlice";
import { setCredentials } from "@/redux/slices/authSlice";
import { fetchProducts } from "@/redux/slices/fetchProductsSlice";
import { fetchPersonnels } from "@/redux/slices/fetchPersonnelsSlice";
import { fetchPocs } from "@/redux/slices/fetchPocsSlice";
import {
  fetchApprovedVouchers,
  fetchCollectedVouchers,
  fetchQueuedVouchers,
  fetchVouchers,
} from "@/redux/slices/fetchVouchersSlice";
// import { useGetCustomersMutation } from "@/redux/slices/takeSlice";

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
      if (!user || user.user.role !== "ADMIN") {
        router.push("/admin");
        setIsAuth(false);
        return;
      } else {
        dispatch(setCredentials({ ...user.user }));
        setIsAuth(true);
        dispatch(handleSearch(""));
        dispatch(handleProductName(""));
        dispatch(handlePocName(""));
        dispatch(handleStaffName(""));
        dispatch(handlePageNumber(1));
        dispatch(handleTake(10));
      }
    })();
  }, [dispatch, router]);

  useEffect(() => {
    (async () => {
      if (isAuth) {
        try {
          const resProducts = await axios.get(
            `/api/product?take=${take}&pageNumber=${pageNumber}&name`
          );
          // console.log(resProducts);
          dispatch(fetchProducts({ ...resProducts?.data }));
        } catch (e) {
          console.log(e);
        }
      } else {
        return;
      }
    })();
  }, [dispatch, isAuth, pageNumber, take, productName]);

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
        try {
          const resPocs = await axios.get(
            `/api/poc?name=${pocName}&take=${take}&pageNumber=${pageNumber}&productName=${productName}`
          );
          // console.log(resPocs);
          dispatch(fetchPocs({ ...resPocs?.data }));
        } catch (err) {
          console.log(err);
        }
      } else {
        return;
      }
    })();
  }, [dispatch, isAuth, pageNumber, pocName, productName, take]);
  //
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
  // console.log(isAuth);

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

  useEffect(() => {
    (async () => {
      if (isAuth) {
        try {
          const resQueueVouchers = await axios.get(
            `/api/admin/voucher?product_name=${productName}&collected=false&av4D=false&customer=${search}&take=${take}&pageNumber=${pageNumber}`
          );
          dispatch(fetchQueuedVouchers({ ...resQueueVouchers?.data }));
          // console.log(resQueueVouchers);
          // console.log(resPocs)
        } catch (e) {
          console.log(e);
        }
      } else {
        return;
      }
    })();
  }, [dispatch, isAuth, pageNumber, productName, search, take]);

  useEffect(() => {
    (async () => {
      if (isAuth) {
        try {
          const resApprovedVouchers = await axios.get(
            `/api/admin/voucher?product_name=${productName}&collected&av4D=true&customer=${search}&take=${take}&pageNumber=${pageNumber}`
          );
          dispatch(fetchApprovedVouchers({ ...resApprovedVouchers?.data }));
          // console.log(resApprovedVouchers);
          // console.log(resPocs)
        } catch (e) {
          // console.log(e);
        }
      } else {
        return;
      }
    })();
  }, [dispatch, isAuth, pageNumber, productName, search, take]);

  useEffect(() => {
    (async () => {
      if (isAuth) {
        try {
          const resCollectedVouchers = await axios.get(
            `/api/admin/voucher?product_name=${productName}&collected=true&av4D&customer=${search}&take=${take}&pageNumber=${pageNumber}`
          );
          dispatch(fetchCollectedVouchers({ ...resCollectedVouchers?.data }));
          // console.log(resCollectedVouchers);
          // console.log(resPocs)
        } catch (e) {
          console.log(e);
        }
      } else {
        return;
      }
    })();
  }, [dispatch, isAuth, pageNumber, productName, search, take]);
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
