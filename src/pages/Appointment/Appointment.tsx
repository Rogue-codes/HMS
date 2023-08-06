import { useState } from "react";
import Tab from "../../components/tabs/Tab";
import { AiOutlinePlus } from "react-icons/ai";
import { BiCalendar } from "react-icons/bi";
import Tr from "../../components/table/Tr";
import { doctorArr, patientArr } from "../../utils";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { useFormik, FormikErrors } from "formik";
import { PatientFormValues } from "../../types/interface";
import Backdrop from "../../widgets/modal/Backdrop";
import { LiaTimesSolid } from "react-icons/lia";
import DateTime from "../../widgets/date-time/DateTime";

export default function Appointment() {
  const [activeTab, setActiveTab] = useState<number>(0);

  const tabArr: string[] = ["NEW APPOINTMENTS", "COMPLETED APPOINTMENTS"];
  const [showModal, setShowModal] = useState<boolean>(false);

  const dropIn = {
    hidden: {
      y: "-100vh",
      opacity: 0,
    },
    visible: {
      y: "0",
      opacity: 1,
      transition: {
        duration: 0.1,
        type: "spring",
        damping: 25,
        stiffness: 500,
      },
    },
    exit: {
      y: "100vh",
      opacity: 0,
    },
  };

  const emailRegex = RegExp(/^\S+@\S+\.\S+$/);
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone_number: "",
      gender: "",
      blood_group: "",
      age: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
    validate: (values) => {
      const errors: FormikErrors<PatientFormValues> = {};
      if (!values.name) {
        errors.name = "Name is Required";
      }
      if (!values.email) {
        errors.email = "Email is Required";
      } else if (!emailRegex.test(values.email)) {
        errors.email = "Invalid email address";
      }
      if (!values.phone_number) {
        errors.phone_number = "phone_number is Required";
      } else if (values.phone_number.length !== 11) {
        errors.phone_number = "phone_number can must be 11 characters";
      }
      if (!values.gender) {
        errors.gender = "Gender is Required";
      }
      if (!values.age) {
        errors.age = "Age is Required";
      }
      if (!values.blood_group) {
        errors.blood_group = "Blood_group is Required";
      }
      return errors;
    },
  });

  const [randomNumber, setRandomNumber] = useState<number | null>(null);

  const generateRandomNumber = () => {
    // Generate a random number between 1 and 100 (adjust the range as needed)
    const min = 1;
    const max = doctorArr.length;
    const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
    setRandomNumber(randomNum);
  };

  return (
    <div className="w-[80%] ml-[20%] pb-12">
      <div className=" rounded-lg shadow-[rgba(17,17,26,0.1)0px_1px_0px] bg-white">
        <div className="pt-9 flex justify-between items-center pb-2 border-b border-[#CFCFCF] pr-9">
          <Tab
            data={tabArr}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
          <button
            className="bg-blue-1 p-2 flex justify-start text-xs gap-3 items-center rounded-lg text-white hover:scale-105 transition-all"
            onClick={() => setShowModal(true)}
          >
            <AiOutlinePlus size="20" /> New Appointment
          </button>
        </div>

        <div className="pt-8 px-9 flex justify-start gap-10 items-center">
          <div>
            <input
              type="search"
              className="w-[14rem] bg-[#EBF5FF] py-2 px-3 rounded-xl placeholder:text-xs"
              placeholder="Search"
              name=""
              id=""
            />
          </div>

          <button className="w-[14rem] text-xs px-6 py-2 border text-text-2 rounded-xl flex justify-between items-center border-blue-1">
            Filter by Date{" "}
            <BiCalendar size="20" color="rgba(52, 151, 249, 1)" />
          </button>
        </div>

        <div className="py-9 w-full mt-6">
          <table className="w-full">
            <thead>
              <tr className="h-12 text-[#242222] text-xs">
                <th>Time</th>
                <th>Date</th>
                <th>Patient Name</th>
                <th>Patient Age</th>
                <th>Doctor</th>
                {activeTab === 1 && <th>Fee Status</th>}
                <th>User Action</th>
              </tr>
            </thead>
            <tbody className="w-full">
              {patientArr.map((patient, index) => (
                <Tr patient={patient} index={index} activeTab={activeTab} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <AnimatePresence
        initial={false}
        // exitBeforeEnter={true}
        mode="wait"
        onExitComplete={() => null}
      >
        {showModal && (
          <Backdrop>
            <motion.div
              onClick={(e) => e.stopPropagation()}
              variants={dropIn}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="w-[80%] mx-auto lg:w-[50%] relative bg-[#fff] px-9 py-16 shadow-2xl rounded-md"
            >
              <LiaTimesSolid
                className="absolute text-lg cursor-pointer hover:scale-110 transition-all text-text-2 right-4 top-4"
                onClick={() => setShowModal(false)}
              />
              <p className="text-blue-1 mb-5 text-sm font-bold">Create Appointment</p>
              <form action="" onSubmit={formik.handleSubmit}>
                <div className="w-full">
                  <input
                    type="text"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    className={`${
                      formik.touched.name &&
                      formik.errors.name &&
                      "border border-red-500 bg-red-100"
                    } w-full focus:outline-none rounded-lg px-2 py-3 shadow-[3px_3px_6px_0px_rgba(182,190,196,0.15),-1.5px_-1.5px_6px_0px_rgba(182,190,196,0.15)] placeholder:text-xs text-sm`}
                    placeholder="Name"
                    name="name"
                    id="name"
                  />
                  {formik.touched.name && formik.errors.name ? (
                    <p className="text-red-600 text-xs">{formik.errors.name}</p>
                  ) : (
                    ""
                  )}
                </div>
                <div className="w-full mt-5 flex justify-between items-center">
                  <div className="w-[48%] rounded-lg">
                    <input
                      type="text"
                      value={formik.values.age}
                      onChange={formik.handleChange}
                      className={`${
                        formik.touched.age &&
                        formik.errors.age &&
                        "border border-red-500 bg-red-100"
                      } w-full rounded-lg px-2 py-3 focus:outline-none shadow-[3px_3px_6px_0px_rgba(182,190,196,0.15),-1.5px_-1.5px_6px_0px_rgba(182,190,196,0.15)] placeholder:text-xs text-sm`}
                      placeholder="age"
                      name="age"
                      id="age"
                    />
                    {formik.touched.age && formik.errors.age ? (
                      <p className="text-red-600 text-xs">
                        {formik.errors.age}
                      </p>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="w-[48%] rounded-lg">
                    <input
                      type="text"
                      value={formik.values.blood_group}
                      onChange={formik.handleChange}
                      className={`${
                        formik.touched.blood_group &&
                        formik.errors.blood_group &&
                        "border border-red-500 bg-red-100"
                      } w-full rounded-lg px-2 py-3 focus:outline-none shadow-[3px_3px_6px_0px_rgba(182,190,196,0.15),-1.5px_-1.5px_6px_0px_rgba(182,190,196,0.15)] placeholder:text-xs text-sm`}
                      placeholder="blood group"
                      name="blood_group"
                      id="blood_group"
                    />
                    {formik.touched.blood_group && formik.errors.blood_group ? (
                      <p className="text-red-600 text-xs">
                        {formik.errors.blood_group}
                      </p>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <div className="w-full mt-5">
                  <input
                    type="text"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    name="email"
                    id="email"
                    className={`${
                      formik.touched.email &&
                      formik.errors.email &&
                      "border border-red-500 bg-red-100"
                    } w-full focus:outline-none rounded-lg px-2 py-3 shadow-[3px_3px_6px_0px_rgba(182,190,196,0.15),-1.5px_-1.5px_6px_0px_rgba(182,190,196,0.15)] placeholder:text-xs text-sm`}
                    placeholder="Email"
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <p className="text-red-600 text-xs">
                      {formik.errors.email}
                    </p>
                  ) : (
                    ""
                  )}
                </div>

                <div className="w-full mt-5">
                  <input
                    type="text"
                    value={formik.values.phone_number}
                    onChange={formik.handleChange}
                    name="phone_number"
                    id="phone_number"
                    className={`${
                      formik.touched.phone_number &&
                      formik.errors.phone_number &&
                      "border border-red-500 bg-red-100"
                    } w-full focus:outline-none rounded-lg px-2 py-3 shadow-[3px_3px_6px_0px_rgba(182,190,196,0.15),-1.5px_-1.5px_6px_0px_rgba(182,190,196,0.15)] placeholder:text-xs text-sm`}
                    placeholder="Phone"
                  />
                  {formik.touched.phone_number && formik.errors.phone_number ? (
                    <p className="text-red-600 text-xs">
                      {formik.errors.phone_number}
                    </p>
                  ) : (
                    ""
                  )}
                </div>

                <div className="w-full mt-5">
                  <DateTime />
                </div>

                <div className="w-full flex justify-start gap-4 items-center">
                  <div className="w-[30%] flex justify-center items-center text-xs text-blue-1 shadow-[3px_3px_6px_0px_rgba(182,190,196,0.15),-1.5px_-1.5px_6px_0px_rgba(182,190,196,0.15)] px-2 py-4 mt-5 rounded-lg bg-white cursor-pointer" onClick={generateRandomNumber}>
                    Fetch Doctor
                  </div>

                  {randomNumber && <p className="text-xs mt-5 p-3">Dr. {randomNumber && doctorArr[randomNumber].name}</p>}
                </div>

                <div className="w-full mt-5">
                  <select
                    name="gender"
                    value={formik.values.gender}
                    onChange={formik.handleChange}
                    id="gender"
                    className={`${
                      formik.touched.gender &&
                      formik.errors.gender &&
                      "border border-red-500 bg-red-100"
                    } w-full focus:outline-none rounded-lg px-2 py-3 shadow-[3px_3px_6px_0px_rgba(182,190,196,0.15),-1.5px_-1.5px_6px_0px_rgba(182,190,196,0.15)] placeholder:text-xs text-xs`}
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                  {formik.touched.gender && formik.errors.gender ? (
                    <p className="text-red-600 text-xs">
                      {formik.errors.gender}
                    </p>
                  ) : (
                    ""
                  )}
                </div>

                <button className="w-full p-3 bg-blue-1 text-white mt-5 rounded-lg hover:scale-105 transition-all">
                  Submit
                </button>
              </form>
            </motion.div>
          </Backdrop>
        )}
      </AnimatePresence>
    </div>
  );
}
