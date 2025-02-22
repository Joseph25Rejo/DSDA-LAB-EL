import type { Doctor, Patient } from "./types"

export const specializations = [
  "Cardiology",
  "Pediatrics",
  "Orthopedics",
  "Neurology",
  "Dermatology",
  "Oncology",
  "Gynecology",
  "Ophthalmology",
  "Psychiatry",
  "Urology",
  "Gastroenterology",
  "Endocrinology",
  "Pulmonology",
  "Rheumatology",
  "Hematology",
  "Nephrology",
  "Allergy and Immunology",
  "Plastic Surgery",
  "Pediatric Surgery",
  "Otolaryngology (ENT)",
  "Anesthesiology",
  "Podiatry",
  "Radiology",
  "Pathology",
  "Sports Medicine",
  "General Medicine",
]

export const dummyPatients: Patient[] = [
  {
    id: "1",
    name: "Aarav Sharma",
    age: 45,
    gender: "Male",
    condition: "Hypertension",
  },
  {
    id: "2",
    name: "Diya Patel",
    age: 28,
    gender: "Female",
    condition: "Pregnancy",
  },
  {
    id: "3",
    name: "Arjun Mehta",
    age: 62,
    gender: "Male",
    condition: "Diabetes",
  },
  {
    id: "4",
    name: "Zara Khan",
    age: 8,
    gender: "Female",
    condition: "Asthma",
  },
  {
    id: "5",
    name: "Vihaan Reddy",
    age: 35,
    gender: "Male",
    condition: "Back Pain",
  },
  {
    id: "6",
    name: "Ananya Singh",
    age: 19,
    gender: "Female",
    condition: "Migraine",
  },
  {
    id: "7",
    name: "Reyansh Kumar",
    age: 72,
    gender: "Male",
    condition: "Arthritis",
  },
  {
    id: "8",
    name: "Ishaan Malhotra",
    age: 15,
    gender: "Male",
    condition: "Sports Injury",
  },
  {
    id: "9",
    name: "Aisha Verma",
    age: 52,
    gender: "Female",
    condition: "Thyroid",
  },
  {
    id: "10",
    name: "Advait Chopra",
    age: 4,
    gender: "Male",
    condition: "Fever",
  },
]

// Existing dummy doctors data
export const dummyDoctors: Doctor[] = [
  {
    id: "1",
    name: "Dr. Rajesh Kumar",
    specialization: "Cardiology",
    availability: ["Monday", "Wednesday", "Friday"],
  },
  {
    id: "2",
    name: "Dr. Priya Sharma",
    specialization: "Pediatrics",
    availability: ["Tuesday", "Thursday", "Saturday"],
  },
  {
    id: "3",
    name: "Dr. Arjun Singh",
    specialization: "Orthopedics",
    availability: ["Monday", "Tuesday", "Friday"],
  },
  {
    id: "4",
    name: "Dr. Sneha Patel",
    specialization: "Neurology",
    availability: ["Wednesday", "Thursday", "Friday"],
  },
  {
    id: "5",
    name: "Dr. Anjali Mehta",
    specialization: "Dermatology",
    availability: ["Monday", "Wednesday", "Saturday"],
  },
  {
    id: "6",
    name: "Dr. Sameer Iyer",
    specialization: "Oncology",
    availability: ["Tuesday", "Thursday", "Friday"],
  },
  {
    id: "7",
    name: "Dr. Kavita Reddy",
    specialization: "Gynecology",
    availability: ["Monday", "Wednesday", "Friday"],
  },
  {
    id: "8",
    name: "Dr. Rohan Nair",
    specialization: "Ophthalmology",
    availability: ["Tuesday", "Thursday", "Saturday"],
  },
  {
    id: "9",
    name: "Dr. Aman Gupta",
    specialization: "Psychiatry",
    availability: ["Monday", "Wednesday", "Friday"],
  },
  {
    id: "10",
    name: "Dr. Ananya Bose",
    specialization: "Urology",
    availability: ["Tuesday", "Thursday", "Saturday"],
  },
  {
    id: "11",
    name: "Dr. Vishal Malhotra",
    specialization: "Gastroenterology",
    availability: ["Monday", "Wednesday", "Friday"],
  },
  {
    id: "12",
    name: "Dr. Nisha Das",
    specialization: "Endocrinology",
    availability: ["Tuesday", "Thursday", "Saturday"],
  },
  {
    id: "13",
    name: "Dr. Aditya Verma",
    specialization: "Pulmonology",
    availability: ["Monday", "Tuesday", "Friday"],
  },
  {
    id: "14",
    name: "Dr. Pooja Srinivasan",
    specialization: "Rheumatology",
    availability: ["Wednesday", "Thursday", "Saturday"],
  },
  {
    id: "15",
    name: "Dr. Karan Desai",
    specialization: "Hematology",
    availability: ["Monday", "Wednesday", "Friday"],
  },
  {
    id: "16",
    name: "Dr. Tanya Roy",
    specialization: "Nephrology",
    availability: ["Tuesday", "Thursday", "Friday"],
  },
  {
    id: "17",
    name: "Dr. Aravind Pillai",
    specialization: "Allergy and Immunology",
    availability: ["Monday", "Wednesday", "Saturday"],
  },
  {
    id: "18",
    name: "Dr. Rina Chakraborty",
    specialization: "Plastic Surgery",
    availability: ["Tuesday", "Thursday", "Saturday"],
  },
  {
    id: "19",
    name: "Dr. Devansh Kulkarni",
    specialization: "Pediatric Surgery",
    availability: ["Monday", "Tuesday", "Friday"],
  },
  {
    id: "20",
    name: "Dr. Meera Shetty",
    specialization: "Otolaryngology (ENT)",
    availability: ["Wednesday", "Thursday", "Saturday"],
  },
  {
    id: "21",
    name: "Dr. Manish Tiwari",
    specialization: "Anesthesiology",
    availability: ["Monday", "Tuesday", "Friday"],
  },
  {
    id: "22",
    name: "Dr. Neha Sen",
    specialization: "Podiatry",
    availability: ["Tuesday", "Thursday", "Saturday"],
  },
  {
    id: "23",
    name: "Dr. Rohit Kapoor",
    specialization: "Radiology",
    availability: ["Monday", "Wednesday", "Friday"],
  },
  {
    id: "24",
    name: "Dr. Sanya Banerjee",
    specialization: "Pathology",
    availability: ["Tuesday", "Thursday", "Saturday"],
  },
  {
    id: "25",
    name: "Dr. Akash Jain",
    specialization: "Sports Medicine",
    availability: ["Monday", "Tuesday", "Friday"],
  },
  {
    id: "26",
    name: "Dr. Aditi Agarwal",
    specialization: "General Medicine",
    availability: ["Monday", "Wednesday", "Friday"],
  },
  {
    id: "27",
    name: "Dr. Siddharth Bhattacharya",
    specialization: "General Medicine",
    availability: ["Tuesday", "Thursday", "Saturday"],
  },
  {
    id: "28",
    name: "Dr. Ishita Chatterjee",
    specialization: "General Medicine",
    availability: ["Monday", "Tuesday", "Thursday"],
  },
  {
    id: "29",
    name: "Dr. Arjun Khanna",
    specialization: "General Medicine",
    availability: ["Wednesday", "Friday", "Saturday"],
  },
  {
    id: "30",
    name: "Dr. Mansi Narang",
    specialization: "General Medicine",
    availability: ["Tuesday", "Thursday", "Friday"],
  },
  {
    id: "31",
    name: "Dr. Harsh Trivedi",
    specialization: "General Medicine",
    availability: ["Monday", "Wednesday", "Saturday"],
  },
]

