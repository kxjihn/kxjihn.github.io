# 조명 밝기에 따른 AI 이미지 인식 정확도 시뮬레이션
# 조작 변인: 밝기 배율 / 종속 변인: 정확도 / 통제 변인: 모델, 데이터, 노이즈, 반복 횟수
import numpy as np, csv
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from sklearn.datasets import load_digits
from sklearn.model_selection import train_test_split
from sklearn.neural_network import MLPClassifier

LEVELS = [100, 70, 50, 30, 20, 10, 5]   # 밝기 배율 (퍼센트)
REPEAT = 10                              # 반복 횟수
NOISE_SD = 2                             # 센서 노이즈 (통제, 모든 밝기에서 동일)

res = {l: [] for l in LEVELS}
for seed in range(REPEAT):
    X, y = load_digits(return_X_y=True)
    X = X / 16.0 * 255                   # 0~255 밝기 값으로 변환
    Xtr, Xte, ytr, yte = train_test_split(X, y, test_size=0.3, random_state=seed, stratify=y)
    # 모델은 원래 밝기(100퍼센트) 이미지로만 학습
    model = MLPClassifier(hidden_layer_sizes=(64,), max_iter=500, random_state=seed).fit(Xtr/255, ytr)
    rng = np.random.default_rng(seed)
    for l in LEVELS:
        dark = np.floor(Xte * l / 100)                        # 밝기 감소 (8비트 정수로 내림)
        dark = np.clip(dark + rng.normal(0, NOISE_SD, dark.shape), 0, 255)
        res[l].append(model.score(dark/255, yte) * 100)

# 결과 표 저장
rows = [(l, round(np.mean(res[l]),1), round(np.std(res[l]),1), round(min(res[l]),1), round(max(res[l]),1)) for l in LEVELS]
with open("results.csv", "w", newline="") as f:
    w = csv.writer(f); w.writerow(["brightness_pct","mean_acc","std","min","max"]); w.writerows(rows)
for r in rows: print(r)

# 그래프 1: 밝기별 정확도
m = [r[1] for r in rows]; s = [r[2] for r in rows]
plt.figure(figsize=(6,4))
plt.errorbar(LEVELS, m, yerr=s, marker="o", capsize=4)
plt.gca().invert_xaxis()
plt.xlabel("Brightness (%)"); plt.ylabel("Accuracy (%)")
plt.title("Accuracy vs brightness (mean +- SD, 10 runs)")
plt.grid(alpha=.3); plt.tight_layout(); plt.savefig("accuracy_graph.png", dpi=200); plt.close()

# 그림 2: 밝기별 샘플 이미지
d = load_digits(); img = d.images[3]/16.0*255
fig, ax = plt.subplots(1, len(LEVELS), figsize=(10,1.8))
for a, l in zip(ax, LEVELS):
    a.imshow(np.floor(img*l/100), cmap="gray", vmin=0, vmax=255); a.set_title(f"{l}%"); a.axis("off")
plt.tight_layout(); plt.savefig("sample_images.png", dpi=200); plt.close()
