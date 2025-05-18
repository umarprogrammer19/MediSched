"use client"

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar } from "@/components/ui/calendar";
import { MapPin, Phone, Mail, CalendarIcon } from "lucide-react";
import { BASE_URL } from "@/constant/BASE_URL";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string); // Replace with your Stripe publishable key

export default function DoctorProfilePage() {
    const params = useParams();
    const doctorId = params.id;
    const [doctor, setDoctor] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [date, setDate] = useState<any>(new Date());
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [selectedSlot, setSelectedSlot] = useState<any>(null);
    const [paymentMethod, setPaymentMethod] = useState("live");

    useEffect(() => {
        const fetchDoctor = async () => {
            try {
                const response = await fetch(`${BASE_URL}/doctor/${doctorId}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch doctor");
                }
                const data = await response.json();
                setDoctor(data);
                setLoading(false);
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                    setLoading(false);
                }
            }
        };
        if (doctorId) {
            fetchDoctor();
        }
    }, [doctorId]);

    const handleBookAppointment = async () => {
        if (!selectedSlot) {
            setError("Please select a time slot");
            return;
        }

        setLoading(true);
        setError(null);

        const token = localStorage.getItem("MS_AUTH_TOKEN");
        console.log(selectedSlot);

        const payload = {
            day: selectedSlot.day,
            start_time: selectedSlot.start_time,
            end_time: selectedSlot.end_time
        };

        try {
            if (paymentMethod === "online") {

                // Store selectedSlot in sessionStorage before redirect
                sessionStorage.setItem("selectedTimeSlot", JSON.stringify(selectedSlot));

                const resp = await fetch(`${BASE_URL}/appointment/book?payment_method=${paymentMethod}&doctor_id=${doctorId}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                    body: JSON.stringify(payload),
                });

                if (!resp.ok) {
                    const errorData = await resp.json();
                    throw new Error(errorData.detail || "Booking failed");
                }

                const response = await fetch(`${BASE_URL}/payment/create`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        amount: doctor.doctor_details.price_per_appointment * 100,
                        currency: "usd",
                        doctor_id: doctorId,
                        doctor_name: doctor.full_name,
                    }),
                });
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.detail || "Failed to create checkout session");
                }
                const { sessionId } = await response.json();

                const stripe = await stripePromise;
                const { error } = await stripe!.redirectToCheckout({
                    sessionId: sessionId,  // Only pass sessionId
                });
                if (error) throw error;
            } else {
                const response = await fetch(`${BASE_URL}/appointment/book`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                    body: JSON.stringify(payload),
                });
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.detail || "Booking failed");
                }
                const data = await response.json();
                alert("Appointment booked successfully!");
                setIsPopupOpen(false);
            }
        } catch (err) {
            if (err instanceof Error)
                setError(err.message || "An error occurred");
        } finally {
            setLoading(false);
        }
    };

    // Corrected filtering logic to match day name
    const dayName = date.toLocaleDateString("en-US", { weekday: "long" });
    const availableSlots = doctor?.doctor_details?.available_time_slots.filter(
        (slot: {
            is_booked: boolean,
            day: string
        }) => !slot.is_booked && slot.day === dayName
    ) || [];

    if (loading) {
        return <div className="container py-12 text-center bg-white">Loading...</div>;
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
        );
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
        );
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
                                        <Button
                                            className="bg-[#00d4d4] hover:bg-[#00baba] text-white"
                                            onClick={() => setIsPopupOpen(true)}
                                        >
                                            Book Appointment
                                        </Button>
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
                                    {availableSlots.map((slot: {
                                        day: string;
                                        start_time: string,
                                        end_time: string;
                                        is_booked: boolean
                                    }) => (
                                        <Button
                                            key={`${slot.day}-${slot.start_time}`}
                                            variant="outline"
                                            className="justify-start border-[#00d4d4] text-[#00d4d4] hover:bg-[#e6ffff]"
                                            onClick={() => setSelectedSlot(slot)}
                                        >
                                            {slot.start_time} - {slot.end_time}
                                        </Button>
                                    ))}
                                </div>
                                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                            </div>
                            <Button
                                className="mt-6 w-full bg-[#00d4d4] hover:bg-[#00baba] text-white"
                                onClick={() => setIsPopupOpen(true)}
                            >
                                Open Booking Popup
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {isPopupOpen && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-xl font-bold mb-4">Book Appointment with {doctor.full_name}</h2>
                        {error && <p className="text-red-500 mb-4">{error}</p>}

                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">Selected Time Slot</label>
                            <select
                                className="w-full p-2 border rounded"
                                value={selectedSlot ? JSON.stringify(selectedSlot) : ""}
                                onChange={(e) => setSelectedSlot(JSON.parse(e.target.value))}
                            >
                                <option value="">None</option>
                                {availableSlots.map((slot: {
                                    day: string;
                                    start_time: string,
                                    end_time: string;
                                    is_booked: boolean
                                }) => (
                                    <option key={`${slot.day}-${slot.start_time}`} value={JSON.stringify(slot)}>
                                        {`${slot.day} ${slot.start_time} - ${slot.end_time}`}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">Payment Method</label>
                            <div className="flex gap-4">
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        value="live"
                                        checked={paymentMethod === "live"}
                                        onChange={() => setPaymentMethod("live")}
                                        className="mr-2"
                                    />
                                    Live Payment
                                </label>
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        value="online"
                                        checked={paymentMethod === "online"}
                                        onChange={() => setPaymentMethod("online")}
                                        className="mr-2"
                                    />
                                    Online Payment
                                </label>
                            </div>
                        </div>

                        <div className="flex justify-end gap-2">
                            <Button
                                variant="outline"
                                className="border-[#00d4d4] text-[#00d4d4] hover:bg-[#e6ffff]"
                                onClick={() => setIsPopupOpen(false)}
                                disabled={loading}
                            >
                                Cancel
                            </Button>
                            <Button
                                className="bg-[#00d4d4] hover:bg-[#00baba] text-white"
                                onClick={handleBookAppointment}
                                disabled={loading || !selectedSlot}
                            >
                                {loading ? "Processing..." : "Confirm Booking"}
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}