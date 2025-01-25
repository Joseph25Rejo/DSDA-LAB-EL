"use client"

import type React from "react"
import { createContext, useState, useContext, type ReactNode } from "react"
import type { Patient, Doctor, Appointment } from "./types"
import { dummyDoctors } from "./dummyData"

interface HospitalContextType {
  patients: Patient[]
  doctors: Doctor[]
  appointments: Appointment[]
  addPatient: (patient: Patient) => void
  updatePatient: (patient: Patient) => void
  deletePatient: (id: string) => void
  bookAppointment: (appointment: Appointment) => void
  updateAppointment: (appointment: Appointment) => void
}

const HospitalContext = createContext<HospitalContextType | undefined>(undefined)

export const HospitalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [patients, setPatients] = useState<Patient[]>([])
  const [doctors] = useState<Doctor[]>(dummyDoctors)
  const [appointments, setAppointments] = useState<Appointment[]>([])

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

  return (
    <HospitalContext.Provider
      value={{
        patients,
        doctors,
        appointments,
        addPatient,
        updatePatient,
        deletePatient,
        bookAppointment,
        updateAppointment,
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

