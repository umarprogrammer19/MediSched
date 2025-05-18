import Image from "next/image";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export default function SignupPage() {
  return (
    <div className={`min-h-screen flex items-center justify-center p-4 ${poppins.className}`}>
      <div className="flex flex-col md:flex-row w-full max-w-4xl border border-black overflow-hidden shadow-lg bg-white">
        
        {/* Left - Form */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-center mb-6">Signup</h2>

          <form className="space-y-4">
            <input
              type="name"
              placeholder="Full Name"
              className="w-full px-4 py-2 border rounded-md focus:outline-none"
            />
            <input
              type="phone"
              placeholder="Phone Number"
              className="w-full px-4 py-2 border rounded-md focus:outline-none"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none"
            />
            <input
              type="password"
              placeholder="Create password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none"
            />
            <input
              type="password"
              placeholder="Confirm password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none"
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Signup
            </button>
          </form>

          <p className="text-center text-sm mt-4">
            Already have an account?{" "}
            <a href="/login" className="text-blue-600 hover:underline">Login</a>
          </p>
          
        </div>

        {/* Right - Image */}
        <div className="relative w-full md:w-1/2 h-64 md:h-auto">
          <Image
            src="/Img.png"
            alt="Signup illustration"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
}