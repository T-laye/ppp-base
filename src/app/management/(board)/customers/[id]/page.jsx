"use client";
import DetailList from "@/components/DetailList";
import GoBack from "@/components/GoBack";
import React from "react";
import { ImDroplet } from "react-icons/im";
import { MdAssignmentTurnedIn } from "react-icons/md";
import { TbRulerMeasure } from "react-icons/tb";
import { PiBatteryVerticalFullFill } from "react-icons/pi";
import { PiDropHalfBottomFill } from "react-icons/pi";
import { useRouter } from "next/navigation";
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { BsFillTelephoneFill } from "react-icons/bs";
import { BsFillFuelPumpDieselFill } from "react-icons/bs";
import { BsPeopleFill } from "react-icons/bs";
import { IoLocationSharp } from "react-icons/io5";

export default function Page() {
  const router = useRouter();

  const editCustomer = () => {
    router.push("/management/customers/id/editCustomer");
  };
  const createVoucher = () => {
    router.push("/newVoucher");
  };

  return (
    <section className="min-h-screen pt-8 pb-20">
      <div className="mb-3">
        <GoBack />
      </div>

      <div>
        <h3 className="font-semibold">Customer Details</h3>

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
          {/* <DetailList
            title="Product"
            value="Fuel"
            icon={<ImDroplet size={16} />}
          /> */}
          {/* <DetailList
            title="Amount Allocated"
            value={25}
            icon={<MdAssignmentTurnedIn size={16} />}
          /> */}
          {/* <DetailList
            title="Preferred Point of Collection"
            value="Total Fueling Station"
            icon={<BsFillFuelPumpDieselFill size={16} />}
          /> */}
          {/* <DetailList
            title="Third Party"
            value="Yes"
            icon={<BsPeopleFill size={16} />}
          /> */}
          <DetailList
            title="Address"
            value="No. 23. poajikaco okcno;aojvnljbdbv jvabo;bvnj "
            icon={<IoLocationSharp size={16} />}
          />

          <button
            onClick={createVoucher}
            className="btn bg-primary w-full mt-5"
          >
            Create Voucher
          </button>
          <button onClick={editCustomer} className="btn bg-yellow-500 w-full mt-5">
            Edit Customer
          </button>

          {/* <button className="btn bg-error w-full mt-5">Delete Customer</button> */}
        </div>
      </div>
    </section>
  );
}
