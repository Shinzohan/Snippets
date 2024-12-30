import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef, useState, useEffect } from "react";
import StyleButton from "./styleButton";

gsap.registerPlugin();

const Hero = () => {
  const currentImgRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate page load
    const handleLoad = () => {
      setTimeout(() => setIsLoading(false), 1500); // Add delay for smooth transition
    };
    
    window.addEventListener('load', handleLoad);
    return () => window.removeEventListener('load', handleLoad);
  }, []);

  // Clip path animation for image frame
  useGSAP(() => {
    gsap.set("#image-frame", {
      clipPath: "polygon(0 2%, 80% 0%, 75% 69%, 11% 100%)",
      borderRadius: "0% 0% 0% 0%",
    });
    gsap.from("#image-frame", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      borderRadius: "0% 0% 0% 0%",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#image-frame",
        start: "center center",
        end: "bottom center",
        scrub: true,
      },
    });
  });

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-blue-75 z-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-white"></div>
      </div>
    );
  }

  return (
    <div className="relative h-dvh w-screen overflow-x-hidden">
      <div
        id="image-frame"
        className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75"
      >
        <div>
