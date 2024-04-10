"use client";
import DetailList from "@/components/DetailList";
import GoBack from "@/components/GoBack";
import React, { useEffect } from "react";
import { ImDroplet } from "react-icons/im";
import { MdAssignmentTurnedIn } from "react-icons/md";
import { TbRulerMeasure } from "react-icons/tb";
import { PiBatteryVerticalFullFill } from "react-icons/pi";
import { PiDropHalfBottomFill } from "react-icons/pi";
import { useParams, useRouter } from "next/navigation";
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { BsFillTelephoneFill } from "react-icons/bs";
import { BsFillFuelPumpDieselFill } from "react-icons/bs";
import { BsPeopleFill } from "react-icons/bs";
import { IoLocationSharp } from "react-icons/io5";
import { getPoc } from "@/redux/slices/getPocSlice";
import { useSelector, useDispatch } from "react-redux";
import axios from 'axios'

export default function Page() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { poc } = useSelector((state) => state.poc);
  console.log(poc, id);

  const editPOC = () => {
    router.push(`/admin/poc/${id}/editPOC`);
  };
  const assign = () => {
    router.push(`/admin/poc/${id}/assign`);
  };

  useEffect(() => {
    const getPocDetails = async () => {
      const res = await axios.get(`/api/poc/${id}`);
      console.log(res);

      dispatch(getPoc({ ...res.data.data }));
    };

    getPocDetails();
  }, [dispatch, id]);

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
            icon={<BsFillFuelPumpDieselFill size={16} />}
          />
          <DetailList
            title="Email"
            value="total@gmail.com"
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
            icon={<IoLocationSharp size={20} />}
          />
          <DetailList
            title="Personnel"
            value="John Matthew"
            // icon={<BsFillFuelPumpDieselFill size={24} />}
            icon={<FaUser size={16} />}
          />
          <DetailList
            title="Management"
            value="Priscilla Franklin"
            icon={<FaUser size={16} />}
            // icon={<BsFillFuelPumpDieselFill size={24} />}
          />
          <DetailList
            title="Product"
            value="Fuel"
            icon={<ImDroplet size={16} />}
          />
          <DetailList
            title="Amount Allocated"
            value={250}
            icon={<MdAssignmentTurnedIn size={18} />}
          />

          <div className="flex gap-2 items-end">
            <DetailList
              title="Available"
              value={500}
              icon={<PiDropHalfBottomFill size={18} />}
            />
            <DetailList
              title="Limit"
              value={2000}
              icon={<ImDroplet size={16} />}
            />
          </div>
          <DetailList
            title="Total Product Dispensed"
            value={5000}
            icon={<ImDroplet size={16} />}
          />

          <button onClick={assign} className="btn bg-primary  w-full mt-5">
            Assign Persons
          </button>

          <button onClick={editPOC} className="btn bg-yellow-500 w-full mt-5">
            Edit POC
          </button>

          <button className="btn bg-error w-full mt-5">Delete POC</button>
        </div>
      </div>
    </section>
  );
}
