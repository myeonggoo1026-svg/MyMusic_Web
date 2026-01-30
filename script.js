const home = document.getElementById('home');
const typeSelect = document.getElementById('typeSelect');
const albumList = document.getElementById('albumList');
const albumContainer = document.getElementById('albumContainer');
const player = document.getElementById('player');

const enterBtn = document.getElementById('enterBtn');
const playBtn = document.getElementById('playBtn');

const albumCover = document.getElementById('albumCover');
const lp = document.getElementById('lp');
const trackList = document.getElementById('trackList');

const progressBar = document.getElementById('progressBar');
const currentTimeEl = document.getElementById('currentTime');
const durationEl = document.getElementById('duration');

// [추가] 정보창 관련 엘리먼트
const infoTitle = document.getElementById('infoTitle');
const infoComposer = document.getElementById('infoComposer');
const infoLyricist = document.getElementById('infoLyricist');
const infoAlbumName = document.getElementById('infoAlbumName');
const infoArtist = document.getElementById('infoArtist');
const infoReleaseYear = document.getElementById('infoReleaseYear');
const infoGenre = document.getElementById('infoGenre');
const infoDetail = document.getElementById('infoDetail');
const noInfoMsg = document.getElementById('noInfoMsg');

const audio = new Audio();
let currentAlbum = null;
let dbSongs = []; // [추가] 서버에서 가져온 곡 정보를 저장할 배열

/* 데이터 (기존 유지) */
const albums = {
  solo: [
    {
      title: '솔로 앨범',
      cover: 'covers/KakaoTalk_20260122_231648526.jpg',
      tracks: [
        { title: '그저 그렇게', src: 'songs/Solo Album/그저 그렇게.mp3' },
        {
          title: '그때 아침인사를 건낼게',
          src: 'songs/Solo Album/그때 아침인사를 건낼게.mp3',
        },
        { title: '푸른 겨울', src: 'songs/Solo Album/푸른 겨울.mp3' },
        {
          title: '여름이라는 새벽(feat.이유나)',
          src: 'songs/Solo Album/여름이라는 새벽(feat.이유나).mp3',
        },
        {
          title: 'In The Game World',
          src: 'songs/Solo Album/In The Game World.mp3',
        },
      ],
    },
  ],
  band: [
    {
      title: '<1집> 꿈 : 출발, 성장',
      cover: 'covers/KakaoTalk_20260122_231648526_01.jpg',
      tracks: [
        { title: '새벽 꿈', src: 'songs/ChoYeon 1 Album/새벽 꿈.mp3' },
        { title: '출항', src: 'songs/ChoYeon 1 Album/출항.mp3' },
        { title: '바다 심장', src: 'songs/ChoYeon 1 Album/바다 심장.mp3' },
        { title: '만화경', src: 'songs/ChoYeon 1 Album/만화경.mp3' },
        { title: '노을 상상', src: 'songs/ChoYeon 1 Album/노을 상상.mp3' },
        {
          title: '꺼져가는 불빛의 소원',
          src: 'songs/ChoYeon 1 Album/꺼져가는 불빛의 소원.mp3',
        },
        { title: '성간 여행', src: 'songs/ChoYeon 1 Album/성간 여행.mp3' },
      ],
    },
    {
      title: '<2집> 삶 : 우리, 감정',
      cover: 'covers/KakaoTalk_20260122_231648526_03.PNG',
      tracks: [
        {
          title: '그리움은 뿌리가 될거야',
          src: 'songs/ChoYeon 2 Album/그리움은 뿌리가 될거야.mp3',
        },
        {
          title: '내가 살았던 동네는',
          src: 'songs/ChoYeon 2 Album/내가 살았던 동네는.mp3',
        },
        { title: '이른 이별', src: 'songs/ChoYeon 2 Album/이른 이별.mp3' },
        {
          title: '언제나, 누구에게나',
          src: 'songs/ChoYeon 2 Album/언제나, 누구에게나.mp3',
        },
        {
          title: '오늘 날씨는 맑음',
          src: 'songs/ChoYeon 2 Album/오늘 날씨는 맑음.mp3',
        },
        {
          title: '일몰이 오기 전까지 춤을',
          src: 'songs/ChoYeon 2 Album/일몰이 오기 전까지 춤을.mp3',
        },
      ],
    },
    {
      title: '<3집> 존재 : 우주, 인간',
      cover: 'covers/KakaoTalk_20260122_231648526_02.jpg',
      tracks: [
        {
          title: '태양의 시작점',
          src: 'songs/ChoYeon 3 Album/태양의 시작점.mp3',
        },
        { title: '별빛과 같이', src: 'songs/ChoYeon 3 Album/별빛과 같이.mp3' },
      ],
    },
  ],
};

/* [추가] 서버에서 데이터 로드 함수 */
async function loadServerData() {
  try {
    const response = await fetch('http://localhost:8080/songs');
    dbSongs = await response.json();
    console.log('DB 데이터 로드 완료:', dbSongs);
  } catch (error) {
    console.error('서버 연결 실패:', error);
  }
}

/* 화면 전환 */
function show(target) {
  [home, typeSelect, albumList, player].forEach((s) =>
    s.classList.add('hidden'),
  );
  target.classList.remove('hidden');
}

/* 앨범 렌더 */
function renderAlbums(type) {
  albumContainer.innerHTML = '';
  albums[type].forEach((album) => {
    const div = document.createElement('div');
    div.className = 'album-card';
    div.innerHTML = `<img src="${album.cover}"><p>${album.title}</p>`;
    div.onclick = () => {
      currentAlbum = album;
      renderTracks(album);
      show(player);
    };
    albumContainer.appendChild(div);
  });
}

/* 트랙 렌더 */
function renderTracks(album) {
  albumCover.src = album.cover;
  lp.src = 'LP/LLP.PNG';
  trackList.innerHTML = '';

  album.tracks.forEach((t) => {
    const li = document.createElement('li');
    li.textContent = t.title;
    li.onclick = () => {
      playTrack(t);
      updateSongInfo(t.title); // [추가] 클릭 시 정보창 업데이트
    };
    trackList.appendChild(li);
  });
}

/* [추가] 정보창 업데이트 함수 */
function updateSongInfo(songTitle) {
  const songData = dbSongs.find((s) => s.title === songTitle);
  infoTitle.textContent = songTitle;

  if (songData) {
    infoDetail.classList.remove('hidden');
    noInfoMsg.classList.add('hidden');

    // 데이터 꽂아주기 (DB 컬럼명과 매칭 확인!)
    infoArtist.textContent = songData.artist || '-';
    infoAlbumName.textContent = songData.albumName || '-';
    infoReleaseYear.textContent = songData.releaseYear || '-'; // DB에 release_year 컬럼이 있어야 함
    infoGenre.textContent = songData.genre || '-';
    infoComposer.textContent = songData.composer || '-';
    infoLyricist.textContent = songData.lyricist || '-';
  } else {
    infoDetail.classList.add('hidden');
    noInfoMsg.classList.remove('hidden');
  }
}

/* 재생 로직 */
function playTrack(track) {
  audio.src = track.src;
  audio.play();
  player.classList.add('playing');
  playBtn.textContent = '⏸';
}

/* 이벤트 리스너 */
enterBtn.onclick = async () => {
  await loadServerData(); // [수정] 진입 시 서버 데이터 로드
  show(typeSelect);
};

document.querySelectorAll('.card').forEach((c) => {
  c.onclick = () => {
    renderAlbums(c.dataset.type);
    show(albumList);
  };
});

playBtn.onclick = () => {
  if (audio.paused) {
    audio.play();
    player.classList.add('playing');
    playBtn.textContent = '⏸';
  } else {
    audio.pause();
    player.classList.remove('playing');
    playBtn.textContent = '▶';
  }
};

/* 시간 포맷 및 업데이트 (기존 유지) */
function formatTime(seconds) {
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60);
  return `${min}:${sec < 10 ? '0' : ''}${sec}`;
}

audio.onloadedmetadata = () => {
  durationEl.textContent = formatTime(audio.duration);
};

audio.ontimeupdate = () => {
  currentTimeEl.textContent = formatTime(audio.currentTime);
  progressBar.value = (audio.currentTime / audio.duration) * 100 || 0;
};

progressBar.oninput = () => {
  audio.currentTime = (progressBar.value / 100) * audio.duration;
};

document.querySelectorAll('.back-btn').forEach((btn) => {
  btn.onclick = () => {
    audio.pause();
    audio.currentTime = 0;
    player.classList.remove('playing');
    show(document.getElementById(btn.dataset.target));
  };
});
