# DevHelper AI

AI 기반 개발자 도우미 - 프론트엔드 개발자를 위한 통합 도구

## 📌 프로젝트 소개

**DevHelper AI**는 프론트엔드 개발자의 일상적인 작업을 효율화하기 위한 AI 기반 도구입니다. Google Gemini API를 활용하여 UX 카피 생성, 에러 분석, 코드 변환 등 다양한 기능을 제공합니다.

## ✨ 주요 기능

### 1. UX 카피 생성

-   **UI 컴포넌트별 맞춤 문구**: 버튼, 모달, 알림, 에러 메시지, 안내문구, 다이얼로그
-   **톤 & 매너 선택**: 친절한, 격식 있는, 재치 있는, 중립적인
-   **서비스 도메인별 최적화**: 배달, 커머스, 소셜, 금융, 헬스케어
-   **상황별 맞춤 생성**: 세부 상황 설명을 통한 정확한 문구 생성
-   **다중 버전 제안**: 3가지 버전의 문구를 동시에 제공
-   **즐겨찾기 기능**: 자주 사용하는 문구 저장 및 관리

### 2. 에러 메시지 분석

-   **다국어 지원**: 한국어, English, 日本語, 中文
-   **원인 분석**: 에러 메시지를 분석하여 근본 원인 파악
-   **해결방법 제시**: 단계별 해결 방법 안내
-   **결과 복사**: 분석 결과를 쉽게 복사하여 활용

### 3. JSON ↔ TypeScript 변환

-   **JSON → TypeScript**: JSON 데이터를 TypeScript 인터페이스로 변환
-   **TypeScript → JSON**: TypeScript 인터페이스를 JSON 예시로 변환
-   **커스텀 인터페이스 이름**: 원하는 인터페이스 이름 지정 가능
-   **실시간 유효성 검증**: JSON 형식 자동 검증
-   **코드 복사**: 변환된 코드를 바로 복사하여 사용

### 4. 오늘의 핵심 개념

-   **하루 한 번 개념 제공**: 매일 새로운 프론트엔드 핵심 개념 학습
-   **AI 기반 생성**: 모호하거나 헷갈리는 개념을 명확하게 설명
-   **마크다운 지원**: 굵게, 기울임, 코드, 헤더 등 다양한 형식 지원
-   **더보기/접기**: 긴 내용을 접었다 펼칠 수 있는 기능
-   **복사 기능**: 개념 내용을 쉽게 복사
-   **로컬 스토리지 저장**: 하루에 한 번만 생성되도록 날짜 기반 관리

## 🎨 UI/UX 기능

### 다크모드 지원

-   **시스템 설정 감지**: 사용자의 시스템 테마 자동 감지
-   **수동 토글**: 헤더의 토글 버튼으로 언제든지 전환 가능
-   **로컬 스토리지 저장**: 선택한 테마 설정 자동 저장
-   **TailwindCSS v4 다크모드**: 최신 TailwindCSS 기능 활용

### 커스텀 컴포넌트

-   **커스텀 드롭다운**: 네이티브 select 대신 스타일링 가능한 드롭다운
-   **반응형 디자인**: 모바일, 태블릿, 데스크톱 모든 화면 크기 지원
-   **부드러운 애니메이션**: 전환 효과와 호버 상태 제공

### 파비콘

-   **SVG 파비콘**: 고해상도 디스플레이 지원
-   **브랜드 아이덴티티**: DevHelper AI 전용 파비콘

## 🛠️ 기술 스택

### 프론트엔드

-   **React 19** - 최신 React 기능 활용
-   **TypeScript** - 타입 안정성 보장
-   **Vite** - 빠른 개발 서버 및 빌드 도구
-   **TailwindCSS v4** - 유틸리티 기반 CSS 프레임워크
    -   다크모드 지원 (`@custom-variant`)
-   **Zustand** - 경량 상태 관리 라이브러리

### AI & API

-   **Google Gemini API** - AI 모델 (gemini-2.5-flash)
    -   UX 카피 생성
    -   에러 메시지 분석
    -   JSON/TypeScript 변환
    -   핵심 개념 생성

### 데이터 저장

-   **Local Storage** - 사용자 설정 및 데이터 영구 저장
    -   테마 설정
    -   오늘의 핵심 개념 (날짜 기반)
    -   즐겨찾기

## 🚀 시작하기

### 사전 요구사항

-   Node.js 18 이상
-   npm 또는 yarn

### 설치

```bash
# 저장소 클론
git clone <repository-url>
cd DevHelper-AI

# 의존성 설치
npm install
```

### 환경 변수 설정

프로젝트 루트에 `.env` 파일을 생성하고 Google Gemini API 키를 추가하세요:

```env
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

**API 키 발급 방법:**

1. [Google AI Studio](https://makersuite.google.com/app/apikey) 접속
2. Google 계정으로 로그인
3. "Create API Key" 클릭
4. 생성된 API 키를 `.env` 파일에 추가

### 개발 서버 실행

```bash
npm run dev
```

개발 서버가 실행되면 브라우저에서 `http://localhost:5173`으로 접속할 수 있습니다.

### 빌드

프로덕션 빌드를 생성하려면:

```bash
npm run build
```

빌드 결과물은 `dist` 폴더에 생성됩니다.

### 미리보기

빌드된 결과물을 미리보려면:

```bash
npm run preview
```

## 📝 사용 방법

### UX 카피 생성

1. 상단 탭에서 "문구 생성" 선택
2. **컴포넌트 유형** 선택 (버튼, 모달, 알림 등)
3. **톤 & 매너** 선택 (친절한, 격식 있는 등)
4. **서비스 유형** 선택 (배달, 커머스 등)
5. **상황 설명** 입력 (선택사항)
6. "문구 생성하기" 버튼 클릭
7. 생성된 3가지 문구 중 원하는 것 선택
8. "복사" 버튼으로 클립보드에 복사
9. "⭐" 버튼으로 즐겨찾기에 추가

### 에러 메시지 분석

1. 상단 탭에서 "에러 분석" 선택
2. 에러 메시지를 입력란에 붙여넣기
3. **답변 언어** 선택 (한국어, English, 日本語, 中文)
4. "분석하기" 버튼 클릭
5. 원인 요약과 해결방법 확인
6. "복사" 버튼으로 결과 복사

### JSON ↔ TypeScript 변환

1. 상단 탭에서 "JSON 변환" 선택
2. **변환 방향** 선택 (JSON → TypeScript 또는 TypeScript → JSON)
3. 변환할 코드 입력
4. (JSON → TypeScript의 경우) 인터페이스 이름 입력 (선택사항)
5. 변환 버튼 클릭
6. 변환된 코드 확인 및 복사

### 오늘의 핵심 개념

-   페이지 상단에 자동으로 표시됩니다
-   하루에 한 번만 새로운 개념이 생성됩니다
-   "더보기" 버튼으로 전체 내용 확인
-   "복사" 버튼으로 내용 복사

### 다크모드 전환

-   헤더 우측 상단의 토글 버튼 클릭
-   시스템 설정을 따르려면 브라우저를 재시작하세요

## 📁 프로젝트 구조

```
DevHelper-AI/
├── public/
│   └── dh-favicon.svg          # 파비콘
├── src/
│   ├── api/                     # API 함수들
│   │   ├── analyzeError.ts     # 에러 분석 API
│   │   ├── convertJson.ts      # JSON 변환 API
│   │   ├── generateConcept.ts  # 핵심 개념 생성 API
│   │   └── generateCopy.ts     # 카피 생성 API
│   ├── components/              # React 컴포넌트
│   │   ├── CopyResult.tsx       # 카피 결과 표시
│   │   ├── DailyConcept.tsx     # 오늘의 핵심 개념
│   │   ├── ErrorAnalysisResult.tsx
│   │   ├── ErrorInput.tsx
│   │   ├── GenerateButton.tsx
│   │   ├── JsonConverter.tsx    # JSON 변환기
│   │   ├── LanguageSelect.tsx
│   │   ├── SelectBox.tsx        # 커스텀 드롭다운
│   │   ├── TextInput.tsx
│   │   └── ThemeToggle.tsx      # 다크모드 토글
│   ├── pages/
│   │   └── Home.tsx             # 메인 페이지
│   ├── store/                    # Zustand 스토어
│   │   ├── useCopyStore.ts      # 카피/에러/JSON 상태
│   │   ├── useDailyConcept.ts   # 핵심 개념 상태
│   │   └── useThemeStore.ts     # 테마 상태
│   ├── types/
│   │   └── copy.ts              # TypeScript 타입 정의
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css                # 전역 스타일
├── index.html
├── package.json
└── README.md
```

## 🔧 개발 가이드

### 상태 관리

-   **Zustand**를 사용하여 전역 상태 관리
-   각 기능별로 별도의 스토어 분리
-   Local Storage와 연동하여 데이터 영구 저장

### 스타일링

-   **TailwindCSS v4** 사용
-   다크모드는 `@custom-variant` 활용
-   커스텀 컴포넌트는 Tailwind 유틸리티 클래스로 스타일링

### API 통신

-   Google Gemini API를 직접 호출
-   에러 처리 및 로딩 상태 관리
-   TypeScript 타입으로 응답 데이터 보장

## 🚢 배포

### Netlify 배포

1. **빌드 설정**

    - Build command: `npm run build`
    - Publish directory: `dist`

2. **환경 변수 설정**

    - Netlify 대시보드에서 `VITE_GEMINI_API_KEY` 추가

3. **배포 방법**
    - GitHub 연동: 저장소 연결 후 자동 배포
    - Netlify CLI: `netlify deploy --prod`
    - 드래그 앤 드롭: `dist` 폴더 업로드

## 📄 라이선스

MIT License

## 🤝 기여하기

이슈나 제안사항이 있으시면 GitHub Issues에 등록해주세요.

---

**DevHelper AI** - 프론트엔드 개발자를 위한 AI 도우미
