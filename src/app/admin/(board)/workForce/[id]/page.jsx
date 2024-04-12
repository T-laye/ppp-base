"use client";
import DetailList from "@/components/DetailList";
import GoBack from "@/components/GoBack";
import React, { useEffect, useState } from "react";
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
import Loading from "@/components/Loading";
import { fetchPersonnels } from "@/redux/slices/fetchPersonnelsSlice";

export default function Page() {
  const router = useRouter();
  const { id } = useParams();
  const { worker } = useSelector((state) => state.worker);
  const dispatch = useDispatch();  const [isLoading, setIsLoading] = useState(false);

  console.log(worker);

  useEffect(() => {
    const getWorkerDetails = async () => {
      const res = await axios.get(`/api/admin/staff/${id}`);

      // console.log(res);
      dispatch(getWorker({ ...res.data.data }));
    };

    getWorkerDetails();
  }, [dispatch, id]);

  const handleDeletePersonnel = async () => {
    setIsLoading(true);
    const res = await axios.delete(`/api/admin/staff/${id}`);
    if (res) {
      const resPersonnels = await axios.get(
        `/api/admin/staff?take=${take}&pageNumber=${pageNumber}&name=${search}`
      );
      dispatch(fetchPersonnels({ ...resPersonnels?.data }));
      setIsLoading(false);
      toast.success(res.data.message);
      router.back();
    }
    // console.log(res);
  };

  const editPerson = () => {
    router.push(`/admin/workForce/${id}/editPerson`);
  };

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
    if (worker?.createdDate) {
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
    <section className="min-h-screen pt-8 pb-20">
      <div className="mb-3">
        <GoBack />
      </div>

      <div>
        <h3 className="font-semibold">Personnel Details</h3>
        {worker?.name ? (
          <div className="mt-4">
            <DetailList
              title="Full Name"
              value={capitalizeWords(worker?.name)}
              icon={<FaUser size={16} />}
            />
            <DetailList
              title="Email"
              value={worker?.email}
              icon={<MdEmail size={16} />}
            />
            <DetailList
              title="Phone Number"
              value={worker?.phoneNumber}
              icon={<BsFillTelephoneFill size={16} />}
            />
            <DetailList
              title="Address"
              value={worker?.address}
              icon={<IoLocationSharp size={16} />}
            />
            <DetailList
              title="Role"
              value={worker?.role}
              icon={<BsPersonFillGear size={16} />}
            />
            <DetailList
              title="Assigned Point of Collection"
              value="Total Fueling Station"
              icon={<BsFillFuelPumpDieselFill size={16} />}
            />

            <DetailList
              title="Created At"
              value={formatDate(worker?.createdDate)}
              icon={<FaUser size={16} />}
            />

            <button onClick={editPerson} className="btn bg-primary w-full mt-5">
              Edit Person
            </button>

            {/* <button className="btn bg-yellow-500 w-full mt-5">
              Make Management
            </button> */}
            {worker?.role === "MANAGEMENT" && (
              <button className="btn bg-blue-500 w-full mt-5">
                Enable Edit
              </button>
            )}
            {/* <button className="btn bg-customGray w-full mt-5">
              Make Admin
            </button> */}
            <button
              onClick={handleDeletePersonnel}
              className="btn bg-error w-full mt-5"
            >
              Delete Person
            </button>
          </div>
        ) : (
          <Loading />
        )}
      </div>
    </section>
  );
}
