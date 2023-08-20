import { FormikErrors, useFormik } from "formik";
import { useState } from "react";
import ApiFetcher from "../../utils/Api";
import { PatientFormValues, PatientProps } from "../../types/interface";
import { useDispatch } from "react-redux";
import { updatePatient } from "../../store/reducers/patientSlice";
import { toast } from "react-toastify";

interface PatientModal {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  selectedPatient: PatientProps | undefined
}

export default function PatientModal({ setShowModal, selectedPatient }: PatientModal) {
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch()
  const emailRegex = RegExp(/^\S+@\S+\.\S+$/);
  const formik = useFormik({
    initialValues: {
      name: selectedPatient?.patientName,
      email: selectedPatient?.email,
      phone_number: selectedPatient?.phone_number,
      gender:selectedPatient?.gender,
      blood_group: selectedPatient?.blood_group,
      age: selectedPatient?.age,
      fee_status: selectedPatient?.fee_status
    },
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const res = await ApiFetcher.put(`/auth/patient/update/${selectedPatient?._id}`, {
          patientName: values.name,
          age: values.age,
          blood_group: values.blood_group,
          phone_number: values.phone_number,
          email: values.email,
          gender: values.gender,
          fee_status: values.fee_status
        });
        setLoading(false);
        dispatch(updatePatient(res.data.data));
        toast.success(res.data.message);
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

  console.log(selectedPatient)
  return (
    <div className="w-full p-2 bg-white">
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
              <p className="text-red-600 text-xs">{formik.errors.age}</p>
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
            <p className="text-red-600 text-xs">{formik.errors.email}</p>
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
            <p className="text-red-600 text-xs">{formik.errors.phone_number}</p>
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
            <p className="text-red-600 text-xs">{formik.errors.gender}</p>
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
    </div>
  );
}
