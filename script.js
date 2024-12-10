function showFinalResult() {
    video.style.display = 'none';
    colorBox.style.display = 'none';
    expressionDiv.style.display = 'none';

    emotionResult.style.display = 'block';
    finalColorBox.style.width = '400px';
    finalColorBox.style.height = '200px';
    finalColorBox.style.margin = '20px auto';
    finalColorBox.style.background = finalColor;

    // 메인 감정 텍스트 출력
    mainEmotionText.textContent = mainEmotion;

    // 메인 감정의 음악 볼륨 높이기
    Object.values(audioMap).forEach(audio => audio.volume = 0); // 모든 음악 볼륨 0으로 설정
    if (audioMap[mainEmotion]) {
        audioMap[mainEmotion].volume = 1; // 메인 감정 음악 볼륨 높임
    }

    // 1초 후 입력 창 표시
    setTimeout(() => {
        createInputSection();
    }, 1000);
}

function createInputSection() {
    const inputSection = document.createElement('div');
    inputSection.style.textAlign = 'center';
    inputSection.style.marginTop = '20px';

    const dateNow = new Date();
    const formattedDate = `${dateNow.getFullYear()}년 ${dateNow.getMonth() + 1}월 ${dateNow.getDate()}일`;

    const dateText = document.createElement('p');
    dateText.textContent = formattedDate;
    inputSection.appendChild(dateText);

    const inputBox = document.createElement('input');
    inputBox.type = 'text';
    inputBox.placeholder = '이름을 입력하세요';
    inputBox.style.marginRight = '10px';

    const inputButton = document.createElement('button');
    inputButton.textContent = '입력하기';
    inputButton.addEventListener('click', () => handleInputSubmit(inputBox.value, formattedDate));

    inputSection.appendChild(inputBox);
    inputSection.appendChild(inputButton);

    const guideText = document.createElement('p');
    guideText.textContent = "이름을 입력하여 이 감정을 기록해보세요.";
    guideText.style.marginTop = '10px';

    inputSection.appendChild(guideText);
    emotionResult.appendChild(inputSection);
}

function handleInputSubmit(name, date) {
    if (!name.trim()) {
        alert("이름을 입력하세요.");
        return;
    }

    // 감정 기록 완료 화면 생성
    emotionResult.innerHTML = ''; // 기존 내용 제거

    const recordSection = document.createElement('div');
    recordSection.style.textAlign = 'center';

    const dateText = document.createElement('p');
    dateText.textContent = date;
    dateText.style.marginBottom = '20px';
    recordSection.appendChild(dateText);

    const emotionTitle = document.createElement('h2');
    emotionTitle.textContent = `${name}의 감정`;
    emotionTitle.style.marginBottom = '20px';
    recordSection.appendChild(emotionTitle);

    const colorBox = document.createElement('div');
    colorBox.style.width = '400px';
    colorBox.style.height = '200px';
    colorBox.style.background = finalColor;
    colorBox.style.margin = '0 auto 20px';
    recordSection.appendChild(colorBox);

    const emotionText = document.createElement('p');
    emotionText.textContent = mainEmotion;
    emotionText.style.fontSize = '1.5rem';
    emotionText.style.marginBottom = '10px';
    recordSection.appendChild(emotionText);

    const messageText = document.createElement('p');
    messageText.textContent = emotionData[mainEmotion]?.message || "감정과 관련된 추천 문구가 없습니다.";
    recordSection.appendChild(messageText);

    const restartButton = document.createElement('button');
    restartButton.textContent = '처음으로 돌아가기';
    restartButton.style.marginTop = '20px';
    restartButton.addEventListener('click', restartApp);
    recordSection.appendChild(restartButton);

    emotionResult.appendChild(recordSection);
}

function restartApp() {
    // 초기 상태로 되돌리기
    emotionResult.style.display = 'none';
    title.style.display = 'block';
    subtitle.textContent = "당신의 감정을 확인해보세요.";
    subtitle.style.display = 'block';
    clickText.style.display = 'block';
    finalColor = '';
    mainEmotion = '';
    Object.values(audioMap).forEach(audio => audio.pause()); // 음악 정지
}
