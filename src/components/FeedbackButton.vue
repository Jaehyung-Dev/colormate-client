<template>
  <button class="feedback-btn" @click="goToFeedback">
    <span class="feedback-text">피드백</span>
  </button>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goToFeedback = () => {
  router.push('/feedback')
}
</script>

<style scoped>
.feedback-btn {
  position: fixed;
  bottom: 2rem;
  right: 3rem;
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  background: linear-gradient(135deg, #a259e6 0%, #62e0c6 100%);
  border: none;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(162, 89, 230, 0.2);
  transition: all 0.5s ease;
  animation: float 2s ease-in-out infinite;
  z-index: 1000;
}

@keyframes float {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0px);
  }
}

.feedback-text {
  font-size: .8rem;
  font-weight: 600;
  color: white;
}
</style>