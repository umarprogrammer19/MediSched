import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from "lucide-react"
import Link from "next/link"

export default function Footer() {
    return (
        <footer className="bg-gray-50 border-t">
            <div className="container py-12 md:py-16">
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <span className="h-8 w-8 rounded-full bg-[#00d4d4] flex items-center justify-center text-white font-bold">
                                +
                            </span>
                            <span className="font-bold text-xl text-[#00d4d4]">MEDISCHED</span>
                        </div>
                        <p className="text-gray-600">Making healthcare scheduling simple and accessible for everyone.</p>
                        <div className="flex space-x-4">
                            <Link href="#" className="text-gray-500 hover:text-[#00d4d4]">
                                <Facebook className="h-5 w-5" />
                                <span className="sr-only">Facebook</span>
                            </Link>
                            <Link href="#" className="text-gray-500 hover:text-[#00d4d4]">
                                <Twitter className="h-5 w-5" />
                                <span className="sr-only">Twitter</span>
                            </Link>
                            <Link href="#" className="text-gray-500 hover:text-[#00d4d4]">
                                <Instagram className="h-5 w-5" />
                                <span className="sr-only">Instagram</span>
                            </Link>
                            <Link href="#" className="text-gray-500 hover:text-[#00d4d4]">
                                <Linkedin className="h-5 w-5" />
                                <span className="sr-only">LinkedIn</span>
                            </Link>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="font-bold">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/" className="text-gray-600 hover:text-[#00d4d4]">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href="/find-doctors" className="text-gray-600 hover:text-[#00d4d4]">
                                    Find Doctors
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="text-gray-600 hover:text-[#00d4d4]">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-gray-600 hover:text-[#00d4d4]">
                                    Contact
                                </Link>
                            </li>
                            <li>
                                <Link href="/login" className="text-gray-600 hover:text-[#00d4d4]">
                                    Login
                                </Link>
                            </li>
                            <li>
                                <Link href="/signup" className="text-gray-600 hover:text-[#00d4d4]">
                                    Sign Up
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h3 className="font-bold">Services</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="#" className="text-gray-600 hover:text-[#00d4d4]">
                                    Online Booking
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-gray-600 hover:text-[#00d4d4]">
                                    Doctor Search
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-gray-600 hover:text-[#00d4d4]">
                                    Medical Records
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-gray-600 hover:text-[#00d4d4]">
                                    Appointment Reminders
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-gray-600 hover:text-[#00d4d4]">
                                    Telehealth
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h3 className="font-bold">Contact Us</h3>
                        <ul className="space-y-2">
                            <li className="flex items-start gap-2">
                                <MapPin className="h-5 w-5 text-[#00d4d4] shrink-0 mt-0.5" />
                                <span className="text-gray-600">
                                    123 Medical Center Drive
                                    <br />
                                    San Francisco, CA 94103
                                </span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Phone className="h-5 w-5 text-[#00d4d4] shrink-0" />
                                <span className="text-gray-600">+1 (555) 123-4567</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Mail className="h-5 w-5 text-[#00d4d4] shrink-0" />
                                <span className="text-gray-600">support@medisched.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 border-t pt-8 text-center text-sm text-gray-600">
                    <p>© {new Date().getFullYear()} MediSched. All rights reserved.</p>
                    <div className="mt-2 flex justify-center space-x-4">
                        <Link href="#" className="text-gray-600 hover:text-[#00d4d4]">
                            Privacy Policy
                        </Link>
                        <Link href="#" className="text-gray-600 hover:text-[#00d4d4]">
                            Terms of Service
                        </Link>
                        <Link href="#" className="text-gray-600 hover:text-[#00d4d4]">
                            Cookie Policy
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
