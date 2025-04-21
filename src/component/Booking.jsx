import { useState } from 'react';

export default function BookingForm() {
  // Your WhatsApp number with country code, no spaces or symbols
  const whatsappNumber = "+916001694190"; // Replace with your actual number

  const [formData, setFormData] = useState({
    name: '',
    age: '',
    service: 'Physiotherapy',
    location: '',
    day: '',
    time: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const services = [
    'Physiotherapy',
    'Child Rehabilitation',
    'Pain Management',
    'Special Care'
  ];
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error for this field when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const generateWhatsAppLink = () => {
    // Only include filled fields in the message
    let messageLines = ['Hi, I would like to book a service.'];
    
    if (formData.name) messageLines.push(`Name: ${formData.name}`);
    if (formData.age) messageLines.push(`Age: ${formData.age}`);
    if (formData.service) messageLines.push(`Service Required: ${formData.service}`);
    if (formData.location) messageLines.push(`Location: ${formData.location}`);
    if (formData.day) messageLines.push(`Visit Day: ${formData.day}`);
    if (formData.time) messageLines.push(`Visit Time: ${formData.time}`);
    
    messageLines.push('Thank you!');
    
    const message = messageLines.join('\n');
    const encodedMessage = encodeURIComponent(message);
    
    // Include the WhatsApp number in the link
    return `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;
    
    // Only name is required for minimal functionality
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }
    
    // Check if at least one more field besides name is filled
    const hasAdditionalInfo = 
      formData.age || 
      formData.location || 
      formData.day || 
      formData.time;
    
    if (!hasAdditionalInfo) {
      newErrors.general = 'Please provide at least one more detail besides your name';
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitted(true);
    }
  };

  return (
    <section id="booking">
    <div className="max-w-md mx-auto p-6 bg-gradient-to-br from-white to-pink-50 rounded-lg shadow-xl border border-pink-100 py-5 my-5">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-navy-800 mb-2">Book Your Session</h2>
        <div className="w-16 h-1 bg-pink-500 mx-auto rounded-full"></div>
        {!isSubmitted && (
          <p className="text-gray-600 mt-2 text-sm">Fields marked with * are required</p>
        )}
      </div>
      
      {!isSubmitted ? (
        <form onSubmit={handleSubmit} className="space-y-5">
          {errors.general && (
            <div className="p-3 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm rounded">
              {errors.general}
            </div>
          )}
          
          <div className="relative">
            <label className="block text-navy-800 font-medium mb-1">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className={`w-full p-3 bg-white border ${
                errors.name ? 'border-red-500' : 'border-pink-200'
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition`}
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name}</p>
            )}
          </div>
          
          <div className="relative">
            <label className="block text-navy-800 font-medium mb-1">Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              min="1"
              placeholder="Enter your age"
              className="w-full p-3 bg-white border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition"
            />
          </div>
          
          <div className="relative">
            <label className="block text-navy-800 font-medium mb-1">
              Service Required <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                name="service"
                value={formData.service}
                onChange={handleChange}
                className="w-full p-3 bg-white border border-pink-200 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition"
              >
                {services.map((service, index) => (
                  <option key={index} value={service}>{service}</option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg className="w-5 h-5 text-pink-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path>
                </svg>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <label className="block text-navy-800 font-medium mb-1">Your Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Enter your address"
              className="w-full p-3 bg-white border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="relative">
              <label className="block text-navy-800 font-medium mb-1">Visit Day</label>
              <input
                type="date"
                name="day"
                value={formData.day}
                onChange={handleChange}
                className="w-full p-3 bg-white border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition"
              />
            </div>
            
            <div className="relative">
              <label className="block text-navy-800 font-medium mb-1">Visit Time</label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="w-full p-3 bg-white border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition"
              />
            </div>
          </div>
          
          <button 
            type="submit" 
            className="w-full py-3 px-4 mt-4 bg-pink-600 text-white font-bold rounded-lg shadow-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50 transform transition hover:-translate-y-1 active:translate-y-0"
          >
            Book Appointment
          </button>
        </form>
      ) : (
        <div className="space-y-6">
          <div className="p-5 bg-white rounded-lg shadow-md border-l-4 border-pink-500">
            <h3 className="font-bold text-navy-800 text-lg mb-3">Booking Summary</h3>
            <div className="space-y-3 text-gray-700">
              {formData.name && (
                <div className="flex border-b border-gray-100 pb-2">
                  <span className="font-medium text-navy-800 w-1/3">Name:</span>
                  <span className="flex-1">{formData.name}</span>
                </div>
              )}
              
              {formData.age && (
                <div className="flex border-b border-gray-100 pb-2">
                  <span className="font-medium text-navy-800 w-1/3">Age:</span>
                  <span className="flex-1">{formData.age}</span>
                </div>
              )}
              
              {formData.service && (
                <div className="flex border-b border-gray-100 pb-2">
                  <span className="font-medium text-navy-800 w-1/3">Service:</span>
                  <span className="flex-1">{formData.service}</span>
                </div>
              )}
              
              {formData.location && (
                <div className="flex border-b border-gray-100 pb-2">
                  <span className="font-medium text-navy-800 w-1/3">Location:</span>
                  <span className="flex-1">{formData.location}</span>
                </div>
              )}
              
              {formData.day && (
                <div className="flex border-b border-gray-100 pb-2">
                  <span className="font-medium text-navy-800 w-1/3">Day:</span>
                  <span className="flex-1">{formData.day}</span>
                </div>
              )}
              
              {formData.time && (
                <div className="flex pb-2">
                  <span className="font-medium text-navy-800 w-1/3">Time:</span>
                  <span className="flex-1">{formData.time}</span>
                </div>
              )}
              
              {!formData.day && !formData.time && !formData.location && !formData.age && (
                <div className="italic text-gray-500">No additional information provided</div>
              )}
            </div>
          </div>
          
          <div className="flex flex-col space-y-3">
            <a 
              href={generateWhatsAppLink()} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full py-3 px-4 bg-green-600 text-white font-bold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 flex items-center justify-center space-x-2 transition hover:shadow-lg"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.498 14.382c-.301-.15-1.767-.867-2.04-.966-.273-.101-.473-.15-.673.15-.197.295-.771.964-.944 1.162-.175.195-.349.21-.646.075-.3-.15-1.263-.465-2.403-1.485-.888-.795-1.484-1.77-1.66-2.07-.174-.3-.019-.465.13-.615.136-.135.301-.345.451-.523.146-.181.194-.301.297-.496.1-.21.049-.375-.025-.524-.075-.15-.672-1.62-.922-2.206-.241-.584-.486-.51-.672-.51-.172-.015-.371-.015-.571-.015-.2 0-.523.074-.797.359-.273.3-1.045 1.02-1.045 2.475s1.07 2.865 1.219 3.075c.149.195 2.105 3.195 5.1 4.485.714.3 1.27.48 1.704.629.714.227 1.365.195 1.88.121.574-.091 1.767-.721 2.016-1.426.255-.705.255-1.29.18-1.425-.074-.135-.27-.21-.57-.345m-5.446 7.443h-.016c-1.77 0-3.524-.48-5.055-1.38l-.36-.214-3.75.975 1.005-3.645-.239-.375c-.99-1.576-1.516-3.391-1.516-5.26 0-5.445 4.455-9.885 9.942-9.885 2.654 0 5.145 1.035 7.021 2.91 1.875 1.859 2.909 4.35 2.909 6.99-.004 5.444-4.46 9.885-9.935 9.885M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.334.101 11.893c0 2.096.549 4.14 1.595 5.945L0 24l6.335-1.652c1.746.943 3.71 1.444 5.71 1.447h.006c6.585 0 11.946-5.336 11.949-11.896 0-3.176-1.24-6.165-3.495-8.411"></path>
              </svg>
              <span>Continue to WhatsApp</span>
            </a>
            
            <button 
              onClick={() => setIsSubmitted(false)}
              className="w-full py-3 px-4 bg-navy-800 text-white font-medium rounded-lg hover:bg-navy-900 focus:outline-none focus:ring-2 focus:ring-navy-500 focus:ring-opacity-50 transition"
            >
              Edit Information
            </button>
          </div>
        </div>
      )}
    </div>
    </section>
  );
}