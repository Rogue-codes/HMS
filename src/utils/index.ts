import { doctor1, doctor2, doctor3, doctor4, doctor5, edu1, edu2, edu3, edu4, eg, elizabet, gopal, rajan, sumanth } from "../../public/assets";
import { DoctorProps, DrugProps, EduTypes, NavProps, PatientProps } from "../types/interface";

export const NavLinks: NavProps[] = [
    {
        label:"Dashboard",
        link:"/"
    },
    {
        label:"Patients",
        link:"/patients"
    },
    {
        label:"Appointments",
        link:"/appointments"
    },
    {
        label:"Doctors",
        link:"/doctors"
    },
    {
        label:"Messages",
        link:"/messages"
    },
    {
        label:"Medicine Inventory",
        link:"/inventory"
    },
    {
        label:"Settings",
        link:"/settings"
    },
    
]

export const patientArr: PatientProps[] =[
    {
        name: "Elizabeth Polson",
        age: 32,
        time: "9:30 AM",
        date: "05/12/2022",
        doctor: "Dr. John",
        fee_status: true,
        blood_group: "B+ve",
        phone_number: "+91 12345 67890",
        email: "elsabethpolsan@hotmail.com",
        gender:"Female",
        img: elizabet
    },
    {
        name: "John David",
        age: 28,
        time: "9:30 AM",
        date: "05/12/2022",
        doctor: "Dr. Joel",
        fee_status: false,
        blood_group: "B+ve",
        phone_number: "+91 12345 67890",
        email: "davidjohn22@gmail.com",
        gender:"Male"
    },
    {
        name: "Krishtav Rajan",
        age: 24,
        time: "10:30 AM",
        date: "05/12/2022",
        doctor: "Dr. Joel",
        fee_status: true,
        blood_group: "AB-ve",
        phone_number: "+91 12345 67890",
        email: "krishnarajan23@gmail.com",
        gender:"Male"
    },
    {
        name: "Sumanth Tinson",
        age: 26,
        time: "11:00 AM",
        date: "05/12/2022",
        doctor: "Dr. Joel",
        fee_status: false,
        blood_group: "O+ve",
        phone_number: "+91 12345 67890",
        email: "tintintin@gmail.com",
        gender:"Male",
        img:sumanth
    },
    {
        name: "EG Subramani",
        age: 77,
        time: "11:30 AM",
        date: "05/12/2022",
        doctor: "Dr. Joel",
        fee_status: false,
        blood_group: "AB+ve",
        phone_number: "+91 12345 67890",
        email: "egs31322@gmail.com",
        gender:"Male",
        img:eg
    },
    {
        name: "Ranjan Maari",
        age: 77,
        time: "11:00 AM",
        date: "05/12/2022",
        doctor: "Dr. John",
        fee_status: false,
        blood_group: "O+ve",
        phone_number: "+91 12345 67890",
        email: "ranajanmaari@yahoo.com",
        gender:"Male",
        img:rajan
    },
    {
        name: "Philipile Gopal",
        age: 55,
        time: "11:00 AM",
        date: "05/12/2022",
        doctor: "Dr. John",
        fee_status: true,
        blood_group: "O-ve",
        phone_number: "+91 12345 67890",
        email: "gopal22@gmail.com",
        gender:"Male",
        img:gopal
    },
]

export const doctorArr: DoctorProps[] =[
    {
        name: "Sam Johnstone",
        age: 29,
        unit: "O & G",
        address: "Mid ave northampton",
        level: "CMD",
        salary: 1200,
        phone_number: "+91 12345 67890",
        email: "elsabethpolsan@hotmail.com",
        gender: "Male",
        img: doctor1
    },
    {
        name: "Sumanya Ahmed",
        age: 35,
        unit: "Pedriatics",
        address: "wolverhampton",
        level: "Doctor I",
        salary: 1200,
        phone_number: "+91 12345 67890",
        email: "elsabethpolsan@hotmail.com",
        gender: "Male",
        img: doctor2
    },
    {
        name: "Rejan Mirano",
        age: 32,
        unit: "General Medicine",
        address: "Mid ave northampton",
        level: "Doctor II",
        salary: 800,
        phone_number: "+91 12345 67890",
        email: "elsabethpolsan@hotmail.com",
        gender: "Male",
        img: doctor3
    },
    {
        name: "Amuche Okafor",
        age: 29,
        unit: "Surgery",
        address: "Mid ave northampton",
        level: "MO",
        salary: 900,
        phone_number: "+91 12345 67890",
        email: "elsabethpolsan@hotmail.com",
        gender: "Female",
        img: doctor4
    },
    {
        name: "Ayo Adedeji",
        age: 29,
        unit: "O & G",
        address: "London",
        level: "Doctor II",
        salary: 800,
        phone_number: "+91 12345 67890",
        email: "elsabethpolsan@hotmail.com",
        gender: "Male",
        img: doctor5
    }
]

export const drugArr: DrugProps[] = [
    {
        product_name:"Albuterol (salbutamol)",
        type:"Inhaler",
        price:28,
        in_stock:100,
        expiry_date:"01 Jun 2024",
        vendor:"John’s Health Care",
    },
    {
        product_name:"Amoxicillin 250 mg",
        type:"Tablet",
        price:40,
        in_stock:28,
        expiry_date:"01 Jun 2024",
        vendor:"John’s Health Care",
    },
    {
        product_name:"Aspirin 300 mg",
        type:"Tablet",
        price:28,
        in_stock:190,
        expiry_date:"01 Jun 2024",
        vendor:"David’s Ltd",
    },
    {
        product_name:"Benadryl 500 ml",
        type:"Syrup",
        price:77,
        in_stock:80,
        expiry_date:"28 Apr 2025",
        vendor:"Johnson & Johnson",
    },
    {
        product_name:"Bufexamac 100 g",
        type:"Cream",
        price:70,
        in_stock:100,
        expiry_date:"01 Jan 2024",
        vendor:"Mickel’s Lab",
    },
    {
        product_name:"Cefixime 300 mg",
        type:"Capsule",
        price:28,
        in_stock:100,
        expiry_date:"01 Jun 2024",
        vendor:"David’s Ltd",
    },
    {
        product_name:"KZ Soap 250g",
        type:"Soap",
        price:250,
        in_stock:55,
        expiry_date:"03 Feb 2024",
        vendor:"John’s Health Care",
    },
    {
        product_name:"Paracetamol 250mg",
        type:"Tablet",
        price:28,
        in_stock:200,
        expiry_date:"08 Sep 2024",
        vendor:"Joe Industries",
    },
]

export const eduArr:EduTypes[] = [
    {
        name: "4 Nutritions to Take Daily",
        author: "By Joel Paulliston",
        img: edu1
    },
    {
        name: "6 Healthy Lifestyle Tips ",
        author: "By Joel Paulliston",
        img: edu2
    },
    {
        name: "Do’s and Don’ts in Hospital",
        author: "By Joel Paulliston",
        img: edu3
    },
    {
        name: "Healthy Habits to Follow",
        author: "By Joel Paulliston",
        img: edu4
    },
]