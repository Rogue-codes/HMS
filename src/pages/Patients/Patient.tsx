/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import Tab from "../../components/tabs/Tab";
import { AiOutlinePlus, AiOutlineSend } from "react-icons/ai";
import PatientTr from "../../components/table/PatientTR";
import { LiaTimesSolid } from "react-icons/lia";
import { PatientFormValues, PatientProps } from "../../types/interface";
import Backdrop from "../../widgets/modal/Backdrop";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { useFormik, FormikErrors } from "formik";
import DateSelect from "../../widgets/date-time/DateSelect";
import { useDispatch, useSelector } from "react-redux";
import { addPatient } from "../../store/reducers/patientSlice";
import { notfound } from "../../../public/assets";
import ApiFetcher from "../../utils/Api";
// const [cookies, removeCookie] = useCookies([]);


export default function Patient() {
  const [activeTab, setActiveTab] = useState<number>(0);

  const tabArr: string[] = ["PATIENT"];
  const [showMsgBox, setShowMsgBox] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [userChatDetails, setUserChatDetails] = useState<PatientProps>();
  const [loading, setLoading] = useState<boolean>(false);

  const handleChat = (user: PatientProps) => {
    setShowMsgBox(true);
    setUserChatDetails(user);
  };

  const patient = useSelector((state: any) => state.patient.patients);

  console.log(patient);

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

  const dispatch = useDispatch();

  const emailRegex = RegExp(/^\S+@\S+\.\S+$/);
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone_number: "",
      gender: "",
      blood_group: "",
      age: "",
      dateAdmitted: new Date(),
    },
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const res = await ApiFetcher.post(`/auth/patient/admit`, {
          patientName: values.name,
          age: values.age,
          blood_group: values.blood_group,
          phone_number: values.phone_number,
          email: values.email,
          gender: values.gender,
        }
        );
        setLoading(false)
        dispatch(addPatient(res?.data?.data));
        setShowModal(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
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

  return (
    <div className="w-[80%] min-h-screen ml-[20%] pb-12">
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
            <AiOutlinePlus size="15" /> New Patient
          </button>
        </div>

        <div className="pt-8 px-9 flex justify-start gap-10 items-center">
          <div>
            <input
              type="search"
              className="w-[14rem] bg-[#EBF5FF] py-2 px-3 rounded-xl focus:outline-none text-sm placeholder:text-xs"
              placeholder="Search"
              name=""
              id=""
            />
          </div>

          <div>
            <DateSelect
              className="border-blue-1 border w-full items-center rounded-lg text-lg p-2"
              placeholderText="Filter by date"
              // selected={expiryDate}
              // onChange={(date) => {
              // setExpiryDate(date);
              // }}
              maxDate={new Date()}
              type="table"
            />
          </div>
        </div>

        <div className="relative py-9 w-full mt-6">
          {patient.length ? (
            <table className="w-full">
              <thead>
                <tr className="h-12 text-[#242222] text-xs">
                  <th>Patient Name</th>
                  <th>Patient Age</th>
                  <th>Gender</th>
                  <th>Blood Group</th>
                  <th>Phone Number</th>
                  <th>Email ID</th>
                  <th>User Action</th>
                </tr>
              </thead>
              <tbody className="w-full">
                {patient.map((patient: PatientProps, index: number) => (
                  <PatientTr
                    patient={patient}
                    index={index}
                    handleChat={handleChat}
                  />
                ))}
              </tbody>
            </table>
          ) : (
            <div className="w-full flex flex-col justify-center items-center p-5">
              <div className="w-[300px] h-[300px] flex flex-col justify-center items-center">
                <img src={notfound} alt="" />{" "}
                <p className="text-center">
                  No Patient Available at this time Click on the{" "}
                  <strong className="text-center text-blue-1">
                    New patient
                  </strong>{" "}
                  button to add a patient{" "}
                </p>
              </div>
            </div>
          )}

          {showMsgBox && (
            <div className="w-[18rem] flex flex-col justify-between items-center shadow-[0px_6px_16px_2px_rgba(0,0,0,0.16)] z-10 bg-white rounded-xl h-[20rem] absolute right-0 bottom-0">
              <div className="w-full flex justify-between items-center px-4 py-6 bg-blue-1 rounded-tr-xl rounded-tl-xl">
                <div className="flex justify-start gap-2 items-center">
                  <div className="w-8 bg-text-2 h-8 rounded-full">
                    <img src={userChatDetails?.img} alt="" />
                  </div>
                  <div>
                    <p className="text-xs text-white">
                      {userChatDetails?.name}
                    </p>
                    <p className="text-xs text-white">Online</p>
                  </div>
                </div>

                <LiaTimesSolid
                  className="text-white cursor-pointer"
                  onClick={() => setShowMsgBox(false)}
                />
              </div>

              <div className="w-full relative h-14 bg-[#F6F6F6] rounded-br-lg border rounded-bl-lg">
                <input
                  className="w-full h-full rounded-br-lg text-sm bg-transparent rounded-bl-lg p-5 focus:outline-2 focus:outline-blue-1"
                  type="text"
                  name=""
                  id=""
                  placeholder="Type a message"
                />
                <AiOutlineSend
                  className="absolute right-4 top-4 text-blue-1 cursor-not-allowed"
                  size={25}
                />
              </div>
            </div>
          )}
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
              className="w-[80%] mx-auto lg:w-[45%] relative bg-[#fff] px-9 py-16 shadow-2xl rounded-md"
            >
              <LiaTimesSolid
                className="absolute text-lg cursor-pointer hover:scale-110 transition-all text-text-2 right-4 top-4"
                onClick={() => setShowModal(false)}
              />
              <p className="text-blue-1 mb-5 text-sm font-bold">Add Patient</p>
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

                <button
                  type="submit"
                  className="w-full p-3 bg-blue-1 text-white mt-5 rounded-lg hover:scale-105 transition-all"
                >
                  {loading ? "Loading..." : "Submit"}
                </button>
              </form>
            </motion.div>
          </Backdrop>
        )}
      </AnimatePresence>
    </div>
  );
}
