let currentModule = "";
let xp = parseInt(localStorage.getItem("xp")) || 0;

let testQueue = [];
let totalQuestionsInSession = 0;
let actualCorrectFirstTry = 0; 
let wronglyAnswered = new Set();

const data = {
    letter: [
        {id: "l1", m: "प्रति", e: "To (Recipient)"},
        {id: "l2", m: "विषय", e: "Subject"},
        {id: "l3", m: "महोदय", e: "Respected Sir"},
        {id: "l4", m: "मॅडम", e: "Respected Madam"},
        {id: "l5", m: "नमस्कार", e: "Greetings"},
        {id: "l6", m: "हे पत्र लिहिण्याचे कारण", e: "Reason for writing this letter"},
        {id: "l7", m: "आपणास कळविण्यात येते की", e: "I want to inform you that"},
        {id: "l8", m: "मला सांगायचे आहे की", e: "I want to say that"},
        {id: "l9", m: "कृपया", e: "Please"},
        {id: "l10", m: "सविनय विनंती", e: "Humble request"},
        {id: "l11", m: "परवानगी द्यावी", e: "Please give permission"},
        {id: "l12", m: "लक्ष द्यावे", e: "Please pay attention"},
        {id: "l13", m: "माहिती", e: "Information"},
        {id: "l14", m: "उत्तर", e: "Reply"},
        {id: "l15", m: "अपेक्षा आहे", e: "I hope"},
        {id: "l16", m: "धन्यवाद", e: "Thank you"},
        {id: "l17", m: "धन्यवादसह", e: "With thanks"},
        {id: "l18", m: "आपला नम्र", e: "Yours sincerely"},
        {id: "l19", m: "आपला विश्वासू", e: "Yours faithfully"},
        {id: "l20", m: "नाव", e: "Name"},
        {id: "l21", m: "दिनांक", e: "Date"},
        {id: "l22", m: "ठिकाण", e: "Place"}
    ],
    swamat: [
        {id: "s1", m: "माझ्या मते", e: "In my opinion"},
        {id: "s2", m: "माझे मत असे आहे की", e: "My opinion is that"},
        {id: "s3", m: "मला असे वाटते की", e: "I feel that"},
        {id: "s4", m: "माझ्या विचारानुसार", e: "According to my thinking"},
        {id: "s5", m: "मी असे मानतो/मानते की", e: "I believe that"},
        {id: "s6", m: "माझ्या अनुभवातून", e: "From my experience"},
        {id: "s7", m: "माझ्या दृष्टीने", e: "From my point of view"},
        {id: "s8", m: "यावरून असे दिसते की", e: "From this it appears that"},
        {id: "s9", m: "म्हणून मला असे वाटते की", e: "Therefore I feel that"},
        {id: "s10", m: "शेवटी असे म्हणता येईल की", e: "Finally, it can be said that"}
    ],
    vocab: [
        {id: "v1", m: "हे चांगले आहे", e: "This is good"},
        {id: "v2", m: "हे बरोबर आहे", e: "This is correct"},
        {id: "v3", m: "हे चुकीचे आहे", e: "This is wrong"},
        {id: "v4", m: "मला समजले", e: "I understood"},
        {id: "v5", m: "मला समजले नाही", e: "I did not understand"},
        {id: "v6", m: "हे महत्त्वाचे आहे", e: "This is important"},
        {id: "v7", m: "हे आवश्यक आहे", e: "This is necessary"},
        {id: "v8", m: "हे सोपे आहे", e: "This is easy"},
        {id: "v9", m: "हे कठीण आहे", e: "This is difficult"},
        {id: "v10", m: "मला आवडते", e: "I like it"},
        {id: "v11", m: "मला आवडत नाही", e: "I do not like it"},
        {id: "v12", m: "हे उपयोगी आहे", e: "This is useful"},
        {id: "v13", m: "हे योग्य आहे", e: "This is appropriate"},
        {id: "v14", m: "मला मदत हवी आहे", e: "I need help"},
        {id: "v15", m: "कृपया मदत करा", e: "Please help"}
    ],
    basics: [
        {id: "b1", m: "हो", e: "Yes"},
        {id: "b2", m: "नाही", e: "No"},
        {id: "b3", m: "माफ करा", e: "Sorry / Excuse me"},
        {id: "b4", m: "ठीक आहे", e: "Okay / Fine"},
        {id: "b5", m: "चालेल", e: "It’s okay / Will do"},
        {id: "b6", m: "काय?", e: "What?"},
        {id: "b7", m: "कोण?", e: "Who?"},
        {id: "b8", m: "कुठे?", e: "Where?"},
        {id: "b9", m: "कधी?", e: "When?"},
        {id: "b10", m: "का?", e: "Why?"},
        {id: "b11", m: "किती?", e: "How much / How many?"},
        {id: "b12", m: "इथे", e: "Here"},
        {id: "b13", m: "तिथे", e: "There"},
        {id: "b14", m: "थांबा", e: "Wait"},
        {id: "b15", m: "या", e: "Come"},
        {id: "b16", m: "जा", e: "Go"}
    ]
};

function updateStats() {
    document.getElementById("xp-count").innerText = xp;
    localStorage.setItem("xp", xp);
}

function openModule(id) {
    currentModule = id;
    document.getElementById("main-hub").classList.add("hidden");
    document.getElementById("module-view").classList.remove("hidden");
    document.getElementById("module-title").innerText = id.toUpperCase();
    
    document.getElementById("btn-flash").classList.add("active");
    document.getElementById("btn-test").classList.remove("active");
    
    renderFlashcards();
}

function showHub() {
    document.getElementById("main-hub").classList.remove("hidden");
    document.getElementById("module-view").classList.add("hidden");
    closeDialogue();
}

function renderFlashcards() {
    document.getElementById("btn-flash").classList.add("active");
    document.getElementById("btn-test").classList.remove("active");
    
    const content = document.getElementById("content-display");
    const moduleData = data[currentModule];
    const item = moduleData[Math.floor(Math.random() * moduleData.length)]; 

    content.innerHTML = `
        <div class="flashcard" onclick="flipCard(this, '${item.m}', '${item.e}')">
            <div class="card-inner">${item.e}</div>
            <small style="color:var(--text-gray);">Click to Flip</small>
        </div>
        <button class="quiz-btn" style="background:var(--primary-blue); color:white; text-align:center" onclick="renderFlashcards()">Next Random Card</button>
    `;
}

function flipCard(cardElement, marathi, english) {
    const textEl = cardElement.querySelector(".card-inner");
    textEl.innerText = (textEl.innerText === english) ? marathi : english;
}

function startTest() {
    document.getElementById("btn-flash").classList.remove("active");
    document.getElementById("btn-test").classList.add("active");
    
    testQueue = [...data[currentModule]];
    totalQuestionsInSession = testQueue.length;
    actualCorrectFirstTry = 0;
    wronglyAnswered = new Set();
    renderNextQuestion();
}

function renderNextQuestion() {
    const content = document.getElementById("content-display");
    if (testQueue.length === 0) {
        showResults();
        return;
    }

    const currentItem = testQueue[0];
    const correctAns = currentItem.m;
    
    let options = [correctAns];
    let allWordsInModule = data[currentModule].map(item => item.m);
    
    while (options.length < Math.min(3, allWordsInModule.length)) {
        let randomWord = allWordsInModule[Math.floor(Math.random() * allWordsInModule.length)];
        if (!options.includes(randomWord)) options.push(randomWord);
    }
    options.sort(() => Math.random() - 0.5);

    const progress = ((totalQuestionsInSession - testQueue.length) / totalQuestionsInSession) * 100;
    document.getElementById("progress-bar").style.width = progress + "%";

    content.innerHTML = `
        <h3 style="margin-top:20px;">Translate: "${currentItem.e}"</h3>
        <div id="quiz-options">
            ${options.map(opt => `<button class="quiz-btn" onclick="checkAnswer('${opt}', '${correctAns}')">${opt}</button>`).join('')}
        </div>
    `;
}

function checkAnswer(selected, correct) {
    const currentItem = testQueue[0];
    let isCorrect = (selected === correct);
    
    if (isCorrect) {
        testQueue.shift();
        if (!wronglyAnswered.has(currentItem.id)) {
            actualCorrectFirstTry++;
            xp += 10;
        } else { 
            xp += 2; 
        }
    } else {
        wronglyAnswered.add(currentItem.id);
        testQueue.push(testQueue.shift());
    }
    updateStats();

    closeDialogue();
    const footer = document.createElement("div");
    footer.className = `quiz-footer ${isCorrect ? 'correct-lite' : 'wrong-lite'}`;
    footer.innerHTML = `
        <div class="footer-content">
            <div class="footer-text">
                <strong>${isCorrect ? '✔ Nicely done!' : '✖ Correct solution:'}</strong>
                <span>${correct}</span>
            </div>
            <button class="proceed-btn" onclick="closeDialogue(); renderNextQuestion();">Continue</button>
        </div>
    `;
    document.body.appendChild(footer);
}

function closeDialogue() {
    const footer = document.querySelector(".quiz-footer");
    if (footer) footer.remove();
}

function showResults() {
    const content = document.getElementById("content-display");
    const accuracy = Math.round((actualCorrectFirstTry / totalQuestionsInSession) * 100);
    
    document.getElementById("progress-bar").style.width = "100%";

    content.innerHTML = `
        <div style="text-align:center">
            <h2>Test Complete! 🏆</h2>
            <div class="accuracy-circle">${accuracy}%</div>
            <p>Perfect First-Try Answers: ${actualCorrectFirstTry} / ${totalQuestionsInSession}</p>
            <button class="quiz-btn" style="background:var(--success-green); color:white; text-align:center" onclick="startTest()">Restart Test</button>
            <button class="quiz-btn" style="text-align:center" onclick="showHub()">Back to Hub</button>
        </div>
    `;
}

updateStats();