# 밝기와 AI 인식 정확도 시뮬레이터

과학과 미래 탐구 수행평가용 시뮬레이션. 손글씨 숫자 이미지(8x8)를 분류하는 신경망에 어두운 이미지를 넣었을 때 정확도가 어떻게 변하는지 확인한다.

- index.html: 브라우저에서 직접 조작하는 시뮬레이터 (model.json을 불러옴)
- brightness_sim.py: 파이썬 시뮬레이션 코드 (scikit-learn 필요, 실행하면 results.csv와 그래프 생성)
- results.csv, accuracy_graph.png, sample_images.png: 실행 결과

조작 변인은 밝기 배율, 종속 변인은 분류 정확도, 통제 변인은 모델, 데이터, 노이즈, 반복 횟수이다.
시뮬레이션 코드는 AI 도구(Claude)의 도움을 받아 구현했다.
