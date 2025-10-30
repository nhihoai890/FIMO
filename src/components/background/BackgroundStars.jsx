import { useState, useEffect, useMemo } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

export default function BackgroundStars() {
  const [init, setInit] = useState(false);

  // Khởi tạo engine 1 lần
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const options = useMemo(
  () => ({
    background: { color: "#000000" },
    fpsLimit: 60,
    particles: {
      number: { value: 400, density: { enable: true, area: 2000 } },
      color: { value: ["#ffffff", "#ffcc00", "#ff66cc", "#66ccff", "#99ff99"] },
      shape: { type: "circle" },
      opacity: { value: 0.8, random: true },
      size: { value: { min: 0.5, max: 2 } },
      move: {
        enable: true,
        speed: 0.3,
        direction: "none",
        outModes: "out",
        angle: { offset: 0, value: 360 },
        trail: { enable: false },
      },
    },
    interactivity: {
      events: {
        onHover: { enable: true, mode: "repulse" },
        onClick: { enable: true, mode: "push" },
      },
      modes: {
        repulse: { distance: 100, duration: 0.4 },
        push: { quantity: 3 },
      },
    },
    detectRetina: true,
  }),
  []
);

  if (!init) return null; 

  return <Particles id="tsparticles" options={options} />;
}
