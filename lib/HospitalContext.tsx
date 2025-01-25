"use client"

import type React from "react"
import { createContext, useState, useContext, type ReactNode } from "react"
import type { Patient, Doctor, Appointment, DoctorRequest, EmergencyDetails } from "./types"
import { dummyDoctors, dummyPatients } from "./dummyData"

interface HospitalContextType {
  patients: Patient[]
  doctors: Doctor[]
  appointments: Appointment[]
  doctorRequests: DoctorRequest[]
  addPatient: (patient: Patient) => void
  updatePatient: (patient: Patient) => void
  deletePatient: (id: string) => void
  bookAppointment: (appointment: Appointment) => void
  updateAppointment: (appointment: Appointment) => void
  bookEmergencyAppointment: (patientId: string, preferredDoctorId?: string, emergencyDetails?: EmergencyDetails) => Promise<Appointment | null>
  requestDoctor: (request: Omit<DoctorRequest, "id" | "status">) => void
  updateDoctorRequest: (request: DoctorRequest) => void
}

const HospitalContext = createContext<HospitalContextType | undefined>(undefined)

export const HospitalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [patients, setPatients] = useState<Patient[]>(dummyPatients)
  const [doctors] = useState<Doctor[]>(dummyDoctors)
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [doctorRequests, setDoctorRequests] = useState<DoctorRequest[]>([])

  const addPatient = (patient: Patient) => {
    setPatients([...patients, patient])
  }

  const updatePatient = (updatedPatient: Patient) => {
    setPatients(patients.map((p) => (p.id === updatedPatient.id ? updatedPatient : p)))
  }

  const deletePatient = (id: string) => {
    setPatients(patients.filter((p) => p.id !== id))
  }

  const bookAppointment = (appointment: Appointment) => {
    setAppointments([...appointments, appointment])
  }

  const updateAppointment = (updatedAppointment: Appointment) => {
    setAppointments(appointments.map((a) => (a.id === updatedAppointment.id ? updatedAppointment : a)))
  }

  const bookEmergencyAppointment = async (
    patientId: string, 
    preferredDoctorId?: string,
    emergencyDetails?: EmergencyDetails
  ): Promise<Appointment | null> => {
    let selectedDoctor: Doctor | null = null

    if (preferredDoctorId) {
      selectedDoctor = doctors.find(d => d.id === preferredDoctorId) || null
    }

    if (!selectedDoctor) {
      const generalMedicineDoctors = doctors.filter((d) => d.specialization === "General Medicine")
      if (generalMedicineDoctors.length === 0) return null

      const doctorAppointments = generalMedicineDoctors.map((d) => ({
        doctor: d,
        appointmentCount: appointments.filter((a) => a.doctorId === d.id).length,
      }))

      selectedDoctor = doctorAppointments.reduce((prev, curr) =>
        prev.appointmentCount <= curr.appointmentCount ? prev : curr,
      ).doctor
    }

    const newAppointment: Appointment = {
      id: Date.now().toString(),
      patientId,
      doctorId: selectedDoctor.id,
      date: new Date().toISOString().split("T")[0],
      time: new Date().toTimeString().split(" ")[0],
      status: "Emergency",
      isEmergency: true,
      emergencyDetails
    }

    setAppointments([...appointments, newAppointment])
    return newAppointment
  }

  const requestDoctor = (request: Omit<DoctorRequest, "id" | "status">) => {
    const newRequest: DoctorRequest = {
      ...request,
      id: Date.now().toString(),
      status: "Pending",
    }
    setDoctorRequests([...doctorRequests, newRequest])
  }

  const updateDoctorRequest = (updatedRequest: DoctorRequest) => {
    setDoctorRequests(doctorRequests.map((r) => (r.id === updatedRequest.id ? updatedRequest : r)))
  }

  return (
    <HospitalContext.Provider
      value={{
        patients,
        doctors,
        appointments,
        doctorRequests,
        addPatient,
        updatePatient,
        deletePatient,
        bookAppointment,
        updateAppointment,
        bookEmergencyAppointment,
        requestDoctor,
        updateDoctorRequest,
      }}
    >
      {children}
    </HospitalContext.Provider>
  )
}

export const useHospital = () => {
  const context = useContext(HospitalContext)
  if (context === undefined) {
    throw new Error("useHospital must be used within a HospitalProvider")
  }
  return context
}