# 그들의 발자취를 따라서 · 투어맵 웹앱
https://kxjihn.github.io/footsteps/ · 건의함에 한 건의 건의한 건희 · 2026 ONE-PRESS GeoLab 1.0

## 고칠 곳
- `app.js` 맨 위 "설정": 카카오 키, 인증 반경(50m), 지점 좌표(`※ 확인` 표시는 추정 좌표라 카카오맵에서 확인), 장소 설명(`DETAILS`)
- 색·간격·글꼴: `tokens.css` (마스코트 색 기준 디자인 토큰)

## 구성
- 화면: 처음 → 소개 카드(#intro) → 코스 지도(#map) → 스탬프(#stamps) → 완주·공유(#finish)
- 하단 메뉴: 리퀴드 글래스(누르기·끌어서 이동)
- 글꼴: Pretendard, Do Hyeon을 `fonts/`에 직접 포함 (SIL OFL)
- 홈 화면 추가: `manifest.webmanifest`, `icons/`
- 공유 미리보기: `og.png` (1200×630)

## 위치 정보
'도착 확인'을 누를 때만 `getCurrentPosition`으로 한 번 읽고 브라우저 안에서 거리만 계산합니다. 서버 전송이 없고, `localStorage`에는 지점별 스탬프 여부와 완주 날짜만 저장합니다.
