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
          <input v-model="email" type="email" required />
          <button class="verify-btn" @click="checkEmail">
            중복확인
          </button>
          <span v-if="emailStatus === 'checking'" class="status-text checking">확인 중...</span>
          <span v-else-if="emailStatus === 'available'" class="status-text available">사용 가능한 이메일입니다.</span>
          <span v-else-if="emailStatus === 'unavailable'" class="status-text unavailable">이미 사용 중인 이메일입니다.</span>
        </div>
        <div class="input-group">
          <label>비밀번호</label>
          <input v-model="password" type="password" required />
        </div>
        <div class="input-group">
          <label>닉네임</label>
          <input v-model="nickname" type="text" required />
        </div>
        <button type="submit" class="signup-btn">회원가입</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()

const email = ref('')
const password = ref('')
const nickname = ref('')
const emailStatus = ref('') // 'checking', 'available', 'unavailable'

const checkEmail = async () => {
  if (!email.value) {
    alert('이메일을 입력해주세요.')
    return
  }

  emailStatus.value = 'checking'
  try {
    const res = await axios.post(`/api/user/check-email`, {
      email: email.value
    })
    emailStatus.value = res.data.available ? 'available' : 'unavailable'
  } catch (error) {
    console.error(error)
    alert('이메일 확인 중 오류가 발생했습니다.')
    emailStatus.value = ''
  }
}

const handleSignup = async () => {
  // if (emailStatus.value !== 'available') {
  //   alert('이메일 중복확인을 해주세요.')
  //   return
  // }

  try {
    await axios.post(`/api/user/signup`, {
    // await axios.post(`http://localhost:8080/user/signup`, {
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

.verify-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 16px;
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
  