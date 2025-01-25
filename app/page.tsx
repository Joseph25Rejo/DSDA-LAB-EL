import { HospitalProvider } from "../lib/HospitalContext"
import Dashboard from "./components/Dashboard"
import Image from "next/image"

export default function Home() {
  return (
    <HospitalProvider>
      <main className="min-h-screen bg-gray-100">
        <header className="bg-blue-600 text-white p-4">
          <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/-xkwARQk_400x400.jpg-WTjWadRprIOrDZ6GSqdzwaHCRRHNpP.jpeg"
                alt="RV Institutions Logo"
                width={50}
                height={50}
                className="bg-white rounded-full"
              />
              <h1 className="text-2xl md:text-3xl font-bold">Hospital Management System</h1>
            </div>
          </div>
        </header>
        <div className="container mx-auto p-4">
          <Dashboard />
        </div>
      </main>
    </HospitalProvider>
  )
}

