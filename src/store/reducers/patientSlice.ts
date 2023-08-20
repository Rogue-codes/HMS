/* eslint-disable @typescript-eslint/ban-types */
import { createSlice } from "@reduxjs/toolkit";
import { PatientProps } from "../../types/interface";

interface InitialStateProps {
  patients: PatientProps[];
}

const initialState: InitialStateProps = {
  patients: localStorage.getItem("patient")
    ? JSON.parse(localStorage.getItem("patient")!)
    : null,
};

export const patientSlice = createSlice({
  name: "patient",
  initialState,
  reducers: {
    getPatient: (state, action) => {
      state.patients = action.payload;
      localStorage.setItem("patient", JSON.stringify(state.patients));
    },
    addPatient: (state, action) => {
      const newPatients = [...state.patients, action.payload];
      state.patients = newPatients;
      localStorage.setItem("patient", JSON.stringify(newPatients));
    },
    updatePatient: (state, action) => {
      const updatedPatient = action.payload;
      const patientToUpdate = state.patients.find(
        (patient) => patient._id === updatedPatient._id
      );
      if (patientToUpdate) {
        const updatedPatients = state.patients.map((patient) =>
          patient._id === updatedPatient._id ? updatedPatient : patient
        );
        state.patients = updatedPatients;
        localStorage.setItem("patient", JSON.stringify(updatedPatients));
      }
    },
    deletePatient: (state, action) => {
      const deletedPatient = action.payload;
      const updatedPatients = state.patients.filter(patient => patient._id !== deletedPatient._id);
    
      // Update state and local storage only if a patient was actually deleted
      if (updatedPatients.length < state.patients.length) {
        state.patients = updatedPatients;
        localStorage.setItem('patients', JSON.stringify(updatedPatients));
      }
    }    
  },
});

export const { addPatient, getPatient, updatePatient, deletePatient } = patientSlice.actions;

// export default patientSlice.reducer
