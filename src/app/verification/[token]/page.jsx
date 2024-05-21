"use client";
import Loading from "@/components/Loading";
import Logo from "@/components/Logo";
import SignHeader from "@/components/SignHeader";
import axios from "axios";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { MdOutlineVerifiedUser } from "react-icons/md";
import { toast } from "react-toast";

export default function Page() {
  const { token } = useParams();
  const [verifying, setVerifiying] = useState(false);
  const [user, setUser] = useState({});
  // console.log(token);

  useEffect(() => {
    const getUser = async () => {
      setVerifiying(true);
      try {
        const user = await axios.get(`/api/customer/verify?token=${token}`);
        // console.log(user);

        if (user?.data) {
          setUser(user?.data.data);
          setVerifiying(false);
          toast.success("Verification Successful");
        }
      } catch (error) {
        setVerifiying(false);
        toast.error("Something went wrong");
      }
    };

    getUser();
  }, [token]);

  // console.log(user);

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

  function formatDate(dateString) {
    // Parse the date string
    const date = new Date(dateString);
    // console.log(date);
    if (user?.createdAt) {
      const dateOptions = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      const timeOptions = { hour: "numeric", minute: "numeric" };

      // Format the date and time according to options
      const formattedDate = date.toLocaleDateString("en-US", dateOptions);
      const formattedTime = date.toLocaleTimeString("en-US", timeOptions);

      return `${formattedDate} at ${formattedTime}`;
    }
    return;
  }

  return (
    <section>
      {verifying || !user?.name ? (
        <div className="h-screen flex justify-center items-center">
          <Loading />
        </div>
      ) : (
        <div className="container mx-auto px-1 h-screen flex flex-col items-center ">
          <div className="mt-10">
            <Logo h="h-20" />
          </div>
          <div className="flex flex-col items-center justify-center mt-7">
            <MdOutlineVerifiedUser size={100} className="text-primary" />
            <p className="text-center font-medium mt-4 w-full">
              Your verification is successful. Below are your details:
            </p>
          </div>
          <div className="mt-7 flex text-sm flex-col gap-2">
            <p>
              Name:{" "}
              <span className="text-base font-medium">
                {" "}
                {capitalizeWords(user?.name)}
              </span>
            </p>
            <p>
              Email:{" "}
              <span className="text-base font-medium">{user?.email}</span>{" "}
            </p>
            <p>
              Phone:{" "}
              <span className="text-base font-medium">{user?.phoneNumber}</span>{" "}
            </p>
            <p>
              Address:{" "}
              <span className="text-base font-medium">{user?.address}</span>{" "}
            </p>
          </div>

          {/* <div className="mt-7">
            <p>
              For more information concerning PPP-Base click the link below:
            </p>
            <Link
              href="#"
              className="mt-2  text-primary underline underline-offset-2 font-medium"
            >
              Click Here For More Info
            </Link>
          </div> */}
        </div>
      )}
    </section>
  );
}
