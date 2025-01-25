"use client"

import { useState } from "react"
import { useHospital } from "../../lib/HospitalContext"
import type { Patient } from "../../lib/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function PatientManagement() {
  const { patients, addPatient, updatePatient, deletePatient } = useHospital()
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null)
  const [newPatient, setNewPatient] = useState<Omit<Patient, "id">>({
    name: "",
    age: 0,
    gender: "Male",
    condition: "",
  })

  const handleAddPatient = () => {
    const patient: Patient = {
      ...newPatient,
      id: Date.now().toString(),
    }
    addPatient(patient)
    setNewPatient({ name: "", age: 0, gender: "Male", condition: "" })
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
            <div className="grid grid-cols-2 gap-4">
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
            <Button type="submit">Add Patient</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Patient List</CardTitle>
        </CardHeader>
        <CardContent>
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
              <div className="grid grid-cols-2 gap-4">
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

