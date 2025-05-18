<template>
  <div class="signup-bg">
    <div class="signup-card">
      <div class="logo-container">
        <h1 class="site-title">Colormate</h1>
      </div>
      <h2 class="signup-title">회원가입</h2>
      <form @submit.prevent="handleSignup">
        <div class="input-group">
          <label>이메일</label>
          <input v-model="email" type="email" required placeholder="이메일을 입력하세요" :disabled="isVerified"/>
          <button v-if="email && !isVerified" class="verify-btn" @click="sendCode" type="button">
            인증번호 요청
          </button>
          <div v-if="post && !isVerified" class="verify-container">
            <input v-model="code" placeholder="인증번호를 입력하세요">
            <button class="verify-btn" @click="confirmCode" type="button">
              인증 확인
            </button>
          </div>
        </div>
        <div class="input-group">
          <label>비밀번호</label>
          <input v-model="password" type="password" required />
        </div>
        <div class="input-group">
          <label>비밀번호확인</label>
          <input v-model="passwordChk" type="password" required />
        </div>
        <div class="input-group">
          <label>닉네임</label>
          <input v-model="nickname" type="text" required />
        </div>
        <p v-if="message" style="color: red; font-size: 0.9rem; margin-top: -10px; margin-bottom: 10px;">
          {{ message }}
        </p>
        <button v-if="email && password && passwordChk && nickname && isVerified" type="submit" class="signup-btn">회원가입</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { computed } from 'vue'

const apiUrl = import.meta.env.VITE_API_URL;
const router = useRouter()

const email = ref('')
const password = ref('')
const passwordChk = ref('');
const nickname = ref('')
const post = ref(false);
const code = ref('');
const isVerified = ref(false)

const message = computed(() => {
  if (!email.value) return '이메일을 입력해주세요.'
  if (isVerified.value === false) return '이메일 인증을 진행해주세요.'
  if (!password.value) return '비밀번호를 입력해주세요.'
  if (!passwordChk.value) return '비밀번호 확인을 입력해주세요.'
  if (password.value !== passwordChk.value) return '비밀번호가 일치하지 않습니다.'
  if (!nickname.value) return '닉네임을 입력해주세요.'
  return '' // 모든 조건 만족
})

const sendCode = async () => {
  post.value = true;
  await axios.post(`${apiUrl}/email/verify`, { email: email.value })
  alert('인증번호를 전송했습니다.')
}

const confirmCode = async () => {
  const res = await axios.post(`${apiUrl}/email/confirm`, { email: email.value, code: code.value })
  if (res.status === 200) {
    isVerified.value = true
    alert('인증 완료!')
  } else {
    alert('인증 실패!')
  }
}

const handleSignup = async () => {
  try {
    await axios.post(`${apiUrl}/user/signup`, {
      email: email.value,
      password: password.value,
      nickname: nickname.value,
    })
    alert('회원가입 성공');
    router.push('/');
  } catch (error) {
    console.error(error)
    alert('회원가입 실패')
  }
}
</script>

<style scoped>
.signup-bg {
  min-height: 100vh;
  background: linear-gradient(135deg, #ffe0ec 0%, #e0f7fa 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  width: 100%;
  height: 100vh;
  margin: 0;
  position: fixed;
  top: 0;
  left: 0;
}
.signup-card {
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
  color: #a259e6;
  margin: 0;
  letter-spacing: 1px;
}
.signup-title {
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
  color: #a259e6;
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
  border: 1.5px solid #a259e6;
  outline: none;
  background: #fff;
}
.signup-btn {
  width: 100%;
  background: linear-gradient(90deg, #a259e6 0%, #62e0c6 100%);
  color: #fff;
  font-weight: 600;
  font-size: 1.1rem;
  border: none;
  border-radius: 8px;
  padding: 12px 0;
  margin-top: 8px;
  box-shadow: 0 2px 8px 0 rgba(162, 89, 230, 0.08);
  transition: background 0.2s, box-shadow 0.2s;
}
.signup-btn:hover {
  background: linear-gradient(90deg, #62e0c6 0%, #a259e6 100%);
  box-shadow: 0 4px 16px 0 rgba(162, 89, 230, 0.15);
}

.verify-container {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
}

.verify-btn {
  margin-top: 20px;
  text-align: center;
  display: flex;
  justify-content: center;
  gap: 6px;
  padding: 12px 16px;
  background: linear-gradient(90deg, #a259e6 0%, #62e0c6 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
  box-shadow: 0 2px 8px 0 rgba(162, 89, 230, 0.08);
}

.verify-btn:hover {
  background: linear-gradient(90deg, #62e0c6 0%, #a259e6 100%);
  box-shadow: 0 4px 16px 0 rgba(162, 89, 230, 0.15);
  transform: translateY(-2px);
}

.status-text {
  font-size: 0.85rem;
  margin-top: 6px;
  padding-left: 12px;
}

.status-text.checking {
  color: #5e5e5e;
}

.status-text.available {
  color: #62e0c6;
}

.status-text.unavailable {
  color: #ff6b6b;
}

@media (max-width: 480px) {
  .verify-btn {
    width: 100%;
    justify-content: center;
  }
}
@media (min-width: 768px) {
  .signup-card {
    padding: 50px 40px 40px 40px;
  }
  .site-title {
    font-size: 3rem;
  }
  .signup-title {
    font-size: 1.4rem;
  }
  .input-group input {
    padding: 12px 14px;
  }
}
</style>