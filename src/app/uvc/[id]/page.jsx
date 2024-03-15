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
import { FaLocationDot } from "react-icons/fa6";

export default function Page() {
  const router = useRouter();

  return (
    <section className="min-h-screen pt-8 pb-20">
      <div className="mb-3">
        <GoBack />
      </div>

      <div>
        <h3 className="font-semibold text-primary text-xl">Voucher Details</h3>

        <div className="mt-4">
          <DetailList
            title="Voucher Name"
            value="John Doe"
            icon={<FaUser size={16} />}
          />
          <DetailList
            title="Voucher Number"
            value="1234567890"
            icon={<MdEmail size={16} />}
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
            value="No. oajdcbk cjioachno aichaojcnajc ajschnajc ajcg abjcbc icacsc"
            icon={<FaLocationDot size={16} />}
          />
          <DetailList
            title="Product"
            value="Fuel"
            icon={<ImDroplet size={16} />}
          />
          <DetailList
            title="Amount Allocated"
            value={25}
            icon={<MdAssignmentTurnedIn size={16} />}
          />
          <DetailList
            title="Point of Collection"
            value="Matrix Fueling Station"
            icon={<BsFillFuelPumpDieselFill size={16} />}
          />
          <DetailList
            title="Third Party"
            value="Yes"
            icon={<BsPeopleFill size={16} />}
          />
          <DetailList
            title="Name of Pick up Person"
            value="Jonathan James"
            icon={<BsPeopleFill size={16} />}
          />
          <DetailList
            title="Vehicle Type"
            value="Rolls Royce"
            icon={<BsPeopleFill size={16} />}
          />
          <DetailList
            title="Vehicle Plate Number"
            value="DV-677"
            icon={<BsPeopleFill size={16} />}
          />
          <DetailList
            title="Phone Number of Pick Up Person"
            value="09070292748"
            icon={<BsPeopleFill size={16} />}
          />
        </div>
      </div>
    </section>
  );
}
