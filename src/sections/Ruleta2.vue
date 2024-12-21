<template>
    <div class="carousel-container">
      <!-- Carrusel 3D de imágenes con un puntero en el centro -->
      <div class="carousel">
        <div
          v-for="(image, index) in images"
          :key="index"
          class="carousel-item"
          :style="{
            transform: `rotateY(${index * (360 / images.length)}deg) translateZ(200px)`
          }"
        >
          <img :src="image.url" :alt="image.name" class="carousel-image" />
        </div>
      </div>
  
      <!-- Puntero en el centro -->
      <div class="pointer">↓</div>
  
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
  
  // Estado de la selección
  const selectedImage = ref<{ name: string; url: string } | null>(null);
  
  // Función para iniciar la selección aleatoria
  const startSelection = () => {
    // Número total de ciclos de rotación
    const rotationCycles = 3;
    const rotationDuration = 3000; // Duración total de la rotación (en milisegundos)
    const totalRotation = 360 * rotationCycles; // Ángulo total de rotación
  
    const randomIndex = Math.floor(Math.random() * images.length); // Selección aleatoria del ganador
    const winningAngle = randomIndex * (360 / images.length); // Ángulo del ganador
  
    // Iniciar la animación del carrusel en 3D
    document.querySelector('.carousel')?.classList.add('rotate');
  
    // Aplicar la rotación con el ángulo necesario para posicionar la imagen ganadora en el centro
    setTimeout(() => {
      document.querySelector('.carousel')?.setAttribute(
        'style',
        `transform: rotateY(-${totalRotation + winningAngle}deg); transition: transform ${rotationDuration}ms ease-out;`
      );
  
      // Establecer la imagen ganadora
      selectedImage.value = images[randomIndex];
  
      // Detener la animación después de que se seleccione la imagen ganadora
      setTimeout(() => {
        document.querySelector('.carousel')?.classList.remove('rotate');
      }, rotationDuration);
    }, 100); // El tiempo de espera de 100ms para evitar que el estilo de animación se aplique antes de rotar
  };
  </script>
  
  <style scoped>
  /* Estilos generales */
  .carousel-container {
    position: relative;
    width: 400px;
    height: 400px;
    margin: 0 auto;
    overflow: hidden;
    perspective: 1000px; /* Crear el efecto 3D */
  }
  
  .carousel {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    transform-style: preserve-3d; /* Importante para el 3D */
    transition: transform 3s ease-out;
  }
  
  .carousel-item {
    position: absolute;
    width: 150px;
    height: 150px;
    transform-origin: center center;
    transition: transform 1s ease-out;
  }
  
  .carousel-image {
    width: 100%;
    height: 100%;
    border-radius: 50%;
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
  
  /* Animación de rotación en 3D */
  .rotate {
    animation: rotate3D 3s ease-out forwards;
  }
  
  /* Keyframes para la animación de rotación 3D */
  @keyframes rotate3D {
    from {
      transform: rotateY(0deg);
    }
    to {
      transform: rotateY(1080deg); /* 3 ciclos completos de rotación */
    }
  }
  </style>
  