import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

function ContactDetails() {
  // Define state for owner details with Indian names
  const [ownerDetails, setOwnerDetails] = useState({
    name: 'Jayalakshmi K',
    email: 'jayalakshmik@gmail.com',
    phone: '+91 8123662399',
    address: '#1556, Cunningham Road, Bengaluru, India',
  });

  return (
    <div className="bg-white py-20">
      <div className="container mx-auto p-8 bg-gray-100 rounded-lg shadow-lg">
        <div className="text-center mb-6">
          <h2 className="text-4xl font-bold text-gray-800">Contact Information</h2>
        </div>
        <div className="space-y-4">
          <div className="flex items-center p-4 border-b border-gray-300 hover:bg-gray-200 rounded transition">
            <FaUser className="text-2xl text-pink-500 mr-3" />
            <p className="text-lg text-gray-700">{ownerDetails.name}</p>
          </div>
          <div className="flex items-center p-4 border-b border-gray-300 hover:bg-gray-200 rounded transition">
            <FaEnvelope className="text-2xl text-pink-500 mr-3" />
            <p className="text-lg text-gray-700">{ownerDetails.email}</p>
          </div>
          <div className="flex items-center p-4 border-b border-gray-300 hover:bg-gray-200 rounded transition">
            <FaPhone className="text-2xl text-pink-500 mr-3" />
            <p className="text-lg text-gray-700">{ownerDetails.phone}</p>
          </div>
          <div className="flex items-center p-4 hover:bg-gray-200 rounded transition">
            <FaMapMarkerAlt className="text-2xl text-pink-500 mr-3" />
            <p className="text-lg text-gray-700">{ownerDetails.address}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactDetails;
