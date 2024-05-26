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
import { toast } from "react-toastify";
import Loader from "@/components/Loader";

export default function Page() {
  const router = useRouter();
  const { id } = useParams();
  const { worker } = useSelector((state) => state.worker);
  const { pageNumber, take, staffName } = useSelector(
    (state) => state.variables
  );
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const { userInfo } = useSelector((state) => state.auth);
  // console.log(worker?.management[0]?.createdAt);

  useEffect(() => {
    const getWorkerDetails = async () => {
      const res = await axios.get(`/api/admin/staff/${id}`);
      console.log(res);
      dispatch(getWorker({ ...res.data.data }));
    };

    getWorkerDetails();
  }, [dispatch, id]);

  const handleDeletePersonnel = async () => {
    setIsLoading(true);
    const res = await axios.delete(`/api/admin/staff/${id}`);
    if (res) {
      const resPersonnels = await axios.get(
        `/api/admin/staff?take=${take}&pageNumber=${pageNumber}&name=${staffName}`
      );
      dispatch(fetchPersonnels({ ...resPersonnels?.data }));
      setIsLoading(false);
      toast.success(res.data.message);
      router.back();
    }
    // console.log(res);
  };

  async function handleCanEdit(edit) {
    console.log(edit);

    try {
      const res = await axios.patch(
        `/api/admin/staff/${id}?edit=${edit}&`
      );
      console.log(res);
      if (res) {
        // setIsLoading(false);
        toast.success(res.data.data.message);
        window.location.reload()
      }
    } catch (e) {
      toast.error(e.data.message);
      // setIsLoading(false);
      console.log(e);
    }
  }

  const editPerson = () => {
    router.push(`/ad300/workForce/${id}/editPerson`);
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
    if (worker?.management[0]?.createdAt) {
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
            {/* <DetailList
              title="Assigned Point of Collection"
              value="Total Fueling Station"
              icon={<BsFillFuelPumpDieselFill size={16} />}
            /> */}

            {/* <DetailList
              title="Created At"
              // value={formatDate(worker?.management[0]?.createdAt)}
              icon={<FaUser size={16} />}
            /> */}

            {id !== userInfo?.id && (
              <div>
                <button
                  onClick={editPerson}
                  className="btn bg-primary w-full mt-5"
                >
                  Edit Person
                </button>

                {worker?.role === "MANAGEMENT" &&
                  (!worker?.management[0]?.canEdit ? (
                    <button
                      onClick={() => handleCanEdit("true")}
                      className="btn bg-blue-500 w-full mt-5"
                    >
                      Enable Edit
                    </button>
                  ) : (
                    <button
                      onClick={() => handleCanEdit("false")}
                      className="btn bg-blue-500 w-full mt-5"
                    >
                      Disable Edit
                    </button>
                  ))}
                <button
                  onClick={handleDeletePersonnel}
                  type="submit"
                  className={`btn w-full mt-5 flex justify-center items-center text-lg text-white font-medium duration-200 rounded-xl ${
                    isLoading ? "bg-customGray" : "bg-error"
                  } `}
                  disabled={isLoading}
                >
                  {isLoading ? <Loader /> : "Delete Person"}
                </button>
              </div>
            )}
          </div>
        ) : (
          <Loading />
        )}
      </div>
    </section>
  );
}
