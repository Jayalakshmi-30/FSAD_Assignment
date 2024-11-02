import React from 'react';
import whatsappIcon from '../../public/whatsapp-icon.png';
import { MdEmail } from 'react-icons/md';
import { FaWhatsapp } from 'react-icons/fa';

const Messenger = ({ phoneNumber, email }) => {
  const whatsappWebLink = `https://web.whatsapp.com/send?phone=${phoneNumber}`;
  const gmailLink = `mailto:${email}`;

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-8 max-w-md mx-auto">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
        Contact Book Owner
      </h3>
      
      <div className="flex justify-center gap-6">
        <a 
          href={whatsappWebLink} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex flex-col items-center group"
        >
          <div className="bg-green-500 p-4 rounded-full transition-transform duration-300 group-hover:scale-110">
            <FaWhatsapp className="w-8 h-8 text-white" />
          </div>
          <span className="text-sm text-gray-600 mt-2">WhatsApp</span>
        </a>

        <a 
          href={gmailLink} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex flex-col items-center group"
        >
          <div className="bg-red-500 p-4 rounded-full transition-transform duration-300 group-hover:scale-110">
            <MdEmail className="w-8 h-8 text-white" />
          </div>
          <span className="text-sm text-gray-600 mt-2">Email</span>
        </a>
      </div>
    </div>
  );
}

export default Messenger;
