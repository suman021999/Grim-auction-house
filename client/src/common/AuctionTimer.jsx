
import { Heart, Eye } from "lucide-react";
import { useState, useEffect } from "react";

export default function AuctionCard() {
  const [timeLeft, setTimeLeft] = useState({
    days: 80,
    hours: 6,
    minutes: 11,
    seconds: 4
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="group max-w-72 mx-auto  border-2 border-gray-300 rounded-2xl shadow-lg overflow-hidden">
      {/* Image Section */}
      <div className="relative">
        <img 
          src="https://probid-wp.egenstheme.com/antiques-auction/wp-content/uploads/sites/8/2024/10/product-13-1.webp" 
          alt="Stack of antique books"
          className="w-full h-64 object-cover p-1 rounded-2xl"
        />

        {/* Hover Gradient Overlay */}
<div className="absolute inset-0 rounded-2xl p-1 overflow-hidden">
  <div className="absolute inset-0 bg-gradient-to-br from-gray-200/60 to-gray-300/60 
                  opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-150 
                  origin-center transition-all duration-700 ease-out rounded-2xl "></div>
</div>

        
        {/* Live Badge */}
        <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full flex items-center text-sm font-medium">
          <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></div>
          Live
        </div>

        {/* Action Icons */}
        <div className="absolute top-4 right-4 flex flex-col space-y-2">
          <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-shadow">
            <Heart className="w-5 h-5 text-gray-600" />
          </button>
          <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-shadow">
            <Eye className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Countdown Timer */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white rounded-full px-6 py-1 shadow-lg">
          <div className="flex items-center space-x-4 text-center">
            <div>
              <div className="text-2xl font-bold text-gray-900">{timeLeft.days}</div>
              <div className="text-xs text-gray-500">Days</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{timeLeft.hours}</div>
              <div className="text-xs text-gray-500">Hours</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{timeLeft.minutes}</div>
              <div className="text-xs text-gray-500">Minutes</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{timeLeft.seconds}</div>
              <div className="text-xs text-gray-500">Seconds</div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 leading-tight">
          Canvas & culture brush within elegance auction.
        </h2>
        
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 mb-1">Current bid:</p>
            <p className="text-2xl font-bold text-gray-900">$9,900.00</p>
          </div>
          <button className="bg-black group-hover:bg-orange-900 text-white px-6 py-1 rounded-lg font-medium transition-colors">
            Bid Now
          </button>
        </div>
      </div>
    </section>
  );
}

