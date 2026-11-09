"use client";

import { AnimatePresence, motion } from "framer-motion";

// Підказка під полем форми, коли значення хибне. Плавно з'являється і зникає
const FieldError = ({ id, message }: { id: string; message: string | null }) => (
  <AnimatePresence initial={false}>
    {message && (
      <motion.p
        key={message}
        id={id}
        role="alert"
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.2 }}
        className="overflow-hidden pl-1 pt-1.5 text-[12px] leading-snug text-[#fda4af]"
      >
        {message}
      </motion.p>
    )}
  </AnimatePresence>
);

export default FieldError;
