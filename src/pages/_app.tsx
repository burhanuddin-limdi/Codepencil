import { useEffect } from "react";

function MyApp({ Component, pageProps }) {
  console.log("_app.tsx");

  useEffect(() => {
    function createRipple(event) {
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
    if (typeof window !== "undefined") {
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
    }
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
