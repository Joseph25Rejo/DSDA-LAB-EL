import { HospitalProvider } from "../lib/HospitalContext"
import Dashboard from "./components/Dashboard"

export default function Home() {
  return (
    <HospitalProvider>
      <main className="min-h-screen bg-gray-100">
        <header className="bg-blue-600 text-white p-4">
          <h1 className="text-3xl font-bold">Hospital Management System</h1>
        </header>
        <div className="container mx-auto p-4">
          <Dashboard />
        </div>
      </main>
    </HospitalProvider>
  )
}

