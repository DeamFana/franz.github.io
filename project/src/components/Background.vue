<template>
  <div class="dynamic-background">
    <!-- 背景渐变层 -->
    <div class="bg-layer"></div>
    <!-- 模糊遮罩层 -->
    <div class="blur-overlay"></div>
    <!-- 内容插槽 -->
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
// 可以在这里添加props控制颜色或动画参数
</script>

<style scoped>
.dynamic-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: #93e4e0;
}

.bg-layer {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background-image: 
    radial-gradient(closest-side at 50% 50%, rgb(181, 249, 142), rgba(235, 105, 78, 0)),
    radial-gradient(closest-side at 50% 50%, rgb(168, 251, 252), rgba(243, 11, 164, 0)),
    radial-gradient(closest-side at 50% 50%, rgb(248, 238, 122), rgba(254, 234, 131, 0)),
    radial-gradient(closest-side at 50% 50%, rgb(220, 255, 233), rgba(170, 142, 245, 0)),
    radial-gradient(closest-side at 50% 50%, rgb(156, 248, 147), rgba(248, 192, 147, 0)),
    radial-gradient(closest-side at 50% 50%, rgb(181, 227, 138), rgba(138, 211, 227, 0)),
    radial-gradient(closest-side at 50% 50%, rgb(255, 243, 163), rgba(255, 152, 167, 0)),
    radial-gradient(closest-side at 50% 50%, rgb(187, 202, 243), rgba(199, 152, 245, 0));
  background-size: 
    150vmax 150vmax,
    100vmax 100vmax,
    120vmax 120vmax,
    140vmax 140vmax,
    110vmax 110vmax,
    130vmax 130vmax,
    90vmax 90vmax,
    160vmax 160vmax;
  background-position:
    -20% -20%,
    120% 30%,
    30% 80%,
    -10% 110%,
    90% 60%,
    50% 50%,
    10% 90%,
    80% 10%;
  animation: gradient-move 30s linear infinite;
  opacity: 0.9;
}

.blur-overlay {
  position: absolute;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
}

.content {
  position: relative;
  z-index: 1;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

@keyframes gradient-move {
  0%, 100% {
    background-position:
      -20% -20%,
      120% 30%,
      30% 80%,
      -10% 110%,
      90% 60%,
      50% 50%,
      10% 90%,
      80% 10%;
  }
  12.5% {
    background-position:
      10% 40%,
      90% -20%,
      50% 120%,
      30% 80%,
      60% 30%,
      20% 70%,
      40% 20%,
      100% 50%;
  }
  25% {
    background-position:
      40% -10%,
      70% 90%,
      -20% 60%,
      50% 40%,
      110% 80%,
      80% 30%,
      60% 100%,
      30% 70%;
  }
  37.5% {
    background-position:
      -30% 60%,
      110% 20%,
      80% -30%,
      20% 90%,
      40% 110%,
      100% 60%,
      20% 40%,
      70% 100%;
  }
  50% {
    background-position:
      20% 100%,
      40% 50%,
      100% 40%,
      70% 10%,
      -10% 30%,
      30% 90%,
      90% 50%,
      50% 20%;
  }
  62.5% {
    background-position:
      70% 30%,
      -10% 70%,
      50% 100%,
      110% 60%,
      30% 90%,
      60% 20%,
      10% 60%,
      90% 30%;
  }
  75% {
    background-position:
      100% 50%,
      30% 10%,
      70% 30%,
      20% 120%,
      50% 50%,
      40% 110%,
      80% 80%,
      10% 40%;
  }
  87.5% {
    background-position:
      50% 20%,
      80% 80%,
      120% 50%,
      40% 30%,
      70% 10%,
      90% 50%,
      30% 20%,
      60% 90%;
  }
}

/* 响应式调整 */
@media (max-width: 768px) {
  .bg-layer {
    animation-duration: 35s;
  }
  
  .blur-overlay {
    backdrop-filter: blur(8px);
  }
}
</style>