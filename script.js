// 1. 取得固定的頁面元素 (DOM Elements)
const input = document.querySelector("#guess");
const guessButton = document.querySelector("#guess-button");
const resetButton = document.querySelector("#reset-button");
const rangeText = document.querySelector("#range");
const message = document.querySelector("#message");
const attemptText = document.querySelector("#attempts");

// 2. 宣告會變動的遊戲狀態 (Game State)
let answer = 0;
let lower = 1;
let upper = 100;
let attempts = 0;
let finished = false;

// 3. 初始化新的一局 (Initialize Game)
function initializeGame() {
    // 隨機產生 1 ~ 100 的答案
    answer = Math.floor(Math.random() * 100) + 1;
    
    // 歸零與重設變數
    lower = 1;
    upper = 100;
    attempts = 0;
    finished = false;

    // 清空輸入框與狀態訊息
    input.value = "";
    message.textContent = "請輸入第一個數字";
    message.className = "message";
    
    // 更新畫面顯示
    renderGame();
}

// 4. 輸入檢查與錯誤攔截 (Input Validation)
function checkGuess() {
    const guess = Number(input.value);

    // 檢查是否為整數（排除空白、小數點）
    if (!Number.isInteger(guess)) {
        message.textContent = "請輸入整數";
        message.className = "message error";
        return;
    }

    // 檢查範圍外數字（不計算猜測次數）
    if (guess < lower || guess > upper) {
        message.textContent = "請輸入目前範圍內的數字";
        message.className = "message error";
        return;
    }

    // 通過檢查後，次數才 +1
    attempts = attempts + 1;

    // 5. 判斷大小並縮小範圍
    if (guess === answer) {
        finished = true;
        message.textContent = "答對了！";
        message.className = "message";
    } else if (guess < answer) {
        lower = guess + 1;
        message.textContent = "答案更大";
        message.className = "message";
    } else {
        upper = guess - 1;
        message.textContent = "答案更小";
        message.className = "message";
    }

    renderGame();
}

// 6. 更新畫面與按鈕狀態 (Render Game)
function renderGame() {
    rangeText.textContent = lower + " ~ " + upper;
    attemptText.textContent = "已猜 " + attempts + " 次";
    guessButton.disabled = finished; // 答對後停用按鈕
}

// 7. 事件監聽設定 (Event Listeners)
guessButton.addEventListener("click", function () {
    if (finished) return;
    checkGuess();
    input.select();
});

resetButton.addEventListener("click", initializeGame);

// 支援按下 Enter 鍵直接送出答案
input.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        guessButton.click();
    }
});

// 頁面載入時自動建立第一局
initializeGame();