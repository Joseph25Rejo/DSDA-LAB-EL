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
  time: string
  status: "Pending" | "Accepted" | "Cancelled" | "Emergency"
  isEmergency?: boolean
}

export interface DoctorRequest {
  id: string
  patientId: string
  doctorId: string
  status: "Pending" | "Accepted" | "Declined"
  note?: string
}

