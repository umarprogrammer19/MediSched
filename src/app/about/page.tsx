import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function AboutPage() {
    const developers = [
        {
            name: "Dr. Jane Smith",
            role: "Medical Director",
            image: "/placeholder.svg?height=100&width=100",
            bio: "Dr. Smith is a board-certified physician with over 15 years of experience in healthcare management.",
        },
        {
            name: "John Davis",
            role: "Lead Developer",
            image: "/placeholder.svg?height=100&width=100",
            bio: "John has 10+ years of experience building healthcare software solutions.",
        },
        {
            name: "Sarah Johnson",
            role: "UX Designer",
            image: "/placeholder.svg?height=100&width=100",
            bio: "Sarah specializes in creating intuitive user experiences for healthcare applications.",
        },
        {
            name: "Michael Chen",
            role: "Product Manager",
            image: "/placeholder.svg?height=100&width=100",
            bio: "Michael has managed multiple successful healthcare technology products.",
        },
    ]

    return (
        <div className="container py-12 md:py-16 bg-white">
            <div className="mx-auto max-w-4xl space-y-12">
                <section className="space-y-6">
                    <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center">About MediSched</h1>
                    <p className="text-gray-600 md:text-xl/relaxed text-center">
                        Transforming healthcare scheduling for a better patient experience
                    </p>

                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold">Our Mission</h2>
                        <p className="text-gray-600">
                            At MediSched, our mission is to simplify the healthcare scheduling process, making it easier for patients
                            to connect with the right healthcare providers. We believe that access to quality healthcare starts with a
                            seamless booking experience.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold">Our Story</h2>
                        <p className="text-gray-600">
                            MediSched was founded in 2023 by a team of healthcare professionals and technology experts who recognized
                            the challenges patients face when trying to schedule medical appointments. After experiencing these
                            frustrations firsthand, our team set out to create a solution that would streamline the process for both
                            patients and providers.
                        </p>
                        <p className="text-gray-600">
                            What started as a simple scheduling tool has evolved into a comprehensive platform that connects patients
                            with healthcare providers across multiple specialties. Today, MediSched serves thousands of patients and
                            hundreds of healthcare providers, making healthcare more accessible for everyone.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold">What Sets Us Apart</h2>
                        <ul className="list-disc pl-6 space-y-2 text-gray-600">
                            <li>User-friendly interface designed with patients in mind</li>
                            <li>Comprehensive network of verified healthcare providers</li>
                            <li>Real-time availability and instant booking confirmation</li>
                            <li>Secure platform that prioritizes patient privacy</li>
                            <li>Integrated reminder system to reduce missed appointments</li>
                        </ul>
                    </div>
                </section>

                <section className="space-y-6">
                    <h2 className="text-2xl font-bold text-center">Meet Our Team</h2>
                    <p className="text-gray-600 text-center">The dedicated professionals behind MediSched</p>

                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {developers.map((developer, index) => (
                            <Card key={index} className="overflow-hidden">
                                <CardContent className="p-6 text-center space-y-4">
                                    <Avatar className="h-24 w-24 mx-auto">
                                        <AvatarImage src={developer.image || "/placeholder.svg"} alt={developer.name} />
                                        <AvatarFallback>
                                            {developer.name
                                                .split(" ")
                                                .map((n) => n[0])
                                                .join("")}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <h3 className="font-bold">{developer.name}</h3>
                                        <p className="text-sm text-[#00d4d4]">{developer.role}</p>
                                    </div>
                                    <p className="text-sm text-gray-600">{developer.bio.slice(0,40)}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    )
}
