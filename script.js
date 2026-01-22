/************************
 * 1. DOM ELEMENTS
 ************************/
const home = document.getElementById('home');
const typeSelect = document.getElementById('typeSelect');
const albumList = document.getElementById('albumList');
const player = document.getElementById('player');

const enterBtn = document.getElementById('enterBtn');
const playBtn = document.getElementById('playBtn');

const albumCover = document.getElementById('albumCover');
const trackList = document.getElementById('trackList');

const progressBar = document.getElementById('progressBar');
const currentTimeEl = document.getElementById('currentTime');
const durationEl = document.getElementById('duration');

/************************
 * 2. STATE
 ************************/
let currentType = null; // solo | band
let currentAlbum = null;
let currentTrack = null;

const audio = new Audio();

/************************
 * 3. DATA (앨범 / 노래)
 ************************/
const albums = {
  solo: [
    {
      title: '솔로 앨범',
      cover: 'covers/KakaoTalk_20260122_231648526.jpg',
      tracks: [
        { title: '그저 그렇게', src: 'songs/start.mp3' },
        { title: '그때 아침인사를 건낼게', src: 'songs/dream.mp3' },
        { title: '푸른 겨울', src: 'songs/dream.mp3' },
        { title: '여름이라는 새벽(feat.이유나)', src: 'songs/dream.mp3' },
        { title: 'In The Game World', src: 'songs/dream.mp3' },
      ],
    },
  ],
  band: [
    {
      title: '꿈 : 출발, 성장',
      cover: 'covers/KakaoTalk_20260122_231648526_01.jpg',
      tracks: [
        { title: '새벽 꿈', src: 'songs/start.mp3' },
        { title: '출항', src: 'songs/dream.mp3' },
        { title: '바다 심장', src: 'songs/dream.mp3' },
        { title: '만화경', src: 'songs/dream.mp3' },
        { title: '노을 상상', src: 'songs/dream.mp3' },
        { title: '꺼져가는 불빛의 소원', src: 'songs/dream.mp3' },
        { title: '성간 여행', src: 'songs/dream.mp3' },
      ],
    },

    {
      title: '삶 : 우리, 감정',
      cover: 'covers/KakaoTalk_20260122_231648526_03.PNG',
      tracks: [
        { title: '그리움은 뿌리가 될거야', src: 'songs/start.mp3' },
        { title: '내가 살았던 동네는', src: 'songs/dream.mp3' },
        { title: '이른 이별', src: 'songs/dream.mp3' },
        { title: '오늘 날씨는 맑음', src: 'songs/dream.mp3' },
        { title: '일몰이 오기 전까지 춤을', src: 'songs/dream.mp3' },
      ],
    },

    {
      title: '존재 : 우주, 인간',
      cover: 'covers/KakaoTalk_20260122_231648526_02.jpg',
      tracks: [
        { title: '태양의 시작점', src: 'songs/start.mp3' },
        { title: '별빛과 같이', src: 'songs/dream.mp3' },
      ],
    },
  ],
};

/************************
 * 4. FUNCTIONS
 ************************/

// 화면 전환 (SPA 핵심)
function show(section) {
  home.classList.add('hidden');
  typeSelect.classList.add('hidden');
  albumList.classList.add('hidden');
  player.classList.add('hidden');

  section.classList.remove('hidden');
}

// 앨범 리스트 렌더링
function renderAlbums(type) {
  albumList.innerHTML = '';

  albums[type].forEach((album, index) => {
    const div = document.createElement('div');
    div.className = 'album-card';
    div.innerHTML = `
      <img src="${album.cover}">
      <p>${album.title}</p>
    `;

    div.addEventListener('click', () => {
      currentAlbum = album;
      renderTracks(album);
      show(player);
    });

    albumList.appendChild(div);
  });
}

// 트랙 리스트 렌더링
function renderTracks(album) {
  trackList.innerHTML = '';
  albumCover.src = album.cover;

  album.tracks.forEach((track) => {
    const li = document.createElement('li');
    li.textContent = track.title;

    li.addEventListener('click', () => {
      playTrack(track);
    });

    trackList.appendChild(li);
  });
}

// 노래 재생
function playTrack(track) {
  currentTrack = track;
  audio.src = track.src;
  audio.play();
  player.classList.add('playing');
}

// 시간 포맷
function formatTime(sec) {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s < 10 ? '0' : ''}${s}`;
}

/************************
 * 5. EVENTS
 ************************/

// ENTER 버튼
enterBtn.addEventListener('click', () => {
  show(typeSelect);
});

// 개인 / 밴드 선택
document.querySelectorAll('.card').forEach((card) => {
  card.addEventListener('click', () => {
    currentType = card.dataset.type;
    renderAlbums(currentType);
    show(albumList);
  });
});

// 재생 / 일시정지
playBtn.addEventListener('click', () => {
  if (audio.paused) {
    audio.play();
    player.classList.add('playing');
  } else {
    audio.pause();
    player.classList.remove('playing');
  }
});

// 재생 시간 업데이트
audio.addEventListener('timeupdate', () => {
  progressBar.value = (audio.currentTime / audio.duration) * 100 || 0;
  currentTimeEl.textContent = formatTime(audio.currentTime);
  durationEl.textContent = formatTime(audio.duration || 0);
});

// 프로그레스 바 이동
progressBar.addEventListener('input', () => {
  audio.currentTime = (progressBar.value / 100) * audio.duration;
});
