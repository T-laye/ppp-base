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

export default function Page() {
  const router = useRouter();

  const editVoucher = () => {
    router.push("/admin/vouchers/id/editPOC");
  };
  return (
    <section className="min-h-screen pt-8 pb-20">
      <div className="mb-3">
        <GoBack />
      </div>

      <div>
        <h3 className="font-semibold">POC Details</h3>

        <div className="mt-4">
          <DetailList
            title="POC Name"
            value="Total Fueling Station"
            icon={<BsFillFuelPumpDieselFill size={20} />}
          />
          <DetailList
            title="Email"
            value="total@gmail.com"
            icon={<MdEmail size={24} />}
          />
          <DetailList
            title="Phone Number"
            value="09083039494"
            icon={<BsFillTelephoneFill size={20} />}
          />
          <DetailList
            title="Personnel"
            value="John Matthew"
            // icon={<BsFillFuelPumpDieselFill size={24} />}
            icon={<FaUser size={20} />}
          />
          <DetailList
            title="Management"
            value="Priscilla Franklin"
            icon={<FaUser size={20} />}
            // icon={<BsFillFuelPumpDieselFill size={24} />}
          />
          <DetailList
            title="Product"
            value="Fuel"
            icon={<ImDroplet size={24} />}
          />
          <DetailList
            title="Amount Allocated"
            value={250}
            icon={<MdAssignmentTurnedIn size={24} />}
          />

          <div className="flex gap-2 items-end">
            <DetailList
              title="Available"
              value={500}
              icon={<PiDropHalfBottomFill size={24} />}
            />
            <DetailList
              title="Limit"
              value={2000}
              icon={<ImDroplet size={24} />}
            />
          </div>
          <DetailList
            title="Total Dispensed"
            value={5000}
            icon={<ImDroplet size={24} />}
          />

          <button onClick={editVoucher} className="btn bg-primary w-full mt-5">
            Edit POC
          </button>
        </div>
      </div>
    </section>
  );
}
