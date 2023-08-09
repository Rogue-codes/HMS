import { useState } from "react";
import Tab from "../../components/tabs/Tab";
import { AiOutlinePlus } from "react-icons/ai";
import { BiCalendar } from "react-icons/bi";
import { doctorArr } from "../../utils";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import DoctorTR from "../../components/table/DoctorTR";
import Backdrop from "../../widgets/modal/Backdrop";
import { LiaTimesSolid } from "react-icons/lia";
import { FormikErrors, useFormik } from "formik";
import { DoctorsFormValues } from "../../types/interface";

export default function Doctors() {
  const [activeTab, setActiveTab] = useState<number>(0);

  const tabArr: string[] = ["DOCTORS"];

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
      age: "",
      level: "",
      address: "",
      salary: "",
      unit: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
    validate: (values) => {
      const errors: FormikErrors<DoctorsFormValues> = {};
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
      if (!values.unit) {
        errors.unit = "unit is Required";
      }
      if (!values.level) {
        errors.level = "level is Required";
      }
      if (!values.address) {
        errors.address = "address is Required";
      }
      if (!values.salary) {
        errors.salary = "salary is Required";
      }
      return errors;
    },
  });

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
            className="bg-blue-1 p-2 text-xs flex justify-start gap-3 items-center rounded-lg text-white hover:scale-105 transition-all"
            onClick={() => setShowModal(true)}
          >
            <AiOutlinePlus size="15" /> New Doctor
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
        </div>

        <div className="relative py-9 w-full mt-6">
          <table className="w-full">
            <thead>
              <tr className="h-12 text-[#242222] text-xs">
                <th>Doctor Name</th>
                <th>Level</th>
                <th>Gender</th>
                <th>Unit</th>
                <th>Phone Number</th>
                <th>Email ID</th>
                <th>User Action</th>
              </tr>
            </thead>
            <tbody className="w-full">
              {doctorArr.map((doctor, index) => (
                <DoctorTR doctor={doctor} index={index} />
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
              <p className="text-blue-1 mb-5 text-sm font-bold">
                Create Appointment
              </p>
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

                  <div className="w-[48%]">
                    <select
                      name="unit"
                      value={formik.values.unit}
                      onChange={formik.handleChange}
                      id="unit"
                      className={`${
                        formik.touched.unit &&
                        formik.errors.unit &&
                        "border border-red-500 bg-red-100"
                      } w-full focus:outline-none rounded-lg px-2 py-3 shadow-[3px_3px_6px_0px_rgba(182,190,196,0.15),-1.5px_-1.5px_6px_0px_rgba(182,190,196,0.15)] placeholder:text-xs text-xs`}
                    >
                      <option value="">Select Unit</option>
                      <option value="Surgery">Surgery</option>
                      <option value="General Medicine">General Medicine</option>
                      <option value="O & G	">O & G </option>
                      <option value="ENT">ENT</option>
                      <option value="Pedriatics">Pedriatics</option>
                    </select>
                    {formik.touched.unit && formik.errors.unit ? (
                      <p className="text-red-600 text-xs">
                        {formik.errors.unit}
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

                <div className="w-full mt-5">
                  <select
                    name="level"
                    value={formik.values.level}
                    onChange={formik.handleChange}
                    id="level"
                    className={`${
                      formik.touched.level &&
                      formik.errors.level &&
                      "border border-red-500 bg-red-100"
                    } w-full focus:outline-none rounded-lg px-2 py-3 shadow-[3px_3px_6px_0px_rgba(182,190,196,0.15),-1.5px_-1.5px_6px_0px_rgba(182,190,196,0.15)] placeholder:text-xs text-xs`}
                  >
                    <option value="">Select Level</option>
                    <option value="CMD">CMD</option>
                    <option value="CHO">CHO</option>
                    <option value="MO">MO</option>
                    <option value="Doctor II">Doctor II</option>
                    <option value="Doctor I">Doctor I</option>
                    <option value="House Officer">House Officer</option>
                  </select>
                  {formik.touched.level && formik.errors.level ? (
                    <p className="text-red-600 text-xs">
                      {formik.errors.level}
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
