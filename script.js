let currentModule = "";
let currentSubtopic = "";
let xp = parseInt(localStorage.getItem("xp")) || 0;

let testQueue = [];
let totalQuestionsInSession = 0;
let actualCorrectFirstTry = 0; 
let wronglyAnswered = new Set();

const data = {
    letter: {
        title: "Letter Writing",
        subtopics: {
            parts: {
                title: "1️⃣ Letter Parts",
                items: [
                    {id: "lw1", m: "प्रति", e: "To (Recipient)"},
                    {id: "lw2", m: "विषय", e: "Subject"},
                    {id: "lw3", m: "महोदय", e: "Respected Sir"},
                    {id: "lw4", m: "मॅडम", e: "Respected Madam"},
                    {id: "lw5", m: "नमस्कार", e: "Greetings"},
                    {id: "lw6", m: "आपला नम्र", e: "Yours sincerely"},
                    {id: "lw7", m: "आपला विश्वासू", e: "Yours faithfully"},
                    {id: "lw8", m: "नाव", e: "Name"},
                    {id: "lw9", m: "दिनांक", e: "Date"},
                    {id: "lw10", m: "ठिकाण", e: "Place"}
                ]
            },
            openings: {
                title: "2️⃣ Letter Openings",
                items: [
                    {id: "lw11", m: "हे पत्र लिहिण्याचे कारण", e: "Reason for writing this letter"},
                    {id: "lw12", m: "आपणास कळविण्यात येते की", e: "I want to inform you that"},
                    {id: "lw13", m: "मला सांगायचे आहे की", e: "I want to say that"},
                    {id: "lw14", m: "माझ्या मते", e: "In my opinion"},
                    {id: "lw15", m: "माझे मत असे आहे की", e: "My opinion is that"},
                    {id: "lw16", m: "मला असे वाटते की", e: "I feel that"}
                ]
            },
            requests: {
                title: "3️⃣ Requests / Permissions",
                items: [
                    {id: "lw17", m: "कृपया", e: "Please"},
                    {id: "lw18", m: "सविनय विनंती", e: "Humble request"},
                    {id: "lw19", m: "परवानगी द्यावी", e: "Please give permission"},
                    {id: "lw20", m: "लक्ष द्यावे", e: "Please pay attention"},
                    {id: "lw21", m: "माहिती द्यावी", e: "Please provide information"}
                ]
            },
            endings: {
                title: "4️⃣ Polite Endings",
                items: [
                    {id: "lw22", m: "धन्यवाद", e: "Thank you"},
                    {id: "lw23", m: "धन्यवादासह", e: "With thanks"}
                ]
            },
            time_ref: {
                title: "5️⃣ Time / Reference",
                items: [
                    {id: "lw24", m: "आज", e: "Today"},
                    {id: "lw25", m: "उद्या", e: "Tomorrow"},
                    {id: "lw26", m: "लवकरच", e: "Soon"},
                    {id: "lw27", m: "मागील पत्रानुसार", e: "As per previous letter"},
                    {id: "lw28", m: "पुढील माहिती", e: "Further information"}
                ]
            }
        }
    },
    swamat: {
        title: "Self Answers",
        subtopics: {
            starters: {
                title: "1️⃣ Opinion Starters",
                items: [
                    {id: "sa1", m: "माझ्या मते", e: "In my opinion"},
                    {id: "sa2", m: "माझे मत असे आहे की", e: "My opinion is that"},
                    {id: "sa3", m: "मला असे वाटते की", e: "I feel that"},
                    {id: "sa4", m: "माझ्या विचारानुसार", e: "According to my thinking"},
                    {id: "sa5", m: "मी असे मानतो/मानते की", e: "I believe that"},
                    {id: "sa6", m: "माझ्या दृष्टीने", e: "From my point of view"}
                ]
            },
            support: {
                title: "2️⃣ Supporting",
                items: [
                    {id: "sa7", m: "माझ्या अनुभवातून", e: "From my experience"},
                    {id: "sa8", m: "यावरून असे दिसते की", e: "From this it appears that"},
                    {id: "sa9", m: "माझ्या मते हे महत्त्वाचे आहे", e: "I think this is important"},
                    {id: "sa10", m: "हे योग्य आहे कारण...", e: "This is correct because..."},
                    {id: "sa11", m: "हे उपयोगी आहे कारण...", e: "This is useful because..."}
                ]
            },
            concluding: {
                title: "3️⃣ Concluding",
                items: [
                    {id: "sa12", m: "म्हणून मला असे वाटते की", e: "Therefore I feel that"},
                    {id: "sa13", m: "शेवटी असे म्हणता येईल की", e: "Finally, it can be said that"},
                    {id: "sa14", m: "माझ्या मतानुसार हे सर्वोत्तम आहे", e: "According to me, this is the best"},
                    {id: "sa15", m: "माझ्या दृष्टीने हा योग्य पर्याय आहे", e: "From my point of view, this is the correct option"}
                ]
            }
        }
    },
    basics: {
        title: "Basic Words",
        subtopics: {
            polite: {
                title: "1️⃣ Polite Words",
                items: [
                    {id: "bw1", m: "हो", e: "Yes"},
                    {id: "bw2", m: "नाही", e: "No"},
                    {id: "bw3", m: "माफ करा", e: "Sorry / Excuse me"},
                    {id: "bw4", m: "ठीक आहे", e: "Okay / Fine"},
                    {id: "bw5", m: "चालेल", e: "It’s okay / Will do"}
                ]
            },
            questions: {
                title: "2️⃣ Question Words",
                items: [
                    {id: "bw6", m: "काय?", e: "What?"},
                    {id: "bw7", m: "कोण?", e: "Who?"},
                    {id: "bw8", m: "कुठे?", e: "Where?"},
                    {id: "bw9", m: "कधी?", e: "When?"},
                    {id: "bw10", m: "का?", e: "Why?"},
                    {id: "bw11", m: "किती?", e: "How much / How many?"}
                ]
            },
            places: {
                title: "3️⃣ Places",
                items: [
                    {id: "bw12", m: "इथे", e: "Here"},
                    {id: "bw13", m: "तिथे", e: "There"},
                    {id: "bw14", m: "सामोरं", e: "In front"},
                    {id: "bw15", m: "मागे", e: "Behind"},
                    {id: "bw16", m: "जवळ", e: "Near"},
                    {id: "bw17", m: "दूर", e: "Far"}
                ]
            },
            actions: {
                title: "4️⃣ Verbs",
                items: [
                    {id: "bw18", m: "जा", e: "Go"},
                    {id: "bw19", m: "या", e: "Come"},
                    {id: "bw20", m: "बसा", e: "Sit"},
                    {id: "bw21", m: "उभा राहा", e: "Stand"},
                    {id: "bw22", m: "वाचा", e: "Read"},
                    {id: "bw23", m: "लिखा", e: "Write"},
                    {id: "bw24", m: "ऐका", e: "Listen"},
                    {id: "bw25", m: "बोल", e: "Speak / Talk"}
                ]
            },
            adjectives: {
                title: "5️⃣ Adjectives",
                items: [
                    {id: "bw26", m: "चांगले", e: "Good"},
                    {id: "bw27", m: "वाईट", e: "Bad"},
                    {id: "bw28", m: "मोठे", e: "Big"},
                    {id: "bw29", m: "लहान", e: "Small"},
                    {id: "bw30", m: "सोपे", e: "Easy"},
                    {id: "bw31", m: "कठीण", e: "Difficult"},
                    {id: "bw32", m: "महत्त्वाचे", e: "Important"}
                ]
            },
            expressions: {
                title: "6️⃣ Daily Use",
                items: [
                    {id: "bw33", m: "मला मदत हवी आहे", e: "I need help"},
                    {id: "bw34", m: "कृपया मदत करा", e: "Please help"},
                    {id: "bw35", m: "मला समजले", e: "I understood"},
                    {id: "bw36", m: "मला समजले नाही", e: "I did not understand"},
                    {id: "bw37", m: "मला आवडते", e: "I like it"},
                    {id: "bw38", m: "मला आवडत नाही", e: "I do not like it"}
                ]
            }
        }
    },
    exam: {
        title: "Exam Prep",
        subtopics: {
            conversation: {
                title: "1️⃣ Spoken Phrases",
                items: [
                    {id: "dc1", m: "तुमचे नाव काय?", e: "What is your name?"},
                    {id: "dc2", m: "माझे नाव ... आहे", e: "My name is ..."},
                    {id: "dc3", m: "तुम्ही कसे आहात?", e: "How are you?"},
                    {id: "dc4", m: "मी ठिक आहे", e: "I am fine"},
                    {id: "dc5", m: "काय चालले आहे?", e: "What’s going on?"},
                    {id: "dc6", m: "कृपया सांगू शकता का?", e: "Can you please tell?"},
                    {id: "dc7", m: "मला माहित नाही", e: "I don’t know"},
                    {id: "dc8", m: "मला मदत हवी आहे", e: "I need help"},
                    {id: "dc9", m: "काय घडले?", e: "What happened?"},
                    {id: "dc10", m: "चला जाऊया", e: "Let’s go"}
                ]
            },
            exam_adj: {
                title: "2️⃣ Exam Adjectives",
                items: [
                    {id: "ex1", m: "सुंदर", e: "Beautiful"},
                    {id: "ex2", m: "आनंदी", e: "Happy"},
                    {id: "ex3", m: "दुःखी", e: "Sad"},
                    {id: "ex4", m: "स्वच्छ", e: "Clean"},
                    {id: "ex5", m: "अस्वच्छ", e: "Dirty"},
                    {id: "ex6", m: "स्मार्ट", e: "Smart"},
                    {id: "ex7", m: "शक्तिशाली", e: "Powerful"},
                    {id: "ex8", m: "मजेदार", e: "Interesting / Fun"},
                    {id: "ex9", m: "सहकारी", e: "Cooperative"},
                    {id: "ex10", m: "सोपे", e: "Easy"}
                ]
            },
            routine: {
                title: "3️⃣ Time / Routine",
                items: [
                    {id: "t1", m: "सकाळी", e: "Morning"},
                    {id: "t2", m: "दुपारी", e: "Afternoon"},
                    {id: "t3", m: "संध्याकाळी", e: "Evening"},
                    {id: "t4", m: "रात्री", e: "Night"},
                    {id: "t5", m: "आज", e: "Today"},
                    {id: "t6", m: "उद्या", e: "Tomorrow"},
                    {id: "t7", m: "काल", e: "Yesterday"},
                    {id: "t8", m: "दररोज", e: "Every day"},
                    {id: "t9", m: "आता", e: "Now"},
                    {id: "t10", m: "लवकरच", e: "Soon"}
                ]
            }
        }
    }
};

function updateStats() {
    document.getElementById("xp-count").innerText = xp;
    document.getElementById("level-count").innerText = Math.floor(xp / 100) + 1;
    localStorage.setItem("xp", xp);
}

function showHub() {
    document.getElementById("main-hub").classList.remove("hidden");
    document.getElementById("module-view").classList.add("hidden");
    closeDialogue();
}

function openModule(id) {
    currentModule = id;
    const moduleData = data[id];
    document.getElementById("main-hub").classList.add("hidden");
    document.getElementById("module-view").classList.remove("hidden");
    document.getElementById("module-title").innerText = moduleData.title;
    document.getElementById("tab-menu").classList.add("hidden");
    
    let content = document.getElementById("content-display");
    content.innerHTML = `<div class="hub-grid">
        ${Object.keys(moduleData.subtopics).map(key => `
            <div class="card" onclick="selectSubtopic('${key}')">${moduleData.subtopics[key].title}</div>
        `).join('')}
    </div>`;
}

function selectSubtopic(subKey) {
    currentSubtopic = subKey;
    document.getElementById("tab-menu").classList.remove("hidden");
    renderFlashcards();
}

function renderFlashcards() {
    document.getElementById("btn-flash").classList.add("active");
    document.getElementById("btn-test").classList.remove("active");
    const items = data[currentModule].subtopics[currentSubtopic].items;
    const item = items[Math.floor(Math.random() * items.length)];

    document.getElementById("content-display").innerHTML = `
        <div class="flashcard" onclick="this.querySelector('.card-inner').innerText = (this.querySelector('.card-inner').innerText === '${item.e}') ? '${item.m}' : '${item.e}'">
            <div class="card-inner">${item.e}</div>
            <small style="color:var(--text-gray);">Click to Flip</small>
        </div>
        <button class="quiz-btn" style="background:var(--primary-blue); color:white;" onclick="renderFlashcards()">Next Card</button>
    `;
}

function startTest() {
    document.getElementById("btn-flash").classList.remove("active");
    document.getElementById("btn-test").classList.add("active");
    testQueue = [...data[currentModule].subtopics[currentSubtopic].items].sort(() => Math.random() - 0.5);
    totalQuestionsInSession = testQueue.length;
    actualCorrectFirstTry = 0;
    wronglyAnswered = new Set();
    renderNextQuestion();
}

function renderNextQuestion() {
    if (testQueue.length === 0) return showResults();
    const item = testQueue[0];
    const correct = item.m;
    let options = [correct];
    let all = data[currentModule].subtopics[currentSubtopic].items.map(i => i.m);
    while (options.length < Math.min(3, all.length)) {
        let r = all[Math.floor(Math.random() * all.length)];
        if (!options.includes(r)) options.push(r);
    }
    options.sort(() => Math.random() - 0.5);

    document.getElementById("progress-bar").style.width = ((totalQuestionsInSession - testQueue.length) / totalQuestionsInSession * 100) + "%";
    document.getElementById("content-display").innerHTML = `
        <h3>Translate: "${item.e}"</h3>
        ${options.map(opt => `<button class="quiz-btn" onclick="checkAnswer('${opt}', '${correct}')">${opt}</button>`).join('')}
    `;
}

function checkAnswer(sel, cor) {
    const isCorrect = (sel === cor);
    const item = testQueue[0];
    if (isCorrect) {
        testQueue.shift();
        if (!wronglyAnswered.has(item.id)) { actualCorrectFirstTry++; xp += 10; }
        else { xp += 2; }
    } else {
        wronglyAnswered.add(item.id);
        testQueue.push(testQueue.shift());
    }
    updateStats();
    showFeedback(isCorrect, cor);
}

function showFeedback(isCorrect, cor) {
    const footer = document.createElement("div");
    footer.className = `quiz-footer ${isCorrect ? 'correct-lite' : 'wrong-lite'}`;
    footer.innerHTML = `<div class="footer-content">
        <div class="footer-text"><strong>${isCorrect ? '✔ Correct!' : '✖ Answer:'}</strong><span>${cor}</span></div>
        <button class="proceed-btn" onclick="this.parentElement.parentElement.remove(); renderNextQuestion();">Continue</button>
    </div>`;
    document.body.appendChild(footer);
}

function showResults() {
    const acc = Math.round((actualCorrectFirstTry / totalQuestionsInSession) * 100);
    document.getElementById("content-display").innerHTML = `
        <div style="text-align:center">
            <h2>Done! 🏆</h2>
            <div style="font-size:3rem; font-weight:900; color:var(--primary-blue);">${acc}%</div>
            <p>Score: ${actualCorrectFirstTry}/${totalQuestionsInSession}</p>
            <button class="quiz-btn" style="background:var(--success-green); color:white;" onclick="startTest()">Try Again</button>
            <button class="quiz-btn" onclick="showHub()">Back Home</button>
        </div>
    `;
}

function closeDialogue() {
    const f = document.querySelector(".quiz-footer");
    if (f) f.remove();
}

updateStats();
