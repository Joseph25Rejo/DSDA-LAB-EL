"use client"

import { useState } from "react"
import { useHospital } from "../../lib/HospitalContext"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertCircle } from "lucide-react"

export default function EmergencyButton() {
  const { patients, bookEmergencyAppointment } = useHospital()
  const [selectedPatient, setSelectedPatient] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [emergencyResult, setEmergencyResult] = useState<string | null>(null)

  const handleEmergency = async () => {
    if (!selectedPatient) {
      setEmergencyResult("Please select a patient for emergency.")
      return
    }

    setIsLoading(true)
    try {
      const result = await bookEmergencyAppointment(selectedPatient)
      if (result) {
        setEmergencyResult(
          `Emergency appointment booked with Dr. ${result.doctorId} for ${result.date} at ${result.time}`,
        )
      } else {
        setEmergencyResult("No available doctors for emergency. Please try again later.")
      }
    } catch (error) {
      setEmergencyResult("An error occurred. Please try again.")
    }
    setIsLoading(false)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-red-500" />
          Emergency Appointment
        </CardTitle>
        <CardDescription>Book an immediate appointment with an available General Medicine doctor</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Select onValueChange={(value) => setSelectedPatient(value)}>
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
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-4">
        <Button onClick={handleEmergency} disabled={isLoading || !selectedPatient} className="w-full">
          {isLoading ? "Booking..." : "Book Emergency Appointment"}
        </Button>
        {emergencyResult && <p className="text-sm text-muted-foreground">{emergencyResult}</p>}
      </CardFooter>
    </Card>
  )
}

