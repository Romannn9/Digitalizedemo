import { useMemo } from "react";
import Particles, { ParticlesProvider } from "@tsparticles/react";
import type { Engine, ISourceOptions } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

async function initParticles(engine: Engine) {
  await loadSlim(engine);
}

export default function PageHeroBackground() {
  const options = useMemo<ISourceOptions>(() => ({
    fullScreen: { enable: false },
    fpsLimit: 60,
    detectRetina: true,
    background: { color: "transparent" },
    particles: {
      number: {
        value: 72,
        density: { enable: true, area: 720 },
      },
      color: {
        value: "#FFFFFF",
      },
      opacity: {
        value: { min: 0.36, max: 0.88 },
      },
      size: {
        value: { min: 1.8, max: 5.2 },
      },
      links: {
        enable: true,
        distance: 165,
        color: "#FFFFFF",
        opacity: 0.22,
        width: 1.15,
      },
      move: {
        enable: true,
        speed: 0.72,
        direction: "none",
        random: false,
        straight: false,
        outModes: { default: "bounce" },
      },
    },
    interactivity: {
      events: {
        onHover: { enable: true, mode: "grab" },
        onClick: { enable: false },
        resize: { enable: true },
      },
      modes: {
        grab: {
          distance: 170,
          links: { opacity: 0.46 },
        },
      },
    },
  }), []);

  const redOptions = useMemo<ISourceOptions>(() => ({
    fullScreen: { enable: false },
    fpsLimit: 60,
    detectRetina: true,
    background: { color: "transparent" },
    particles: {
      number: {
        value: 24,
        density: { enable: true, area: 760 },
      },
      color: {
        value: "#E31E24",
      },
      opacity: {
        value: { min: 0.55, max: 0.95 },
      },
      size: {
        value: { min: 3.2, max: 7.2 },
      },
      links: {
        enable: true,
        distance: 190,
        color: "#E31E24",
        opacity: 0.38,
        width: 1.35,
      },
      move: {
        enable: true,
        speed: 0.62,
        direction: "none",
        random: false,
        straight: false,
        outModes: { default: "bounce" },
      },
    },
    interactivity: {
      events: {
        onHover: { enable: true, mode: "grab" },
        onClick: { enable: false },
        resize: { enable: true },
      },
      modes: {
        grab: {
          distance: 190,
          links: { opacity: 0.58 },
        },
      },
    },
  }), []);

  return (
    <div className="pointer-events-none absolute inset-0 z-0 opacity-100" aria-hidden="true">
      <ParticlesProvider init={initParticles}>
        <Particles id="page-hero-particles" options={options} className="absolute inset-0 h-full w-full" />
        <Particles id="page-hero-red-particles" options={redOptions} className="absolute inset-0 h-full w-full" />
      </ParticlesProvider>
      <div className="absolute inset-0 bg-gradient-to-r from-brand-black via-brand-black/62 to-brand-black/10" />
    </div>
  );
}
