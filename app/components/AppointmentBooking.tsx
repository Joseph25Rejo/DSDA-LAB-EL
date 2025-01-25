"use client"

import { useState, useEffect } from "react"
import { useHospital } from "../../lib/HospitalContext"
import type { Appointment, Doctor } from "../../lib/types"
import { specializations } from "../../lib/dummyData"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function AppointmentBooking() {
  const { patients, doctors, appointments, bookAppointment } = useHospital()
  const [newAppointment, setNewAppointment] = useState({
    patientId: "",
    doctorId: "",
    date: "",
    time: "",
  })
  const [selectedSpecialization, setSelectedSpecialization] = useState("")
  const [availableDoctors, setAvailableDoctors] = useState<Doctor[]>([])

  useEffect(() => {
    if (selectedSpecialization) {
      setAvailableDoctors(doctors.filter((doctor) => doctor.specialization === selectedSpecialization))
    } else {
      setAvailableDoctors([])
    }
  }, [selectedSpecialization, doctors])

  const handleBookAppointment = () => {
    if (!newAppointment.patientId || !selectedSpecialization || !newAppointment.date || !newAppointment.time) {
      alert("Please fill in all required fields")
      return
    }

    const randomDoctor = availableDoctors[Math.floor(Math.random() * availableDoctors.length)]
    if (!randomDoctor) {
      alert("No doctors available for the selected specialization")
      return
    }

    const appointment: Appointment = {
      ...newAppointment,
      id: Date.now().toString(),
      doctorId: randomDoctor.id,
      status: "Pending",
    }
    bookAppointment(appointment)
    setNewAppointment({ patientId: "", doctorId: "", date: "", time: "" })
    setSelectedSpecialization("")
    alert("Appointment booked successfully")
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Book Appointment</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleBookAppointment()
            }}
            className="space-y-4"
          >
            <div className="space-y-2">
              <Label htmlFor="patient">Select Patient</Label>
              <Select
                value={newAppointment.patientId}
                onValueChange={(value) => setNewAppointment({ ...newAppointment, patientId: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Patient" />
                </SelectTrigger>
                <SelectContent>
                  {patients.map((patient) => (
                    <SelectItem key={patient.id} value={patient.id}>
                      {patient.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="specialization">Select Specialization</Label>
              <Select value={selectedSpecialization} onValueChange={setSelectedSpecialization}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Specialization" />
                </SelectTrigger>
                <SelectContent>
                  {specializations.map((spec) => (
                    <SelectItem key={spec} value={spec}>
                      {spec}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">Select Date</Label>
              <Input
                id="date"
                type="date"
                value={newAppointment.date}
                onChange={(e) => setNewAppointment({ ...newAppointment, date: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="time">Select Time</Label>
              <Input
                id="time"
                type="time"
                value={newAppointment.time}
                onChange={(e) => setNewAppointment({ ...newAppointment, time: e.target.value })}
              />
            </div>
            <Button type="submit">Book Appointment</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Appointments</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {appointments.map((appointment) => (
              <li key={appointment.id} className="bg-white shadow overflow-hidden sm:rounded-md p-4">
                <p className="text-sm font-medium text-gray-900">
                  Patient: {patients.find((p) => p.id === appointment.patientId)?.name}
                </p>
                <p className="mt-1 text-sm text-gray-600">
                  Doctor: {doctors.find((d) => d.id === appointment.doctorId)?.name}
                </p>
                <p className="mt-1 text-sm text-gray-600">Date: {appointment.date}</p>
                <p className="mt-1 text-sm text-gray-600">Time: {appointment.time}</p>
                <p className="mt-1 text-sm text-gray-600">Status: {appointment.status}</p>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

