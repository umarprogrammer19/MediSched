"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BASE_URL } from "@/constant/BASE_URL"
import {
    Bell,
    CalendarDays,
    Clock,
    FileEdit,
    MapPin,
    Settings,
    User,
    X
} from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

type UserData = {
    name: string
    email: string
    phone: string
    image: string
}

type TimeSlot = {
    day: string
    start_time: string
    end_time: string
    is_booked: boolean
}

type ApiAppointment = {
    appointment_id: string
    doctor_id: string
    patient_id: string
    time_slot: TimeSlot
    payment_method: string
    status: "pending" | "completed" | "cancelled"
    created_at: string
    patient_details: {
        full_name: string;
        email: string
    }
}

type Appointment = {
    id: string
    doctor: string
    specialty: string
    location: string
    date: string // ISO date string YYYY-MM-DD
    time: string // e.g. "8:00 PM"
    status: "upcoming" | "completed" | "cancelled"
    image: string
    patient_details: {
        full_name: string;
        email: string
    }
}

const userData: UserData = {
    name: "Umar Farooq",
    email: "umarofficial0121@gmail.com",
    phone: "+92 317 2472531",
    image: "/placeholder.svg?height=200&width=200",
}

export default function DashboardPage() {
    const [appointmentsData, setAppointmentsData] = useState<Appointment[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        async function fetchAppointments() {
            try {
                const res = await fetch(`${BASE_URL}/appointment/current`, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("MS_AUTH_TOKEN")}`
                    }
                })
                if (!res.ok) throw new Error("Failed to fetch appointments")
                const data: ApiAppointment[] = await res.json()

                // Map API data to UI format
                const mappedData: Appointment[] = data.map((item) => {
                    let statusMapped: Appointment["status"] = "upcoming"
                    if (item.status === "pending") statusMapped = "upcoming"
                    else if (item.status === "completed") statusMapped = "completed"
                    else if (item.status === "cancelled") statusMapped = "cancelled"

                    const doctorName = "Dr. Unknown"
                    const specialty = "Specialty Unknown"
                    const location = "Location Unknown"

                    const dateObj = new Date(item.created_at)
                    const date = dateObj.toISOString().split("T")[0]

                    function formatTime24to12(time24: string): string {
                        const [hourStr, minStr] = time24.split(":")
                        let hour = parseInt(hourStr, 10)
                        const minutes = minStr
                        const ampm = hour >= 12 ? "PM" : "AM"
                        hour = hour % 12 || 12
                        return `${hour}:${minutes} ${ampm}`
                    }
                    const time = formatTime24to12(item.time_slot.start_time)

                    return {
                        id: item.appointment_id,
                        doctor: doctorName,
                        specialty,
                        location,
                        date,
                        time,
                        status: statusMapped,
                        patient_details: item.patient_details,
                        image: "/placeholder.svg?height=100&width=100",
                    }
                })

                setAppointmentsData(mappedData)
                setLoading(false)
            } catch (err: unknown) {
                setError(err instanceof Error ? err.message : "Unknown error")
                setLoading(false)
            }
        }

        fetchAppointments()
    }, [])

    const upcomingAppointments = appointmentsData.filter((app) => app.status === "upcoming")
    const pastAppointments = appointmentsData.filter((app) => app.status === "completed" || app.status === "cancelled")
    console.log(upcomingAppointments);

    return (
        <div className="container py-8 bg-white md:px-20">
            <div className="grid gap-8 lg:grid-cols-2">
                <div className="lg:col-span-2 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Welcome back, {userData.name}</CardTitle>
                            <CardDescription>Manage your appointments and medical information</CardDescription>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div className="flex items-center gap-4">
                                <Avatar className="h-20 w-20">
                                    <AvatarImage src={userData.image || "/placeholder.svg"} alt={userData.name} />
                                    <AvatarFallback>
                                        {userData.name
                                            .split(" ")
                                            .map((n) => n[0])
                                            .join("")}
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <h2 className="text-xl font-bold">{userData.name}</h2>
                                    <p className="text-sm text-gray-600">{userData.email}</p>
                                    <p className="text-sm text-gray-600">{userData.phone}</p>
                                </div>
                            </div>
                            <div className="mt-6 flex flex-wrap gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="gap-1 border-[#00d4d4] text-[#00d4d4] hover:bg-[#e6ffff]"
                                >
                                    <User className="h-4 w-4" /> Edit Profile
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="gap-1 border-[#00d4d4] text-[#00d4d4] hover:bg-[#e6ffff]"
                                >
                                    <Bell className="h-4 w-4" /> Notifications
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="gap-1 border-[#00d4d4] text-[#00d4d4] hover:bg-[#e6ffff]"
                                >
                                    <Settings className="h-4 w-4" /> Settings
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    {loading ? (
                        <p className="text-center text-gray-600">Loading appointments...</p>
                    ) : error ? (
                        <p className="text-center text-red-600">Error: {error}</p>
                    ) : (
                        <Tabs defaultValue="upcoming">
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="upcoming">Upcoming Appointments</TabsTrigger>
                                <TabsTrigger value="past">Past Appointments</TabsTrigger>
                            </TabsList>

                            <TabsContent value="upcoming" className="mt-4 space-y-4">
                                {upcomingAppointments.length > 0 ? (
                                    upcomingAppointments.map((appointment) => (
                                        <Card key={appointment.id}>
                                            <CardContent className="p-6">
                                                <div className="flex flex-col md:flex-row gap-4">
                                                    <Avatar className="h-16 w-16">
                                                        <AvatarImage src={appointment.image || "/placeholder.svg"} alt={appointment.doctor} />
                                                        <AvatarFallback>
                                                            {appointment.patient_details.full_name
                                                                .split(" ")
                                                                .map((n) => n[0])
                                                                .join("")}
                                                        </AvatarFallback>
                                                    </Avatar>

                                                    <div className="flex-1 space-y-2">
                                                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                                                            <div>
                                                                <h3 className="font-bold">{appointment.patient_details.full_name}</h3>
                                                            </div>
                                                            <Badge className="w-fit bg-[#00d4d4] hover:bg-[#00baba]">Upcoming</Badge>
                                                        </div>

                                                        <div className="grid gap-1 text-sm">
                                                            <div className="flex items-center gap-2">
                                                                <CalendarDays className="h-4 w-4 text-gray-500" />
                                                                <span>
                                                                    {new Date(appointment.date).toLocaleDateString("en-US", {
                                                                        weekday: "long",
                                                                        year: "numeric",
                                                                        month: "long",
                                                                        day: "numeric",
                                                                    })}
                                                                </span>
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <Clock className="h-4 w-4 text-gray-500" />
                                                                <span>{appointment.time}</span>
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <MapPin className="h-4 w-4 text-gray-500" />
                                                                <span>{appointment.location}</span>
                                                            </div>
                                                        </div>

                                                        <div className="flex flex-wrap gap-2 pt-2">
                                                            <Button
                                                                size="sm"
                                                                variant="outline"
                                                                className="gap-1 border-[#00d4d4] text-[#00d4d4] hover:bg-[#e6ffff]"
                                                            >
                                                                <FileEdit className="h-4 w-4" /> Reschedule
                                                            </Button>
                                                            <Button size="sm" variant="outline" className="gap-1 text-red-500 hover:text-red-600">
                                                                <X className="h-4 w-4" /> Cancel
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))
                                ) : (
                                    <Card>
                                        <CardContent className="p-6 text-center">
                                            <p className="text-gray-600">You have no upcoming appointments.</p>
                                            <Link href="/find-doctors">
                                                <Button className="mt-4 bg-[#00d4d4] hover:bg-[#00baba] text-white">Book an Appointment</Button>
                                            </Link>
                                        </CardContent>
                                    </Card>
                                )}
                            </TabsContent>

                            <TabsContent value="past" className="mt-4 space-y-4">
                                {pastAppointments.length > 0 ? (
                                    pastAppointments.map((appointment) => (
                                        <Card key={appointment.id}>
                                            <CardContent className="p-6">
                                                <div className="flex flex-col md:flex-row gap-4">
                                                    <Avatar className="h-16 w-16">
                                                        <AvatarImage src={appointment.image || "/placeholder.svg"} alt={appointment.doctor} />
                                                        <AvatarFallback>
                                                            {appointment.doctor
                                                                .split(" ")
                                                                .map((n) => n[0])
                                                                .join("")}
                                                        </AvatarFallback>
                                                    </Avatar>

                                                    <div className="flex-1 space-y-2">
                                                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                                                            <div>
                                                                <h3 className="font-bold">{appointment.doctor}</h3>
                                                                <p className="text-sm text-gray-600">{appointment.specialty}</p>
                                                            </div>
                                                            <Badge
                                                                variant={appointment.status === "completed" ? "default" : "destructive"}
                                                                className={`w-fit ${appointment.status === "completed" ? "bg-green-600 hover:bg-green-700" : ""}`}
                                                            >
                                                                {appointment.status === "completed" ? "Completed" : "Cancelled"}
                                                            </Badge>
                                                        </div>

                                                        <div className="grid gap-1 text-sm">
                                                            <div className="flex items-center gap-2">
                                                                <CalendarDays className="h-4 w-4 text-gray-500" />
                                                                <span>
                                                                    {new Date(appointment.date).toLocaleDateString("en-US", {
                                                                        weekday: "long",
                                                                        year: "numeric",
                                                                        month: "long",
                                                                        day: "numeric",
                                                                    })}
                                                                </span>
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <Clock className="h-4 w-4 text-gray-500" />
                                                                <span>{appointment.time}</span>
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <MapPin className="h-4 w-4 text-gray-500" />
                                                                <span>{appointment.location}</span>
                                                            </div>
                                                        </div>

                                                        {appointment.status === "completed" && (
                                                            <div className="flex flex-wrap gap-2 pt-2">
                                                                <Button
                                                                    size="sm"
                                                                    variant="outline"
                                                                    className="gap-1 border-[#00d4d4] text-[#00d4d4] hover:bg-[#e6ffff]"
                                                                >
                                                                    Book Again
                                                                </Button>
                                                                <Button
                                                                    size="sm"
                                                                    variant="outline"
                                                                    className="gap-1 border-[#00d4d4] text-[#00d4d4] hover:bg-[#e6ffff]"
                                                                >
                                                                    Leave Review
                                                                </Button>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))
                                ) : (
                                    <Card>
                                        <CardContent className="p-6 text-center">
                                            <p className="text-gray-600">You have no past appointments.</p>
                                        </CardContent>
                                    </Card>
                                )}
                            </TabsContent>
                        </Tabs>
                    )}
                </div>
            </div>
        </div>
    )
}
