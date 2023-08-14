import { createSlice } from "@reduxjs/toolkit"
import { PatientProps } from "../../types/interface"

interface InitialStateProps{
    patients: PatientProps[]
}

const initialState : InitialStateProps ={
    patients:localStorage.getItem('patient') ? JSON.parse(localStorage.getItem('patient')!):[]
}

export const patientSlice = createSlice({
    name: 'patient',
    initialState,
    reducers:{
        addPatient:(state,action)=>{
            // const newArr = action.payload
            state.patients.push(action.payload);
            localStorage.setItem('patient', JSON.stringify(state.patients))
        }
    }
})

export const {addPatient} = patientSlice.actions

// export default patientSlice.reducer