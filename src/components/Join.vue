<template>
    <div class="signup">
      <h2>회원가입</h2>
      <form @submit.prevent="handleSignup">
        <div>
          <label>이메일</label>
          <input v-model="email" type="email" required />
        </div>
        <div>
          <label>비밀번호</label>
          <input v-model="password" type="password" required />
        </div>
        <div>
          <label>닉네임</label>
          <input v-model="nickname" type="text" required />
        </div>
        <button type="submit">회원가입</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import axios from 'axios'
  
  const email = ref('')
  const password = ref('')
  const nickname = ref('')

  // const API_URL = import.meta.env.VITE_API_URL
  
  const handleSignup = async () => {
    try {
      await axios.post(`/api/signup`, {
        email: email.value,
        password: password.value,
        nickname: nickname.value,
      })
      alert('회원가입 성공!')
    } catch (error) {
      console.error(error)
      alert('회원가입 실패')
    }
  }
  </script>
  
  <style scoped>
  /* 간단한 스타일 */
  .signup {
    width: 300px;
    margin: 100px auto;
  }
  .signup div {
    margin-bottom: 10px;
  }
  </style>
  