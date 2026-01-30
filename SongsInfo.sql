create database if not exists music_info_db;
use music_info_db;

CREATE TABLE IF NOT EXISTS songs (
    id INT PRIMARY KEY,    	       				   -- 고유 번호
    title VARCHAR(255) NOT NULL,          	       -- 곡 제목
    artist VARCHAR(255) NOT NULL,        	       -- 아티스트 이름
    album_name VARCHAR(255),            	       -- 앨범 이름
    album_artist VARCHAR(255),          	       -- 앨범 아티스트 이름
    release_year INT,                     	       -- 발매 연도 (숫자 4자리)
    genre VARCHAR(100),                 	       -- 장르
    disc_number INT,             				   -- 디스크 번호
    track_number INT,                    		   -- 트랙 번호
    composer VARCHAR(255),                		   -- 작곡가
    lyricist VARCHAR(255)                         -- 작사가
);

INSERT INTO songs (id, title, artist, album_name, album_artist, release_year, genre, disc_number, track_number, composer, lyricist)
VALUES (1, '새벽 꿈', '초연', '꿈 : 출발, 성장', '초연', 2026, 'Band Music', 1, 1, '김명진', '김명진');

INSERT INTO songs (id, title, artist, album_name, album_artist, release_year, genre, disc_number, track_number, composer, lyricist)
VALUES (2, '출항', '초연', '꿈 : 출발, 성장', '초연', 2026, 'Band Music', 1, 2, '김명진', '김명진');

INSERT INTO songs (id, title, artist, album_name, album_artist, release_year, genre, disc_number, track_number, composer, lyricist)
VALUES (3, '바다 심장', '초연', '꿈 : 출발, 성장', '초연', 2026, 'Band Music', 1, 3, '김명진', '김명진');

USE music_info_db;  -- 이 데이터베이스를 쓰겠다고 명시
SELECT * FROM songs; -- 이제 에러 없이 데이터가 보일 겁니다

INSERT INTO songs (title, artist, album_name, album_artist, release_year, genre, disc_number, track_number, composer, lyricist)
VALUES ('만화경', '초연', '꿈 : 출발, 성장', '초연', 2026, 'Band Music', 1, 4, '김명진', '김명진');

SELECT * FROM songs;

INSERT INTO songs (title, artist, album_name, album_artist, release_year, genre, disc_number, track_number, composer, lyricist)
VALUES ('노을 상상', '초연', '꿈 : 출발, 성장', '초연', 2026, 'Band Music', 1, 5, '김명진', '김명진');

INSERT INTO songs (title, artist, album_name, album_artist, release_year, genre, disc_number, track_number, composer, lyricist)
VALUES ('꺼져가는 불빛의 소원', '초연', '꿈 : 출발, 성장', '초연', 2026, 'Band Music', 1, 6, '김명진', '김명진');

INSERT INTO songs (title, artist, album_name, album_artist, release_year, genre, disc_number, track_number, composer, lyricist)
VALUES ('성간 여행', '초연', '꿈 : 출발, 성장', '초연', 2026, 'Band Music', 1, 7, '김명진', '김명진');

INSERT INTO songs (title, artist, album_name, album_artist, release_year, genre, disc_number, track_number, composer, lyricist)
VALUES ('그리움은 뿌리가 될거야', '초연', '삶 : 우리, 감정', '초연', 2026, 'Band Music', 1, 1, '김명진', '김명진');

INSERT INTO songs (title, artist, album_name, album_artist, release_year, genre, disc_number, track_number, composer, lyricist)
VALUES ('내가 살았던 동네는', '초연', '삶 : 우리, 감정', '초연', 2026, 'Band Music', 1, 2, '김명진', '김명진');

INSERT INTO songs (title, artist, album_name, album_artist, release_year, genre, disc_number, track_number, composer, lyricist)
VALUES ('이른 이별', '초연', '삶 : 우리, 감정', '초연', 2026, 'Band Music', 1, 3, '김명진', '김명진');

INSERT INTO songs (title, artist, album_name, album_artist, release_year, genre, disc_number, track_number, composer, lyricist)
VALUES ('언제나, 누구에게나', '초연', '삶 : 우리, 감정', '초연', 2026, 'Band Music', 1, 4, '김명진', '김명진');

INSERT INTO songs (title, artist, album_name, album_artist, release_year, genre, disc_number, track_number, composer, lyricist)
VALUES ('오늘 날씨는 맑음', '초연', '삶 : 우리, 감정', '초연', 2026, 'Band Music', 1, 5, '김명진', '김명진');

INSERT INTO songs (title, artist, album_name, album_artist, release_year, genre, disc_number, track_number, composer, lyricist)
VALUES ('일몰이 오기 전까지 춤을', '초연', '삶 : 우리, 감정', '초연', 2026, 'Band Music', 1, 6, '김명진', '김명진');

SELECT * FROM songs;

INSERT INTO songs (title, artist, album_name, album_artist, release_year, genre, disc_number, track_number, composer, lyricist)
VALUES ('태양의 시작점', '초연', '존재 : 우주, 인간', '초연', 2026, 'Band Music', 1, 1, '김명진', '김명진');

INSERT INTO songs (title, artist, album_name, album_artist, release_year, genre, disc_number, track_number, composer, lyricist)
VALUES ('별빛과 같이', '초연', '존재 : 우주, 인간', '초연', 2026, 'Band Music', 1, 2, '김명진', '김명진');