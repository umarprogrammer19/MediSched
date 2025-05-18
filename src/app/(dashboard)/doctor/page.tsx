"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
import { useState } from "react"

// Sample user data
const userData = {
    name: "Umar Farooq",
    email: "umarofficial0121@gmail.com",
    phone: "+92 317 2472531",
    image: "/placeholder.svg?height=200&width=200",
}

// Sample appointments data
const appointmentsData = [
    {
        id: 1,
        doctor: "Dr. Sarah Johnson",
        specialty: "Cardiologist",
        location: "San Francisco Medical Center",
        date: "2025-05-20",
        time: "10:00 AM",
        status: "upcoming",
        image: "/placeholder.svg?height=100&width=100",
    },
    {
        id: 2,
        doctor: "Dr. Michael Chen",
        specialty: "Dermatologist",
        location: "San Francisco Dermatology Center",
        date: "2025-05-25",
        time: "2:30 PM",
        status: "upcoming",
        image: "/placeholder.svg?height=100&width=100",
    },
    {
        id: 3,
        doctor: "Dr. Emily Rodriguez",
        specialty: "Pediatrician",
        location: "Oakland Children's Clinic",
        date: "2025-05-10",
        time: "9:00 AM",
        status: "completed",
        image: "/placeholder.svg?height=100&width=100",
    },
    {
        id: 4,
        doctor: "Dr. James Wilson",
        specialty: "Orthopedic Surgeon",
        location: "San Jose Medical Plaza",
        date: "2025-05-05",
        time: "11:30 AM",
        status: "cancelled",
        image: "/placeholder.svg?height=100&width=100",
    },
]

export default function DashboardPage() {
    const [date, setDate] = useState<Date | undefined>(new Date())

    // Filter appointments by status
    const upcomingAppointments = appointmentsData.filter((app) => app.status === "upcoming")
    const pastAppointments = appointmentsData.filter((app) => app.status === "completed" || app.status === "cancelled")

    // Get appointments for selected date
    const selectedDateStr = date ? date.toISOString().split("T")[0] : ""

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
                </div>

                <div className="space-y-6">
                    {/* <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <CalendarIcon className="h-5 w-5 text-[#00d4d4]" /> Calendar
                            </CardTitle>
                            <CardDescription>View and manage your appointments</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="mt-6 space-y-4">
                                <h3 className="font-medium">Appointments on {date?.toLocaleDateString()}</h3>
                                {appointmentsOnDate.length > 0 ? (
                                    appointmentsOnDate.map((appointment) => (
                                        <div key={appointment.id} className="flex items-center gap-4 rounded-lg border p-3">
                                            {appointment.status === "upcoming" ? (
                                                <CheckCircle className="h-5 w-5 text-[#00d4d4]" />
                                            ) : appointment.status === "cancelled" ? (
                                                <X className="h-5 w-5 text-red-500" />
                                            ) : (
                                                <AlertCircle className="h-5 w-5 text-yellow-500" />
                                            )}
                                            <div className="flex-1 min-w-0">
                                                <p className="font-medium truncate">{appointment.doctor}</p>
                                                <p className="text-sm text-gray-600">{appointment.time}</p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-sm text-gray-600">No appointments scheduled for this day.</p>
                                )}
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full bg-[#00d4d4] hover:bg-[#00baba] text-white">Book New Appointment</Button>
                        </CardFooter>
                    </Card> */}
                </div>
            </div>
        </div>
    )
}
