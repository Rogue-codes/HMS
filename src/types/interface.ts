export interface NavProps {
  label: string;
  link: string;
}

export interface PatientProps {
  _id:string;
  admitted: boolean;
  age: number;
  blood_group: string;
  createdAt: string;
  email: string;
  fee_status: boolean;
  gender: string;
  patientName: string;
  phone_number: string;
}

export interface DoctorProps {
  name: string;
  age: number;
  unit: string;
  address: string;
  level: string;
  salary: number;
  phone_number: string;
  email: string;
  gender: string;
  img: string;
}

export interface DrugProps {
  product_name: string;
  type: string;
  price: number;
  in_stock: number;
  expiry_date: string;
  vendor: string;
}

export interface PatientFormValues {
  name: string;
  email: string;
  phone_number: string;
  gender: string;
  age: string;
  blood_group: string;
}

export interface DoctorsFormValues {
  name: string;
  email: string;
  phone_number: string;
  gender: string;
  age: number;
  unit: string;
  address: string;
  level: string;
  salary: number;
}

export interface DrugFormValues {
  product_name: string;
  type: string;
  price: number;
  in_stock: number;
  expiry_date: string;
  vendor: string;
}

export interface EduTypes {
  name: string;
  author: string;
  img: string;
}

export interface SelectOptions {
  value: string;
  label: string;
}
