
export interface NavProps{
    label: string;
    link: string;
}

export interface PatientProps{
    name: string;
    age: number;
    time: string;
    date: string;
    doctor: string;
    fee_status: boolean
    blood_group: string;
    phone_number: string
    email: string
    gender: string
    img?: string
}

export interface DoctorProps{
    name: string;
    age: number;
    unit: string;
    address: string;
    level: string;
    salary: number
    phone_number: string
    email: string
    gender: string
    img: string
}

export interface DrugProps{
    product_name:string;
    type:string;
    price:number;
    in_stock:number;
    expiry_date:string;
    vendor:string;
}

export interface PatientFormValues {
    name: string;
    email: string;
    phone_number: string;
    gender: string;
    age: string;
    blood_group: string;
  }
