"use client";
import GoBack from "@/components/GoBack";
import React from "react";
import { MdLock } from "react-icons/md";
import { FaUser } from "react-icons/fa6";
import { TbLogout2 } from "react-icons/tb";
import AccountCard from "./component/AccountCard";

export default function Account() {
  return (
    <section className="bg-green300 min-h-screen">
      <div className="container mx-auto pt-5 pb-20">
        <div>
          <h2 className="text-xl font-medium text-center mt-5 ">
            Account Settings
          </h2>

          <div className="flex flex-wrap  flex-col gap-5 mt-10 justify-center bg-geen-600">
            <AccountCard
              link="/admin/account/profile"
              title="Edit Profile"
              color="bg-blue-600"
              icon={<FaUser size={28} />}
            />
            <AccountCard
              link="/admin/account/password"
              title="Change Password"
              color="bg-red-700"
              icon={<MdLock size={30} />}
            />
            {/* <AccountCard
              title="Edit Password"
              color="bg-primary"
              icon={<FaUser size={30} />}
            /> */}
            <AccountCard
              link="/admin"
              title="Sign Out"
              color="bg-customGray"
              icon={<TbLogout2 size={30} />}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
