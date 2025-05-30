import { useState } from 'react';

export default function AppointmentBookingForm() {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    address: '',
    timeSlot: '',
    service: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    setSubmitted(true);
  };

  const generateWhatsAppLink = () => {
    const phone = '917002149453'; // Replace with Hrishikesh's actual number
    const message = `Hey Hrishikesh, I would like to Book a service in Hrishikesh's Physio Home & Child Rehabilitation Center\n\nName: ${formData.name}\nAge: ${formData.age}\nAddress: ${formData.address}\nTime Slot: ${formData.timeSlot}\nService: ${formData.service}`;
    
    return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  };

  return (
    <div id="booking" className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6 space-y-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800">Book Your Appointment</h2>
          <p className="text-gray-600 mt-2">Fill in the details to schedule your session</p>
        </div>

        {!submitted ? (
          <div className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
                Age *
              </label>
              <input
                type="number"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                Address *
              </label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>

            <div>
              <label htmlFor="timeSlot" className="block text-sm font-medium text-gray-700 mb-1">
                Preferred Time Slot *
              </label>
              <select
                id="timeSlot"
                name="timeSlot"
                value={formData.timeSlot}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select a time slot</option>
                <option value="Morning">Morning</option>
                <option value="Noon">Noon</option>
                <option value="Evening">Evening</option>
                <option value="Night">Night</option>
                <option value="24x7 Special Care">24x7 Special Care</option>
              </select>
            </div>

            <div>
              <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1">
                Required Service *
              </label>
              <select
                id="service"
                name="service"
                value={formData.service}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select a service</option>
                <option value="Physiotherapy">Physiotherapy</option>
                <option value="Pain Management">Pain Management</option>
                <option value="Injury Healing">Injury Healing</option>
                <option value="Special Childcare">Special Childcare</option>
                <option value="Movement Therapy">Movement Therapy</option>
                <option value="24x7 Special Care">24x7 Special Care</option>
                <option value="Home-visit Treatment">Home-visit Treatment</option>
              </select>
            </div>

            <button
              onClick={handleSubmit}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            >
              Book Appointment
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-md">
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="font-medium">Form submitted successfully!</p>
              </div>
            </div>

            <div className="space-y-4 bg-gray-50 p-4 rounded-md">
              <h3 className="font-medium text-gray-900">Appointment Details</h3>
              <div className="space-y-2">
                <p><span className="font-medium">Name:</span> {formData.name}</p>
                <p><span className="font-medium">Age:</span> {formData.age}</p>
                <p><span className="font-medium">Address:</span> {formData.address}</p>
                <p><span className="font-medium">Time Slot:</span> {formData.timeSlot}</p>
                <p><span className="font-medium">Service:</span> {formData.service}</p>
              </div>
            </div>

            <a
              href={generateWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-green-600 text-white text-center py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
            >
              <div className="flex items-center justify-center">
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Confirm via WhatsApp
              </div>
            </a>

            <button
              onClick={() => setSubmitted(false)}
              className="w-full mt-4 bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
            >
              Edit Information
            </button>
          </div>
        )}
      </div>
    </div>
  );
}