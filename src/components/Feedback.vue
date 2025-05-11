<template>
  <div class="feedback-container">
    <h1>피드백</h1>
    <p class="description">서비스 개선을 위한 여러분의 소중한 의견을 들려주세요.</p>
    
    <form @submit.prevent="submitFeedback" class="feedback-form">
      <div class="input-group">
        <label>닉네임</label>
        <input v-model="nickname" type="text" required placeholder="닉네임을 입력해주세요" />
      </div>

      <div class="input-group">
        <label>피드백 유형</label>
        <select v-model="type" required>
          <option value="">선택해주세요</option>
          <option value="bug">버그 리포트</option>
          <option value="feature">기능 제안</option>
          <option value="improvement">개선사항</option>
          <option value="other">기타</option>
        </select>
      </div>

      <div class="input-group">
        <label>내용</label>
        <textarea 
          v-model="content" 
          required 
          placeholder="피드백 내용을 자세히 작성해주세요"
          rows="6"
        ></textarea>
      </div>

      <button type="submit" class="submit-btn" :disabled="isSubmitting">
        {{ isSubmitting ? '제출 중...' : '피드백 보내기' }}
      </button>
    </form>

    <!-- 피드백 목록 섹션 -->
    <div class="feedback-list">
      <h2>피드백 목록</h2>
      <div class="feedback-cards">
        <div v-for="feedback in feedbackList" :key="feedback.id" class="feedback-card">
          <div class="feedback-header">
            <div class="feedback-info">
              <span class="feedback-nickname">{{ feedback.nickname }}</span>
              <span class="feedback-type" :class="feedback.type">{{ getTypeLabel(feedback.type) }}</span>
            </div>
            <span class="feedback-date">{{ formatDate(feedback.createdAt) }}</span>
          </div>
          <p class="feedback-content">{{ feedback.content }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const nickname = ref('')
const type = ref('')
const content = ref('')
const isSubmitting = ref(false)
const feedbackList = ref([])

// 피드백 유형 한글 레이블
const getTypeLabel = (type) => {
  const labels = {
    bug: '버그 리포트',
    feature: '기능 제안',
    improvement: '개선사항',
    other: '기타'
  }
  return labels[type] || type
}

// 날짜 포맷팅
const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const submitFeedback = async () => {
  try {
    isSubmitting.value = true
    // TODO: API 연동
    // const response = await fetch('/api/feedback', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     nickname: nickname.value,
    //     type: type.value,
    //     content: content.value,
    //   }),
    // })

    // 임시 데이터 추가 (실제로는 API 응답으로 대체)
    feedbackList.value.unshift({
      id: Date.now(),
      nickname: nickname.value,
      type: type.value,
      content: content.value,
      createdAt: new Date().toISOString()
    })

    alert('피드백이 성공적으로 전송되었습니다. 감사합니다!')
    router.push('/')
  } catch (error) {
    console.error('피드백 전송 중 오류가 발생했습니다:', error)
    alert('피드백 전송에 실패했습니다. 다시 시도해주세요.')
  } finally {
    isSubmitting.value = false
  }
}

// 피드백 목록 가져오기
const fetchFeedbackList = async () => {
  try {
    // TODO: API 연동
    // const response = await fetch('/api/feedback')
    // feedbackList.value = await response.json()

    // 임시 데이터 (실제로는 API 응답으로 대체)
    feedbackList.value = [
      {
        id: 1,
        nickname: '사용자1',
        type: 'bug',
        content: '색상 선택 시 가끔 오류가 발생합니다.',
        createdAt: '2024-03-15T10:30:00'
      },
      {
        id: 2,
        nickname: '사용자2',
        type: 'feature',
        content: '계절별 추천 기능이 있으면 좋을 것 같습니다.',
        createdAt: '2024-03-14T15:45:00'
      }
    ]
  } catch (error) {
    console.error('피드백 목록 로딩 실패:', error)
  }
}

onMounted(() => {
  fetchFeedbackList()
})
</script>

<style scoped>
.feedback-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
  background-color: white;
  border-radius: 12px;
}

h1 {
  font-size: 2rem;
  color: #333;
  margin-bottom: 8px;
  text-align: center;
}

.description {
  text-align: center;
  color: #666;
  margin-bottom: 40px;
}

.feedback-form {
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-bottom: 60px;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.input-group label {
  font-weight: 500;
  color: #333;
}

.input-group input,
.input-group select,
.input-group textarea {
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.2s;
  background-color: whitesmoke;
  color: gray;
}

.input-group input:focus,
.input-group select:focus,
.input-group textarea:focus {
  outline: none;
  border-color: #a259e6;
  box-shadow: 0 0 0 2px rgba(162, 89, 230, 0.1);
}

.submit-btn {
  padding: 14px;
  background: linear-gradient(90deg, #a259e6 0%, #62e0c6 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 16px;
}

.submit-btn:hover:not(:disabled) {
  background: linear-gradient(90deg, #62e0c6 0%, #a259e6 100%);
  transform: translateY(-2px);
  box-shadow: 0 4px 16px 0 rgba(162, 89, 230, 0.15);
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

/* 피드백 목록 스타일 */
.feedback-list {
  margin-top: 40px;
}

.feedback-list h2 {
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 20px;
  text-align: center;
}

.feedback-cards {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.feedback-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s ease;
}

.feedback-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
}

.feedback-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.feedback-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.feedback-nickname {
  font-weight: 600;
  color: #333;
  font-size: 1.1rem;
}

.feedback-type {
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 500;
}

.feedback-type.bug {
  background-color: #ffe0e0;
  color: #ff4444;
}

.feedback-type.feature {
  background-color: #e0f7fa;
  color: #00bcd4;
}

.feedback-type.improvement {
  background-color: #e8f5e9;
  color: #4caf50;
}

.feedback-type.other {
  background-color: #f3e5f5;
  color: #9c27b0;
}

.feedback-date {
  color: #888;
  font-size: 0.9rem;
}

.feedback-content {
  color: #444;
  line-height: 1.6;
  margin: 0;
  white-space: pre-wrap;
}

@media (max-width: 480px) {
  .feedback-container {
    padding: 20px 16px;
  }

  h1 {
    font-size: 1.75rem;
  }

  .feedback-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }

  .feedback-date {
    font-size: 0.8rem;
  }
}
</style> 