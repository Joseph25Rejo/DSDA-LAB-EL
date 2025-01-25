export interface Patient {
  id: string
  name: string
  age: number
  gender: "Male" | "Female" | "Other"
  condition: string
}

export interface Doctor {
  id: string
  name: string
  specialization: string
  availability: string[]
}

export interface Appointment {
  id: string
  patientId: string
  doctorId: string
  date: string
  status: "Pending" | "Accepted" | "Cancelled"
}

