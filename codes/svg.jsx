<div className="flex justify-center items-center mt-20">
<motion.svg
  initial={{ y: 0 }}
  animate={{ opacity: 1, y: "20px" }}
  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut"}}
  viewBox="0 0 48 48"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  width={100}
  height={100}
>
  {/* First arrow */}
  <path
    d="M24 18 L30 6 L24 12 L18 6 L24 18"
    stroke="#000000"
    strokeWidth="1"
    fill="yellow"
  />

  {/* Second arrow */}
  <path
    d="M24 42 L30 30 L24 36 L18 30 L24 42"
    stroke="#000000"
    strokeWidth="1"
    fill="yellow"
  />
</motion.svg>
</div>