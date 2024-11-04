let timerInterval;
let seconds = 0;
const timerDisplay = document.getElementById("timer");
const workSummary = document.getElementById("workSummary");

window.onload = displayWorkSummary;

function startTimer() {
    if (!timerInterval) {
        timerInterval = setInterval(() => {
            seconds++;
            displayTime(seconds);
        }, 1000);
    }
}

function stopTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
}

function displayTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    timerDisplay.textContent =
        `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function saveTime() {
    const username = document.getElementById("username").value;
    if (username === "") {
        alert("Lütfen kullanıcı adınızı girin.");
        return;
    }

    const newTimeInSeconds = seconds;
    let userData = JSON.parse(localStorage.getItem(username)) || {};

    // Mevcut toplam süreyi al, yoksa 0 olarak başlat
    const currentTotalSeconds = calculateTotalTime(userData);

    // Yeni süreyi mevcut süreye ekle
    const updatedTotalSeconds = currentTotalSeconds + newTimeInSeconds;

    // Yeni toplam süreyi güncelle ve kaydet
    userData["total"] = formatTime(updatedTotalSeconds);
    localStorage.setItem(username, JSON.stringify(userData));

    alert(`Kayıt başarılı! ${username} adlı kullanıcının yeni toplam çalışma süresi: ${userData["total"]}`);

    displayWorkSummary();
    resetTimer();
}

function resetTimer() {
    stopTimer();
    seconds = 0;
    displayTime(seconds);
}

function displayWorkSummary() {
    let summaryText = "";
    for (let i = 0; i < localStorage.length; i++) {
        const username = localStorage.key(i);
        const userData = JSON.parse(localStorage.getItem(username));
        const totalTime = userData["total"] || "00:00:00";
        summaryText += `<p><strong>${username}:</strong> ${totalTime}</p>`;
    }
    workSummary.innerHTML = summaryText;
}

function calculateTotalTime(userData) {
    if (!userData["total"]) return 0;
    const [hours, minutes, seconds] = userData["total"].split(":").map(Number);
    return hours * 3600 + minutes * 60 + seconds;
}

function formatTime(totalSeconds) {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

