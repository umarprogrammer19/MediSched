import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, UserRound, CheckCircle } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section!!*/}
      <section className="bg-gradient-to-b from-[#e6ffff] to-white py-16 md:py-24">
        <div className="container px-4 md:px-20">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:gap-16">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-[40px]">
                  Medical Scheduling Made Simple
                </h1>
                <p className="max-w-[600px] text-gray-600 md:text-xl">
                  Book appointments with top doctors in your area. Fast, secure, and convenient.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/find-doctors">
                  <Button size="lg" className="bg-[#00d4d4] hover:bg-[#00baba] text-white">
                    Find Doctors
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button size="lg" variant="outline" className="border-[#00d4d4] text-[#00d4d4] hover:bg-[#e6ffff]">
                    Create Account
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <img
                src="/hero.webp "
                alt="Medical Scheduling"
                width={650}
                height={550}
                className="rounded-lg object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-16 lg:py-20 bg-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Why Choose MediSched?</h2>
              <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our platform makes it easy to find and book appointments with the best healthcare providers.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
              <Calendar className="h-12 w-12 text-[#00d4d4]" />
              <h3 className="text-xl font-bold">Easy Scheduling</h3>
              <p className="text-center text-gray-600">Book appointments with just a few clicks</p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
              <UserRound className="h-12 w-12 text-[#00d4d4]" />
              <h3 className="text-xl font-bold">Top Doctors</h3>
              <p className="text-center text-gray-600">Access to the best healthcare professionals</p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
              <Clock className="h-12 w-12 text-[#00d4d4]" />
              <h3 className="text-xl font-bold">24/7 Access</h3>
              <p className="text-center text-gray-600">Schedule anytime, anywhere</p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
              <CheckCircle className="h-12 w-12 text-[#00d4d4]" />
              <h3 className="text-xl font-bold">Reminders</h3>
              <p className="text-center text-gray-600">Never miss an appointment again</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-[#f0ffff] py-12 md:py-16 lg:py-20">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">What Our Users Say</h2>
              <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Hear from patients who have used MediSched to find their doctors.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex flex-col justify-between rounded-lg border bg-white p-6 shadow-sm">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-[#00d4d4]">{"★".repeat(5)}</div>
                  <p className="text-gray-600">
                    "MediSched made it so easy to find a specialist in my area. I was able to book an appointment the
                    same day!"
                  </p>
                </div>
                <div className="flex items-center gap-4 pt-4">
                  <div className="h-10 w-10 rounded-full bg-gray-200" />
                  <div>
                    <p className="font-medium">Sarah Johnson</p>
                    <p className="text-sm text-gray-500">Patient</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 lg:py-20 bg-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Ready to Get Started?</h2>
              <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Join thousands of patients who have simplified their healthcare journey.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/signup">
                <Button size="lg" className="bg-[#00d4d4] hover:bg-[#00baba] text-white">
                  Sign Up Now
                </Button>
              </Link>
              <Link href="/find-doctors">
                <Button size="lg" variant="outline" className="border-[#00d4d4] text-[#00d4d4] hover:bg-[#e6ffff]">
                  Browse Doctors
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
