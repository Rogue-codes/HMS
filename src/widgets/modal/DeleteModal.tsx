import { useState } from "react";
import { PatientProps } from "../../types/interface";
import { useDispatch } from "react-redux";
import ApiFetcher from "../../utils/Api";
import { toast } from "react-toastify";
import { deletePatient } from "../../store/reducers/patientSlice";

interface DeleteModalProps {
  selectedPatient: PatientProps | undefined;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function DeleteModal({
  selectedPatient,
  setShowModal,
}: DeleteModalProps) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const handleDeletePatient = async () => {
    setLoading(true);
    try {
      const res = await ApiFetcher.delete(
        `/auth/patient/delete/${selectedPatient?._id}`
      );
      setLoading(false);
      dispatch(deletePatient(selectedPatient));
      console.log(res.data.message);
      toast.error("Patient Deleted");
      setShowModal(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  return (
    <div className="p-4 px-0 bg-white rounded-lg">
      <p className="text-text-1">
        Are you sure you want to delete {selectedPatient?.patientName} from
        Patient List?
      </p>
      {loading ? (
        <p className="flex justify-center items-center m-8">Loading...</p>
      ) : (
        <div className="w-full flex justify-center mt-8 items-center gap-5">
          <button
            className="py-2 px-12 bg-blue-1 text-white rounded-lg hover:scale-105 transition-all"
            onClick={() => setShowModal(false)}
          >
            Cancel
          </button>
          <button
            className="py-2 px-12 bg-red-500 text-white rounded-lg hover:scale-105 transition-all"
            onClick={handleDeletePatient}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
