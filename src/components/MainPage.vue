<template>
  <div class="main-page">
    <header class="header">
      <h1 class="site-title">Colormate</h1>
      <nav class="nav">
        <router-link to="/join" class="nav-link">회원가입</router-link>
        <router-link to="/login" class="nav-link">로그인</router-link>
      </nav>
    </header>
    <main class="main-content">
      <h2>패션 색상 조합 추천</h2>
      <p>당신의 스타일을 더욱 돋보이게 해주는 색상 조합을 추천합니다.</p>
      <div class="color-combination">
        <div class="item">
          <h3>모자</h3>
          <div class="color-box" :style="{ backgroundColor: randomColor() }"></div>
        </div>
        <div class="item">
          <h3>상의</h3>
          <div class="color-box" :style="{ backgroundColor: randomColor() }"></div>
        </div>
        <div class="item">
          <h3>하의</h3>
          <div class="color-box" :style="{ backgroundColor: randomColor() }"></div>
        </div>
        <div class="item">
          <h3>신발</h3>
          <div class="color-box" :style="{ backgroundColor: randomColor() }"></div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
const randomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
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
  position: fixed;
  top: 0;
  left: 0;
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
  margin-top: 40px;
}
.main-content h2 {
  font-size: 2rem;
  color: #5e5e5e;
  margin-bottom: 10px;
}
.main-content p {
  font-size: 1.2rem;
  color: #5e5e5e;
}
.color-combination {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
}
.item {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.item h3 {
  font-size: 1.2rem;
  color: #5e5e5e;
  margin-bottom: 10px;
}
.color-box {
  width: 100px;
  height: 100px;
  border-radius: 8px;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.1);
}
</style> 