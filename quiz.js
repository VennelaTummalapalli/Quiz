const quiz = [
  { correctAnswer: 0, marks: 2 },
  { correctAnswer: 0, marks: 2 },
  { correctAnswer: 1, marks: 2 },
  { correctAnswer: 1, marks: 2 },
  { correctAnswer: 1, marks: 2 },
  { correctAnswer: 1, marks: 2 },
  { correctAnswer: 1, marks: 2 },
  { correctAnswer: 1, marks: 2 },
  { correctAnswer: 1, marks: 2 },
  { correctAnswer: 2, marks: 2 },
  { correctAnswer: 2, marks: 2 },
  { correctAnswer: 2, marks: 2 },
  { correctAnswer: 1, marks: 2 },
  { correctAnswer: 1, marks: 2 },
  { correctAnswer: 2, marks: 2 }

];

let timer;
let timeLeft = 900;

function startTimer() {
  timer = setInterval(() => {
    let min = Math.floor(timeLeft / 60);
    let sec = timeLeft % 60;
    document.getElementById("timer").innerText =
      `Time Left: ${min}:${sec < 10 ? "0" : ""}${sec}`;

    timeLeft--;

    if (timeLeft < 0) {
      submitQuiz();
    }
  }, 1000);
}

startTimer();

function submitQuiz() {
  clearInterval(timer);

  let score = 0;
  let totalMarks = 0;

  quiz.forEach((q, index) => {
    totalMarks += q.marks;
    const options = document.querySelectorAll(`input[name="q${index + 1}"]`);
    
    options.forEach(opt => {
      opt.disabled = true;
      if (parseInt(opt.value) === q.correctAnswer) {
        opt.parentElement.classList.add("correct");
      }
    });

    const selected = document.querySelector(`input[name="q${index + 1}"]:checked`);
    if (selected && parseInt(selected.value) === q.correctAnswer) {
      score += q.marks;
    } else if (selected) {
      selected.parentElement.classList.add("wrong");
    }
  });

  let percentage = (score / totalMarks) * 100;
  let grade = percentage >= 40 ? "Pass" : "Fail";

  document.getElementById("result").innerHTML = `
    <h2>Score: ${score} / ${totalMarks}</h2>
    <h3>Percentage: ${percentage.toFixed(2)}%</h3>
    <h3>Grade: ${grade}</h3>
  `;

  document.getElementById("restartBtn").style.display = "block";
}

function restartQuiz() {
  location.reload();
}
