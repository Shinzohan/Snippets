"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { Heart, Send, Sparkles, AlertCircle, Loader2, Mail, Stars, MessageCircle } from "lucide-react";

const ContactPage = () => {
  const [status, setStatus] = useState("idle");
  const [isHovered, setIsHovered] = useState(false);
  const form = useRef();

  const BUTTON_STATES = {
    loading: {
      content: (
        <>
          <Loader2 className="w-5 h-5 animate-spin" />
          Sending...
        </>
      ),
      styles: "bg-purple-400 cursor-wait",
    },
    success: {
      content: (
        <>
          <Heart className="w-5 h-5 text-pink-200" />
          Sent Successfully!
        </>
      ),
      styles: "bg-green-500 hover:bg-green-600",
    },
    error: {
      content: (
        <>
          <AlertCircle className="w-5 h-5" />
          Try Again
        </>
      ),
      styles: "bg-red-500 hover:bg-red-600",
    },
    idle: {
      content: (
        <>
          Send Message
          <motion.div
            animate={isHovered ? { x: [0, 4, 0] } : {}}
            transition={{ repeat: Infinity, duration: 1 }}
          >
            <Send className="w-5 h-5" />
          </motion.div>
        </>
      ),
      styles: "bg-purple-600 hover:bg-purple-700",
    },
  };

  const sendEmail = (e) => {
    e.preventDefault();

    const message = form.current.user_message.value.trim();
    const email = form.current.user_email.value.trim();

    if (!message || !email) {
      setStatus("error");
      return;
    }

    setStatus("loading");

    emailjs
      .sendForm(
        process.env.NEXT_PUBLIC_SERVICE_ID,
        process.env.NEXT_PUBLIC_TEMPLATE_ID,
        form.current,
        process.env.NEXT_PUBLIC_PUBLIC_KEY
      )
      .then(
        () => {
          setStatus("success");
          form.current.reset();
          setTimeout(() => setStatus("idle"), 2000);
        },
        () => {
          setStatus("error");
          setTimeout(() => setStatus("idle"), 2000);
        }
      );
  };

  const floatingAnimation = {
    y: [-10, 10],
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut",
    },
  };

  const buttonContent = BUTTON_STATES[status].content;
  const buttonStyles = `group relative text-white rounded-2xl px-8 py-4 font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${BUTTON_STATES[status].styles}`;

  return (
    <motion.div
      className="h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-purple-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="h-full flex flex-col lg:flex-row px-4 sm:px-8 md:px-12 lg:px-20 xl:px-48 py-12">
        {/* GREETING CONTAINER */}
        <div className="h-1/2 lg:h-full lg:w-1/2 flex flex-col items-center justify-center relative">
          <motion.div
            className="absolute top-10 right-10"
            animate={floatingAnimation}
          >
            <Stars className="w-8 h-8 text-purple-400" />
          </motion.div>
          <motion.div
            className="absolute bottom-20 left-10"
            animate={floatingAnimation}
          >
            <Mail className="w-6 h-6 text-pink-400" />
          </motion.div>
          <motion.div
            className="absolute top-32 left-20"
            animate={floatingAnimation}
          >
            <MessageCircle className="w-6 h-6 text-purple-500" />
          </motion.div>

          <motion.div className="space-y-8 text-center relative">
            <motion.div
              className="relative inline-block"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 bg-clip-text text-transparent">
                Let's Connect
              </h1>
              <motion.div
                className="absolute -right-8 -top-8"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-12 h-12 text-yellow-400" />
              </motion.div>
            </motion.div>

            <motion.p className="text-xl md:text-2xl text-purple-600 max-w-md mx-auto leading-relaxed">
              Have an idea? Want to collaborate? Or just want to say hi? Drop me
              a message!
            </motion.p>
          </motion.div>
        </div>

        {/* FORM CONTAINER */}
        <motion.form
          onSubmit={sendEmail}
          ref={form}
          className="w-full lg:w-1/2 bg-white rounded-3xl text-lg flex flex-col gap-6 justify-center p-8 md:p-12 shadow-xl"
        >
          <textarea
            rows={6}
            className="bg-transparent border-2 border-purple-200 rounded-xl p-4 outline-none resize-none text-gray-700"
            name="user_message"
            placeholder="Write your message here..."
          />
          <input
            name="user_email"
            type="email"
            className="w-full bg-transparent border-2 border-purple-200 rounded-xl p-4 outline-none text-gray-700"
            placeholder="Your email address"
          />
          <button className={buttonStyles} disabled={status === "loading"}>
            {buttonContent}
          </button>
        </motion.form>
      </div>
    </motion.div>
  );
};

export default ContactPage;
