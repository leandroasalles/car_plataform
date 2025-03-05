import { ThreeCircles } from "react-loader-spinner";

export function Loading() {
  return (
    <div className=" bg-black absolute opacity-80 z-50 w-full h-svh flex justify-center items-center">
      <ThreeCircles
        visible={true}
        height="70"
        width="70"
        color="#dc2626"
        ariaLabel="three-circles-loading"
      />
    </div>
  );
}
