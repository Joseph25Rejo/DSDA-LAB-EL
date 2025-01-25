"use client"

import { useState } from "react"
import { useHospital } from "../../lib/HospitalContext"
import type { Patient, Doctor } from "../../lib/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function PatientManagement() {
  const { patients, doctors, addPatient, updatePatient, deletePatient, bookEmergencyAppointment } = useHospital()
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null)
  const [isEmergency, setIsEmergency] = useState(false)
  const [selectedDoctor, setSelectedDoctor] = useState<string>("")
  const [newPatient, setNewPatient] = useState<Omit<Patient, "id">>({
    name: "",
    age: 0,
    gender: "Male",
    condition: "",
  })
  const [emergencyReason, setEmergencyReason] = useState("")
  const [emergencyPriority, setEmergencyPriority] = useState<"High" | "Medium" | "Low">("Medium")

  const handleAddPatient = async () => {
    const patient: Patient = {
      ...newPatient,
      id: Date.now().toString(),
    }
    addPatient(patient)

    if (isEmergency) {
      const appointment = await bookEmergencyAppointment(patient.id, selectedDoctor, {
        reason: emergencyReason,
        priority: emergencyPriority,
      })
      if (appointment) {
        alert("Emergency appointment booked successfully!")
      }
    }

    setNewPatient({ name: "", age: 0, gender: "Male", condition: "" })
    setIsEmergency(false)
    setSelectedDoctor("")
    setEmergencyReason("")
    setEmergencyPriority("Medium")
  }

  const handleUpdatePatient = () => {
    if (editingPatient) {
      updatePatient(editingPatient)
      setEditingPatient(null)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Add New Patient</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleAddPatient()
            }}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={newPatient.name}
                  onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="number"
                  min="0"
                  value={newPatient.age || ""}
                  onChange={(e) => setNewPatient({ ...newPatient, age: Math.max(0, Number(e.target.value)) })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <Select
                  value={newPatient.gender}
                  onValueChange={(value) =>
                    setNewPatient({ ...newPatient, gender: value as "Male" | "Female" | "Other" })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="condition">Condition</Label>
                <Input
                  id="condition"
                  value={newPatient.condition}
                  onChange={(e) => setNewPatient({ ...newPatient, condition: e.target.value })}
                  required
                />
              </div>
            </div>

            {/* Emergency Section */}
            <div className="border rounded-lg p-4 space-y-4 bg-muted/20">
              <div className="flex items-center space-x-2">
                <Switch
                  checked={isEmergency}
                  onCheckedChange={setIsEmergency}
                  id="emergency-mode"
                />
                <Label htmlFor="emergency-mode" className="font-semibold">Emergency Admission</Label>
              </div>

              {isEmergency && (
                <div className="space-y-4">
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Emergency Mode Activated</AlertTitle>
                    <AlertDescription>
                      This patient will be marked for immediate attention. Please provide additional details.
                    </AlertDescription>
                  </Alert>

                  <div className="space-y-2">
                    <Label htmlFor="emergency-reason">Emergency Reason</Label>
                    <Input
                      id="emergency-reason"
                      value={emergencyReason}
                      onChange={(e) => setEmergencyReason(e.target.value)}
                      placeholder="Describe the emergency situation"
                      required={isEmergency}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="emergency-priority">Priority Level</Label>
                    <Select
                      value={emergencyPriority}
                      onValueChange={(value) => setEmergencyPriority(value as "High" | "Medium" | "Low")}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="High">High Priority</SelectItem>
                        <SelectItem value="Medium">Medium Priority</SelectItem>
                        <SelectItem value="Low">Low Priority</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="preferred-doctor">Preferred Doctor</Label>
                    <Select
                      value={selectedDoctor}
                      onValueChange={setSelectedDoctor}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select preferred doctor" />
                      </SelectTrigger>
                      <SelectContent>
                        {doctors
                          .filter(d => d.specialization === "General Medicine")
                          .map((doctor) => (
                            <SelectItem key={doctor.id} value={doctor.id}>
                              {doctor.name}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}
            </div>

            <Button type="submit">
              {isEmergency ? "Add Patient & Book Emergency Appointment" : "Add Patient"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Patient List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Age</TableHead>
                  <TableHead>Gender</TableHead>
                  <TableHead>Condition</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {patients.map((patient) => (
                  <TableRow key={patient.id}>
                    <TableCell>{patient.name}</TableCell>
                    <TableCell>{patient.age}</TableCell>
                    <TableCell>{patient.gender}</TableCell>
                    <TableCell>{patient.condition}</TableCell>
                    <TableCell>
                      <Button variant="outline" className="mr-2" onClick={() => setEditingPatient(patient)}>
                        Edit
                      </Button>
                      <Button variant="destructive" onClick={() => deletePatient(patient.id)}>
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {editingPatient && (
        <Card>
          <CardHeader>
            <CardTitle>Edit Patient</CardTitle>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleUpdatePatient()
              }}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-name">Name</Label>
                  <Input
                    id="edit-name"
                    value={editingPatient.name}
                    onChange={(e) => setEditingPatient({ ...editingPatient, name: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-age">Age</Label>
                  <Input
                    id="edit-age"
                    type="number"
                    min="0"
                    value={editingPatient.age || ""}
                    onChange={(e) => setEditingPatient({ ...editingPatient, age: Math.max(0, Number(e.target.value)) })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-gender">Gender</Label>
                  <Select
                    value={editingPatient.gender}
                    onValueChange={(value) =>
                      setEditingPatient({ ...editingPatient, gender: value as "Male" | "Female" | "Other" })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-condition">Condition</Label>
                  <Input
                    id="edit-condition"
                    value={editingPatient.condition}
                    onChange={(e) => setEditingPatient({ ...editingPatient, condition: e.target.value })}
                    required
                  />
                </div>
              </div>
              <Button type="submit">Update Patient</Button>
              <Button type="button" variant="outline" onClick={() => setEditingPatient(null)} className="ml-2">
                Cancel
              </Button>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  )
}