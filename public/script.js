// https://opentdb.com/api.php?amount=20&category=18&difficulty=medium&type=multiple
const questions = document.getElementById('question');
const options = document.querySelector('.quiz-options')
const _correctScore = document.getElementById("correct-score");
const _totalQuestion = document.getElementById("total-question");

let correctAnswer = '', correctScore = askedCount = 0, totalQuestion = 20;

document.addEventListener('DOMContentLoaded', ()=>{
loadQuestions();
_totalQuestion.textContent = totalQuestion;
_correctScore.textContent = correctScore;
});

async function loadQuestions (){
    const apiUrl = "https://opentdb.com/api.php?amount=20&category=18&difficulty=medium&type=multiple";
    const result = await fetch(`${apiUrl}`);
    const data = await result.json()
    console.log(data);
    showQuestions(data.results[0]);
}

function showQuestions(data){
     correctAnswer = data.correct_answer;
    let incorrectAnswer = data.incorrect_answers;
    let optionsList = incorrectAnswer;
    optionsList.splice(Math.floor(Math.random() * (incorrectAnswer.length * 1 )), 0, correctAnswer);
    console.log(optionsList);
    console.log(correctAnswer);

    questions.innerHTML = `${data.question} <br> <span class = "category text-xs bg-[#6c4298] text-white px-2 py-1">${data.category}</span>
    `;
    options.innerHTML=`
    ${optionsList.map((option, index) =>`
                    <li class=" bg-blue-500 mb-3 px-2 py-2 rounded shadow-[0_4px_0_0_#6c4298] cursor-pointer hover:bg-gray-200 hover:text-black hover:shadow-[0_4px_0_0_#bbb]">${index + 1}. <span> ${option} </span></li>
                `).join("")}`

                selectedOption();
}

function selectedOption(){
    options.querySelectorAll('li').forEach((option) => {
        option.addEventListener('click', () => {
            // console.log("hello")
            if(options.querySelector('.selected')){

                const activeOption = options.querySelector('.selected');
                activeOption.classList.remove('selected')
            }
            option.classList.add('selected')
        })
    })
}