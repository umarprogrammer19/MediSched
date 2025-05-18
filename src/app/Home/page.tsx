export default function HomePage() {
  return (
    <section
      className="bg-cover bg-center bg-no-repeat py-20 sm:py-28 md:py-32"
      style={{ backgroundImage: "url('/Home.png')" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className=" p-6 rounded-lg w-full md:w-1/2">
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-blue-600 mb-4 font-serif">
            Your Complete Digital Patient Management Solution
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-black mb-6 font-serif">
            Manage patient records, appointments, and histories with ease. Fast, secure, and built for modern healthcare needs.
          </p>

          <button
            className="mt-6 px-6 py-4 relative font-bold transition-all duration-300 ease-in-out w-full sm:w-auto
              before:absolute before:top-0 before:left-0 before:w-6 before:h-6 before:border-t-4 before:border-l-4 before:border-[#00008B] before:transition-all before:duration-300
              after:absolute after:bottom-0 after:right-0 after:w-6 after:h-6 after:border-b-4 after:border-r-4 after:border-[#00008B] after:transition-all after:duration-300
              hover:before:w-full hover:before:h-full hover:after:w-full hover:after:h-full
              hover:before:delay-150 hover:after:delay-150 text-blue-700 text-lg sm:text-xl md:text-2xl font-serif"
          >
            Appointment
          </button>
        </div>
      </div>
    </section>
  );
}
