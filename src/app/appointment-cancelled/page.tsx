"use client"

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AppointmentCancelled() {
    return (
        <div className="container py-12 text-center bg-white">
            <Card className="max-w-md mx-auto">
                <CardHeader>
                    <CardTitle>Payment Cancelled</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="mb-4">
                        Your payment was cancelled, and no appointment has been booked.
                    </p>
                    <Link href="/find-doctors">
                        <Button className="bg-[#00d4d4] hover:bg-[#00baba] text-white">
                            Back to Doctors
                        </Button>
                    </Link>
                </CardContent>
            </Card>
        </div>
    );
}