import Image from "next/image";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export default function LoginPage() {
  return (
    <div className={`min-h-screen flex items-center justify-center p-4 ${poppins.className} bg-gray-50`}>
      <div className="flex flex-col md:flex-row w-full max-w-5xl h-auto md:h-[500px] border border-black overflow-hidden bg-white shadow-lg">

        {/* Left Side - Image */}
        <div className="relative w-full md:w-1/2 h-64 md:h-auto">
          <Image
            src="/Img1.png"
            alt="Login Illustration"
            fill
            className="object-cover"
          />
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-center">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">Login</h2>

          <form className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Username</label>
              <input
                type="text"
                placeholder="Enter your username"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div className="text-right">
              <a href="#" className="text-sm text-blue-600 hover:underline">Forgot password?</a>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Login
            </button>

            <p className="text-center text-sm mt-4">
              Don't have an account?{" "}
              <a href="/signup" className="text-blue-600 hover:underline">Sign Up</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
