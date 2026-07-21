"use client";

import Lottie from "lottie-react";
import animationData from "../../public/animations/lock_animation_1.json";

export default function LockAnimation() {
  return (
    <div className="w-52 h-52">
      <Lottie
        animationData={animationData}
        loop={false}
      />
    </div>
  );
}