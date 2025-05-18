<template>
  <div class="main-page">
    <header class="header">
      <h1 class="site-title">Colormate</h1>
      <nav class="nav">
        <template v-if="!isLogin">
          <router-link to="/join" class="nav-link">회원가입</router-link>
          <router-link to="/login" class="nav-link">로그인</router-link>
        </template>
      </nav>
    </header>
    <main class="main-content">
      <div class="title-section">
        <h2>패션 색상 조합 추천</h2>
        <button class="add-combination-btn" @click="showAddModal = true">
          <span class="plus-icon">+</span> 조합 추가하기
        </button>
      </div>

      <div class="combinations-container">
        <!-- 톤온톤 조합 -->
        <div class="combination-section">
          <h3 class="section-title">톤온톤 조합</h3>
          <div class="combinations-grid">
            <div v-for="(combination, index) in colorCombinations.toneOnTone" :key="'tone-' + index" class="combination-card">
              <div class="color-combination">
                <div class="item">
                  <h4>상의</h4>
                  <div class="color-box" :style="{ backgroundColor: combination.topColor }"></div>
                  <span class="color-name">{{ combination.topColor }}</span>
                </div>
                <div class="item">
                  <h4>하의</h4>
                  <div class="color-box" :style="{ backgroundColor: combination.bottomColor }"></div>
                  <span class="color-name">{{ combination.bottomColor }}</span>
                </div>
                <div class="item">
                  <h4>신발</h4>
                  <div class="color-box" :style="{ backgroundColor: combination.shoesColor }"></div>
                  <span class="color-name">{{ combination.shoesColor }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 뉴트럴 + 포인트 조합 -->
        <div class="combination-section">
          <h3 class="section-title">뉴트럴 + 포인트 조합</h3>
          <div class="combinations-grid">
            <div v-for="(combination, index) in colorCombinations.neutralPoint" :key="'neutral-' + index" class="combination-card">
              <div class="color-combination">
                <div class="item">
                  <h4>상의</h4>
                  <div class="color-box" :style="{ backgroundColor: combination.topColor }"></div>
                  <span class="color-name">{{ combination.topColor }}</span>
                </div>
                <div class="item">
                  <h4>하의</h4>
                  <div class="color-box" :style="{ backgroundColor: combination.bottomColor }"></div>
                  <span class="color-name">{{ combination.bottomColor }}</span>
                </div>
                <div class="item">
                  <h4>신발</h4>
                  <div class="color-box" :style="{ backgroundColor: combination.shoesColor }"></div>
                  <span class="color-name">{{ combination.shoesColor }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 계절감 강조 조합 -->
        <div class="combination-section">
          <h3 class="section-title">계절감 조합</h3>
          <div class="season-tabs">
            <button 
              v-for="season in ['spring', 'summer', 'autumn', 'winter']" 
              :key="season"
              :class="['season-tab', { active: selectedSeason === season }]"
              @click="selectedSeason = season"
            >
              {{ season === 'spring' ? '봄' : 
                 season === 'summer' ? '여름' : 
                 season === 'autumn' ? '가을' : '겨울' }}
            </button>
          </div>
          <div class="combinations-grid">
            <div v-for="(combination, index) in colorCombinations.seasonal[selectedSeason]" 
                 :key="'seasonal-' + index" 
                 class="combination-card">
              <div class="color-combination">
                <div class="item">
                  <h4>상의</h4>
                  <div class="color-box" :style="{ backgroundColor: combination.topColor }"></div>
                  <span class="color-name">{{ combination.topColor }}</span>
                </div>
                <div class="item">
                  <h4>하의</h4>
                  <div class="color-box" :style="{ backgroundColor: combination.bottomColor }"></div>
                  <span class="color-name">{{ combination.bottomColor }}</span>
                </div>
                <div class="item">
                  <h4>신발</h4>
                  <div class="color-box" :style="{ backgroundColor: combination.shoesColor }"></div>
                  <span class="color-name">{{ combination.shoesColor }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 조합 추가 모달 -->
      <div v-if="showAddModal" class="modal-overlay" @click="showAddModal = false">
        <div class="modal-content" @click.stop>
          <h3>새로운 색상 조합 추가</h3>
          <div class="modal-form">
            <div class="form-group">
              <label>조합 유형</label>
              <select v-model="newCombination.type" class="form-select">
                <option value="toneOnTone">톤온톤 조합</option>
                <option value="neutralPoint">뉴트럴 + 포인트 조합</option>
                <option value="seasonal">계절감 강조 조합</option>
              </select>
            </div>
            <div class="form-group" v-if="newCombination.type === 'seasonal'">
              <label>계절</label>
              <select v-model="newCombination.season" class="form-select">
                <option value="spring">봄</option>
                <option value="summer">여름</option>
                <option value="autumn">가을</option>
                <option value="winter">겨울</option>
              </select>
            </div>
            <div class="form-group">
              <label>상의 색상</label>
              <input type="color" v-model="newCombination.top" class="color-input">
            </div>
            <div class="form-group">
              <label>하의 색상</label>
              <input type="color" v-model="newCombination.bottom" class="color-input">
            </div>
            <div class="form-group">
              <label>신발 색상</label>
              <input type="color" v-model="newCombination.shoes" class="color-input">
            </div>
            <div class="modal-buttons">
              <button class="cancel-btn" @click="showAddModal = false">취소</button>
              <button class="save-btn" @click="addNewCombination">저장</button>
            </div>
          </div>
        </div>
      </div>
    </main>
    <FeedbackButton />
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import axios from 'axios';
import FeedbackButton from '../components/FeedbackButton.vue';

const isLogin = ref(false);
const apiUrl = import.meta.env.VITE_API_URL;

const selectedSeason = ref('spring');
const showAddModal = ref(false);

const colorCombinations = ref({
  toneOnTone: [],
  neutralPoint: [],
  seasonal: {
    spring: [],
    summer: [],
    autumn: [],
    winter: []
  }
});

const fetchColorCombinations = async () => {
  try {
    const res = await axios.get(`${apiUrl}/color/combinations`);
    const data = res.data;

    const toneOnTone = []
    const neutralPoint = []
    const seasonal = {
      spring: [],
      summer: [],
      autumn: [],
      winter: []
    }

    data.forEach(item => {
      if (item.type === 'toneOnTone') {
        toneOnTone.push(item)
      } else if (item.type === 'neutralPoint') {
        neutralPoint.push(item)
      } else if (item.type === 'seasonal') {
        if (item.season && seasonal[item.season]) {
          seasonal[item.season].push(item)
        }
      }
    })

    colorCombinations.value = {
      toneOnTone,
      neutralPoint,
      seasonal
    }
  } catch (err) {
    console.error('색상 조합 로딩 실패:', err);
  }
}

const newCombination = ref({
  type: 'toneOnTone',
  season: 'spring',
  top: '#FFFFFF',
  bottom: '#FFFFFF',
  shoes: '#FFFFFF'
});

const addNewCombination = async () => {
  const combination = {
    type: newCombination.value.type,
    season: newCombination.value.type === 'seasonal' ? newCombination.value.season : null,
    topColor: newCombination.value.top,
    bottomColor: newCombination.value.bottom,
    shoesColor: newCombination.value.shoes
  };

  try {
    await axios.post(`${apiUrl}/color/combination`, combination);
    await fetchColorCombinations();

    showAddModal.value = false;
    newCombination.value = {
      type: 'toneOnTone',
      season: 'spring',
      top: '#FFFFFF',
      bottom: '#FFFFFF',
      shoes: '#FFFFFF'
    };
  } catch (err) {
    console.error('색상 조합 저장 실패:', err);
  }

  showAddModal.value = false;
  newCombination.value = {
    type: 'toneOnTone',
    season: 'spring',
    top: '#FFFFFF',
    bottom: '#FFFFFF',
    shoes: '#FFFFFF'
  };
};

onMounted(() => {
  fetchColorCombinations();
  isLogin.value = !!localStorage.getItem('token');
});
</script>

<style scoped>
.main-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #ffe0ec 0%, #e0f7fa 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  width: 100%;
  height: 100vh;
  margin: 0;
  padding: 0;
  position: fixed;
  top: 0;
  left: 0;
  overflow-y: auto;
}

.header {
  width: 100%;
  max-width: 1200px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background: #fffafc;
  border-radius: 24px;
  box-shadow: 0 4px 24px 0 rgba(180, 180, 255, 0.15);
  margin-bottom: 20px;
}

.site-title {
  font-family: 'Montserrat', 'Pretendard', sans-serif;
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--main-color);
  letter-spacing: 1px;
}

.nav {
  display: flex;
  gap: 20px;
}

.nav-link {
  font-size: 1.1rem;
  color: var(--main-color);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s;
}

.nav-link:hover {
  color: #62e0c6;
}

.main-content {
  text-align: center;
  max-width: 1200px;
  width: 100%;
  margin-top: 40px;
}

.main-content h2 {
  font-size: 2rem;
  color: #5e5e5e;
  margin-bottom: 20px;
}

.controls {
  margin-bottom: 30px;
}

.select-box {
  padding: 8px 16px;
  border-radius: 8px;
  border: 1px solid #ddd;
  background-color: white;
  font-size: 1rem;
  color: gray;
}

.combinations-container {
  display: flex;
  flex-direction: column;
  gap: 40px;
  width: 100%;
  margin-bottom: 2rem;
}

.combination-section {
  background: white;
  border-radius: 24px;
  padding: 30px;
  box-shadow: 0 4px 24px 0 rgba(180, 180, 255, 0.15);
}

.section-title {
  font-size: 1.8rem;
  color: #5e5e5e;
  margin-bottom: 30px;
  text-align: left;
}

.combinations-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 30px;
}

.combination-card {
  background: #f8f9fa;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
  display: flex;
  justify-content: center;
}

.combination-card:hover {
  transform: translateY(-5px);
}

.color-combination {
  display: flex;
  justify-content: space-around;
  gap: 20px;
}

.item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.item h4 {
  font-size: 1.2rem;
  color: #5e5e5e;
  margin: 0;
}

.color-box {
  width: 100px;
  height: 100px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
}

.color-box:hover {
  transform: scale(1.05);
}

.color-name {
  font-size: 0.9rem;
  color: #5e5e5e;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 4px 8px;
  border-radius: 4px;
}

.season-tabs {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-bottom: 30px;
}

.season-tab {
  padding: 10px 20px;
  border-radius: 12px;
  border: 1px solid #ddd;
  background-color: white;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s;
  color: gray;
}

.season-tab.active {
  background-color: #62e0c6;
  color: white;
  border-color: #62e0c6;
}

.season-tab:hover {
  background-color: #f0f0f0;
}

.season-tab.active:hover {
  background-color: #4bc9b0;
}

.title-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.add-combination-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  border-radius: 12px;
  border: none;
  background-color: #62e0c6;
  color: white;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.add-combination-btn:hover {
  background-color: #4bc9b0;
}

.plus-icon {
  font-size: 1.5rem;
  font-weight: bold;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 224, 236, 0.8);
  backdrop-filter: blur(10px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: linear-gradient(135deg, #fffafc 0%, #f0f7fa 100%);
  border: 1px solid rgba(180, 180, 255, 0.2);
  box-shadow: 0 8px 32px rgba(180, 180, 255, 0.3);
  border-radius: 16px;
  padding: 30px;
  width: 90%;
  max-width: 500px;
}

.modal-content h3 {
  color: #5e5e5e;
  font-size: 1.8rem;
  text-align: center;
  margin-bottom: 25px;
  position: relative;
  padding-bottom: 15px;
}

.modal-content h3::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 50px;
  height: 3px;
  background: linear-gradient(to right, #ffe0ec, #e0f7fa);
  border-radius: 3px;
}

.modal-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  background: rgba(255, 255, 255, 0.8);
  padding: 15px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.form-group label {
  color: #5e5e5e;
  font-weight: 500;
  margin-bottom: 8px;
}

.form-select {
  background: white;
  border: 1px solid rgba(180, 180, 255, 0.3);
  border-radius: 8px;
  padding: 10px 15px;
  font-size: 1rem;
  color: #5e5e5e;
  transition: all 0.3s;
}

.form-select:focus {
  border-color: #62e0c6;
  box-shadow: 0 0 0 2px rgba(98, 224, 198, 0.2);
  outline: none;
}

.color-input {
  width: 100%;
  height: 50px;
  padding: 0;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.3s;
}

.color-input:hover {
  transform: scale(1.02);
}

.modal-buttons {
  margin-top: 30px;
  display: flex;
  gap: 15px;
}

.cancel-btn, .save-btn {
  padding: 12px 24px;
  border-radius: 12px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s;
}

.cancel-btn {
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(180, 180, 255, 0.3);
  color: #5e5e5e;
}

.save-btn {
  background: linear-gradient(135deg, #62e0c6 0%, #4bc9b0 100%);
  border: none;
  color: white;
}

.cancel-btn:hover {
  background: rgba(255, 255, 255, 0.9);
  transform: translateY(-2px);
}

.save-btn:hover {
  background: linear-gradient(135deg, #4bc9b0 0%, #3ab89f 100%);
  transform: translateY(-2px);
}

/* 반응형 디자인 추가 */
@media (max-width: 1200px) {
  .main-content {
    padding: 0 20px;
  }
}

@media (max-width: 768px) {
  .header {
    flex-direction: column;
    gap: 15px;
    padding: 15px;
  }

  .site-title {
    font-size: 2rem;
  }

  .nav {
    width: 100%;
    justify-content: center;
  }

  .title-section {
    flex-direction: column;
    gap: 15px;
  }

  .add-combination-btn {
    width: 100%;
    justify-content: center;
  }

  .combinations-grid {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 20px;
  }

  .color-combination {
    flex-direction: row;
    gap: 10px;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
  }

  .item {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
  }

  .item h4 {
    font-size: 1rem;
    margin: 0;
    white-space: nowrap;
  }

  .color-box {
    width: 60px;
    height: 60px;
  }

  .color-name {
    font-size: 0.8rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
    text-align: center;
  }

  .season-tabs {
    flex-wrap: wrap;
  }

  .season-tab {
    flex: 1;
    min-width: 80px;
    text-align: center;
  }
}

@media (max-width: 480px) {
  .main-page {
    padding: 10px;
  }

  .site-title {
    font-size: 1.8rem;
  }

  .nav-link {
    font-size: 1rem;
  }

  .section-title {
    font-size: 1.5rem;
  }

  .combinations-grid {
    grid-template-columns: 1fr;
  }

  .modal-content {
    width: 95%;
    padding: 20px;
  }

  .modal-form {
    gap: 15px;
  }

  .form-group label {
    font-size: 0.9rem;
  }

  .modal-buttons {
    flex-direction: column;
    gap: 10px;
  }

  .cancel-btn, .save-btn {
    width: 100%;
  }

  .modal-content {
    max-height: 90vh;
    overflow-y: auto;
  }

  .color-combination {
    padding: 8px;
  }

  .item h4 {
    font-size: 0.9rem;
  }

  .color-box {
    width: 50px;
    height: 50px;
  }

  .color-name {
    font-size: 0.75rem;
  }
}
</style> 