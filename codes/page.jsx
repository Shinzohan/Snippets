"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Heart, Star, Sparkles } from "lucide-react";

const AboutPage = () => {
  const skillRef = useRef();
  const isSkillRefInView = useInView(skillRef, { margin: "-100px", once: true });

  const experienceRef = useRef();
  const isExperienceRefInView = useInView(experienceRef, { margin: "-100px", once: true });

  const bounceAnimation = {
    initial: { y: 0 },
    animate: { 
      y: [-10, 0],
      transition: {
        duration: 1,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }
    }
  };

  const floatAnimation = {
    initial: { y: 0, rotate: 0 },
    animate: {
      y: [-5, 5],
      rotate: [-5, 5],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.div
      className="h-screen bg-gradient-to-b from-zinc-200 to-pink-100 overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* BIOGRAPHY SECTION */}
          <div className="flex flex-col gap-8 items-center mb-16">
            <motion.div {...bounceAnimation} className="flex items-center gap-2">
              <Heart className="text-pink-400 w-8 h-8" />
              <h1 className="font-bold text-4xl text-pink-500">About Me</h1>
              <Heart className="text-pink-400 w-8 h-8" />
            </motion.div>

            <motion.div
              className="relative bg-white rounded-3xl p-6 shadow-lg border-2 border-pink-200"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="bg-pink-50 absolute inset-0 rounded-3xl -z-10 transform rotate-1" />
              <p className="text-gray-700 text-xl text-center leading-relaxed">
                Hi! I'm Shinzo, a full-stack web developer who loves creating cute and functional websites! ✨
              </p>
            </motion.div>

            <motion.div
              className="relative bg-white rounded-3xl p-6 shadow-lg border-2 border-pink-200"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="bg-pink-50 absolute inset-0 rounded-3xl -z-10 transform -rotate-1" />
              <p className="text-gray-700 text-xl text-center leading-relaxed">
                When I'm not coding, I'm gaming and learning new programming tricks! 🎮
              </p>
            </motion.div>

            {/* SKILLS SECTION */}
            <div ref={skillRef} className="w-full mt-16">
              <motion.div
                initial={{ scale: 0 }}
                animate={isSkillRefInView ? { scale: 1 } : {}}
                transition={{ type: "spring", stiffness: 200 }}
                className="flex items-center justify-center gap-2 mb-8"
              >
                <Star className="text-yellow-400 w-8 h-8" />
                <h2 className="font-bold text-3xl text-pink-500">My Skills</h2>
                <Star className="text-yellow-400 w-8 h-8" />
              </motion.div>

              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={isSkillRefInView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.5, staggerChildren: 0.1 }}
                className="flex flex-wrap gap-3 justify-center"
              >
                {['JavaScript', 'React.js', 'Next.js', 'Tailwind CSS', 'Node.js', 'PostgreSQL', 'Auth', 'Framer-Motion'].map((skill, index) => (
                  <motion.div
                    key={skill}
                    className="bg-white px-4 py-2 rounded-full shadow-md border-2 border-pink-200 cursor-pointer"
                    whileHover={{ scale: 1.1, backgroundColor: "#FDF2F8" }}
                    {...floatAnimation}
                    transition={{ delay: index * 0 }}
                  >
                    <span className="text-pink-500 font-medium">{skill}</span>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* EXPERIENCE SECTION */}
            <div ref={experienceRef} className="w-full mt-16">
              <motion.div
                initial={{ scale: 0 }}
                animate={isExperienceRefInView ? { scale: 1 } : {}}
                transition={{ type: "spring", stiffness: 200 }}
                className="flex items-center justify-center gap-2 mb-8"
              >
                <Sparkles className="text-purple-400 w-8 h-8" />
                <h2 className="font-bold text-3xl text-pink-500">Experience</h2>
                <Sparkles className="text-purple-400 w-8 h-8" />
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
                    initial={{ x: index % 2 === 0 ? -100 : 100, opacity: 0 }}
                    animate={isExperienceRefInView ? { x: 0, opacity: 1 } : {}}
                    transition={{ delay: index * 0.2 }}
                    className="bg-white rounded-2xl p-6 shadow-lg border-2 border-pink-200 relative"
                  >
                    <div className="bg-pink-50 absolute inset-0 rounded-2xl -z-10 transform rotate-1" />
                    <h3 className="text-xl font-bold text-pink-500 mb-2">{exp.title}</h3>
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