document.addEventListener('DOMContentLoaded', () => {
    const audioPlayer = document.getElementById('audio-player');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const progressBar = document.getElementById('progress-bar');
    const timeDisplay = document.getElementById('time-display');

    let isPlaying = false;

    // 播放/暂停功能
    playPauseBtn.addEventListener('click', () => {
        if (isPlaying) {
            audioPlayer.pause();
            playPauseBtn.textContent = '播放';
        } else {
            audioPlayer.play();
            playPauseBtn.textContent = '暂停';
        }
        isPlaying = !isPlaying;
    });

    // 格式化时间函数
    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }

    // 更新进度条和时间显示
    audioPlayer.addEventListener('timeupdate', () => {
        const { currentTime, duration } = audioPlayer;
        if (duration) {
            progressBar.value = (currentTime / duration) * 100;
            timeDisplay.textContent = `${formatTime(currentTime)} / ${formatTime(duration)}`;
        }
    });

    // 拖动进度条改变播放进度
    progressBar.addEventListener('input', () => {
        const { duration } = audioPlayer;
        if (duration) {
            audioPlayer.currentTime = (progressBar.value / 100) * duration;
        }
    });

    // 当音频加载完毕后，更新总时长
    audioPlayer.addEventListener('loadedmetadata', () => {
        timeDisplay.textContent = `00:00 / ${formatTime(audioPlayer.duration)}`;
    });
});