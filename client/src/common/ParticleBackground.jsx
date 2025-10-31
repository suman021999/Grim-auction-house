import { useEffect } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

export default function ParticleBackground() {
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    });
  }, []);

  return (
    <Particles
      id="tsparticles"
      className="absolute inset-0 z-0  pointer-events-none"
      options={{
        background: { color: "transparent" },
        particles: {
          number: { value: 160 },
          size: { value: 3 },
          move: { enable: true, speed: 1 },
          color: { value: "#5CE65C" },
          opacity: { value: 0.8 },
          links: { enable: true, distance: 170, opacity: 0.8 },
        },
        interactivity: {
          events: { onHover: { enable: true, mode: "grab" } },
          modes: { grab: { distance: 250, links: { opacity: 0.8 } } },
        },
        detectRetina: true,
      }}
    />
  );
}

