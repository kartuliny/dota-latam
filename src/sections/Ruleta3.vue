<template>
    <div class="slider-container">
      <!-- Carrusel de imágenes con puntero en el centro -->
      <div class="slider-wrapper">
        <div class="slider" :style="{ transform: `translateX(${sliderPosition}px)` }">
          <div
            v-for="(image, index) in extendedImages"
            :key="index"
            class="slider-item"
          >
            <img :src="image.url" :alt="image.name" class="slider-image" />
          </div>
        </div>
      </div>
  
      <!-- Puntero en el centro -->
      <div class="pointer">🎯</div>
  
      <!-- Botón para iniciar la selección -->
      <button @click="startSelection">Seleccionar Imagen Aleatoria</button>
  
      <!-- Mostrar la imagen seleccionada -->
      <div v-if="selectedImage" class="selected-image">
        <p>¡Has seleccionado: {{ selectedImage.name }}!</p>
        <img :src="selectedImage.url" :alt="selectedImage.name" />
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  
  // Lista de imágenes
  const images = [
    { name: 'Imagen 1', url: 'src/assets/images/anime-profile.webp' },
    { name: 'Imagen 2', url: 'src/assets/images/dota-1.webp' },
    { name: 'Imagen 3', url: 'src/assets/images/lich.webp' },
    { name: 'Imagen 4', url: 'src/assets/images/heraldo.webp' },
    { name: 'Imagen 5', url: 'src/assets/images/inmortal.webp' },
    { name: 'Imagen 6', url: 'src/assets/images/logo_final.webp' },
    { name: 'Imagen 7', url: 'src/assets/images/marco.webp' },
  ];
  
  // Replicamos las imágenes tantas veces como sea necesario para crear un efecto de carrusel continuo
  const extendedImages = [...images, ...images, ...images, ...images, ...images]; // Duplicamos las imágenes varias veces
  
  // Estado de la selección
  const selectedImage = ref<{ name: string; url: string } | null>(null);
  
  // Control de la posición del slider
  const sliderPosition = ref(0);
  
  // Función para iniciar la selección aleatoria
  const startSelection = () => {
    const totalItems = extendedImages.length; // Total de imágenes duplicadas
    const totalDistance = 150 * images.length + 10 * (images.length - 1); // Ancho total del slider (con márgenes)
    const randomIndex = Math.floor(Math.random() * images.length); // Selección aleatoria del ganador
    const winningPosition = randomIndex * 160; // Posición de la imagen ganadora
  
    // Variables para la animación
    let currentPosition = 0;
    let speed = 10; // Velocidad inicial de la rotación (rápida)
    const rotations = 5; // Cuántas vueltas queremos hacer (al menos 4-5)
    const totalRotation = rotations * totalDistance; // Distancia total a recorrer
    const decelerationFactor = 0.98; // Factor de desaceleración
  
    // Función que mueve el slider
    const moveSlider = () => {
      currentPosition += speed;
  
      // Si hemos recorrido la distancia total, volvemos al inicio
      if (currentPosition >= totalRotation) {
        currentPosition = 0; // Reiniciar la posición
      }
  
      // Calculamos la desaceleración
      if (currentPosition > totalRotation - 500) {
        // Desaceleramos gradualmente cuando estamos cerca del final
        speed = Math.max(1, speed * decelerationFactor); // Evitamos que la velocidad sea 0
      }
  
      sliderPosition.value = -currentPosition; // Actualizamos la posición
      animationFrameId = requestAnimationFrame(moveSlider); // Solicitar el siguiente cuadro de animación
    };
  
    // Iniciamos la animación usando requestAnimationFrame
    let animationFrameId = requestAnimationFrame(moveSlider);
  };
  </script>
  
  <style scoped>
  /* Estilos generales */
  .slider-container {
    position: relative;
    width: 500px;
    height: 250px;
    margin: 0 auto;
    overflow: hidden;
  }
  
  .slider-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .slider {
    display: flex;
    transition-timing-function: ease-out;
  }
  
  .slider-item {
    position: relative;
    width: 150px;
    height: 150px;
    flex-shrink: 0;
    margin-right: 10px; /* Espacio entre las imágenes */
  }
  
  .slider-image {
    width: 100%;
    height: 100%;
    border-radius: 10px;
    object-fit: cover;
  }
  
  /* Puntero en el centro */
  .pointer {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 24px;
    color: #ffcc00;
    pointer-events: none;
  }
  
  /* Estilo para la imagen seleccionada */
  .selected-image {
    margin-top: 20px;
    text-align: center;
  }
  
  .selected-image img {
    max-width: 100%;
    max-height: 200px;
    border-radius: 10px;
  }
  </style>
  