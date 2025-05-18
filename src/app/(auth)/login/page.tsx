"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Eraser, EyeIcon, EyeOffIcon } from "lucide-react"
import { BASE_URL } from "@/constant/BASE_URL"

export default function LoginPage() {
    const router = useRouter()
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState<string>("");
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const formDataToSend = new FormData();
            formDataToSend.append("username", formData.username);
            formDataToSend.append("password", formData.password);

            const res = await fetch(`${BASE_URL}/auth/login`, {
                method: "POST",
                body: formDataToSend,
            });
            const data = await res.json()

            if (res.status == 400 || !res.ok) return setError(data.detail || "Error");

            localStorage.setItem("MS_AUTH_TOKEN", data.access_token);
            console.log("Login form submitted:", formData)
            router.push("/")
        } catch (error) {
            if (error instanceof Error) console.warn(error.message);
        }
    }

    return (
        <div className="container flex items-center justify-center min-h-[80vh] py-8 bg-white">
            <Card className="mx-auto max-w-md w-full">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold">Login to MediSched</CardTitle>
                    <CardDescription>Enter your email and password to access your account</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="username">Email</Label>
                            <Input
                                id="username"
                                name="username"
                                type="username"
                                placeholder="name@example.com"
                                required
                                value={formData.username}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password">Password</Label>
                                <Link href="/forgot-password" className="text-sm text-[#00d4d4] hover:underline">
                                    Forgot password?
                                </Link>
                            </div>
                            <div className="relative">
                                <Input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    required
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <EyeOffIcon className="h-4 w-4 text-gray-500" />
                                    ) : (
                                        <EyeIcon className="h-4 w-4 text-gray-500" />
                                    )}
                                    <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                                </Button>
                            </div>
                        </div>
                        {error && <p className="text-red-600 text-md">{error}</p>}
                        <Button type="submit" className="w-full bg-[#00d4d4] hover:bg-[#00baba] text-white">
                            Login
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                    <div className="text-center text-sm">
                        Don&apos;t have an account?{" "}
                        <Link href="/signup" className="text-[#00d4d4] hover:underline">
                            Sign up
                        </Link>
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}
