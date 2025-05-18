"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Menu, User, LogOut, Bell, Calendar, Settings } from "lucide-react"

export default function Navbar() {
  const pathname = usePathname()
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  // Check if the current path is active
  const isActive = (path: string) => {
    return pathname === path
  }

  // Toggle login state (for demo purposes)
  const toggleLogin = () => {
    setIsLoggedIn(!isLoggedIn)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container flex h-16 items-center">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="mr-2 md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[400px]">
            <nav className="flex flex-col gap-4 mt-8">
              <Link href="/" className={`text-lg font-medium ${isActive("/") ? "text-[#00d4d4]" : "text-gray-700"}`}>
                Home
              </Link>
              <Link
                href="/find-doctors"
                className={`text-lg font-medium ${isActive("/find-doctors") ? "text-[#00d4d4]" : "text-gray-700"}`}
              >
                Find Doctors
              </Link>
              <Link
                href="/about"
                className={`text-lg font-medium ${isActive("/about") ? "text-[#00d4d4]" : "text-gray-700"}`}
              >
                About
              </Link>
              <Link
                href="/contact"
                className={`text-lg font-medium ${isActive("/contact") ? "text-[#00d4d4]" : "text-gray-700"}`}
              >
                Contact
              </Link>
              {isLoggedIn ? (
                <Link
                  href="/dashboard"
                  className={`text-lg font-medium ${isActive("/dashboard") ? "text-[#00d4d4]" : "text-gray-700"}`}
                >
                  Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    href="/login"
                    className={`text-lg font-medium ${isActive("/login") ? "text-[#00d4d4]" : "text-gray-700"}`}
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    className={`text-lg font-medium ${isActive("/signup") ? "text-[#00d4d4]" : "text-gray-700"}`}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </nav>
          </SheetContent>
        </Sheet>

        <Link href="/" className="flex items-center gap-2 mr-6">
          <span className="h-8 w-8 rounded-full bg-[#00d4d4] flex items-center justify-center text-white font-bold">
            +
          </span>
          <span className="font-bold text-xl text-[#00d4d4] hidden sm:inline-block">MEDISCHED</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium flex-1">
          <Link
            href="/"
            className={`transition-colors hover:text-[#00d4d4] ${isActive("/") ? "text-[#00d4d4]" : "text-gray-700"}`}
          >
            Home
          </Link>
          <Link
            href="/find-doctors"
            className={`transition-colors hover:text-[#00d4d4] ${isActive("/find-doctors") ? "text-[#00d4d4]" : "text-gray-700"}`}
          >
            Find Doctors
          </Link>
          <Link
            href="/about"
            className={`transition-colors hover:text-[#00d4d4] ${isActive("/about") ? "text-[#00d4d4]" : "text-gray-700"}`}
          >
            About
          </Link>
          <Link
            href="/contact"
            className={`transition-colors hover:text-[#00d4d4] ${isActive("/contact") ? "text-[#00d4d4]" : "text-gray-700"}`}
          >
            Contact
          </Link>
        </nav>

        <div className="flex items-center gap-2 ml-auto">
          {isLoggedIn ? (
            <>
              <Button variant="ghost" size="icon" className="hidden md:flex">
                <Bell className="h-5 w-5" />
                <span className="sr-only">Notifications</span>
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src="/placeholder.svg?height=36&width=36" alt="User" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-0.5 leading-none">
                      <p className="font-medium text-sm">John Doe</p>
                      <p className="text-xs text-gray-500">john.doe@example.com</p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      <span>Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="cursor-pointer">
                      <Calendar className="mr-2 h-4 w-4" />
                      <span>Appointments</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={toggleLogin} className="cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Link href="/login" className="hidden md:block">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link href="/signup">
                <Button className="bg-[#00d4d4] hover:bg-[#00baba] text-white">Sign Up</Button>
              </Link>
              {/* For demo purposes - toggle login state */}
              <Button variant="outline" size="icon" className="hidden" onClick={toggleLogin}>
                <User className="h-5 w-5" />
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
