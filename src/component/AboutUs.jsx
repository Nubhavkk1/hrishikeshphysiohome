import { Award,ChartNoAxesCombined , Users, Heart, Target, ThumbsUp, Shield } from 'lucide-react';

export default function AboutUs() {
  const coreValues = [
    {
      icon: <ChartNoAxesCombined  className="w-8 h-8 text-teal-600" />,
      title: "No 1 Brand In Physiotherapy",
      description: "We put our patients at the heart of everything we do, ensuring their comfort and wellbeing during treatment."
    },
    {
      icon: <Target className="w-8 h-8 text-teal-600" />,
      title: "Customized Treatment",
      description: "Every patient receives a personalized care plan tailored to their specific needs and recovery goals."
    },
    {
      icon: <ThumbsUp className="w-8 h-8 text-teal-600" />,
      title: "Excellence in Service 10+ Years of Experience  ",
      description: "We maintain the highest standards in physiotherapy and rehabilitation services across Assam."
    },
    {
      icon: <Shield className="w-8 h-8 text-teal-600" />,
      title: "We Deal In Physiotherapy Instruments In House",
      description: "You can buy Orthotics and Prosthetics (Lumber Belt, OA Knee Support, Cervical Belt, Salica Heel Pad) right from our clinic"
    }
  ];

  const teamMembers = [
    {
      name: "Dr. Hrishikesh",
      role: "Lead Physiotherapist & Founder",
      image: "/images/img40.avif"
    },
    {
      name: "Dr. Sarah Sharma",
      role: "Pediatric Rehabilitation Specialist",
      image: "/images/img50.avif"
    },
    {
      name: "Dr. Rajesh Kumar",
      role: "Pain Management Expert",
      image: "/images/img30.avif"
    }
  ];

  return (
    <div id = "about" className="bg-white font-sans">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-teal-600 to-teal-800 text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About<br></br> Hrishikesh's Physio Home <br></br> & Child Rehabilitation Center</h1>
            <p className="text-lg md:text-xl">Dedicated to healing and rehabilitation excellence in Assam for over a decade</p>
          </div>
        </div>
      </div>

      {/* Our Story */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:gap-12">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <img 
                src="/images/img20.png" 
                alt="Physiotherapy center" 
                className="rounded-lg shadow-lg w-full"
              />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Story</h2>
              <p className="text-gray-600 mb-6 text-lg">
                Our lead physiotherapist Hrishikesh Das spent 10 years working in the field of physiotherapy, gaining extensive experience across a wide range of cases. His dedication to helping others and constant drive to improve his skills made him a trusted name among patients and colleagues alike. Over time he developed a special vision for the next step in his career.
              </p>
              <p className="text-gray-600 mb-6 text-lg">
               With this experience and passion, He opened Hrishikesh Physio Home & Child Rehabilitation Center, a clinic designed to meet the unique needs of every patient. The clinic focuses on providing personalized, high-quality care in a comfortable setting, with services tailored for both adults and children. His goal is to offer effective treatment that supports long-term recovery and treat the root cause of thr issue.
              </p>
              <div className="flex items-center space-x-4">
                <div className="bg-rose-200 p-4 rounded-lg text-center flex-1">
                  <span className="block text-3xl font-bold text-gray-600">10+</span>
                  <span className="text-gray-600">Years Experience</span>
                </div>
                <div className="bg-teal-200 p-4 rounded-lg text-center flex-1">
                  <span className="block text-3xl font-bold text-gray-600">1000+</span>
                  <span className="text-gray-800">Happy Patients</span>
                </div>
                <div className="bg-orange-200 p-4 rounded-lg text-center flex-1">
                  <span className="block text-3xl font-bold text-gray-600">5+</span>
                  <span className="text-gray-600">Expert Staff</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Our Mission */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Mission</h2>
            <p className="text-xl text-teal-700 font-medium italic">
              "To empower patients to overcome pain and physical limitations, enabling them to lead healthier, fulfilling lives."
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4 text-teal-700">What We Do</h3>
              <p className="text-gray-600 mb-4">
                At <b>Hrishikesh's Physio Home & Child Rehabilitation Center</b>, we provide comprehensive <b>physiotherapy</b> and <b>rehabilitation</b> services for patients of all ages. Our modern facilities and advanced equipment allow us to deliver the highest standard of care for a wide range of conditions.
              </p>
              <p className="text-gray-600">
                We are specialized in pain <b>relief therapy</b>r, <b>manual therapy</b>,  <b>electric therapy</b>, <b>movement therapy</b>, <b>child rehabilitation</b> and many other rehabilitation programs. Each treatment plan is carefully customized to meet the individual needs of our patients, ensuring the best possible outcomes.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4 text-teal-700">How We Work</h3>
              <p className="text-gray-600 mb-4">
                Our clinic is an all-in-one stop for all physiotherapy services. Here we try to understand each patient's unique needs and challenges. Our team of experienced physiotherapists then develops a personalized treatment plan for each patient. 
              </p>
              <p className="text-gray-600">
               We take eccellent care of our patients in our clinic. Our therapists and assistants are always with the patient every step of the way making sure they feel comfortable and at ease. We try to treat the root cause of the problem rather then treating the surface level symtoms.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Our Core Values */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-600 mb-4">We Provide The Best Phyisiotherapy Service In North East India</h2>
            <p className="text-lg text-gray-600">We Are Always Guided By Principles And Values To Provide our Patients with World Class Treatment</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((value, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg border border-gray-100 hover:border-teal-500 transition text-center">
                <div className="inline-flex items-center justify-center bg-teal-50 p-3 rounded-full mb-4">
                  {value.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-800">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Meet Our Team */}
      {/* <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Meet Our Team</h2>
            <p className="text-lg text-gray-600">Skilled professionals dedicated to your wellbeing</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md transition-transform hover:scale-105">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-64 object-cover"
                />
                <div className="p-6 text-center">
                  <h3 className="text-xl font-semibold text-gray-800">{member.name}</h3>
                  <p className="text-teal-600">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-lg text-gray-700 mb-6">
              Our entire team consists of experienced physiotherapists and child rehabilitation specialists who are passionate about helping patients achieve their goals. We stay updated with the latest advancements in the field to provide the best possible care.
            </p>
            <button className="bg-teal-600 text-white px-8 py-3 rounded-md font-medium hover:bg-teal-700 transition">
              BOOK YOUR APPOINTMENT TODAY
            </button>
          </div>
        </div>
      </div> */}

      {/* Testimonials */}
      <div className="py-16 bg-teal-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">What Our Patients Say</h2>
            <p className="text-lg text-gray-600">Real stories from people we've helped</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex items-center text-yellow-400 mb-4">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path></svg>
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path></svg>
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path></svg>
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path></svg>
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path></svg>
              </div>
              <p className="text-gray-600 mb-4 italic">
                "After months of back pain, I found relief at Hrishikesh's Physio Home. Their personalized approach and expert care have made a world of difference. I can now enjoy activities I had given up on."
              </p>
              <div>
                <p className="font-semibold text-gray-800">Priya Sharma</p>
                <p className="text-gray-500 text-sm">Back Pain Patient</p>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex items-center text-yellow-400 mb-4">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path></svg>
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path></svg>
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path></svg>
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path></svg>
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path></svg>
              </div>
              <p className="text-gray-600 mb-4 italic">
                "As a parent of a child with special needs, I'm grateful for the pediatric therapy services at Hrishikesh's. Their experienced specialists have helped my son make incredible progress."
              </p>
              <div>
                <p className="font-semibold text-gray-800">Rajiv Borah</p>
                <p className="text-gray-500 text-sm">Parent of Pediatric Patient</p>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex items-center text-yellow-400 mb-4">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path></svg>
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path></svg>
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path></svg>
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path></svg>
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path></svg>
              </div>
              <p className="text-gray-600 mb-4 italic">
                "Following my knee surgery, the rehabilitation program at Hrishikesh's was crucial to my recovery. Their expertise and encouraging approach helped me regain strength and mobility faster than expected."
              </p>
              <div>
                <p className="font-semibold text-gray-800">Ankit Das</p>
                <p className="text-gray-500 text-sm">Post-Surgery Rehabilitation</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-teal-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-6">Begin Your Healing Journey Today</h2>
            {/* <p className="text-lg mb-8 max-w-3xl mx-auto">
              Experience the difference of our personalized physiotherapy and rehabilitation services. 
              We're committed to helping you achieve your health goals and improve your quality of life.
            </p> */}
            {/* <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-teal-700 px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition">
                Book an Appointment
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-md font-semibold hover:bg-white hover:bg-opacity-10 transition">
                Contact Us
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}