import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

interface DonationButtonProps {
  variant?: "default" | "outline" | "ghost";
  size?: "sm" | "default" | "lg";
  className?: string;
  showText?: boolean;
}

export function DonationButton({ 
  variant = "default", 
  size = "default", 
  className = "",
  showText = true 
}: DonationButtonProps) {
  const handleDonate = () => {
    // PayPal donate URL with your email
    const paypalUrl = `https://www.paypal.com/donate/?hosted_button_id=YOUR_BUTTON_ID&business=ebocic@gmail.com&item_name=Support+WeeLog+Development&currency_code=USD`;
    window.open(paypalUrl, '_blank');
  };

  return (
    <Button
      onClick={handleDonate}
      variant={variant}
      size={size}
      className={`${className} ${variant === "default" ? "bg-blue-600 hover:bg-blue-700" : ""}`}
    >
      <Heart className="w-4 h-4 mr-2" />
      {showText && "Support Developer"}
    </Button>
  );
}