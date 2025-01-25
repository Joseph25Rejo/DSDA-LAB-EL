"use client"

import { useState } from "react"
import { useHospital } from "../../lib/HospitalContext"
import PatientManagement from "./PatientManagement"
import DoctorManagement from "./DoctorManagement"
import AppointmentBooking from "./AppointmentBooking"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Dashboard() {
  const { patients, doctors, appointments } = useHospital()

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{patients.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Doctors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{doctors.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{appointments.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{appointments.filter((a) => a.status === "Pending").length}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="patients" className="space-y-4">
        <TabsList>
          <TabsTrigger value="patients">Patient Management</TabsTrigger>
          <TabsTrigger value="doctors">Doctor Management</TabsTrigger>
          <TabsTrigger value="appointments">Appointment Booking</TabsTrigger>
        </TabsList>
        <TabsContent value="patients" className="space-y-4">
          <PatientManagement />
        </TabsContent>
        <TabsContent value="doctors" className="space-y-4">
          <DoctorManagement />
        </TabsContent>
        <TabsContent value="appointments" className="space-y-4">
          <AppointmentBooking />
        </TabsContent>
      </Tabs>
    </div>
  )
}

