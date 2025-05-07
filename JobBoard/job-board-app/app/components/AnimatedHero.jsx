'use client';

import { motion, useAnimationControls } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function AnimatedHero() {
  const [isVisible, setIsVisible] = useState(false);
  const controls = useAnimationControls();

  useEffect(() => {
    setIsVisible(true);

    // Animate the background with Framer Motion
    controls.start({
      backgroundPosition: ['0% 0%', '100% 100%'],
      transition: {
        duration: 15,
        ease: "linear",
        repeat: Infinity,
        repeatType: "reverse"
      }
    });
  }, [controls]);

  // Text animation properties with extra spacing
  const titleWords = "Find Your Dream Job".split(" ");
  const subtitleWords = "Discover opportunities that match your skills and career goals".split(" ");

  return (
    <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 dark:from-blue-800 dark:via-indigo-800 dark:to-purple-900 overflow-hidden relative">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-3xl transform translate-x-1/4 -translate-y-1/4"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-tr from-white/10 to-transparent rounded-full blur-3xl transform -translate-x-1/4 translate-y-1/4"></div>
        <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="grid" width="8" height="8" patternUnits="userSpaceOnUse">
              <path d="M0,0 L8,0 L8,8 L0,8 Z" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
            </pattern>
          </defs>
          <path d="M0,0 L100,0 L100,100 L0,100 Z" fill="url(#grid)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative">
        {/* Background animated elements */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white/10"
              style={{
                width: `${Math.random() * 12 + 4}px`,
                height: `${Math.random() * 12 + 4}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `float ${Math.random() * 15 + 10}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 5}s`,
                opacity: Math.random() * 0.6 + 0.2
              }}
            />
          ))}
        </div>

        <div className="text-center relative z-10">
          {/* Animated badge */}
          <div
            className="inline-block mb-6 px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-sm text-blue-100 font-medium"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.5s ease, transform 0.5s ease',
              transitionDelay: '0.1s'
            }}
          >
            <span className="mr-1">✨</span> Professional Job Board
          </div>

          {/* Animated title with Framer Motion gradient background */}
          <h1 className="text-5xl sm:text-6xl font-bold mb-6 tracking-tight overflow-hidden relative">
            <span className="sr-only">Find Your Dream Job</span>

            {/* Animated background with Framer Motion */}
            <motion.div
              className="absolute inset-0 -z-10 rounded-xl opacity-80"
              style={{
                background: "linear-gradient(120deg, #4f46e5, #3b82f6, #0ea5e9, #06b6d4, #0ea5e9, #3b82f6, #4f46e5)",
                backgroundSize: "400% 400%"
              }}
              animate={controls}
            />

            {/* Text with glass effect */}
            <span aria-hidden="true" className="inline-block relative z-10">
              {titleWords.map((word, index) => (
                <motion.span
                  key={index}
                  className="inline-block text-white mix-blend-overlay"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1 + 0.2,
                    ease: [0.215, 0.61, 0.355, 1] // Cubic bezier for a nice spring effect
                  }}
                >
                  {word}<span className="inline-block" style={{ width: '0.4em' }}></span>
                </motion.span>
              ))}
            </span>
          </h1>

          {/* Animated subtitle with Framer Motion */}
          <div className="relative">
            <motion.div
              className="absolute left-1/2 -top-2 w-24 h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent transform -translate-x-1/2 rounded-full"
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 96 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            />
            <p className="text-xl md:text-2xl text-blue-100 max-w-2xl mx-auto font-light leading-relaxed">
              <span className="sr-only">Discover opportunities that match your skills and career goals</span>
              <span aria-hidden="true" className="inline-block">
                {subtitleWords.map((word, index) => (
                  <motion.span
                    key={index}
                    className="inline-block"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: (titleWords.length * 0.1) + (index * 0.05) + 0.3,
                      ease: [0.215, 0.61, 0.355, 1]
                    }}
                  >
                    {word}<span className="inline-block" style={{ width: '0.4em' }}></span>
                  </motion.span>
                ))}
              </span>
            </p>
            <motion.div
              className="absolute left-1/2 -bottom-2 w-24 h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent transform -translate-x-1/2 rounded-full"
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 96 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            />
          </div>

          {/* Scroll down button with Framer Motion */}
          <motion.div
            className="mt-10 flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: (titleWords.length * 0.1) + (subtitleWords.length * 0.05) + 0.5,
              ease: [0.215, 0.61, 0.355, 1]
            }}
          >
            <a
              href="#jobs-section"
              className="group flex flex-col items-center"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('jobs-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <motion.span
                className="px-8 py-3 bg-white/10 backdrop-blur-sm text-white font-medium rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300 flex items-center gap-2 mb-2"
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                }}
              >
                Scroll Down to See Jobs
                <motion.svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  animate={{ y: [0, 8, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </motion.svg>
              </motion.span>
              <motion.div
                className="h-8 w-0.5 bg-gradient-to-b from-white/40 to-transparent"
                whileHover={{ height: 48 }}
                transition={{ duration: 0.3 }}
              />
            </a>
          </motion.div>
        </div>
      </div>

      {/* Add keyframes for floating animation */}
      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0) translateX(0);
          }
          25% {
            transform: translateY(-15px) translateX(10px);
          }
          50% {
            transform: translateY(5px) translateX(15px);
          }
          75% {
            transform: translateY(10px) translateX(-5px);
          }
          100% {
            transform: translateY(0) translateX(0);
          }
        }
      `}</style>
    </div>
  );
}
