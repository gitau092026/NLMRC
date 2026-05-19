import { useState } from "react";
import { X } from "lucide-react";

const WhatsAppChat = () => {
    const [isOpen, setIsOpen] = useState(false);

    // WhatsApp business number
    const whatsappNumber = "254795822903";
    const defaultMessage = "Hello! I'd like to learn more about NLMRC.";

    const handleWhatsAppClick = () => {
        const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(defaultMessage)}`;
        window.open(url, "_blank");
    };

    // WhatsApp Logo SVG Component
    const WhatsAppLogo = ({ className }: { className?: string }) => (
        <svg
            viewBox="0 0 24 24"
            className={className}
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
    );

    return (
        <>
            {/* Main WhatsApp Button */}
            <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
                {/* Tooltip/Message bubble */}
                {isOpen && (
                    <div className="bg-white rounded-lg shadow-xl p-4 max-w-xs animate-in slide-in-from-bottom-5 fade-in duration-300">
                        <div className="flex items-start gap-3">
                            <div className="bg-[#25D366] rounded-full p-2 flex-shrink-0">
                                <WhatsAppLogo className="w-5 h-5 text-white" />
                            </div>
                            <div className="flex-1">
                                <p className="font-semibold text-gray-900 mb-1">Chat with us!</p>
                                <p className="text-sm text-gray-600">
                                    Have questions? We're here to help via WhatsApp.
                                </p>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                                aria-label="Close message"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                        <button
                            onClick={handleWhatsAppClick}
                            className="mt-3 w-full bg-[#25D366] hover:bg-[#1ebe5d] text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                        >
                            Start Chat
                        </button>
                    </div>
                )}

                {/* Floating WhatsApp Button */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="group relative bg-[#25D366] hover:bg-[#1ebe5d] text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
                    aria-label="Chat on WhatsApp"
                >
                    {/* Pulse animation ring */}
                    <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30" />

                    {/* WhatsApp Logo */}
                    <div className="relative z-10">
                        <WhatsAppLogo className="w-7 h-7 text-white fill-white" />
                    </div>

                    {/* Notification badge */}
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                        1
                    </span>
                </button>
            </div>

            {/* Custom styles for animations */}
            <style>{`
        @keyframes ping {
          75%, 100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }
        
        .animate-ping {
          animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
      `}</style>
        </>
    );
};

export default WhatsAppChat;
