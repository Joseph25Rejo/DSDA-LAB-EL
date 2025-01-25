"use client"

import { useState } from "react"
import { useHospital } from "../../lib/HospitalContext"
import { specializations } from "../../lib/dummyData"
import type { Doctor, Patient, Appointment } from "../../lib/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function DoctorManagement() {
  const { doctors, patients, appointments, updateAppointment } = useHospital()
  const [selectedSpecialization, setSelectedSpecialization] = useState("")
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null)
  const [searchTerm, setSearchTerm] = useState("")

  const filteredDoctors = doctors.filter(
    (doctor) =>
      (selectedSpecialization === "" || doctor.specialization === selectedSpecialization) &&
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getDoctorAppointments = (doctorId: string): Appointment[] => {
    return appointments.filter((app) => app.doctorId === doctorId)
  }

  const handleUpdateAppointment = (appointment: Appointment, newStatus: "Accepted" | "Cancelled") => {
    updateAppointment({ ...appointment, status: newStatus })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Doctor Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4 mb-4">
            <div className="flex-1">
              <Label htmlFor="search">Search Doctors</Label>
              <Input
                id="search"
                placeholder="Search by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex-1">
              <Label htmlFor="specialization">Filter by Specialization</Label>
              <Select value={selectedSpecialization} onValueChange={setSelectedSpecialization}>
                <SelectTrigger>
                  <SelectValue placeholder="All Specializations" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Specializations</SelectItem> {/* Changed value prop here */}
                  {specializations.map((spec) => (
                    <SelectItem key={spec} value={spec}>
                      {spec}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Specialization</TableHead>
                <TableHead>Availability</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDoctors.map((doctor) => (
                <TableRow key={doctor.id}>
                  <TableCell>{doctor.name}</TableCell>
                  <TableCell>{doctor.specialization}</TableCell>
                  <TableCell>{doctor.availability.join(", ")}</TableCell>
                  <TableCell>
                    <Button onClick={() => setSelectedDoctor(doctor)}>View Appointments</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {selectedDoctor && (
        <Card>
          <CardHeader>
            <CardTitle>Appointments for Dr. {selectedDoctor.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {getDoctorAppointments(selectedDoctor.id).map((appointment) => (
                  <TableRow key={appointment.id}>
                    <TableCell>{patients.find((p) => p.id === appointment.patientId)?.name}</TableCell>
                    <TableCell>{appointment.date}</TableCell>
                    <TableCell>{appointment.time}</TableCell>
                    <TableCell>{appointment.status}</TableCell>
                    <TableCell>
                      {appointment.status === "Pending" && (
                        <>
                          <Button
                            onClick={() => handleUpdateAppointment(appointment, "Accepted")}
                            variant="outline"
                            className="mr-2"
                          >
                            Accept
                          </Button>
                          <Button
                            onClick={() => handleUpdateAppointment(appointment, "Cancelled")}
                            variant="destructive"
                          >
                            Cancel
                          </Button>
                        </>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

