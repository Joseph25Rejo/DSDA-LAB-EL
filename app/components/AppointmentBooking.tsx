"use client"

import { useState, useEffect } from "react"
import { useHospital } from "../../lib/HospitalContext"
import type { Appointment, Doctor, DoctorRequest } from "../../lib/types"
import { specializations } from "../../lib/dummyData"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { InfoIcon } from "lucide-react"

export default function AppointmentBooking() {
  const { patients, doctors, appointments, bookAppointment, requestDoctor } = useHospital()
  const [newAppointment, setNewAppointment] = useState({
    patientId: "",
    doctorName: "",
    date: "",
    time: "",
  })
  const [selectedSpecialization, setSelectedSpecialization] = useState("")
  const [availableDoctors, setAvailableDoctors] = useState<Doctor[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null)
  const [requestNote, setRequestNote] = useState("")
  const [selectedPatient, setSelectedPatient] = useState<string>("")
  const [patientCondition, setPatientCondition] = useState<string>("")
  const [recommendedSpecializations, setRecommendedSpecializations] = useState<string[]>([])

  // Update patient condition when patient is selected
  useEffect(() => {
    if (selectedPatient) {
      const patient = patients.find(p => p.id === selectedPatient)
      if (patient) {
        setPatientCondition(patient.condition)
        // Recommend specializations based on condition keywords
        const recommendations = getRecommendedSpecializations(patient.condition)
        setRecommendedSpecializations(recommendations)
      }
    }
  }, [selectedPatient, patients])

  // Helper function to recommend specializations based on condition
  const getRecommendedSpecializations = (condition: string) => {
    const conditionLower = condition.toLowerCase()
    const recommendations = new Set<string>()

    // Define condition-to-specialization mappings
    const mappings: Record<string, string[]> = {
      'heart': ['Cardiology'],
      'chest': ['Cardiology', 'Pulmonology'],
      'breathing': ['Pulmonology'],
      'lung': ['Pulmonology'],
      'bone': ['Orthopedics'],
      'joint': ['Orthopedics'],
      'skin': ['Dermatology'],
      'brain': ['Neurology'],
      'nerve': ['Neurology'],
      'diabetes': ['Endocrinology'],
      'thyroid': ['Endocrinology'],
      'pregnancy': ['Gynecology'],
      'eye': ['Ophthalmology'],
      'vision': ['Ophthalmology'],
      'mental': ['Psychiatry'],
      'depression': ['Psychiatry'],
      'anxiety': ['Psychiatry'],
      'kidney': ['Nephrology'],
      'urine': ['Urology'],
      'allergy': ['Allergy and Immunology'],
      'immune': ['Allergy and Immunology'],
      'cancer': ['Oncology'],
      'tumor': ['Oncology'],
      'stomach': ['Gastroenterology'],
      'digestion': ['Gastroenterology'],
      'child': ['Pediatrics'],
      'ear': ['Otolaryngology (ENT)'],
      'nose': ['Otolaryngology (ENT)'],
      'throat': ['Otolaryngology (ENT)']
    }

    // Check condition against keywords
    Object.entries(mappings).forEach(([keyword, specs]) => {
      if (conditionLower.includes(keyword)) {
        specs.forEach(spec => recommendations.add(spec))
      }
    })

    // Always include General Medicine as a fallback
    recommendations.add('General Medicine')

    return Array.from(recommendations)
  }

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

  const handleDoctorRequest = () => {
    if (!newAppointment.patientId || !selectedDoctor || !newAppointment.date || !newAppointment.time) {
      alert("Please fill in all required fields")
      return
    }

    const request: Omit<DoctorRequest, "id" | "status"> = {
      patientId: newAppointment.patientId,
      doctorId: selectedDoctor.id,
      note: requestNote,
    }
    requestDoctor(request)
    setNewAppointment({ patientId: "", doctorId: "", date: "", time: "" })
    setSelectedDoctor(null)
    setRequestNote("")
    alert("Doctor request sent successfully")
  }

  const filteredDoctors = doctors.filter(
    (doctor) =>
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <Tabs defaultValue="book">
        <TabsList>
          <TabsTrigger value="book">Book by Specialization</TabsTrigger>
          <TabsTrigger value="request">Request Specific Doctor</TabsTrigger>
        </TabsList>

        <TabsContent value="book">
          <Card>
            <CardHeader>
              <CardTitle>Book Appointment by Specialization</CardTitle>
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
                    value={selectedPatient}
                    onValueChange={(value) => {
                      setSelectedPatient(value)
                      setNewAppointment({ ...newAppointment, patientId: value })
                    }}
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

                {patientCondition && (
                  <Alert>
                    <InfoIcon className="h-4 w-4" />
                    <AlertTitle>Patient Condition</AlertTitle>
                    <AlertDescription>
                      <p className="mt-1">{patientCondition}</p>
                      {recommendedSpecializations.length > 0 && (
                        <div className="mt-2">
                          <p className="font-semibold">Recommended Specializations:</p>
                          <ul className="list-disc list-inside">
                            {recommendedSpecializations.map((spec) => (
                              <li key={spec}>{spec}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </AlertDescription>
                  </Alert>
                )}

                <div className="space-y-2">
                  <Label htmlFor="specialization">Select Specialization</Label>
                  <Select value={selectedSpecialization} onValueChange={setSelectedSpecialization}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Specialization" />
                    </SelectTrigger>
                    <SelectContent>
                      {specializations.map((spec) => (
                        <SelectItem 
                          key={spec} 
                          value={spec}
                          className={recommendedSpecializations.includes(spec) ? "font-bold text-primary" : ""}
                        >
                          {spec} {recommendedSpecializations.includes(spec) ? "★" : ""}
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
        </TabsContent>

        <TabsContent value="request">
          <Card>
            <CardHeader>
              <CardTitle>Request Specific Doctor</CardTitle>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  handleDoctorRequest()
                }}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <Label htmlFor="patient">Select Patient</Label>
                  <Select
                    value={selectedPatient}
                    onValueChange={(value) => {
                      setSelectedPatient(value)
                      setNewAppointment({ ...newAppointment, patientId: value })
                    }}
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

                {patientCondition && (
                  <Alert>
                    <InfoIcon className="h-4 w-4" />
                    <AlertTitle>Patient Condition</AlertTitle>
                    <AlertDescription>
                      <p>{patientCondition}</p>
                      {recommendedSpecializations.length > 0 && (
                        <div className="mt-2">
                          <p className="font-semibold">Recommended Specializations:</p>
                          <ul className="list-disc list-inside">
                            {recommendedSpecializations.map((spec) => (
                              <li key={spec}>{spec}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </AlertDescription>
                  </Alert>
                )}

                <div className="space-y-2">
                  <Label htmlFor="doctor-search">Search for Doctor</Label>
                  <Input
                    id="doctor-search"
                    type="text"
                    placeholder="Search by name or specialization"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="doctor">Select Doctor</Label>
                  <Select
                    value={selectedDoctor?.id || ""}
                    onValueChange={(value) => setSelectedDoctor(doctors.find((d) => d.id === value) || null)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Doctor" />
                    </SelectTrigger>
                    <SelectContent>
                      {filteredDoctors.map((doctor) => (
                        <SelectItem 
                          key={doctor.id} 
                          value={doctor.id}
                          className={recommendedSpecializations.includes(doctor.specialization) ? "font-bold text-primary" : ""}
                        >
                          {doctor.name} - {doctor.specialization} 
                          {recommendedSpecializations.includes(doctor.specialization) ? " ★" : ""}
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

                <div className="space-y-2">
                  <Label htmlFor="note">Request Note (Optional)</Label>
                  <Textarea
                    id="note"
                    placeholder="Add a note for your request"
                    value={requestNote}
                    onChange={(e) => setRequestNote(e.target.value)}
                  />
                </div>

                <Button type="submit">Send Doctor Request</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

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