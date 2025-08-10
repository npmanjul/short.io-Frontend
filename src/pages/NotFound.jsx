import React from "react";
import { Link, Home, ArrowLeft, Zap } from "lucide-react";

const NotFound = () => {
  const handleGoHome = () => {
    window.location.href = "/";
  };

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-black via-gray-900 to-black text-white p-6 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        {/* Floating particles */}
        <div className="absolute top-20 left-20 w-2 h-2 bg-green-500 rounded-full animate-float-1"></div>
        <div className="absolute top-40 right-32 w-1 h-1 bg-green-400 rounded-full animate-float-2"></div>
        <div className="absolute bottom-32 left-16 w-3 h-3 bg-green-300 rounded-full animate-float-3"></div>
        <div className="absolute bottom-20 right-20 w-1.5 h-1.5 bg-green-500 rounded-full animate-float-4"></div>
        <div className="absolute top-1/3 left-1/4 w-2 h-2 bg-green-400 rounded-full animate-float-5"></div>

        {/* Subtle grid overlay */}
        <div className="absolute inset-0 opacity-5 animate-grid-move">
          <div
            style={{
              backgroundImage: `
              linear-gradient(rgba(34, 197, 94, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(34, 197, 94, 0.3) 1px, transparent 1px)
            `,
              backgroundSize: "40px 40px",
            }}
            className="w-full h-full"
          ></div>
        </div>
      </div>

      {/* Main content container with glass effect */}
      <div className="relative z-10 w-full max-w-lg mx-auto px-8 py-12 rounded-3xl bg-gradient-to-br from-gray-900/40 to-gray-800/40 backdrop-blur-xl border border-green-500/20 shadow-2xl animate-fade-in-scale">
        {/* Animated icon container - perfectly centered */}
        <div className="flex justify-center mb-8">
          <div className="relative inline-block animate-bounce-in">
            {/* Glowing background */}
            <div className="absolute inset-0 bg-green-500 rounded-full blur-2xl opacity-20 animate-pulse-glow scale-150"></div>

            {/* Main icon */}
            <div className="relative flex justify-center items-center">
              <Link
                className="w-20 h-20 text-green-500 animate-icon-pulse"
                strokeWidth={1.5}
              />

              {/* Lightning effect */}
              <div className="absolute -top-2 -right-2 text-green-400 animate-lightning">
                <Zap className="w-6 h-6" fill="currentColor" />
              </div>

              {/* Orbiting dots */}
              <div className="absolute inset-0 animate-orbit">
                <div className="absolute top-0 left-1/2 w-2 h-2 bg-green-400 rounded-full transform -translate-x-1/2"></div>
              </div>
              <div className="absolute inset-0 animate-orbit-reverse">
                <div className="absolute bottom-0 left-1/2 w-1.5 h-1.5 bg-green-300 rounded-full transform -translate-x-1/2"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Sub-heading - centered */}
        <div className="text-center mb-2">
          <h2 className="text-2xl font-semibold text-white animate-slide-up-1">
            Link Not Found
          </h2>
        </div>

        {/* Animated underline - perfectly centered */}
        <div className="flex justify-center mb-6">
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-green-500 to-transparent animate-expand"></div>
        </div>

        {/* Message - centered with proper spacing */}
        <div className="text-center mb-8">
          <p className="text-gray-300 leading-relaxed animate-slide-up-2">
            This short link doesn't exist.
            <br />
            <span className="text-green-400 animate-fade-in-late">
              Let's get you back on track!
            </span>
          </p>
        </div>

        {/* Enhanced buttons - perfectly aligned */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up-3">
          <button
            onClick={handleGoHome}
            className="group relative w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-black font-semibold rounded-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-green-500/25 hover:scale-105 transform"
          >
            {/* Button glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>

            <div className="relative flex items-center justify-center gap-2">
              <Home className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
              Create New Link
            </div>

            {/* Ripple effect */}
            <div className="absolute inset-0 group-hover:bg-white/10 transition-colors duration-300"></div>
          </button>

          <button
            onClick={handleGoBack}
            className="group relative w-full sm:w-auto px-8 py-4 bg-gray-800/60 text-white font-semibold rounded-xl border border-green-500/30 overflow-hidden transition-all duration-300 hover:bg-gray-700/60 hover:border-green-400/50 hover:shadow-lg hover:scale-105 transform"
          >
            <div className="relative flex items-center justify-center gap-2">
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
              Go Back
            </div>
          </button>
        </div>

        {/* Animated dots indicator - centered */}
        <div className="flex justify-center mt-8 gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-dot-1"></div>
          <div className="w-2 h-2 bg-green-500 rounded-full animate-dot-2"></div>
          <div className="w-2 h-2 bg-green-500 rounded-full animate-dot-3"></div>
        </div>
      </div>

      {/* Complex animations */}
      <style>
        {`
          @keyframes fadeInScale {
            0% { 
              opacity: 0; 
              transform: scale(0.8) translateY(40px); 
            }
            100% { 
              opacity: 1; 
              transform: scale(1) translateY(0); 
            }
          }

          @keyframes bounceIn {
            0% { 
              opacity: 0; 
              transform: scale(0.3) rotate(-45deg); 
            }
            50% { 
              opacity: 1; 
              transform: scale(1.1) rotate(5deg); 
            }
            100% { 
              opacity: 1; 
              transform: scale(1) rotate(0deg); 
            }
          }

          @keyframes iconPulse {
            0%, 100% { 
              transform: scale(1); 
            }
            50% { 
              transform: scale(1.05); 
            }
          }

          @keyframes pulseGlow {
            0%, 100% { 
              opacity: 0.2; 
              transform: scale(1); 
            }
            50% { 
              opacity: 0.4; 
              transform: scale(1.1); 
            }
          }

          @keyframes lightning {
            0%, 90%, 100% { 
              opacity: 0; 
              transform: scale(0.8) rotate(0deg); 
            }
            95% { 
              opacity: 1; 
              transform: scale(1.2) rotate(5deg); 
            }
          }

          @keyframes orbit {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }

          @keyframes orbitReverse {
            0% { transform: rotate(360deg); }
            100% { transform: rotate(0deg); }
          }

          @keyframes textGlow {
            0%, 100% { 
              filter: drop-shadow(0 0 5px rgba(34, 197, 94, 0.5)); 
            }
            50% { 
              filter: drop-shadow(0 0 20px rgba(34, 197, 94, 0.8)); 
            }
          }

          @keyframes digit1 {
            0% { 
              opacity: 0; 
              transform: translateY(-20px) rotate(10deg); 
            }
            100% { 
              opacity: 1; 
              transform: translateY(0) rotate(0deg); 
            }
          }

          @keyframes digit2 {
            0% { 
              opacity: 0; 
              transform: translateY(-20px) rotate(-10deg); 
            }
            100% { 
              opacity: 1; 
              transform: translateY(0) rotate(0deg); 
            }
          }

          @keyframes digit3 {
            0% { 
              opacity: 0; 
              transform: translateY(-20px) rotate(10deg); 
            }
            100% { 
              opacity: 1; 
              transform: translateY(0) rotate(0deg); 
            }
          }

          @keyframes slideUp1 {
            0% { 
              opacity: 0; 
              transform: translateY(30px); 
            }
            100% { 
              opacity: 1; 
              transform: translateY(0); 
            }
          }

          @keyframes slideUp2 {
            0% { 
              opacity: 0; 
              transform: translateY(30px); 
            }
            100% { 
              opacity: 1; 
              transform: translateY(0); 
            }
          }

          @keyframes slideUp3 {
            0% { 
              opacity: 0; 
              transform: translateY(30px); 
            }
            100% { 
              opacity: 1; 
              transform: translateY(0); 
            }
          }

          @keyframes expand {
            0% { 
              width: 0; 
              opacity: 0; 
            }
            100% { 
              width: 6rem; 
              opacity: 1; 
            }
          }

          @keyframes fadeInLate {
            0%, 70% { 
              opacity: 0; 
            }
            100% { 
              opacity: 1; 
            }
          }

          @keyframes float1 {
            0%, 100% { transform: translateY(0px) translateX(0px); }
            33% { transform: translateY(-20px) translateX(10px); }
            66% { transform: translateY(-10px) translateX(-5px); }
          }

          @keyframes float2 {
            0%, 100% { transform: translateY(0px) translateX(0px); }
            33% { transform: translateY(-15px) translateX(-10px); }
            66% { transform: translateY(-25px) translateX(5px); }
          }

          @keyframes float3 {
            0%, 100% { transform: translateY(0px) translateX(0px); }
            33% { transform: translateY(-30px) translateX(-15px); }
            66% { transform: translateY(-15px) translateX(10px); }
          }

          @keyframes float4 {
            0%, 100% { transform: translateY(0px) translateX(0px); }
            33% { transform: translateY(-12px) translateX(8px); }
            66% { transform: translateY(-22px) translateX(-12px); }
          }

          @keyframes float5 {
            0%, 100% { transform: translateY(0px) translateX(0px); }
            33% { transform: translateY(-18px) translateX(-8px); }
            66% { transform: translateY(-8px) translateX(15px); }
          }

          @keyframes gridMove {
            0% { transform: translate(0, 0); }
            100% { transform: translate(40px, 40px); }
          }

          @keyframes dot1 {
            0%, 60%, 100% { opacity: 0.3; transform: scale(1); }
            30% { opacity: 1; transform: scale(1.2); }
          }

          @keyframes dot2 {
            0%, 60%, 100% { opacity: 0.3; transform: scale(1); }
            30% { opacity: 1; transform: scale(1.2); }
          }

          @keyframes dot3 {
            0%, 60%, 100% { opacity: 0.3; transform: scale(1); }
            30% { opacity: 1; transform: scale(1.2); }
          }

          @keyframes wave {
            0%, 100% { transform: translateX(-50%) translateY(0px); }
            50% { transform: translateX(-50%) translateY(-5px); }
          }

          .animate-fade-in-scale {
            animation: fadeInScale 1s ease-out forwards;
          }

          .animate-bounce-in {
            animation: bounceIn 1.2s cubic-bezier(0.68, -0.55, 0.265, 1.55) 0.3s forwards;
            opacity: 0;
          }

          .animate-icon-pulse {
            animation: iconPulse 2s ease-in-out infinite;
          }

          .animate-pulse-glow {
            animation: pulseGlow 3s ease-in-out infinite;
          }

          .animate-lightning {
            animation: lightning 3s ease-in-out infinite;
          }

          .animate-orbit {
            animation: orbit 8s linear infinite;
          }

          .animate-orbit-reverse {
            animation: orbitReverse 6s linear infinite;
          }

          .animate-text-glow {
            animation: textGlow 2s ease-in-out infinite;
          }

          .animate-digit-1 {
            animation: digit1 0.6s ease-out 0.5s forwards;
            opacity: 0;
          }

          .animate-digit-2 {
            animation: digit2 0.6s ease-out 0.7s forwards;
            opacity: 0;
          }

          .animate-digit-3 {
            animation: digit3 0.6s ease-out 0.9s forwards;
            opacity: 0;
          }

          .animate-slide-up-1 {
            animation: slideUp1 0.8s ease-out 1.2s forwards;
            opacity: 0;
          }

          .animate-slide-up-2 {
            animation: slideUp2 0.8s ease-out 1.4s forwards;
            opacity: 0;
          }

          .animate-slide-up-3 {
            animation: slideUp3 0.8s ease-out 1.6s forwards;
            opacity: 0;
          }

          .animate-expand {
            animation: expand 0.8s ease-out 1.3s forwards;
            width: 0;
          }

          .animate-fade-in-late {
            animation: fadeInLate 2s ease-out forwards;
          }

          .animate-float-1 {
            animation: float1 6s ease-in-out infinite;
          }

          .animate-float-2 {
            animation: float2 8s ease-in-out infinite;
          }

          .animate-float-3 {
            animation: float3 7s ease-in-out infinite;
          }

          .animate-float-4 {
            animation: float4 9s ease-in-out infinite;
          }

          .animate-float-5 {
            animation: float5 5s ease-in-out infinite;
          }

          .animate-grid-move {
            animation: gridMove 20s linear infinite;
          }

          .animate-dot-1 {
            animation: dot1 1.5s ease-in-out infinite;
            animation-delay: 0s;
          }

          .animate-dot-2 {
            animation: dot2 1.5s ease-in-out infinite;
            animation-delay: 0.3s;
          }

          .animate-dot-3 {
            animation: dot3 1.5s ease-in-out infinite;
            animation-delay: 0.6s;
          }

          .animate-wave {
            animation: wave 3s ease-in-out infinite;
          }
        `}
      </style>
    </div>
  );
};

export default NotFound;
