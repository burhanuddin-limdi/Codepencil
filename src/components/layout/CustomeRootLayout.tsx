"use client";
import { FunctionComponent, useEffect } from "react";

interface CustomRootLayoutProps {
  children: React.ReactNode;
}

const CustomRootLayout: FunctionComponent<CustomRootLayoutProps> = ({
  children,
}) => {
  useEffect(() => {
    function createRipple(event) {
      console.log(event);

      const button = event.currentTarget;

      const circle = document.createElement("span");
      const diameter = Math.max(button.clientWidth, button.clientHeight);
      const radius = diameter / 2;

      circle.style.width = circle.style.height = `${diameter}px`;
      circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
      circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
      circle.classList.add("ripple");

      const ripple = button.getElementsByClassName("ripple")[0];

      if (ripple) {
        ripple.remove();
      }

      button.appendChild(circle);
    }

    const buttons: any = document.getElementsByTagName("button");
    for (const button of buttons) {
      button.addEventListener("click", createRipple);
    }

    // Cleanup function to remove event listeners
    return () => {
      for (const button of buttons) {
        button.removeEventListener("click", createRipple);
      }
    };
  }, []);
  return <>{children}</>;
};

export default CustomRootLayout;
