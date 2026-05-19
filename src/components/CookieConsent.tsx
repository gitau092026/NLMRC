import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CookieConsent = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem("cookie-consent");
        if (!consent) {
            const timer = setTimeout(() => {
                setIsVisible(true);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem("cookie-consent", "accepted");
        setIsVisible(false);
    };

    const handleDecline = () => {
        localStorage.setItem("cookie-consent", "declined");
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-6 bg-background/95 backdrop-blur-xl border-t shadow-2xl animate-in slide-in-from-bottom-full duration-500">
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-center md:text-left space-y-2 flex-1">
                    <h3 className="font-bold text-lg text-foreground">We value your privacy</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">
                        We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic.
                        By clicking "Accept All", you consent to our use of cookies.
                        Read our <Link to="/privacy-policy" className="text-primary hover:underline font-semibold">Privacy Policy</Link> to learn more.
                    </p>
                </div>
                <div className="flex flex-row gap-4 shrink-0 w-full md:w-auto justify-center md:justify-end">
                    <Button
                        variant="outline"
                        onClick={handleDecline}
                        className="flex-1 md:flex-none min-w-[100px]"
                    >
                        Decline
                    </Button>
                    <Button
                        onClick={handleAccept}
                        className="flex-1 md:flex-none min-w-[100px]"
                    >
                        Accept All
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default CookieConsent;
