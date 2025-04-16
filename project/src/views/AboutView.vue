<template>
  <div class="container">
    <button @click="show = !show" class="toggle-btn">
      {{ show ? '收起' : '展开' }}
    </button>
    
    <transition name="diagonal-slide">
      <div 
        v-if="show" 
        class="animated-box"
        :style="dynamicStyles"
      >
        Vue Diagonal Transition
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      dynamicStyles: {
        '--gradient-start': '#6e8efb',
        '--gradient-end': '#a777e3',
        '--anim-duration': '0.4s'
      }
    }
  }
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 2rem;
}

.toggle-btn {
  /* 保持原有按钮样式 */
}

.diagonal-slide-enter-active,
.diagonal-slide-leave-active {
  transition: 
    opacity var(--anim-duration) ease-in-out,
    transform var(--anim-duration) cubic-bezier(0.68, -0.55, 0.27, 1.55);
  transform-origin: right bottom;
  will-change: transform, opacity;
}

/* 进入动画起始状态 */
.diagonal-slide-leave-to,
.diagonal-slide-enter-from {
  opacity: 0;
  transform: 
    translate(30%, 30%)
    scale(0)
    perspective(600px)
    rotateX(25deg)
    rotateY(-25deg);
}

/* 离开动画结束状态
.diagonal-slide-leave-to {
  opacity: 0;
  transform: 
    translate(30%, 30%)
    scale(0)
    perspective(600px)
    rotateX(45deg)
    rotateY(-45deg);
} */

/* 添加活动状态优化中间动画 */
.diagonal-slide-enter-to,
.diagonal-slide-leave-from {
  opacity: 1;
  transform: 
    translate(0)
    scale(1)
    perspective(600px)
    rotateX(0)
    rotateY(0);
}

.animated-box {
  width: 240px;
  height: 120px;
  background: linear-gradient(
    135deg,
    var(--gradient-start),
    var(--gradient-end)
  );
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  position: relative;
  overflow: hidden;
}

/* 双向遮罩动画 */
.animated-box::after {
  content: '';
  position: absolute;
  width: 200%;
  height: 200%;
  background: linear-gradient(
    135deg,
    rgba(255,255,255,0.4) 0%,
    rgba(255,255,255,0) 50%
  );
  animation: 
    maskIn var(--anim-duration) ease-out forwards,
    maskOut var(--anim-duration) ease-in forwards;
  animation-direction: normal;
}

@keyframes maskIn {
  from {
    transform: translate(50%, 50%);
    opacity: 0;
  }
  to {
    transform: translate(-50%, -50%);
    opacity: 1;
  }
}

@keyframes maskOut {
  from {
    transform: translate(-50%, -50%);
    opacity: 1;
  }
  to {
    transform: translate(50%, 50%);
    opacity: 0;
  }
}

/* 反向动画控制 */
.diagonal-slide-leave-active .animated-box::after {
  animation-name: maskOut;
}

.diagonal-slide-enter-active .animated-box::after {
  animation-name: maskIn;
}
</style>