"use client";

import { motion } from "framer-motion";
import Image from "next/image";

type Props = {
  onClick: () => void;
};

export default function ProfileCircle({ onClick }: Props) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="cursor-pointer"
    >
      <div className="w-52 h-52 rounded-full border-4 border-green-400 overflow-hidden shadow-[0_0_25px_#FFD700] hover:shadow-[0_0_50px_#FFD700] transition-all duration-300">
        <Image
          src="/images/profile.png"
          alt="Profile"
          width={208}
          height={208}
          className="object-cover w-full h-full"
          priority
        />
      </div>
    </motion.div>
  );
}