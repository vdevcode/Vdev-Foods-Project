import React from "react";
import WheelComponent from "react-wheel-of-prizes";

const SpinningWheel = () => {
  const segments = [
    "better luck next time",
    "won 70",
    "won 10",
    "better luck next time",
    "won 2",
    "won uber pass",
  ];
  const segColors = ["#EE4040", "#F0CF50", "#815CD1", "#3DA5E0", "#34A24F"];
  const onFinished = (winner) => {
    console.log(winner);
  };
  return (
    <div id="wheelCircle" className="h-screen w-full flex items-center mx-auto my-4">
        
      <WheelComponent
        segments={segments}
        segColors={segColors}
        winningSegment=""
        onFinished={(winner) => onFinished(winner)}
        primaryColor="black"
        primaryColoraround="#ffffffb4"
        contrastColor="white"
        buttonText="Spin"
        isOnlyOnce={false}
        size={190}
        upDuration={50}
        downDuration={2000}
      />
    </div>
  );
};

export default SpinningWheel;
