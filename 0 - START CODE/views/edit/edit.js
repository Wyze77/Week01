const dom_questionsList = document.querySelector("#questionsList");
const dom_modal = document.querySelector("#modal");
const dom_modalTitle = document.querySelector("#modalTitle");
const dom_addBtn = document.querySelector("#addBtn");
const dom_saveBtn = document.querySelector("#saveBtn");
const dom_cancelBtn = document.querySelector("#cancelBtn");

const inputTitle = document.querySelector("#inputTitle");
const inputA = document.querySelector("#inputA");
const inputB = document.querySelector("#inputB");
const inputC = document.querySelector("#inputC");
const inputD = document.querySelector("#inputD");
const inputCorrect = document.querySelector("#inputCorrect");

let questions = JSON.parse(localStorage.getItem('questions')) || [];
let editingIndex = -1;

function renderQuestions() {
    dom_questionsList.innerHTML = "";
    
    questions.forEach((q, index) => {
        const item = document.createElement("div");
        item.className = "bg-white p-4 rounded-lg shadow-sm border-l-4 border-purple-500 flex justify-between items-center group hover:shadow-md transition";
        
        item.innerHTML = `
            <div class="w-3/4">
                <h3 class="font-bold text-lg truncate">${index + 1}. ${q.title}</h3>
            </div>
            <div class="flex gap-4">
                <button onclick="editQuestion(${index})" class="text-blue-500 hover:text-blue-700" title="Edit">
                    <img src="../../img/edit.svg" class="w-6 h-6"> 
                </button>
                <button onclick="deleteQuestion(${index})" class="text-red-500 hover:text-red-700" title="Delete">
                    <img src="../../img/trash.png" class="w-6 h-6">
                </button>
            </div>
        `;
        dom_questionsList.appendChild(item);
    });
}

dom_addBtn.addEventListener("click", () => {
    editingIndex = -1;
    dom_modalTitle.textContent = "Create New Question";
    clearInputs();
    dom_modal.classList.remove("hidden");
});

window.editQuestion = (index) => {
    editingIndex = index;
    dom_modalTitle.textContent = "Edit Question";
    
    const q = questions[index];
    inputTitle.value = q.title;
    inputA.value = q.choiceA;
    inputB.value = q.choiceB;
    inputC.value = q.choiceC;
    inputD.value = q.choiceD;
    inputCorrect.value = q.correct;

    dom_modal.classList.remove("hidden");
};

dom_saveBtn.addEventListener("click", () => {
    if(inputTitle.value.trim() === "") return alert("Please enter a question title.");

    const newQuestion = {
        title: inputTitle.value,
        choiceA: inputA.value,
        choiceB: inputB.value,
        choiceC: inputC.value,
        choiceD: inputD.value,
        correct: inputCorrect.value,
    };

    if (editingIndex === -1) {
        questions.push(newQuestion);
    } else {
        questions[editingIndex] = newQuestion;
    }

    saveToStorage();
    renderQuestions();
    dom_modal.classList.add("hidden");
});

window.deleteQuestion = (index) => {
    if (confirm("Are you sure you want to delete this question?")) {
        questions.splice(index, 1);
        saveToStorage();
        renderQuestions();
    }
};

function saveToStorage() {
    localStorage.setItem('questions', JSON.stringify(questions));
}

function clearInputs() {
    inputTitle.value = "";
    inputA.value = "";
    inputB.value = "";
    inputC.value = "";
    inputD.value = "";
    inputCorrect.value = "A";
}

dom_cancelBtn.addEventListener("click", () => {
    dom_modal.classList.add("hidden");
});

renderQuestions();