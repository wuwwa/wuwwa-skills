import { ShaderGradient, ShaderGradientCanvas } from "@shadergradient/react";
import { useEffect, useState } from "react";

export default function Gradient() {
  // First render is static; do not read browser state during rendering.
  const [animate, setAnimate] = useState(false);
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setAnimate(!preference.matches);
    update();
    preference.addEventListener("change", update);
    return () => preference.removeEventListener("change", update);
  }, []);
  return (
    <div aria-hidden="true" style={{ height: 280, background: "lavender" }}>
      <ShaderGradientCanvas style={{ height: "100%" }} pixelDensity={1}>
        <ShaderGradient
          control="props"
          animate={animate ? "on" : "off"}
          type="plane"
          grain="off"
          cDistance={3.6}
          cPolarAngle={90}
          color1="#b1b8df"
          color2="#e9d4df"
          color3="#d3e5dd"
        />
      </ShaderGradientCanvas>
    </div>
  );
}
