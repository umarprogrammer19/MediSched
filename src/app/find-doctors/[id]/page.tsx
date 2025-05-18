"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar } from "@/components/ui/calendar"
import { MapPin, Phone, Mail, CalendarIcon } from "lucide-react"
import { BASE_URL } from "@/constant/BASE_URL"

export default function DoctorProfilePage() {
    const params = useParams()
    const doctorId = params.id
    const [doctor, setDoctor] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [date, setDate] = useState<any>(new Date())

    useEffect(() => {
        const fetchDoctor = async () => {
            try {
                const response = await fetch(`${BASE_URL}/doctor/${doctorId}`)
                if (!response.ok) {
                    throw new Error("Failed to fetch doctor")
                }
                const data = await response.json()
                setDoctor(data)
                setLoading(false)
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message)
                    setLoading(false)
                }
            }
        }
        if (doctorId) {
            fetchDoctor()
        }
    }, [doctorId])

    if (loading) {
        return <div className="container py-12 text-center bg-white">Loading...</div>
    }

    if (error) {
        return (
            <div className="container py-12 text-center bg-white">
                <h1 className="text-2xl font-bold">Error</h1>
                <p className="mt-4">{error}</p>
                <Link href="/find-doctors">
                    <Button className="mt-6 bg-[#00d4d4] hover:bg-[#00baba] text-white">Back to Doctors</Button>
                </Link>
            </div>
        )
    }

    if (!doctor) {
        return (
            <div className="container py-12 text-center bg-white">
                <h1 className="text-2xl font-bold">Doctor not found</h1>
                <p className="mt-4">The doctor you're looking for doesn't exist or has been removed.</p>
                <Link href="/find-doctors">
                    <Button className="mt-6 bg-[#00d4d4] hover:bg-[#00baba] text-white">Back to Doctors</Button>
                </Link>
            </div>
        )
    }

    return (
        <div className="container py-12 bg-white md:px-20">
            <div className="grid gap-8 lg:grid-cols-3">
                <div className="lg:col-span-2 space-y-8">
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex flex-col md:flex-row gap-6">
                                <Avatar className="h-32 w-32 md:h-48 md:w-48">
                                    <AvatarImage src={doctor.doctor_details?.profile_picture_url || "/placeholder.svg"} alt={doctor.full_name} />
                                    <AvatarFallback>
                                        {doctor.full_name.split(" ").map((n: string[]) => n[0]).join("")}
                                    </AvatarFallback>
                                </Avatar>

                                <div className="space-y-4 flex-1">
                                    <div>
                                        <h1 className="text-2xl font-bold">{doctor.full_name}</h1>
                                        <p className="text-[#00d4d4]">{doctor.doctor_details?.qualification}</p>
                                    </div>

                                    <div className="flex items-center gap-1">
                                        <MapPin className="h-4 w-4 text-gray-500" />
                                        <span className="text-sm text-gray-600">{`${doctor.doctor_details?.city}, ${doctor.doctor_details?.country}`}</span>
                                    </div>

                                    <div className="flex gap-4 pt-2">
                                        <Button className="bg-[#00d4d4] hover:bg-[#00baba] text-white">Book Appointment</Button>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Tabs defaultValue="about">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="about">About</TabsTrigger>
                            <TabsTrigger value="office">Office Info</TabsTrigger>
                        </TabsList>

                        <TabsContent value="about" className="mt-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle>About {doctor.full_name}</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <p>{doctor.doctor_details?.description || "No description available."}</p>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="office" className="mt-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Office Information</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div>
                                        <h3 className="text-lg font-medium flex items-center gap-2">
                                            <MapPin className="h-5 w-5 text-[#00d4d4]" /> Location
                                        </h3>
                                        <p className="mt-2">{`${doctor.doctor_details?.city}, ${doctor.doctor_details?.country}`}</p>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-medium flex items-center gap-2">
                                            <Phone className="h-5 w-5 text-[#00d4d4]" /> Contact
                                        </h3>
                                        <div className="mt-2 space-y-2">
                                            <div className="flex items-center gap-2">
                                                <Phone className="h-4 w-4 text-gray-500" />
                                                <span>{doctor.phone_number}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Mail className="h-4 w-4 text-gray-500" />
                                                <span>{doctor.email}</span>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>

                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Book an Appointment</CardTitle>
                            <CardDescription>Select a date to see available time slots</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
                            <div className="mt-6 space-y-2">
                                <h3 className="font-medium flex items-center gap-2">
                                    <CalendarIcon className="h-4 w-4 text-[#00d4d4]" /> Available Times
                                </h3>
                                <div className="grid grid-cols-2 gap-2">
                                    {["9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM", "3:00 PM"].map((time) => (
                                        <Button
                                            key={time}
                                            variant="outline"
                                            className="justify-start border-[#00d4d4] text-[#00d4d4] hover:bg-[#e6ffff]"
                                        >
                                            {time}
                                        </Button>
                                    ))}
                                </div>
                            </div>
                            <Button className="mt-6 w-full bg-[#00d4d4] hover:bg-[#00baba] text-white">Book Appointment</Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}