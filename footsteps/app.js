{
/* ===== 설정: 여기만 고치면 됩니다 ===== */
/* 카카오 지도 JavaScript 키 (developers.kakao.com > 플랫폼 > Web에 https://kxjihn.github.io 등록) */
const KAKAO_JS_KEY = '4975632e97217d146aeb2ded4cf61634';
/* 카카오 로그인 (Supabase Auth). 둘 다 비워 두면 '로그인 준비 중'으로 표시되고 로그인 없이 쓰는 방식만 열린다 */
const SUPABASE_URL = 'https://jmjljaxhuyourwnzvqvb.supabase.co';
const SUPABASE_KEY = 'sb_publishable_-y7UIgFQUzoi237pCVdIGA_ANB-P8I8';   /* publishable(anon) 키. 서비스 키는 절대 넣지 말 것 */
/* 인증 반경(m) */
const RADIUS = 50;
/* 좌표: lat=위도, lng=경도. ※ 표시된 곳은 지도에서 꼭 확인 */
const START = [
  {name: '국립대전현충원', lat: 36.362180, lng: 127.300406},
  {name: '현충원역', lat: 36.359085, lng: 127.321798}
];
const STOPS = [
  /* coord: 'ok' = 자료로 확인, 'check' = 현장 확인 전 (실제 인증이 빗나갈 수 있음) */
  {id: 's1', name: '중앙로역', sub: '원도심 도보 시작', lat: 36.328665, lng: 127.425828, coord: 'ok', coordSrc: '카카오맵 장소 좌표 (2026.11.22 확인)',
   text: '현충원역에서 1호선을 타고 도착한 원도심의 첫걸음입니다. 여기서부터 걸어요.'},
  {id: 's2', name: '대전근현대사전시관', sub: '옛 충남도청', lat: 36.326798, lng: 127.420891, coord: 'ok', coordSrc: '카카오맵 장소 좌표 (2026.11.22 확인)',
   text: '1932년에 지어진 옛 충남도청 건물입니다. 대전의 근현대 이야기를 만나요. (10:00~18:00, 월요일 휴관, 무료)'},
  {id: 's3', name: '옛 대전형무소 망루·우물', sub: '중구 목중로 34', lat: 36.336683, lng: 127.410697, coord: 'ok', coordSrc: '카카오맵 구대전형무소망루 장소 좌표 (2026.11.22 확인)',
   text: '독립운동가들이 거쳐 간 옛 대전형무소의 흔적입니다. 우물은 2022년 대전시 첫 등록문화재가 되었어요.'},
  {id: 's4', name: '대전역', sub: '코스 도착', lat: 36.332294, lng: 127.434645, coord: 'ok', coordSrc: '카카오맵 대전역(중앙로 215) 장소 좌표 (2026.11.22 확인)',
   text: '코스의 마지막 지점입니다. 1호선과 철도가 이어지는 곳에서 하루를 마무리해요.'}
];


/* 지도에 그릴 실제 경로 (2026.11.22 생성)
   셔틀: 오픈스트리트맵 자동차 경로(OSRM), 걷기: 오픈스트리트맵 도보 경로(OSRM), 1호선: 카카오맵 역 좌표를 순서대로 이은 선.
   셔틀 실제 운행 경로와 다를 수 있어요. 좌표 순서는 [위도, 경도]. */
const SUBWAY_STATIONS = [['현충원',36.359085,127.321798],['구암',36.356696,127.330732],['유성온천',36.353720,127.341446],['갑천',36.354749,127.354690],['월평',36.358259,127.364600],['갈마',36.357581,127.372797],['정부청사',36.357471,127.381268],['시청',36.351524,127.386751],['탄방',36.345547,127.384570],['용문',36.338167,127.393411],['오룡',36.328689,127.404921],['서대전네거리',36.322422,127.412576],['중구청',36.324803,127.419553],['중앙로',36.328665,127.425828]];
const ROUTES = {
  shuttle: [[36.36218,127.30027],[36.36209,127.30027],[36.362,127.30016],[36.36155,127.29946],[36.3615,127.29921],[36.36034,127.2992],[36.36032,127.30279],[36.36041,127.30513],[36.36032,127.30602],[36.36014,127.30681],[36.35911,127.30948],[36.35898,127.31046],[36.35909,127.31503],[36.35937,127.31777],[36.35937,127.32059],[36.35914,127.32112],[36.35914,127.3218]],
  subway: SUBWAY_STATIONS.map(s => [s[1], s[2]]),
  walk: [[[36.32865,127.42581],[36.32691,127.42118]], [[36.32691,127.42118],[36.32707,127.42155],[36.32848,127.42075],[36.32828,127.42021],[36.32944,127.41957],[36.32905,127.41839],[36.32949,127.41816],[36.32925,127.41747],[36.33223,127.41594],[36.33228,127.41591],[36.33222,127.41575],[36.33302,127.41534],[36.33428,127.41356],[36.33429,127.41341],[36.33442,127.41341],[36.3345,127.41349],[36.33618,127.4111],[36.3366,127.41059]], [[36.3366,127.41059],[36.33618,127.4111],[36.33458,127.41339],[36.3345,127.41349],[36.33442,127.41341],[36.33429,127.41341],[36.33428,127.41356],[36.33302,127.41534],[36.33265,127.41564],[36.33277,127.41583],[36.33244,127.41703],[36.33241,127.41717],[36.33247,127.4172],[36.33212,127.41885],[36.33106,127.42212],[36.33096,127.42223],[36.33158,127.4234],[36.33126,127.42381],[36.33174,127.42451],[36.33139,127.42498],[36.33152,127.42631],[36.33133,127.42657],[36.33149,127.42674],[36.33065,127.42795],[36.33093,127.42827],[36.33072,127.42857],[36.3309,127.42876],[36.33083,127.42885],[36.33157,127.43079],[36.33117,127.4311],[36.33129,127.43141],[36.33089,127.43169],[36.33126,127.43268],[36.33185,127.43242],[36.33175,127.43339],[36.33208,127.43477]]],
  walkM: [470, 1720, 2940]
};
const toP = a => ({lat: a[0], lng: a[1]});

/* 장소 설명: 출처로 확인한 내용만 적었어요. 고칠 때도 확인한 사실만 넣어 주세요. */
const SRC = {
  hall: ['대한민국 구석구석 · 대전근현대사전시관', 'https://www.ktriptips.com/kor/culture/1964617'],
  well: ['KPI뉴스 · 옛 대전형무소 우물 대전시 첫 등록문화재', 'https://kpinews.kr/newsView/179548667587651'],
  prison: ['프레시안 · 대전의 함성, 잊혀서는 안 될 독립운동의 역사', 'https://www.pressian.com/pages/articles/2025030111022130392'],
  tour: ['1920~30년대 대전 원도심 투어', 'https://twig24.com/news/lifestyle/trip/2018/06/21/20180621019011'],
  nc: ['국립대전현충원', 'https://www.dnc.go.kr'],
  heritage: ['국가유산포털 해설문(한국학중앙연구원 정리)', 'https://dh.aks.ac.kr/~heritage/wiki/index.php/%EA%B5%AC_%EB%8C%80%EC%A0%84%ED%98%95%EB%AC%B4%EC%86%8C_%EB%A7%9D%EB%A3%A8']
};
const DETAILS = {
  '국립대전현충원': {
    kind: '출발 · 스탬프 없음',
    desc: ['나라를 위해 희생하신 분들이 잠든 국립묘지예요. 국립현충원은 서울과 대전 두 곳에 있어요.', '이 코스는 참배를 마친 뒤 출발해요. 추모 공간이라 현충원 안에는 스탬프를 두지 않았어요.'],
    info: [['주소', '대전 유성구 현충원로 251'], ['개방', '연중무휴 · 11~2월 07:00~18:00'], ['역에서', '현충원역 2번 출구 21번 승강장 무료 셔틀 보훈모시미, 30분 간격, 역 출발 09:05~16:35'], ['확인 기준', '현충원 2024.2.1. 공지 기준. 2026.11.22에 최신 공지를 찾지 못해 바뀌었을 수 있어요. 출발 전 현충원 누리집(dnc.go.kr) 교통 안내를 확인하세요.']],
    tip: '<b>예절</b> · 묘역에서는 조용히 걷고, 다른 참배객의 사진을 찍지 않아요.',
    src: ['nc']
  },
  '현충원역': {
    kind: '출발 · 1호선 탑승',
    desc: ['대전 도시철도 1호선 역이에요. 현충원을 오가는 셔틀 보훈모시미가 2번 출구에서 출발해요.', '여기서 1호선 판암 방면을 타고 원도심으로 이동해요.'],
    info: [['노선', '대전 도시철도 1호선'], ['셔틀', '2번 출구 21번 승강장'], ['원도심까지', '중앙로역까지 약 24분 (1호선 시간표 기준)']],
    tip: '<b>참고</b> · 보훈모시미 막차 시간은 바뀔 수 있으니 현충원 안내를 확인해 주세요.',
    src: ['nc']
  },
  '중앙로역': {
    kind: '스탬프 1 · 원도심 도보 시작',
    desc: ['원도심 한가운데 있는 1호선 역이에요. 대전역과 한 정거장 거리예요.', '여기서부터 원도심 근현대사 현장을 걸어서 이어가요.'],
    info: [['노선', '대전 도시철도 1호선'], ['다음 지점', '대전근현대사전시관']],
    tip: '<b>길 팁</b> · 전시관만 바로 가려면 한 정거장 앞 중구청역 4번 출구가 더 가까워요 (약 300m).',
    src: ['tour']
  },
  '대전근현대사전시관': {
    kind: '스탬프 2 · 옛 충남도청',
    desc: ['1932년에 지어진 옛 충남도청사 본관 1층에 있는 전시관이에요. 대전시립박물관이 운영해요.', '1930년대 초 건물 가운데 원형이 잘 남은 근대 건축물이라, 건물 자체도 볼거리예요. 안에서는 대전의 근현대사를 상설·특별 전시로 만날 수 있어요.'],
    info: [['관람', '11~2월 10:00~18:00 (입장 17:30까지) · 3~10월 10:00~19:00'], ['휴관', '매주 월요일 (공휴일이면 다음 날) · 1월 1일 · 설·추석 당일'], ['요금', '무료'], ['문의', '042-270-4537'], ['가는 길', '중구청역 4번 출구에서 약 300m'], ['확인 기준', '대한민국 구석구석 안내(2026.3.11 수정본), 2026.11.22 확인. 휴관일은 바뀔 수 있으니 방문 전 문의하세요.']],
    tip: '<b>답사 팁</b> · 월요일에는 문을 닫아요. 일정을 짤 때 꼭 확인하세요.',
    src: ['hall', 'tour']
  },
  '옛 대전형무소 망루·우물': {
    kind: '스탬프 3 · 기억의 터',
    desc: ['일제강점기 대전감옥소로 시작한 대전형무소 자리예요. 지금은 아파트 단지 사이에 망루와 우물이 남아 있어요.', '1919년 만세운동 뒤 붙잡힌 독립운동가들이 이곳에 수감되었어요. 우물은 1919년 설치된 취사장 우물로, 한국전쟁 때 민간인이 희생된 아픈 역사도 함께 남아 있어요.', '이 우물은 2022년 대전시 첫 등록문화재가 되었어요.'],
    info: [['남은 것', '망루, 우물'], ['문화유산', '망루: 대전시 문화재자료 제47호(2001) · 우물: 대전시 등록문화유산(2022.6.25)'], ['확인 기준', '국가유산포털 해설문 기준, 2026.11.22 확인']],
    tip: '<b>예절</b> · 희생의 아픔이 남은 곳이자 주민이 사는 곳이에요. 조용히 둘러봐 주세요.',
    src: ['heritage', 'well', 'prison']
  },
  '대전역': {
    kind: '스탬프 4 · 코스 도착',
    desc: ['1905년 경부선이 열리며 대전이 철도를 중심으로 자라기 시작한 곳이에요.', '1호선과 철도가 이어지는 대전역에서 오늘의 발자취를 마무리해요.'],
    info: [['노선', '경부선 철도 · 대전 도시철도 1호선']],
    tip: '<b>마무리</b> · 스탬프 4개를 모두 찍으면 완주 화면에서 공유할 수 있어요.',
    src: ['tour']
  }
};
/* 장소 사진: 위키미디어 공용(자유 이용 사진)을 원본 링크로 불러온다.
   답사 사진으로 바꾸려면 footsteps/photos/ 폴더에 넣고 src를 'photos/파일이름.jpg', credit을 '사진: 건의함에 한 건의 건의한 건희'로 바꾸면 된다. */
const commons = name => 'https://commons.wikimedia.org/wiki/Special:FilePath/' + encodeURIComponent(name) + '?width=900';
const commonsPage = name => 'https://commons.wikimedia.org/wiki/File:' + encodeURIComponent(name.replace(/ /g, '_'));
const KTO = 'https://tong.visitkorea.or.kr/cms/resource/';
const PHOTOS = {
  '국립대전현충원': [
    {src: 'photos/hyeonchung-gate.webp', alt: '국립대전현충원 현충문', credit: '건의함에 한 건의 건의한 건희 (직접 촬영)'},
    {src: KTO + '63/3512563_image2_1.jpg', alt: '국립대전현충원 보훈둘레길 입구의 벚꽃', link: 'https://api.visitkorea.or.kr/', credit: 'ⓒ한국관광공사 (공공누리 제3유형, 변경 금지)'}
  ],
  '현충원역': null,
  '중앙로역': {src: commons('Joongangro jst 2.JPG'), alt: '대전 도시철도 중앙로역', credit: 'Ryuch · 위키미디어 공용 (GFDL)', link: commonsPage('Joongangro jst 2.JPG')},
  '대전근현대사전시관': {src: KTO + '18/3512218_image2_1.jpg', alt: '옛 충남도청 본관(대전근현대사전시관) 정면', link: 'https://api.visitkorea.or.kr/', credit: 'ⓒ한국관광공사 (공공누리 제1유형)'},
  '옛 대전형무소 망루·우물': null,
  '대전역': {src: KTO + '72/3526672_image2_1.jpg', alt: '대전역 동광장 쪽 출입구', link: 'https://api.visitkorea.or.kr/', credit: 'ⓒ한국관광공사 (공공누리 제1유형)'}
};
const SHARE_TEXT_DONE = '국립대전현충원에서 시작한 추모의 발걸음을 원도심 근현대사 현장까지 이어 걸었습니다. 스탬프 4개 완주! #그들의발자취를따라서 #대전 #GeoLab';
const SHARE_TEXT_INTRO = '현충원에서 1호선을 타고 원도심 근현대사 현장까지, 스탬프 4곳을 모으며 걷는 기억의 길. #그들의발자취를따라서 #대전 #GeoLab';
/* ===================================== */

const $ = id => document.getElementById(id);
const PLACES = START.concat(STOPS);
const KEY = 'footsteps-stamps-v1';
const PAGE_URL = 'https://kxjihn.github.io/footsteps/';

/* 저장: 지점별 스탬프 여부와 완주 날짜만 (좌표·시간은 저장하지 않음) */
let stamped = {};
try { stamped = JSON.parse(localStorage.getItem(KEY) || '{}') || {}; } catch (e) { stamped = {}; }
const save = () => { try { localStorage.setItem(KEY, JSON.stringify(stamped)); } catch (e) {} };

/* 토큰 색을 실제 rgb로 바꿔 지도에 쓴다 */
const probe = document.createElement('i');
probe.hidden = true;
document.body.appendChild(probe);
const tok = n => { probe.style.color = 'var(' + n + ')'; return getComputedStyle(probe).color; };

const dist = (a, b) => {
  const R = 6371000, r = x => x * Math.PI / 180;
  const dLat = r(b.lat - a.lat), dLng = r(b.lng - a.lng);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(r(a.lat)) * Math.cos(r(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
};
const fmt = m => m >= 1000 ? (m / 1000).toFixed(1) + 'km' : Math.round(m) + 'm';
const kakaoTo = p => 'https://map.kakao.com/link/to/' + encodeURIComponent(p.name) + ',' + p.lat + ',' + p.lng;
const doneCount = () => STOPS.filter(s => stamped[s.id]).length;
const nextIndex = () => STOPS.findIndex(s => !stamped[s.id]);

const START_KEY = 'footsteps-started';
const isStarted = () => { try { return localStorage.getItem(START_KEY) === '1'; } catch (e) { return false; } };
const markStarted = () => { try { localStorage.setItem(START_KEY, '1'); } catch (e) {} };
/* ---------- 탭 이동 (#home #map #stamps #finish) ---------- */
const VIEWS = ['home', 'intro', 'map', 'stamps', 'finish'];
const show = () => {
  if (!location.hash) {
    let seen = false;
    try { seen = localStorage.getItem('footsteps-intro') === '1'; } catch (e) {}
    if (!seen) { history.replaceState(null, '', '#intro'); }
  }
  let v = (location.hash || '#home').slice(1);
  if (!VIEWS.includes(v)) v = 'home';
  document.querySelectorAll('.view').forEach(el => { el.hidden = el.dataset.view !== v; });
  document.querySelectorAll('.glass-bar a').forEach(a => {
    if (a.dataset.tab === v) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
  });
  /* 하단 메뉴는 '코스 시작'을 누른 뒤부터 보인다 (지도·스탬프 화면으로 바로 들어온 경우도 시작한 것으로 본다) */
  if (v !== 'home' && v !== 'intro') markStarted();
  document.body.classList.toggle('no-nav', v === 'intro' || !isStarted());
  moveThumb(TABS.indexOf(v));
  window.scrollTo(0, 0);
  if (v === 'intro') { $('track').scrollLeft = 0; setSlide(0); }
  if (v === 'map') { drawSvg(); initKakao(); if (kmap) requestAnimationFrame(() => { kmap.relayout(); if (fitAll) fitAll(); }); }
};
window.addEventListener('hashchange', show);

/* ---------- 스탬프 ---------- */
let justStamped = '';
const renderStamps = () => {
  const ni = nextIndex();
  $('stops').innerHTML = STOPS.map((s, i) => {
    const done = !!stamped[s.id], nx = STOPS[i + 1];
    const cls = ['stop', done ? 'done' : '', i === ni ? 'next' : '', s.id === justStamped ? 'just' : ''].join(' ').trim();
    return `<li class="${cls}">
      <div class="head"><span class="stamp${done ? ' art' : ''}" aria-hidden="true">${done ? stampSvg(s.id, 52) : i + 1}</span>
      <div><h3>${s.name}</h3><p class="meta">${s.coord === 'check' ? '<span class="coord-warn">좌표 현장 확인 전</span> ' : ''}${s.sub}${done ? ' · 스탬프 완료' : (i === ni ? ' · 지금 갈 곳' : ' · ' + STOPS[i - 1].name + ' 다음')}</p></div></div>
      ${done ? `<p class="body">${s.text}</p>${nx ? `<p class="next-hint">다음: ${nx.name} · 걸어서 약 ${fmt(ROUTES.walkM[i])}</p>` : ''}` : ''}
      <div class="row">
        ${done ? '' : i === ni ? `<button class="btn sm" type="button" data-id="${s.id}">도착 확인</button>` : `<button class="btn sm locked" type="button" disabled aria-label="${STOPS[ni].name} 스탬프를 먼저 찍어야 열려요"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>잠김</button>`}
        <button class="btn sec sm" type="button" data-open="${s.name}">장소 설명</button>
        <a class="btn sec sm" href="${kakaoTo(s)}" target="_blank" rel="noopener">길찾기</a>
        <span class="msg" id="m-${s.id}" aria-live="polite"></span>
      </div></li>`;
  }).join('');
  justStamped = '';
  const n = doneCount();
  $('count').textContent = n + ' / ' + STOPS.length;
  $('bar').style.width = (n / STOPS.length * 100) + '%';
  $('barwrap').setAttribute('aria-valuenow', n);
};

const renderPlaces = () => {
  $('places').innerHTML = PLACES.map((p, i) => {
    const st = STOPS.find(s => s.name === p.name);
    const done = st && stamped[st.id];
    const next = PLACES[i + 1];
    const dot = st ? `<span class="dot${done ? ' done' : ''}">${done ? '✓' : STOPS.indexOf(st) + 1}</span>` : '<span class="dot start" aria-hidden="true"></span>';
    const leg = !next ? '' : i === 0 ? '셔틀·버스로 현충원역' : i === 1 ? '1호선으로 ' + next.name : '걸어서 약 ' + fmt(ROUTES.walkM[i - 2]);
    return `<li><button class="place" type="button" data-open="${p.name}">${dot}<span><b>${p.name}</b><small>${DETAILS[p.name].kind}</small>${leg ? `<span class="walk">다음 → ${leg}</span>` : ''}</span><svg class="chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg></button></li>`;
  }).join('');
};

const renderFinish = () => {
  const n = doneCount(), all = n === STOPS.length, left = STOPS.length - n;
  $('h-finish').textContent = all ? '완주했어요' : `아직 ${left}곳 남았어요`;
  $('finishSub').textContent = all ? '현충원에서 시작한 발걸음을 원도심 근현대사 현장까지 이어 걸었어요.' : '스탬프 4개를 모두 모으면 완주 배지와 완주 공유가 열려요.';
  $('badge').hidden = !all;
  $('badgeDate').textContent = all && stamped.doneAt ? stamped.doneAt + ' 완주' : '';
  $('goStamps').hidden = all;
  $('shareH').textContent = all ? '완주 공유' : '코스 소개 공유';
  $('shareP').textContent = all ? '함께 걸을 친구에게 이 길을 알려 주세요.' : '완주 전에도 코스를 친구에게 알릴 수 있어요.';
  const t = shareText();
  $('xBtn').href = 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(t) + '&url=' + encodeURIComponent(PAGE_URL);
};
const shareText = () => doneCount() === STOPS.length ? SHARE_TEXT_DONE : SHARE_TEXT_INTRO;

const render = () => {
  renderSteps();
  renderStamps(); renderPlaces(); renderFinish(); drawSvg();
  if (refreshPins) refreshPins();
};

const stamp = s => {
  stamped[s.id] = true;
  if (doneCount() === STOPS.length && !stamped.doneAt) {
    const d = new Date();
    stamped.doneAt = d.getFullYear() + '.' + (d.getMonth() + 1) + '.' + d.getDate() + '.';
  }
  justStamped = s.id;
  save();
  pushRemote();
  render();
  stampFx(s);
  if (doneCount() === STOPS.length) setTimeout(openBadge, 2050);
};

/* 장소별 도장 그림 (직접 그린 선 그림, viewBox 0 0 120 120) */
const STAMP_ART = {
  s1: '<rect x="38" y="24" width="44" height="50" rx="11"/><rect x="45" y="32" width="30" height="16" rx="3"/><circle cx="48" cy="62" r="3.5"/><circle cx="72" cy="62" r="3.5"/><path d="M47 74l-5 10M73 74l5 10M32 86h56M56 24v-6h8v6"/>',
  s2: '<path d="M22 82h76M26 82V54h68v28M50 82V40h20v42M46 40h28M60 40v-8M60 32l6 3-6 3"/><path d="M33 62v8M40 62v8M80 62v8M87 62v8M55 50v6M65 50v6"/><path d="M55 82v-10a5 5 0 0 1 10 0v10"/>',
  s3: '<path d="M30 84h62M38 84l4-34h12l4 34M36 50h24l-12-12zM44 60h8M43 70h10"/><path d="M48 38v-6"/><ellipse cx="80" cy="70" rx="12" ry="4"/><path d="M68 70v12a12 4 0 0 0 24 0V70M72 62V52h16v10M80 52v-6"/>',
  s4: '<path d="M18 50h84M24 50v32h72V50M18 82h84"/><circle cx="60" cy="38" r="9"/><path d="M60 33v5l3 2M51 46h18"/><path d="M34 82V68a6 6 0 0 1 12 0v14M54 82V68a6 6 0 0 1 12 0v14M74 82V68a6 6 0 0 1 12 0v14"/>'
};
const stampSvg = (id, size, label) => `<svg viewBox="0 0 120 120" width="${size}" height="${size}" aria-hidden="true"><circle cx="60" cy="60" r="55" fill="#fff8fa" stroke="currentColor" stroke-width="5"/><circle cx="60" cy="60" r="47" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="2 4"/><g transform="translate(0 ${label ? -4 : 2}) scale(1)" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">${STAMP_ART[id]}</g>${label ? `<text x="60" y="103" text-anchor="middle" font-size="13" font-family="Do Hyeon,sans-serif" fill="currentColor">${label}</text>` : ''}</svg>`;

/* 스탬프 획득 효과: 장소 도장 + 잉크 원 + 무궁화 꽃잎 + 마스코트 안내 */
let fxTimer = 0;
const stampFx = s => {
  const fx = $('stampFx'), n = doneCount(), i = STOPS.indexOf(s);
  $('fxSeal').innerHTML = stampSvg(s.id, 170, n + ' / ' + STOPS.length);
  $('fxTitle').textContent = s.name + ' 스탬프 획득';
  $('fxSub').textContent = n === STOPS.length ? '4곳 모두 모았어요. 완주했어요!' : '다음은 ' + STOPS[i + 1].name + '이에요';
  const many = n === STOPS.length ? 18 : 12;
  $('fxPetals').innerHTML = Array.from({length: many}, (_, k) => {
    const a = (k / many) * Math.PI * 2 + Math.random() * .5, d = 100 + Math.random() * 80;
    return `<i style="--dx:${Math.round(Math.cos(a) * d)}px;--dy:${Math.round(Math.sin(a) * d + 50)}px;--rot:${Math.round(Math.random() * 360 - 180)}deg;animation-delay:${(.2 + Math.random() * .14).toFixed(2)}s"></i>`;
  }).join('');
  fx.hidden = true; void fx.offsetWidth; fx.hidden = false;
  clearTimeout(fxTimer);
  fxTimer = setTimeout(() => { fx.hidden = true; }, 2050);
  if (navigator.vibrate) { try { navigator.vibrate([18, 40, 30]); } catch (e) {} }
};

$('stops').addEventListener('click', e => {
  const b = e.target.closest('button[data-id]');
  if (!b) return;
  const s = STOPS.find(x => x.id === b.dataset.id);
  const msg = $('m-' + s.id);
  if (STOPS.indexOf(s) !== nextIndex()) { msg.textContent = '앞 지점의 스탬프를 먼저 찍어 주세요.'; return; }
  if ($('demo').checked) { stamp(s); announce(s.name + ' 스탬프를 찍었어요. 시연 모드라 위치는 확인하지 않았어요.'); return; }
  if (!('geolocation' in navigator)) { msg.textContent = '이 기기에서는 위치 확인을 쓸 수 없어요.'; return; }
  b.disabled = true;
  msg.textContent = '위치를 확인하는 중…';
  /* 위치는 이 버튼을 누를 때 한 번만 읽고, 거리 계산 뒤 바로 버린다 */
  navigator.geolocation.getCurrentPosition(pos => {
    const d = dist({lat: pos.coords.latitude, lng: pos.coords.longitude}, s);
    const acc = Math.round(pos.coords.accuracy || 0);
    b.disabled = false;
    const tail = s.coord === 'check' ? ' 이 지점 좌표는 아직 현장 확인 전이라 빗나갈 수 있어요. 계속 안 되면 시연 모드를 쓰세요.' : '';
    if (d <= RADIUS && acc <= 80) { stamp(s); announce(s.name + ' 스탬프를 찍었어요.'); return; }
    if (acc > 80) {
      msg.textContent = `휴대폰이 잡은 위치의 오차가 약 ${acc}m로 커서 확인할 수 없어요. 건물 밖 하늘이 보이는 곳에서 10초쯤 기다린 뒤 다시 눌러 주세요. 와이파이를 켜 두면 더 정확해져요.` + tail;
    } else if (d - acc <= RADIUS) {
      msg.textContent = `거의 다 왔어요. 약 ${fmt(d)} 떨어져 있고 오차가 ${acc}m라, 몇 걸음 더 가까이 가서 다시 눌러 주세요.` + tail;
    } else {
      msg.textContent = `${s.name}까지 약 ${fmt(d)} 남았어요 (위치 오차 약 ${acc}m). ${RADIUS}m 안에 들어와 다시 눌러 주세요.` + tail;
    }
    announce('스탬프를 찍지 못했어요. ' + msg.textContent);
  }, err => {
    b.disabled = false;
    msg.textContent = err && err.code === 1 ? '위치 권한이 꺼져 있어요. 브라우저 설정에서 이 사이트의 위치를 허용한 뒤 다시 눌러 주세요.' : '위치를 확인하지 못했어요. 건물 밖으로 나와 잠시 뒤 다시 눌러 주세요.';
    announce('스탬프를 찍지 못했어요. ' + msg.textContent);
  }, {enableHighAccuracy: true, timeout: 12000, maximumAge: 0});
});
$('demo').addEventListener('change', () => document.body.classList.toggle('demo', $('demo').checked));
const resetDlg = $('resetDlg');
$('reset').addEventListener('click', () => {
  $('rsAcct').textContent = user ? ' 로그인한 계정에 저장된 기록도 함께 지워져요.' : '';
  if (typeof resetDlg.showModal === 'function') resetDlg.showModal(); else resetDlg.setAttribute('open', '');
});
$('rsNo').addEventListener('click', () => resetDlg.close());
$('rsYes').addEventListener('click', () => { resetDlg.close(); stamped = {}; save(); pushRemote(); render(); announce('스탬프를 모두 지웠어요.'); });
document.querySelector('.hero-cta a').addEventListener('click', markStarted);

/* ---------- 카카오 로그인과 스탬프 동기화 ---------- */
let sb = null, user = null;
const authReady = () => !!(SUPABASE_URL && SUPABASE_KEY && window.supabase);
function initAuth() {
  if (!authReady()) { renderAcct(); return; }
  sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
  const goStampsAfterLogin = session => {
    let back = false; try { back = sessionStorage.getItem('fs-login') === '1'; } catch (e) {}
    if (!session || !back) return;
    try { sessionStorage.removeItem('fs-login'); } catch (e) {}
    setTimeout(() => { location.hash = '#stamps'; }, 300);
  };
  sb.auth.getSession().then(({data}) => { setUser(data.session ? data.session.user : null); goStampsAfterLogin(data.session); });
  sb.auth.onAuthStateChange((_e, session) => { setUser(session ? session.user : null); goStampsAfterLogin(session); });
}
async function setUser(u) {
  const was = user && user.id;
  user = u;
  renderAcct();
  if (!u || was === u.id) return;
  markStarted(); finishIntro();
  /* 서버 기록과 이 휴대폰 기록을 합친다 (찍은 스탬프는 지우지 않음) */
  const {data} = await sb.from('footsteps_progress').select('stamps, done_at').eq('user_id', u.id).maybeSingle();
  if (data) {
    Object.assign(stamped, data.stamps || {});
    if (data.done_at && !stamped.doneAt) stamped.doneAt = data.done_at;
  }
  save(); render(); pushRemote();
}
let pushTimer = 0;
function pushRemote() {
  if (!sb || !user) return;
  clearTimeout(pushTimer);
  pushTimer = setTimeout(async () => {
    const stamps = {}; STOPS.forEach(s => { if (stamped[s.id]) stamps[s.id] = true; });
    await sb.from('footsteps_progress').upsert({user_id: user.id, stamps, done_at: stamped.doneAt || null, updated_at: new Date().toISOString()});
  }, 300);
}
async function kakaoLogin() {
  if (!authReady()) { $('loginMsg').textContent = '카카오 로그인은 준비 중이에요. 지금은 로그인 없이 시작해 주세요. 스탬프는 이 휴대폰에 저장돼요.'; return; }
  /* 돌아오는 주소에 #을 붙이면 토큰(#access_token)과 겹쳐 로그인이 저장되지 않는다. 돌아온 뒤 스탬프 화면으로 보낸다 */
  try { sessionStorage.setItem('fs-login', '1'); } catch (e) {}
  const {error} = await sb.auth.signInWithOAuth({provider: 'kakao', options: {redirectTo: PAGE_URL, scopes: 'profile_nickname'}});
  if (error) $('loginMsg').textContent = '로그인을 시작하지 못했어요. 잠시 뒤 다시 시도하거나 로그인 없이 시작해 주세요.';
}
function renderAcct() {
  const el = $('acct');
  if (!el) return;
  if (user) {
    const nick = (user.user_metadata && (user.user_metadata.name || user.user_metadata.full_name || user.user_metadata.nickname)) || '카카오 계정';
    el.innerHTML = `<span>${nick.replace(/[<>&]/g, '')}님 · 스탬프가 계정에 저장돼요</span><button class="link-btn" type="button" id="logoutBtn">로그아웃</button>`;
    $('logoutBtn').onclick = async () => { await sb.auth.signOut(); user = null; renderAcct(); announce('로그아웃했어요. 이 휴대폰의 스탬프는 그대로 있어요.'); };
  } else {
    el.innerHTML = `<span>로그인 없이 사용 중 · 스탬프는 이 휴대폰에만 저장돼요</span><button class="link-btn" type="button" id="loginBtn2">카카오 로그인</button>`;
    $('loginBtn2').onclick = () => { if (authReady()) kakaoLogin(); else announce('카카오 로그인은 준비 중이에요.'); };
  }
}
$('kakaoLogin').addEventListener('click', kakaoLogin);
$('guestStart').addEventListener('click', () => { finishIntro(); location.hash = '#home'; });

/* 화면 읽기 도구용 알림 */
const announce = t => { const el = $('sr-live'); el.textContent = ''; setTimeout(() => { el.textContent = t; }, 60); };

/* ---------- 이동 순서 (구간별 길찾기) ---------- */
const kakaoFromTo = (a, b, by) => 'https://map.kakao.com/link/from/' + encodeURIComponent(a.name) + ',' + a.lat + ',' + a.lng + '/to/' + encodeURIComponent(b.name) + ',' + b.lat + ',' + b.lng;
const renderSteps = () => {
  const legs = [
    {from: START[0], to: START[1], how: '셔틀 보훈모시미', note: '현충원 안에서 타요. 시간표는 현충원 공지 확인 (2024.2. 기준 30분 간격)'},
    {from: START[1], to: STOPS[0], how: '도시철도 1호선 (판암 방면)', note: '약 24분, 1호선 시간표 기준 추정'},
    {from: STOPS[0], to: STOPS[1], how: '걷기', note: '걸어서 약 ' + fmt(ROUTES.walkM[0]) + ' (지도 경로 기준)'},
    {from: STOPS[1], to: STOPS[2], how: '걷기', note: '걸어서 약 ' + fmt(ROUTES.walkM[1]) + ' (지도 경로 기준)'},
    {from: STOPS[2], to: STOPS[3], how: '걷기', note: '걸어서 약 ' + fmt(ROUTES.walkM[2]) + ' (지도 경로 기준)'}
  ];
  $('steps').innerHTML = legs.map((l, i) => `<li><span class="st-n">${i + 1}</span><div><b>${l.from.name} → ${l.to.name}</b><span class="st-how">${l.how}</span><span class="st-note">${l.note}</span><a class="btn sec sm" href="${kakaoFromTo(l.from, l.to)}" target="_blank" rel="noopener">이 구간 길찾기</a></div></li>`).join('');
};

/* ---------- 금색 완주 배지 ---------- */
const badgeDlg = $('badgeDlg');
function openBadge() {
  $('bmStamps').innerHTML = STOPS.map(s => stampSvg(s.id, 52)).join('');
  $('bmDate').textContent = stamped.doneAt ? stamped.doneAt + ' 완주' : '';
  if (navigator.vibrate) { try { navigator.vibrate([30, 60, 30]); } catch (e) {} }
  if (typeof badgeDlg.showModal === 'function') badgeDlg.showModal(); else badgeDlg.setAttribute('open', '');
}
$('bmClose').addEventListener('click', () => badgeDlg.close());
$('bmShare').addEventListener('click', () => badgeDlg.close());
$('badge').addEventListener('click', openBadge);

/* ---------- 장소 설명 창 ---------- */
const dlg = $('dlg');
const openPlace = name => {
  const p = PLACES.find(x => x.name === name), d = DETAILS[name];
  if (!p || !d) return;
  const ph = PHOTOS[name], fig = $('dPhoto');
  if (ph) {
    fig.hidden = false;
    const list = Array.isArray(ph) ? ph : [ph];
    fig.innerHTML = list.map(x => `<div class="ph-item"><img src="${x.src}" alt="${x.alt}" loading="lazy" decoding="async"><figcaption>사진: ${x.link ? `<a href="${x.link}" target="_blank" rel="noopener">${x.credit}</a>` : x.credit}</figcaption></div>`).join('');
    fig.querySelectorAll('img').forEach(im => im.addEventListener('error', () => { im.parentNode.remove(); if (!fig.querySelector('img')) fig.hidden = true; }));
  } else {
    fig.hidden = false;
    fig.innerHTML = '<div class="ph-empty"><img src="mascot-sm.webp" alt="" width="45" height="48"><span>답사 사진을 준비하고 있어요</span></div>';
  }
  $('dSub').textContent = d.kind;
  $('dTitle').textContent = name;
  $('dDesc').innerHTML = d.desc.map(t => `<p>${t}</p>`).join('');
  $('dInfo').innerHTML = (d.info || []).map(([k, v]) => `<dt>${k}</dt><dd>${v}</dd>`).join('');
  $('dInfo').hidden = !(d.info || []).length;
  $('dTip').innerHTML = d.tip || '';
  $('dTip').hidden = !d.tip;
  const st = STOPS.find(x => x.name === name);
  $('dActs').innerHTML = `<a class="btn sm" href="${kakaoTo(p)}" target="_blank" rel="noopener">카카오맵 길찾기</a>` + (st ? '<a class="btn sec sm" href="#stamps" id="dGo">스탬프 하러 가기</a>' : '');
  $('dSrc').innerHTML = '출처: ' + (d.src || []).map(k => `<a href="${SRC[k][1]}" target="_blank" rel="noopener">${SRC[k][0]}</a>`).join(' · ');
  if (st) $('dGo').addEventListener('click', () => dlg.close());
  if (typeof dlg.showModal === 'function') dlg.showModal(); else dlg.setAttribute('open', '');
};
document.addEventListener('click', e => { const o = e.target.closest('[data-open]'); if (o) openPlace(o.dataset.open); });
$('dClose').addEventListener('click', () => dlg.close());
dlg.addEventListener('click', e => { if (e.target === dlg) dlg.close(); });

/* ---------- 기본 노선도 (카카오 지도를 못 쓸 때) ---------- */
const svg = $('svgmap');
function drawSvg() {
  if (svg.hidden) return;
  const W = svg.clientWidth, H = svg.clientHeight;
  if (!W || !H) return;
  const la = PLACES.map(p => p.lat), ln = PLACES.map(p => p.lng);
  const minLa = Math.min(...la), maxLa = Math.max(...la), minLn = Math.min(...ln), maxLn = Math.max(...ln);
  const pad = W < 420 ? 40 : 56, kx = Math.cos(36.34 * Math.PI / 180);
  const k = Math.min((W - pad * 2) / ((maxLn - minLn) * kx), (H - pad * 2) / (maxLa - minLa));
  const ox = (W - (maxLn - minLn) * kx * k) / 2, oy = (H - (maxLa - minLa) * k) / 2;
  const P = p => [ox + (p.lng - minLn) * kx * k, oy + (maxLa - p.lat) * k];
  const seg = (a, b, st) => { const [x1, y1] = P(a), [x2, y2] = P(b); return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke-linecap="round" fill="none" ${st}/>`; };
  const c = {sub: tok('--route-subway'), walk: tok('--route-walk'), bus: tok('--route-shuttle'), start: tok('--route-start'), card: tok('--color-surface-raised'), ink: tok('--color-text-secondary'), onb: tok('--stamp-ink-done'), done: tok('--stamp-fill-done')};
  const pl = (arr, st) => `<polyline points="${arr.map(a => P(toP(a)).join(',')).join(' ')}" stroke-linecap="round" stroke-linejoin="round" fill="none" ${st}/>`;
  let o = pl(ROUTES.shuttle, `stroke="${c.bus}" stroke-width="2.5" stroke-dasharray="2 6"`);
  o += pl(ROUTES.subway, `stroke="${c.sub}" stroke-width="7"`);
  ROUTES.walk.forEach(w => { o += pl(w, `stroke="${c.walk}" stroke-width="3.5" stroke-dasharray="8 6"`); });
  START.forEach(p => { const [x, y] = P(p); o += `<circle data-p="${p.name}" cx="${x}" cy="${y}" r="16" fill="transparent"/><circle data-p="${p.name}" cx="${x}" cy="${y}" r="9" fill="${c.card}" stroke="${c.start}" stroke-width="4"/>`; });
  STOPS.forEach((p, i) => {
    const [x, y] = P(p), d = stamped[p.id];
    o += `<circle data-p="${p.name}" cx="${x}" cy="${y}" r="14" fill="${d ? c.done : c.card}" stroke="${d ? c.done : c.walk}" stroke-width="3"/>`;
    o += `<text x="${x}" y="${y + 5}" text-anchor="middle" font-size="14" font-weight="700" font-family="Pretendard,sans-serif" style="pointer-events:none" fill="${d ? c.onb : c.sub}">${d ? '✓' : i + 1}</text>`;
  });
  const [ax, ay] = P(START[0]), [bx, by] = P(START[1]);
  o += `<text x="${ax}" y="${ay - 18}" font-size="13" font-family="Pretendard,sans-serif" fill="${c.ink}">현충원</text>`;
  o += `<text x="${bx}" y="${by + 28}" font-size="13" font-family="Pretendard,sans-serif" fill="${c.ink}">현충원역</text>`;
  svg.innerHTML = o;
}
new ResizeObserver(drawSvg).observe(svg);
svg.addEventListener('click', e => { const t = e.target.closest('[data-p]'); if (t) openPlace(t.dataset.p); });

/* ---------- 카카오 지도: 택배한눈처럼 한 번만 불러오고, 실패하면 다음에 다시 시도 ---------- */
let kakaoLoading = null, kmap = null, refreshPins = null, fitAll = null;
const loadKakao = () => {
  if (!KAKAO_JS_KEY) return Promise.reject(new Error('no key'));
  if (window.kakao && window.kakao.maps && window.kakao.maps.Map) return Promise.resolve(window.kakao);
  if (kakaoLoading) return kakaoLoading;
  kakaoLoading = new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = 'https://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=' + encodeURIComponent(KAKAO_JS_KEY);
    const fail = () => { kakaoLoading = null; s.remove(); reject(new Error('Kakao SDK 로드 실패')); };
    const timer = setTimeout(fail, 8000);
    s.onload = () => { clearTimeout(timer); try { window.kakao.maps.load(() => resolve(window.kakao)); } catch (e) { fail(); } };
    s.onerror = () => { clearTimeout(timer); fail(); };
    document.head.appendChild(s);
  });
  return kakaoLoading;
};
function initKakao() {
  if (kmap) return;
  loadKakao().then(kakao => {
    if (kmap) return;
    const box = $('kmap');
    if (!box.closest('.view') || box.closest('.view').hidden) return; /* 지도 화면이 안 보일 때 만들면 크기가 0이라 타일과 표시가 어긋난다 */
    box.hidden = false; svg.hidden = true; svg.innerHTML = '';
    $('maptools').hidden = false;
    const LL = p => new kakao.maps.LatLng(p.lat, p.lng);
    kmap = new kakao.maps.Map(box, {center: LL(STOPS[1]), level: 7});
    kmap.addControl(new kakao.maps.ZoomControl(), kakao.maps.ControlPosition.RIGHT);
    const line = (path, color, w, style) => new kakao.maps.Polyline({map: kmap, path: path.map(LL), strokeWeight: w, strokeColor: color, strokeOpacity: .95, strokeStyle: style});
    line(ROUTES.shuttle.map(toP), tok('--route-shuttle'), 4, 'shortdot');
    line(ROUTES.subway.map(toP), tok('--route-subway'), 7, 'solid');
    ROUTES.walk.forEach(w => line(w.map(toP), tok('--route-walk'), 5, 'shortdash'));
    SUBWAY_STATIONS.slice(1, -1).forEach(st => new kakao.maps.CustomOverlay({map: kmap, position: LL({lat: st[1], lng: st[2]}), yAnchor: .5, zIndex: 1, content: '<span class="kst" aria-hidden="true"></span>'}));
    START.forEach(p => {
      const el = document.createElement('button');
      el.type = 'button'; el.className = 'klabel'; el.textContent = p.name;
      el.onclick = () => openPlace(p.name);
      new kakao.maps.CustomOverlay({map: kmap, position: LL(p), yAnchor: 1.6, content: el});
    });
    const pins = STOPS.map(p => {
      const el = document.createElement('button');
      el.type = 'button'; el.className = 'kpin'; el.setAttribute('aria-label', p.name + ' 설명 보기');
      el.onclick = () => openPlace(p.name);
      new kakao.maps.CustomOverlay({map: kmap, position: LL(p), yAnchor: .5, content: el});
      return el;
    });
    refreshPins = () => pins.forEach((el, i) => { const d = stamped[STOPS[i].id]; el.classList.toggle('done', !!d); el.textContent = d ? '✓' : i + 1; });
    refreshPins();
    const fit = arr => { const b = new kakao.maps.LatLngBounds(); arr.forEach(p => b.extend(LL(p))); kmap.setBounds(b, 40, 40, 40, 40); };
    $('viewAll').onclick = () => fit(PLACES);
    $('viewOld').onclick = () => fit(STOPS);
    fitAll = () => fit(PLACES);
    requestAnimationFrame(() => { kmap.relayout(); fitAll(); });
    new ResizeObserver(() => kmap.relayout()).observe(box);
  }).catch(() => { /* 키·도메인 문제면 기본 노선도를 그대로 쓴다 */ });
}

/* ---------- 공유 ---------- */
const copy = async () => {
  try { await navigator.clipboard.writeText(shareText() + ' ' + PAGE_URL); $('shareMsg').textContent = '복사했어요. SNS나 카톡에 붙여 넣어 주세요.'; }
  catch (e) { $('shareMsg').textContent = '자동 복사가 안 돼요. 주소를 직접 복사해 주세요: ' + PAGE_URL; }
};
$('copyBtn').addEventListener('click', copy);
/* 인스타그램은 웹 공유 주소가 없어서: 휴대폰 공유창(이미지 포함)으로 보내고, 안 되면 문구 복사 후 인스타그램을 연다 */
let shareImg = null;
const getShareImg = async () => {
  if (shareImg) return shareImg;
  const r = await fetch('og.png');
  shareImg = new File([await r.blob()], 'footsteps.png', {type: 'image/png'});
  return shareImg;
};
$('igBtn').addEventListener('click', async () => {
  const text = shareText() + ' ' + PAGE_URL;
  try {
    const f = await getShareImg();
    if (navigator.canShare && navigator.canShare({files: [f]})) {
      try { await navigator.clipboard.writeText(text); } catch (e) {}
      await navigator.share({files: [f], text});
      $('shareMsg').textContent = '공유창에서 인스타그램을 골라 주세요. 문구와 링크는 복사해 두었어요.';
      return;
    }
  } catch (e) { if (e && e.name === 'AbortError') return; }
  try { await navigator.clipboard.writeText(text); $('shareMsg').textContent = '문구와 링크를 복사했어요. 인스타그램 스토리나 게시물에 붙여 넣어 주세요.'; }
  catch (e) { $('shareMsg').textContent = '인스타그램에 이 주소를 붙여 넣어 주세요: ' + PAGE_URL; }
  window.open('https://www.instagram.com/', '_blank', 'noopener');
});
$('shareBtn').addEventListener('click', async () => {
  if (navigator.share) {
    try { await navigator.share({title: '그들의 발자취를 따라서', text: shareText(), url: PAGE_URL}); return; }
    catch (e) { if (e && e.name === 'AbortError') return; }
  }
  copy();
});

/* ---------- 소개 카드 (택배한눈 Intro처럼 옆으로 넘김) ---------- */
const track = $('track');
const slides = [...track.querySelectorAll('.slide')];
let slideIdx = 0;
$('dots').innerHTML = slides.map((_, i) => `<button type="button" role="tab" aria-label="${i + 1}번째 소개" aria-selected="${i === 0}"></button>`).join('');
const dots = [...$('dots').children];
function setSlide(i) {
  slideIdx = i;
  dots.forEach((d, k) => d.setAttribute('aria-selected', k === i));
  $('introNext').hidden = i === slides.length - 1;
}
const goSlide = i => track.scrollTo({left: Math.max(0, Math.min(slides.length - 1, i)) * track.clientWidth, behavior: 'smooth'});
track.addEventListener('scroll', () => { const i = Math.round(track.scrollLeft / track.clientWidth); if (i !== slideIdx) setSlide(i); }, {passive: true});
dots.forEach((d, i) => d.addEventListener('click', () => goSlide(i)));
const finishIntro = () => { try { localStorage.setItem('footsteps-intro', '1'); } catch (e) {} };
$('introNext').addEventListener('click', () => {
  if (slideIdx === slides.length - 1) { finishIntro(); location.hash = '#home'; }
  else goSlide(slideIdx + 1);
});
document.querySelector('[data-intro-done]').addEventListener('click', finishIntro);
document.addEventListener('keydown', e => {
  if ($('v-intro').hidden) return;
  if (e.key === 'ArrowRight') goSlide(slideIdx + 1);
  if (e.key === 'ArrowLeft') goSlide(slideIdx - 1);
});

/* ---------- 리퀴드 글래스 하단 메뉴 (택배한눈 GlassNav를 옮김) ---------- */
const bar = $('glassBar'), thumb = $('glassThumb');
const TABS = [...bar.querySelectorAll('a')].map(a => a.dataset.tab);
let curIdx = 0;
const lensCopy = $('glassLensCopy');
lensCopy.innerHTML = [...bar.querySelectorAll('a')].map(a => `<span>${a.innerHTML}</span>`).join('');
const thumbW = () => (bar.clientWidth - 12) / TABS.length;
let stretch = 0, stretchTimer = 0;
function moveThumb(i, x) {
  if (i >= 0) curIdx = i;
  const w = thumbW(), px = x != null ? x : curIdx * w;
  const s = thumb.classList.contains('press') ? 1.22 : 1;
  thumb.style.transform = `translate3d(${px}px,0,0) scale(${s + stretch},${s - stretch * 0.6})`;
  thumb.style.setProperty('--hx', (72 - (px / Math.max(1, w * (TABS.length - 1))) * 44) + '%');
  lensCopy.style.width = (bar.clientWidth - 12) + 'px';
  lensCopy.style.transform = `translate3d(${-px}px,0,0)`;
}
/* 렌즈 왜곡: 크롬 계열만 backdrop-filter 안의 SVG 필터를 지원한다. 사파리·파이어폭스는 일반 블러로 대신한다. */
const CAN_DISTORT = /Chrome\//.test(navigator.userAgent) && !/CriOS|EdgiOS|FxiOS|Firefox/.test(navigator.userAgent);
const displacementMap = (w, h, edge) => {
  const ex = Math.min(0.5, edge / w), ey = Math.min(0.5, edge / h);
  const svgMap = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><defs>` +
    `<linearGradient id="x" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="rgb(255,0,0)"/><stop offset="${ex}" stop-color="rgb(128,0,0)"/><stop offset="${1 - ex}" stop-color="rgb(128,0,0)"/><stop offset="1" stop-color="rgb(0,0,0)"/></linearGradient>` +
    `<linearGradient id="y" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="rgb(0,0,255)"/><stop offset="${ey}" stop-color="rgb(0,0,128)"/><stop offset="${1 - ey}" stop-color="rgb(0,0,128)"/><stop offset="1" stop-color="rgb(0,0,0)"/></linearGradient></defs>` +
    `<rect width="${w}" height="${h}" fill="rgb(0,0,0)"/><rect width="${w}" height="${h}" fill="url(#x)"/><rect width="${w}" height="${h}" fill="url(#y)" style="mix-blend-mode:screen"/></svg>`;
  return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgMap);
};
const NS = 'http://www.w3.org/2000/svg';
let lensSvg = null;
const applyLens = () => {
  if (!CAN_DISTORT) return;
  const w = Math.round(bar.offsetWidth), h = Math.round(bar.offsetHeight);
  if (!w || !h) return;
  if (!lensSvg) {
    lensSvg = document.createElementNS(NS, 'svg');
    lensSvg.setAttribute('width', '0'); lensSvg.setAttribute('height', '0'); lensSvg.setAttribute('aria-hidden', 'true');
    lensSvg.style.position = 'absolute';
    lensSvg.innerHTML = '<filter id="glassLens" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feImage result="map" preserveAspectRatio="none"/><feDisplacementMap in="SourceGraphic" in2="map" scale="70" xChannelSelector="R" yChannelSelector="B"/></filter>';
    document.body.appendChild(lensSvg);
  }
  const f = lensSvg.querySelector('filter'), img = lensSvg.querySelector('feImage');
  [f, img].forEach(el => { el.setAttribute('x', '0'); el.setAttribute('y', '0'); el.setAttribute('width', w); el.setAttribute('height', h); });
  img.setAttribute('href', displacementMap(w, h, 30));
  bar.style.backdropFilter = 'url(#glassLens) blur(2px) saturate(1.9)';
  bar.classList.add('lens');
};
new ResizeObserver(() => { moveThumb(curIdx); applyLens(); }).observe(bar);
const g = {active: false, moved: false, startX: 0, startY: 0, x0: 0, x: 0, suppress: false, id: null};
const resetThumb = () => { stretch = 0; thumb.classList.remove('press', 'drag'); moveThumb(curIdx); };
bar.addEventListener('pointerdown', e => {
  g.active = true; g.moved = false; g.startX = e.clientX; g.startY = e.clientY; g.id = e.pointerId;
  g.x0 = curIdx * thumbW(); g.x = g.x0; g.t = 0;
  thumb.classList.add('press'); moveThumb(curIdx);
});
bar.addEventListener('pointermove', e => {
  const r = bar.getBoundingClientRect();
  bar.style.setProperty('--mx', (e.clientX - r.left) + 'px');
  bar.style.setProperty('--my', (e.clientY - r.top) + 'px');
  if (!g.active || e.pointerId !== g.id) return;
  const dx = e.clientX - g.startX, dy = e.clientY - g.startY;
  if (!g.moved) {
    if (Math.abs(dy) > 10 && Math.abs(dy) > Math.abs(dx)) { g.active = false; resetThumb(); return; } /* 세로로 움직이면 스크롤로 본다 */
    if (Math.abs(dx) < 8) return;
    try { bar.setPointerCapture(e.pointerId); } catch (err) {}
  }
  g.moved = true;
  thumb.classList.add('drag');
  const nx = Math.min((TABS.length - 1) * thumbW(), Math.max(0, g.x0 + dx));
  const now = performance.now(), v = Math.abs(nx - g.x) / Math.max(1, now - (g.t || now - 16));
  g.t = now; g.x = nx;
  stretch = stretch * 0.5 + Math.min(0.2, v * 0.15) * 0.5;
  clearTimeout(stretchTimer);
  stretchTimer = setTimeout(() => { stretch = 0; if (g.active) moveThumb(-2, g.x); }, 90);
  moveThumb(-2, g.x);
});
const endDrag = e => {
  if (!g.active || (e && e.pointerId != null && e.pointerId !== g.id)) { if (!g.active) resetThumb(); return; }
  g.active = false;
  const cancelled = e && e.type !== 'pointerup';
  stretch = 0;
  thumb.classList.remove('press', 'drag');
  if (g.moved && !cancelled) {
    g.suppress = true; setTimeout(() => { g.suppress = false; }, 0);
    const i = Math.round(g.x / thumbW());
    if ('#' + TABS[i] !== location.hash) location.hash = '#' + TABS[i]; else moveThumb(i);
  } else moveThumb(curIdx);
  g.moved = false;
};
window.addEventListener('pointerup', endDrag);
window.addEventListener('pointercancel', endDrag);
bar.addEventListener('lostpointercapture', e => { if (g.active) endDrag({type: 'cancel', pointerId: e.pointerId}); });
document.addEventListener('visibilitychange', () => { g.active = false; resetThumb(); });
window.addEventListener('scroll', () => { if (!g.moved && g.active) { g.active = false; resetThumb(); } }, {passive: true});
bar.addEventListener('dragstart', e => e.preventDefault());
bar.addEventListener('click', e => { if (g.suppress) { e.preventDefault(); g.suppress = false; } }, true);

/* 큰 글씨 */
const BIG_KEY = 'footsteps-big';
const setBig = on => { document.documentElement.classList.toggle('big', on); $('bigBtn').setAttribute('aria-pressed', on); $('bigBtn').textContent = on ? '글씨 보통' : '글씨 크게'; try { localStorage.setItem(BIG_KEY, on ? '1' : '0'); } catch (e) {} };
$('bigBtn').addEventListener('click', () => setBig(!document.documentElement.classList.contains('big')));
try { setBig(localStorage.getItem(BIG_KEY) === '1'); } catch (e) {}

/* ---------- 첫 화면 3D 홀로그램: 켜질 때만 불러온다 ---------- */
(() => {
  const root = $('holo');
  if (!root) return;
  const load = () => {
    if (root.dataset.loaded) return;
    root.dataset.loaded = '1';
    import('./holo3d.js?v=20261123j').then(m => m.start(root)).then(r => { if (!r || !r.ok) root.hidden = true; }).catch(() => { root.hidden = true; });
  };
  const io = new IntersectionObserver(es => { if (es.some(e => e.isIntersecting)) { io.disconnect(); load(); } });
  io.observe(root);
})();

matchMedia('(prefers-color-scheme: dark)').addEventListener('change', render);
render();
show();
initAuth();
}

