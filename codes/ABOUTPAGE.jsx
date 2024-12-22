"use client";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";


const AboutPage = () => {
  // Add reduced motion hook for accessibility
  const prefersReducedMotion = useReducedMotion();

  const skillRef = useRef();
  const isSkillRefInView = useInView(skillRef, { margin: "-100px", once: true });

  const experienceRef = useRef();
  const isExperienceRefInView = useInView(experienceRef, { margin: "-100px", once: true });

  // Optimize animations by using CSS transform instead of y property
  const bounceAnimation = prefersReducedMotion ? {} : {
    initial: { transform: "translateY(0)" },
    animate: {
      transform: ["translateY(-10px)", "translateY(0px)"],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }
    }
  };

  // Combine transforms for better performance
  const floatAnimation = prefersReducedMotion ? {} : {
    initial: { transform: "translateY(0) rotate(0deg)" },
    animate: {
      transform: ["translateY(-5px) rotate(-5deg)", "translateY(5px) rotate(5deg)"],
      transition: {
        duration: 3,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }
    }
  };

  // Reusable fade-in animation
  const fadeInAnimation = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.5 }
  };

  // Optimize skill animations with layout animations
  const skillItemAnimation = (index) => ({
    initial: { opacity: 0, scale: 0.8 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: {
        delay: index * 0.1,
        duration: 0.3,
        ease: "easeOut"
      }
    },
    whileHover: {
      scale: 1.1,
      backgroundColor: "#FDF2F8",
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    }
  });

  // Optimize experience card animations
  const experienceCardAnimation = (index) => ({
    initial: {
      opacity: 0,
      x: index % 2 === 0 ? -50 : 50
    },
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        delay: index * 0.15,
        duration: 0.4,
        ease: "easeOut"
      }
    }
  });

  return (
    <motion.div
      className="h-screen bg-gradient-to-br from-zinc-800  to-black overflow-y-auto"
      {...fadeInAnimation}
    >
      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col gap-8 items-center mb-16">
            <motion.div {...bounceAnimation} className="flex items-center gap-2">

              <h1 className="font-bold text-4xl text-pink-300">About Me</h1>

            </motion.div>

            <motion.div
              className="relative bg-white rounded-3xl shadow-lg shadow-purple-400  p-6 border-2 border-pink-200"
              whileHover={{
                scale: 1.02,
                transition: { duration: 0.2 }
              }}
            >
              <div className="bg-pink-50 absolute inset-0 rounded-3xl -z-10 transform rotate-1" />
              <p className="text-gray-700 text-xl text-center leading-relaxed">
                Hi! I'm Shinzo, a full-stack web developer who loves creating cute and functional websites! ✨
              </p>
            </motion.div>

            <motion.div
              className="relative bg-white rounded-3xl p-6 shadow-lg shadow-purple-400 border-2 border-pink-200"
              whileHover={{
                scale: 1.02,
                transition: { duration: 0.2 }
              }}
            >
              <div className="bg-pink-50 absolute inset-0 rounded-3xl -z-10 transform -rotate-1" />
              <p className="text-gray-700 text-xl text-center leading-relaxed">
                When I'm not coding, I'm gaming and learning new programming tricks! 🎮
              </p>
            </motion.div>

            <div ref={skillRef} className="w-full mt-16">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={isSkillRefInView ? { scale: 1, opacity: 1 } : {}}
                transition={{ duration: 0.4 }}
                className="flex items-center justify-center gap-2 mb-8"
              >
                <h2 className="font-bold text-3xl text-pink-300">My Skills</h2>
              </motion.div>

              <motion.div
                className="flex flex-wrap gap-3 justify-center"
                initial="initial"
                animate={isSkillRefInView ? "animate" : "initial"}
              >
                {['JavaScript', 'React.js', 'Next.js', 'Tailwind CSS', 'Node.js', 'PostgreSQL', 'Auth', 'Framer-Motion'].map((skill, index) => (
                  <motion.div
                    key={skill}
                    className="bg-white px-4 py-2 shadow-purple-400 rounded-full shadow-md border-2 border-pink-200 cursor-pointer"
                    {...skillItemAnimation(index)}
                  >
                    <span className="text-black font-medium">{skill}</span>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            <div ref={experienceRef} className="w-full mt-16">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={isExperienceRefInView ? { scale: 1, opacity: 1 } : {}}
                transition={{ duration: 0.4 }}
                className="flex items-center justify-center gap-2 mb-8"
              >
                <h2 className="font-bold text-3xl text-pink-300">Experience</h2>
              </motion.div>

              <div className="space-y-8">
                {[
                  {
                    title: "Full-Stack Web Developer",
                    company: "Aniflowinteractive",
                    period: "2024 - Present",
                    description: "Created a static website for an indie studio ✨"
                  },
                  {
                    title: "Unreal Engine Developer",
                    company: "Freelancer",
                    period: "2023 - 2024",
                    description: "Worked on backend systems in Unreal Engine 🎮"
                  },
                  {
                    title: "IT Solutions Freelancer",
                    company: "Self-employed",
                    period: "2020 - 2022",
                    description: "Provided various IT solutions for clients 💻"
                  }
                ].map((exp, index) => (
                  <motion.div
                    key={exp.title}
                    {...experienceCardAnimation(index)}
                    className="bg-white rounded-2xl p-6 shadow-lg shadow-purple-400 border-2 border-pink-200 relative"
                  >
                    <div className="bg-pink-50 absolute inset-0 rounded-2xl -z-10 transform rotate-1" />
                    <h3 className="text-xl font-bold text-black mb-2">{exp.title}</h3>
                    <p className="text-purple-400 font-medium">{exp.company}</p>
                    <p className="text-gray-500 text-sm mb-2">{exp.period}</p>
                    <p className="text-gray-700">{exp.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AboutPage;