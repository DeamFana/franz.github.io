<!-- 带setup表示使用组合式Api -->
<script setup lang="ts">
import App from "../App.vue"
import background from "@/components/Background.vue";
import { ref, Transition } from 'vue'

let isDebuging = ref(false)
const showWelcome = ref(true)
const showLogin = ref(false)

</script>

<template>
  <main id="Login">
    <el-button style="position: absolute;right: 10px;top: 10px;z-index: 999;" @click="isDebuging = !isDebuging">点击调试</el-button>
    <background>
      <transition 
        name="welcome"
        @after-appear="showWelcome = false"
        @after-leave="showLogin = true"
        appear
      >
        <p v-if="showWelcome" class="welcome">欢迎</p>
      </transition>
      <transition name="loginArea">
        <!-- 或者 <div :class="['loginArea', isDebuging ? 'Debug' : '']"> -->
          <!-- 在Vue中 {{ }} 只能表示插值 -->
        <div v-show="showLogin" class="loginArea" :class="{ 'Debug': isDebuging }">
          <img class="avatar" src="../assets/avatar.jpg" alt="用户头像"/>
          <input></input>
        </div>
      </transition>
    </background>
  </main>
</template>

<style scoped>
#Login .loginArea{
  max-width: 800px;
  width: 100%;
  min-width: 500px;
  max-height: 400px;
  height: 100%;
  min-height: 300px;
  margin: auto;
  -webkit-mask-image: -webkit-linear-gradient(135deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%);
}

#Login .loginArea.Debug{
  border: 1px solid red;
  background-color: rgba(0, 0, 255, 0.3);
  background-color: -webkit-linear-gradient(135deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%);
}

#Login .avatar{
  width: 170px;
  height: 170px;
  margin: 20px auto;
  border: 6px solid white;
  display: block; /* 确保 img 是块级元素 */
  border-radius: 50%;
  overflow: hidden;
}

#Login input{
  max-width: 300px;
  width: 100%;
  margin: 40px auto;
  border: 2px solid rgba(0, 0, 0, 0.5);
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 10px;
  padding: 10px 10px;
  display: block; /* 确保 img 是块级元素 */
}

#Login .welcome{
  font-size: 3vw;
  position: absolute;
}

/* 进入动画（淡入+缓慢放大） */
.welcome-enter-active {
  transition: all 2s ease;
  transform-origin: center;
}
.welcome-enter-from {
  opacity: 0;
  transform: scale(0.5);
}


/* 离开动画（快速淡出+快速放大） */
.welcome-leave-active {
  transition: all 0.5s ease-in;
  transform-origin: center;
}

.welcome-leave-to {
  opacity: 0;
  transform: scale(1.5);
}

.loginArea-enter-active {
  transition: all 1s ease;
  transform-origin: center;
  animation: loginArea;
}
.loginArea-enter-from {
  opacity: 0;
  transform: scale(0.5);
}

@keyframes loginArea {
  0% {
    opacity: 0;
    transform: scale(0.5);
  }
  50% {
    background-image: linear-gradient(45deg, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0));
  }
}
</style>