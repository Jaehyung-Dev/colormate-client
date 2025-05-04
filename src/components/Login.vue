<template>
  <div class="login-bg">
    <div class="login-card">
      <div class="logo-container">
        <h1 class="site-title">Colormate</h1>
      </div>
      <h2 class="login-title">로그인</h2>
      <form @submit.prevent="handleLogin">
        <div class="input-group">
          <label>이메일</label>
          <input v-model="email" type="email" required />
        </div>
        <div class="input-group">
          <label>비밀번호</label>
          <input v-model="password" type="password" required />
        </div>
        <button type="submit" class="login-btn">로그인</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const email = ref('')
const password = ref('')

const handleLogin = async () => {
  try {
    await axios.post(`/api/user/login`, {
      email: email.value,
      password: password.value,
    })
    alert('로그인 성공!')
  } catch (error) {
    console.error(error)
    alert('로그인 실패')
  }
}
</script>

<style scoped>
.login-bg {
  min-height: 100vh;
  background: linear-gradient(135deg, #ffe0ec 0%, #e0f7fa 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  width: 100%;
  height: 100vh;
  margin: 0;
  position: fixed;
  top: 0;
  left: 0;
}
.login-card {
  background: #fffafc;
  border-radius: 24px;
  box-shadow: 0 4px 24px 0 rgba(180, 180, 255, 0.15);
  padding: 40px 32px 32px 32px;
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.logo-container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
}
.site-title {
  font-family: 'Montserrat', 'Pretendard', sans-serif;
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--main-color);
  margin-bottom: 4px;
  letter-spacing: 1px;
}
.login-title {
  font-size: 1.2rem;
  color: #5e5e5e;
  margin-bottom: 24px;
  font-weight: 500;
}
.input-group {
  width: 100%;
  margin-bottom: 18px;
  display: flex;
  flex-direction: column;
}
.input-group label {
  font-size: 0.95rem;
  color: var(--main-color);
  margin-bottom: 6px;
  font-weight: 500;
}
.input-group input {
  padding: 10px 12px;
  border: 1.5px solid #e0c3fc;
  border-radius: 8px;
  font-size: 1rem;
  background: #f7faff;
  transition: border 0.2s;
  color: gray;
}
.input-group input:focus {
  border: 1.5px solid var(--main-color);
  outline: none;
  background: #fff;
}
.login-btn {
  width: 100%;
  background: linear-gradient(90deg, var(--main-color) 0%, #62e0c6 100%);
  color: #fff;
  font-weight: 600;
  font-size: 1.1rem;
  border: none;
  border-radius: 8px;
  padding: 12px 0;
  margin-top: 8px;
  box-shadow: 0 2px 8px 0 rgba(162, 89, 230, 0.08);
  transition: background 0.5s, box-shadow 0.5s;
}
.login-btn:hover {
  background: linear-gradient(90deg, #62e0c6 0%, var(--main-color) 100%);
  box-shadow: 0 4px 16px 0 rgba(162, 89, 230, 0.15);
}
@media (min-width: 768px) {
  .login-card {
    padding: 50px 40px 40px 40px;
  }
  .site-title {
    font-size: 3rem;
  }
  .login-title {
    font-size: 1.4rem;
  }
  .input-group input {
    padding: 12px 14px;
  }
}
</style> 