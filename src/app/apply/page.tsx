"use client";
import { useState } from 'react';

const DoctorApplicationForm = () => {
    const [formData, setFormData] = useState({
        full_name: '',
        email: '',
        phone_number: '',
        father_name: '',
        gender: '',
        country: '',
        city: '',
        qualification: '',
        experience: '',
        price_per_appointment: '',
        description: '',
    });
    const [timeSlots, setTimeSlots] = useState([{ day: '', start_time: '', end_time: '', is_booked: false }]);
    const [profilePicture, setProfilePicture] = useState<any>(null);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleInputChange = (e: any) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleTimeSlotChange = (index: any, field: any, value: any) => {
        const newTimeSlots = [...timeSlots];
        newTimeSlots[index] = { ...newTimeSlots[index], [field]: value };
        setTimeSlots(newTimeSlots);
    };

    const addTimeSlot = () => {
        setTimeSlots([...timeSlots, { day: '', start_time: '', end_time: '', is_booked: false }]);
    };

    const removeTimeSlot = (index: any) => {
        setTimeSlots(timeSlots.filter((_, i) => i !== index));
    };

    const handleFileChange = (e: any) => {
        setProfilePicture(e.target.files[0]);
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setMessage('');
        setError('');

        const form = new FormData();
        const applicationData = {
            ...formData,
            available_time_slots: timeSlots,
        };
        form.append('application', JSON.stringify(applicationData));
        form.append('profile_picture', profilePicture);

        try {
            const response = await fetch('http://127.0.0.1:8000/api/doctor/apply', {
                method: 'POST',
                body: form,
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("MS_AUTH_TOKEN")}`
                }
            });

            const data = await response.json();
            if (response.ok) {
                setMessage('Application submitted successfully!');
                setFormData({
                    full_name: '',
                    email: '',
                    phone_number: '',
                    father_name: '',
                    gender: '',
                    country: '',
                    city: '',
                    qualification: '',
                    experience: '',
                    price_per_appointment: '',
                    description: '',
                });
                setTimeSlots([{ day: '', start_time: '', end_time: '', is_booked: false }]);
                setProfilePicture(null);
            } else {
                if (data.detail && Array.isArray(data.detail)) {
                    const errorMessages = data.detail.map((err: any) => err.msg).join(', ');
                    setError(errorMessages);
                } else if (data.detail) {
                    setError(data.detail);
                } else {
                    setError('An error occurred during submission.');
                }
            }
        } catch (err) {
            setError('Failed to submit application. Please try again.');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
                <h1 className="text-3xl font-bold text-[#00d4d4] mb-6">Apply for a Doctor</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-[#00d4d4] mb-1">Full Name</label>
                        <input
                            type="text"
                            name="full_name"
                            value={formData.full_name}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-[#00d4d4] mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-[#00d4d4] mb-1">Phone Number</label>
                        <input
                            type="text"
                            name="phone_number"
                            value={formData.phone_number}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-[#00d4d4] mb-1">Father's Name</label>
                        <input
                            type="text"
                            name="father_name"
                            value={formData.father_name}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-[#00d4d4] mb-1">Gender</label>
                        <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-[#00d4d4] mb-1">Country</label>
                        <input
                            type="text"
                            name="country"
                            value={formData.country}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-[#00d4d4] mb-1">City</label>
                        <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-[#00d4d4] mb-1">Qualification</label>
                        <input
                            type="text"
                            name="qualification"
                            value={formData.qualification}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-[#00d4d4] mb-1">Experience (years)</label>
                        <input
                            type="number"
                            name="experience"
                            value={formData.experience}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-[#00d4d4] mb-1">Price per Appointment (USD)</label>
                        <input
                            type="number"
                            name="price_per_appointment"
                            value={formData.price_per_appointment}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-[#00d4d4] mb-1">Available Time Slots</label>
                        {timeSlots.map((slot, index) => (
                            <div key={index} className="flex space-x-2 mb-2">
                                <select
                                    value={slot.day}
                                    onChange={(e) => handleTimeSlotChange(index, 'day', e.target.value)}
                                    className="p-2 border border-gray-300 rounded"
                                    required
                                >
                                    <option value="">Select Day</option>
                                    <option value="Monday">Monday</option>
                                    <option value="Tuesday">Tuesday</option>
                                    <option value="Wednesday">Wednesday</option>
                                    <option value="Thursday">Thursday</option>
                                    <option value="Friday">Friday</option>
                                    <option value="Saturday">Saturday</option>
                                    <option value="Sunday">Sunday</option>
                                </select>
                                <input
                                    type="time"
                                    value={slot.start_time}
                                    onChange={(e) => handleTimeSlotChange(index, 'start_time', e.target.value)}
                                    className="p-2 border border-gray-300 rounded"
                                    required
                                />
                                <input
                                    type="time"
                                    value={slot.end_time}
                                    onChange={(e) => handleTimeSlotChange(index, 'end_time', e.target.value)}
                                    className="p-2 border border-gray-300 rounded"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => removeTimeSlot(index)}
                                    className="bg-red-500 text-white px-2 py-1 rounded"
                                    disabled={timeSlots.length === 1}
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={addTimeSlot}
                            className="bg-[#00d4d4] text-white px-4 py-2 rounded mt-2"
                        >
                            Add Time Slot
                        </button>
                    </div>
                    <div>
                        <label className="block text-[#00d4d4] mb-1">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded"
                            rows={4}
                            required
                        ></textarea>
                    </div>
                    <div>
                        <label className="block text-[#00d4d4] mb-1">Profile Picture</label>
                        <input
                            type="file"
                            name="profile_picture"
                            onChange={handleFileChange}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-[#00d4d4] text-white py-2 rounded hover:bg-[#00b0b0] transition duration-200"
                    >
                        Submit Application
                    </button>
                </form>
                {message && <p className="mt-4 text-green-600">{message}</p>}
                {error && <p className="mt-4 text-red-600">{error}</p>}
            </div>
        </div>
    );
};

export default DoctorApplicationForm;