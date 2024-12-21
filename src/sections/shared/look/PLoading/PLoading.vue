<template>
  <div>
    <div class="divLoadingTodoImage">
      <div>
        <div class="spinner">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
    <div class="divLoadingTodoOpacity"></div>
  </div>
</template>

<style scoped>
.divLoadingTodoOpacity {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  opacity: 0.8;
  background-color: #fff;
  z-index: 5000;
}
.divLoadingTodoImage {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 5001;
  display: flex;
  justify-content: center;
  align-items: center;
}
.spinner {
  position: relative;
  width: 34px;
  height: 34px;
  perspective: 68px;
}

.spinner div {
  width: 100%;
  height: 100%;
  background: #ffd147;
  position: absolute;
  left: 50%;
  transform-origin: left;
  animation: spinner-16s03x 2s infinite;
}

.spinner div:nth-child(1) {
  animation-delay: 0.15s;
}

.spinner div:nth-child(2) {
  animation-delay: 0.3s;
}

.spinner div:nth-child(3) {
  animation-delay: 0.45s;
}

.spinner div:nth-child(4) {
  animation-delay: 0.6s;
}

.spinner div:nth-child(5) {
  animation-delay: 0.75s;
}

@keyframes spinner-16s03x {
  0% {
    transform: rotateY(0deg);
  }

  50%,
  80% {
    transform: rotateY(-180deg);
  }

  90%,
  100% {
    opacity: 0;
    transform: rotateY(-180deg);
  }
}
</style>
