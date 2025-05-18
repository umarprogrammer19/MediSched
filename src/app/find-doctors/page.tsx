"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, MapPin } from "lucide-react"
import { BASE_URL } from "@/constant/BASE_URL"

export default function FindDoctorsPage() {
    const [doctors, setDoctors] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [searchTerm, setSearchTerm] = useState("")
    const [specialty, setSpecialty] = useState("All Specialties")
    const [location, setLocation] = useState("All Locations")

    // Fetch doctors from the API when the component mounts
    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await fetch(`${BASE_URL}/doctor/`)
                if (!response.ok) {
                    throw new Error("Failed to fetch doctors")
                }
                const data = await response.json()
                setDoctors(data)
                setLoading(false)
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message)
                    setLoading(false)
                }
            }
        }
        fetchDoctors()
    }, [])

    // Filter doctors based on search criteria
    const filteredDoctors = doctors.filter((doctor: any) => {
        const matchesSearch = doctor.full_name.toLowerCase().includes(searchTerm.toLowerCase())
        return matchesSearch
    });
    console.log(filteredDoctors);
    
    if (loading) {
        return <div className="container py-12 text-center bg-white">Loading...</div>
    }

    if (error) {
        return <div className="container py-12 text-center bg-white">Error: {error}</div>
    }

    return (
        <div className="container py-12 bg-white md:px-20">
            <div className="space-y-8">
                <div className="space-y-4">
                    <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Find Doctors</h1>
                    <p className="text-gray-600 md:text-xl/relaxed">Search for the best healthcare professionals in your area</p>
                </div>

                <div className="grid gap-4 md:grid-cols-4">
                    <div className="relative md:col-span-2">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                        <Input
                            type="search"
                            placeholder="Search by name or specialty"
                            className="pl-8"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {filteredDoctors.map((doctor: any) => (
                        <Card key={doctor.id} className="overflow-hidden">
                            <CardContent className="p-0">
                                <Link href={`/find-doctors/${doctor.id}`}>
                                    <div className="p-6 space-y-4">
                                        <div className="flex items-start gap-4">
                                            <Avatar className="h-16 w-16">
                                                <AvatarImage src={doctor.doctor_details.profile_picture_url || "/placeholder.svg"} alt={doctor.full_name} />
                                                <AvatarFallback>
                                                    {doctor.full_name
                                                        .split(" ")
                                                        .map((n: string[]) => n[0])
                                                        .join("")}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="space-y-1">
                                                <h3 className="font-bold">{doctor.full_name}</h3>
                                                <p className="text-sm text-gray-600">{doctor.qualification}</p>
                                                <div className="flex items-center gap-1">
                                                    <MapPin className="h-3.5 w-3.5 text-gray-500" />
                                                    <span className="text-xs text-gray-600">{doctor.doctor_details.country}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <Button className="w-full bg-[#00d4d4] hover:bg-[#00baba] text-white">View Profile</Button>
                                    </div>
                                </Link>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    )
}