<template>
    <div>
        <!-- Lista de imágenes con bordes brillantes durante la animación -->
        <div class="image-list">
            <div v-for="(image, index) in images" :key="index" class="image-item" :class="{
                'highlight': isAnimating && currentIndex === index,
                'selected': selectedImage && selectedImage.url === image.url
            }" @click="handleImageClick(image)">
                <img :src="image.url" :alt="image.name" />
            </div>
        </div>

        <div id="wrapper">
            <div v-for="index in 10" :key="index" class="circle1" :style="getCirclePosition(index)"></div>
            <div class="wrapper2">
                <div v-for="index in 3" :key="index" class="circle2" :style="getCircle2Position(index)"></div>
            </div>
        </div>

        <button @click="startSelection">Seleccionar Imagen Aleatoria</button>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// Definir las imágenes y sus probabilidades
const images = [
    { name: 'Imagen 1', url: 'src/assets/images/anime-profile.webp', weight: 0.02 },
    { name: 'Imagen 2', url: 'src/assets/images/dota-1.webp', weight: 0.02 },
    { name: 'Imagen 3', url: 'src/assets/images/lich.webp', weight: 0.9 },
    { name: 'Imagen 4', url: 'src/assets/images/heraldo.webp', weight: 0.02 },
    { name: 'Imagen 5', url: 'src/assets/images/inmortal.webp', weight: 0.02 },
    { name: 'Imagen 6', url: 'src/assets/images/logo_final.webp', weight: 0.01 },
    { name: 'Imagen 7', url: 'src/assets/images/marco.webp', weight: 0.01 },
];

// Refs para almacenar el estado
const selectedImage = ref<{ name: string; url: string } | null>(null);
const isAnimating = ref(false);
const currentIndex = ref<number | null>(null);

const totalOffset = 100 / 2;

const getCirclePosition = (index: number) => {
    const div = 360 / 10;
    const radius = 180;
    const angle = div * index;
    const radians = (angle * Math.PI) / 180;
    const x = radius * Math.cos(radians);
    const y = radius * Math.sin(radians);

    return {
        top: `${y + 50}px`,
        left: `${x + 50}px`,
    };
};

const getCircle2Position = (index: number) => {
    const div = 360 / 3;
    const radius = 70;
    const angle = div * index;
    const radians = (angle * Math.PI) / 180;
    const x = radius * Math.cos(radians);
    const y = radius * Math.sin(radians);

    return {
        top: `${y + totalOffset}px`,
        left: `${x + totalOffset}px`,
    };
};

// Función para seleccionar aleatoriamente una imagen basada en las probabilidades
const getRandomImage = () => {
    const totalWeight = images.reduce((acc, image) => acc + image.weight, 0);
    const randomNum = Math.random() * totalWeight;

    let cumulativeWeight = 0;
    for (let i = 0; i < images.length; i++) {
        cumulativeWeight += images[i].weight;
        if (randomNum < cumulativeWeight) {
            return i; // Retornamos el índice de la imagen seleccionada
        }
    }
    return images.length - 1; // Debería devolver algo en caso de error
};
const startSelection = async () => {
    // Seleccionar la imagen ganadora aleatoriamente antes de comenzar la animación
    const selectedIndex = getRandomImage();
    // selectedImage.value = images[selectedIndex];

    isAnimating.value = true;
    currentIndex.value = null; // Resetear el índice actual para comenzar la animación

    const totalFlashes = 25; // Número total de destellos
    let flashDuration = 20; // Duración inicial (muy rápida, en milisegundos)
    const maxDuration = 400; // Duración máxima (lenta al final)
    const accelerationFactor = 1.2; // Incremento progresivo de la duración

    // Durante la animación, se irá mostrando la imagen ganadora (seleccionada previamente)
    for (let i = 0; i < totalFlashes; i++) {
        // Seleccionar un índice aleatorio para cada destello
        currentIndex.value = Math.floor(Math.random() * images.length);

        // Esperar por la duración actual antes de continuar
        await new Promise((resolve) => setTimeout(resolve, flashDuration));

        // Incrementar la duración del siguiente destello (desacelerar)
        flashDuration = Math.min(flashDuration * accelerationFactor, maxDuration);
    }

    // Después de la animación, la imagen seleccionada ya está disponible en selectedImage
    selectedImage.value = images[selectedIndex];
    // Detener la animación
    isAnimating.value = false;
};
// Manejo de clic en una imagen (opcional, si deseas interactuar)
const handleImageClick = (image: { name: string; url: string }) => {
    console.log(`Has seleccionado ${image.name}`);
    selectedImage.value = image;
};
</script>

<style scoped>
/* Estilos generales */
.image-list {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    gap: 15px;
}

.image-item {
    position: relative;
    width: 200px;
    height: 150px;
    border: 5px solid transparent;
    transition: border 0.01s ease;
}

.image-item img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 10px;
}

/* Animación de borde brillante */
.highlight {
    border: 5px solid #ffcc00;
}

/* Estilo para la imagen seleccionada */
.selected {
    border: 5px solid #00ff00;
}

.circle-wrapper {
    position: relative;
    width: 180px;
    height: 180px;
    margin: 0 auto;
}

.circle {
    position: absolute;
    width: 120px;
    height: 120px;
    border-radius: 50%;
    background-color: #3498db;
}

.triangle-container {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 100%;
    transform-origin: center center;
    pointer-events: none;
    transform: translate(-50%, -50%) rotate(30deg);
}

.triangle-circle {
    position: absolute;
    width: 120px;
    height: 120px;
    border-radius: 50%;
    background-color: #e74c3c;
}










#wrapper {
    /* transform: rotate(120deg); */
    position: relative;
    width: 150px;
    height: 150px;
    border-radius: 50%;
    margin: 150px auto;
    /* background-color: yellow; */
    animation: rotateBackWrapper 30s linear infinite;
}

@keyframes rotateWrapper {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes rotateBackWrapper {
  from {
    transform: rotate(360deg);
  }
  to {
    transform: rotate(0deg);
  }
}

.circle1 {
    position: absolute;
    width: 100px;
    height: 100px;
    background-color: #3498db;
    border-radius: 50%;
    transform: translate(-25%, -25%);
}

.circle2 {
    position: absolute;
    width: 100px;
    height: 100px;
    background-color: red;
    border-radius: 50%;
    transform: translate(-25%, -25%);
}

.wrapper2 {
    transform: rotate(90deg);
    /* top: -150px; */
    position: relative;
    width: 150px;
    height: 150px;
    border-radius: 50%;
    /* margin: 150px auto; */
    /* background-color: orange; */
    animation: rotateWrapper 15s linear infinite;
}
</style>
