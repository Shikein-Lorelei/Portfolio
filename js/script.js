let currentSongIndex = 0;
        const sidebar = document.getElementById("sidebar");
        const menuToggle = document.getElementById("menuToggle");
        const songSelector = document.getElementById("songSelector");
        const audioPlayer = document.getElementById("audioPlayer");
        const playBtn = document.getElementById("playBtn");
        const seekBar = document.getElementById("seekBar");
        const marqueeText = document.getElementById("marqueeText");

        const songs = [
            { title: 'Algernon - Yorushika', file: 'Music/Algernon.mp3' },
            { title: 'Anti Hero - Mighfar Suganda', file: 'Music/AntiHero.mp3' },
            { title: 'The end of beginning Acoustic Cover - Lime', file: 'Music/TheEndOfBeginning.mp3' },
        ];

        // Fungsi untuk mengisi dropdown dengan lagu
        function populateDropdown() {
            songs.forEach((song, index) => {
                const option = document.createElement("option");
                option.value = index; // Gunakan indeks sebagai nilai
                option.textContent = song.title; // Tampilkan judul lagu
                songSelector.appendChild(option);
            });
        }

        // Panggil fungsi untuk mengisi dropdown
        populateDropdown();

        // Fungsi untuk memutar lagu
        function playSong(index) {
            currentSongIndex = index;
            audioPlayer.src = songs[index].file;
            audioPlayer.play();
            seekBar.value = 0;
            updatePlayButton(true);
            updateMarqueeText(songs[index].title); // Perbarui teks berjalan
        }

        // Fungsi untuk memperbarui teks berjalan
        function updateMarqueeText(songTitle) {
            marqueeText.textContent = `♬Now playing: ${songTitle}`;
        }

        // Update tombol play/pause
        function updatePlayButton(isPlaying) {
            const playIcon = playBtn.querySelector('i');
            if (isPlaying) {
                playIcon.classList.remove('fa-play');
                playIcon.classList.add('fa-pause');
            } else {
                playIcon.classList.remove('fa-pause');
                playIcon.classList.add('fa-play');
            }
        }

        // Event listener untuk dropdown
        songSelector.addEventListener("change", (event) => {
            const selectedIndex = parseInt(event.target.value, 10);
            if (!isNaN(selectedIndex)) {
                playSong(selectedIndex);
            }
        });

        // Event listener untuk tombol play/pause
        playBtn.addEventListener("click", () => {
            if (audioPlayer.paused) {
                audioPlayer.play();
                updatePlayButton(true);
                updateMarqueeText(songs[currentSongIndex].title);
            } else {
                audioPlayer.pause();
                updatePlayButton(false);
            }
        });

        // Event listener untuk audio selesai diputar
        audioPlayer.addEventListener("ended", () => {
            updatePlayButton(false);
        });

        // Update progress bar secara real-time
        audioPlayer.addEventListener("timeupdate", () => {
            const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
            seekBar.value = progress;
        });

        menuToggle.addEventListener("click", () => {
            if (sidebar.style.display === "block") {
                sidebar.style.display = "none";
            } else {
                const rect = menuToggle.getBoundingClientRect();
                sidebar.style.display = "block";
                if (rect.left < window.innerWidth / 2) {
                    sidebar.style.left = "10px";
                    sidebar.style.right = "auto";
                } else {
                    sidebar.style.right = "10px";
                    sidebar.style.left = "auto";
                }
            }
        });