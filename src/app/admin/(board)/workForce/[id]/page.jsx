"use client";
import DetailList from "@/components/DetailList";
import GoBack from "@/components/GoBack";
import React, { useEffect } from "react";
import { MdAssignmentTurnedIn } from "react-icons/md";
import { useParams, useRouter } from "next/navigation";
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { BsFillTelephoneFill } from "react-icons/bs";
import { BsFillFuelPumpDieselFill } from "react-icons/bs";
import { BsPeopleFill } from "react-icons/bs";
import { IoLocationSharp } from "react-icons/io5";
import { BsPersonFillGear } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { getWorker } from "@/redux/slices/getWorkerSlice";
import axios from "axios";

export default function Page() {
  const router = useRouter();
  const { id } = useParams();
  const { worker } = useSelector((state) => state.worker);
  const dispatch = useDispatch();
  console.log(worker);

  useEffect(() => {
    const getWorkerDetails = async () => {
      const res = await axios.get(`/api/personnel/${id}`);

      // console.log(res);
      dispatch(getWorker({ ...res.data.data }));
    };

    getWorkerDetails();
  }, [dispatch, id]);

  const editPerson = () => {
    router.push(`/admin/workForce/${id}/editPerson`);
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
