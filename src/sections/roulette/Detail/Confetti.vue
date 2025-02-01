<template>
    <div class="confetti-container">
        <div class="overlay"></div>
        <slot></slot>
        <canvas ref="confettiCanvas"></canvas>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const confettiCanvas = ref<HTMLCanvasElement | null>(null);
let ctx: CanvasRenderingContext2D | null = null;
let animationFrameId: number | null = null;

interface Particle {
    x: number;
    y: number;
    diameter: number;
    tilt: number;
    tiltAngle: number;
    tiltAngleIncrement: number;
    color: string;
    color2: string;
    velocityX: number;
    velocityY: number;
}

const particles: Particle[] = [];
const colors = [
    "rgba(30,144,255,", "rgba(107,142,35,", "rgba(255,215,0,", "rgba(255,192,203,",
    "rgba(106,90,205,", "rgba(173,216,230,", "rgba(238,130,238,", "rgba(152,251,152,",
    "rgba(70,130,180,", "rgba(244,164,96,", "rgba(210,105,30,", "rgba(220,20,60,"
];
const maxParticles = 150;
const speed = 2;
let isRunning = false;

// Crear partículas
const createParticle = (width: number, height: number): Particle => ({
    x: Math.random() * width,
    y: Math.random() * height - height,
    diameter: Math.random() * 10 + 5,
    tilt: Math.random() * 10 - 10,
    tiltAngle: Math.random() * Math.PI,
    tiltAngleIncrement: Math.random() * 0.07 + 0.05,
    color: colors[Math.floor(Math.random() * colors.length)] + "1)",
    color2: colors[Math.floor(Math.random() * colors.length)] + "1)",
    velocityX: Math.random() * 2 - 1,
    velocityY: Math.random() * 2 + speed,
});

// Dibujar partículas
const drawParticles = () => {
    if (!ctx || !confettiCanvas.value) return;

    ctx.clearRect(0, 0, confettiCanvas.value.width, confettiCanvas.value.height);

    particles.forEach((particle, index) => {
        ctx?.beginPath();
        ctx!.lineWidth = particle.diameter;

        const x = particle.x + particle.tilt;
        const y = particle.y + particle.tilt + particle.diameter / 2;

        const gradient = ctx?.createLinearGradient(particle.x, particle.y, x, y);
        gradient?.addColorStop(0, particle.color);
        gradient?.addColorStop(1, particle.color2);

        if (ctx && gradient) {
            ctx.strokeStyle = gradient;
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(x, y);
            ctx.stroke();
        }

        // Actualizar posición
        particle.tiltAngle += particle.tiltAngleIncrement;
        particle.x += particle.velocityX;
        particle.y += particle.velocityY;
        particle.tilt = Math.sin(particle.tiltAngle) * 15;

        // Reaparecer partículas si salen de la pantalla
        if (particle.x > confettiCanvas.value!.width || particle.x < -20 || particle.y > confettiCanvas.value!.height) {
            particles[index] = createParticle(confettiCanvas.value!.width, confettiCanvas.value!.height);
        }
    });
};

// Animar confetti
const animateConfetti = () => {
    drawParticles();
    animationFrameId = requestAnimationFrame(animateConfetti);
};

// Iniciar confetti
const startConfetti = () => {
    if (!confettiCanvas.value || isRunning) return;
    isRunning = true;

    const width = window.innerWidth;
    const height = window.innerHeight;

    confettiCanvas.value.width = width;
    confettiCanvas.value.height = height;

    for (let i = 0; i < maxParticles; i++) {
        particles.push(createParticle(width, height));
    }

    animateConfetti();
};

// Detener confetti

// Ciclo de vida del componente
onMounted(() => {
    if (confettiCanvas.value) {
        ctx = confettiCanvas.value.getContext("2d");
        startConfetti();

        window.addEventListener("resize", () => {
            if (confettiCanvas.value) {
                confettiCanvas.value.width = window.innerWidth;
                confettiCanvas.value.height = window.innerHeight;
            }
        });
    }
});

onUnmounted(() => {
    stopConfetti();
    window.removeEventListener("resize", () => { });
});

// Modificación en stopConfetti para manejar el caso cuando confettiCanvas ya no existe
const stopConfetti = () => {
    isRunning = false;

    // Solo proceder si confettiCanvas aún existe
    if (confettiCanvas.value) {
        if (animationFrameId) cancelAnimationFrame(animationFrameId);
        animationFrameId = null;

        if (ctx) ctx.clearRect(0, 0, confettiCanvas.value.width, confettiCanvas.value.height);
        particles.splice(0, particles.length);
    }
};

</script>

<style scoped>
.confetti-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.9); /* Fondo negro semitransparente */
  z-index: 1; /* Colocar detrás del canvas */
}

canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2; /* Canvas sobre el fondo */
}
</style>