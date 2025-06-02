import React from "react";

const WhatsApp = () => {
  const phoneNumber = "+2348163453995"; // Replace with your number
  const message = "Hello! I want to know more about your services"; // Customize this

  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg transition animate-bounce"
    >
      <svg
        className="w-8 h-8"
        viewBox="0 0 32 32"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M16 0C7.163 0 0 7.162 0 16c0 2.837.738 5.527 2.149 7.933L0 32l8.271-2.144A15.889 15.889 0 0016 32c8.837 0 16-7.162 16-16S24.837 0 16 0zm0 29.6c-2.537 0-5.04-.673-7.226-1.948l-.519-.31-4.912 1.274 1.299-4.79-.34-.559C3.98 20.741 3.2 18.4 3.2 16c0-7.029 5.729-12.8 12.8-12.8S28.8 8.971 28.8 16 23.071 28.8 16 28.8zm7.38-9.448c-.403-.2-2.39-1.18-2.762-1.312-.37-.137-.641-.2-.91.201s-1.04 1.31-1.28 1.579c-.237.27-.47.303-.873.101-.402-.2-1.7-.626-3.237-1.998-1.196-1.067-2.005-2.39-2.24-2.792-.233-.402-.025-.618.175-.818.18-.18.4-.47.6-.7.2-.232.27-.4.4-.671.133-.27.067-.503-.034-.7-.1-.2-.91-2.197-1.246-3.008-.328-.79-.664-.683-.91-.696l-.77-.014c-.27 0-.7.1-1.06.47-.363.37-1.38 1.347-1.38 3.282s1.414 3.805 1.612 4.066c.2.27 2.78 4.244 6.73 5.947.94.405 1.67.647 2.238.827.94.3 1.8.258 2.48.156.757-.113 2.39-.978 2.73-1.923.337-.947.337-1.76.236-1.923-.1-.162-.37-.27-.77-.47z" />
      </svg>
    </a>
  );
};

export default WhatsApp;
