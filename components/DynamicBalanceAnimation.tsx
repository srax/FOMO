import { useEffect, useRef, useState } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

interface DynamicBalanceAnimationProps {
  balance: number;
  previousBalance: number;
  isLoading: boolean;
}

export function DynamicBalanceAnimation({ balance, previousBalance, isLoading }: DynamicBalanceAnimationProps) {
  const lottieRef = useRef<any>(null);
  const [direction, setDirection] = useState(1);
  const [speed, setSpeed] = useState(1);

  useEffect(() => {
    if (!isLoading && lottieRef.current) {
      // Determine direction based on balance change
      if (balance > previousBalance) {
        setDirection(1); // Forward for increase
        setSpeed(1.5); // Faster for increase
      } else if (balance < previousBalance) {
        setDirection(-1); // Reverse for decrease
        setSpeed(1); // Normal speed for decrease
      } else {
        setDirection(1); // Forward for no change
        setSpeed(0.5); // Slower for no change
      }

      // Apply the changes to the animation
      const lottieInstance = lottieRef.current;
      if (lottieInstance) {
        lottieInstance.setDirection(direction);
        lottieInstance.setSpeed(speed);
      }
    }
  }, [balance, previousBalance, isLoading, direction, speed]);

  return (
    <div className="w-12 h-12">
      <DotLottieReact
        ref={lottieRef}
        src="https://lottie.host/a935ac72-460e-44de-a94f-d1c52e99f906/qbyqWCO6P1.json"
        loop
        autoplay
        className="w-full h-full"
      />
    </div>
  );
} 