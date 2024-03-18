"use client";
import DetailList from "@/components/DetailList";
import GoBack from "@/components/GoBack";
import React from "react";
import { MdAssignmentTurnedIn } from "react-icons/md";
import { useRouter } from "next/navigation";
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { BsFillTelephoneFill } from "react-icons/bs";
import { BsFillFuelPumpDieselFill } from "react-icons/bs";
import { BsPeopleFill } from "react-icons/bs";
import { IoLocationSharp } from "react-icons/io5";
import { BsPersonFillGear } from "react-icons/bs";

export default function Page() {
  const router = useRouter();

  const editPerson = () => {
    router.push("/admin/workForce/id/editPerson");
  };
  return (
    <section className="min-h-screen pt-8 pb-20">
      <div className="mb-3">
        <GoBack />
      </div>

      <div>
        <h3 className="font-semibold">Personnel Details</h3>

        <div className="mt-4">
          <DetailList
            title="Full Name"
            value="John Doe"
            icon={<FaUser size={16} />}
          />
          <DetailList
            title="Email"
            value="john@gmail.com"
            icon={<MdEmail size={16} />}
          />
          <DetailList
            title="Phone Number"
            value="09083039494"
            icon={<BsFillTelephoneFill size={16} />}
          />
          <DetailList
            title="Address"
            value="No. 30 Okumagba Avenue, Warri, Delta State"
            icon={<IoLocationSharp size={16} />}
          />
          <DetailList
            title="Role"
            value="Management"
            icon={<BsPersonFillGear size={16} />}
          />
          <DetailList
            title="Assigned Point of Collection"
            value="Total Fueling Station"
            icon={<BsFillFuelPumpDieselFill size={16} />}
          />

          <button onClick={editPerson} className="btn bg-primary w-full mt-5">
            Edit Person
          </button>

          <button className="btn bg-yellow-500 w-full mt-5">
            Make Management
          </button>
          <button className="btn bg-blue-500 w-full mt-5">Enable Edit</button>
          <button className="btn bg-customGray w-full mt-5">Make Admin</button>
          <button className="btn bg-error w-full mt-5">Delete Person</button>
        </div>
      </div>
    </section>
  );
}
