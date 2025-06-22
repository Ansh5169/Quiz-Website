const quizzes = {
  HTML: [
    {
      question: 'What does HTML stand for?',
      options: ['Hyper Text Markup Language', 'Home Tool Markup Language', 'Hyperlinks and Text Markup Language', 'Hyper Tool Multi Language'],
      answer: 0
    },
    {
      question: 'Which tag is used to create a hyperlink in HTML?',
      options: ['<a>', '<link>', '<href>', '<hyper>'],
      answer: 0
    },
    {
      question: 'Which HTML element is used for the largest heading?',
      options: ['<heading>', '<h6>', '<h1>', '<head>'],
      answer: 2
    }
  ],
  CSS: [
    {
      question: 'What does CSS stand for?',
      options: ['Cascading Style Sheets', 'Colorful Style Sheets', 'Computer Style Sheets', 'Creative Style Syntax'],
      answer: 0
    },
    {
      question: 'Which property is used to change the text color in CSS?',
      options: ['font-color', 'color', 'text-color', 'background-color'],
      answer: 1
    },
    {
      question: 'How do you select an element with id="main" in CSS?',
      options: ['#main', '.main', 'main', '*main'],
      answer: 0
    }
  ],
  JavaScript: [
    {
      question: 'Which keyword declares a variable in JavaScript?',
      options: ['var', 'let', 'const', 'All of the above'],
      answer: 3
    },
    {
      question: 'What is the output of 2 + "2" in JavaScript?',
      options: ['4', '22', 'NaN', 'undefined'],
      answer: 1
    },
    {
      question: 'Which method is used to print to the console?',
      options: ['console.print()', 'log.console()', 'console.log()', 'print()'],
      answer: 2
    }
  ],
  Accessibility: [
    {
      question: 'What does "alt" attribute in <img> tag provide?',
      options: ['Alternative text for images', 'Image alignment', 'Image size', 'Image link'],
      answer: 0
    },
    {
      question: 'Which HTML tag is best for main navigation?',
      options: ['<nav>', '<main>', '<header>', '<aside>'],
      answer: 0
    },
    {
      question: 'What is a screen reader?',
      options: ['A device for reading screens', 'A software that reads text aloud for users', 'A type of monitor', 'A web browser'],
      answer: 1
    }
  ]
};

function escapeHTML(str) {
  return str.replace(/[&<>"']/g, function(tag) {
    const charsToReplace = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    };
    return charsToReplace[tag] || tag;
  });
}

function startQuiz(subject) {
  const quiz = quizzes[subject];
  if (!quiz) return alert('Quiz not found!');
  let current = 0;
  let score = 0;
  const userAnswers = [];
  const quizContainer = document.getElementById('quiz-container');

  function closeQuiz() {
    quizContainer.classList.remove('active');
    quizContainer.innerHTML = '';
  }

  function showResult() {
    quizContainer.innerHTML = `
      <div class="quiz-box">
        <button class="quiz-close-btn" title="Close" onclick="document.getElementById('quiz-container').classList.remove('active');document.getElementById('quiz-container').innerHTML='';">&times;</button>
        <div class="quiz-result">Quiz complete!<br>Your score: ${score} / ${quiz.length}</div>
        <button class="quiz-option-btn" onclick="document.getElementById('quiz-container').classList.remove('active');document.getElementById('quiz-container').innerHTML='';">Close</button>
      </div>
    `;
  }

  function renderQuestion() {
    const q = quiz[current];
    quizContainer.innerHTML = `
      <div class="quiz-box">
        <button class="quiz-close-btn" title="Close">&times;</button>
        <div class="quiz-question">Q${current + 1}: ${escapeHTML(q.question)}</div>
        <div class="quiz-options">
          ${q.options.map((opt, idx) => `<button class="quiz-option-btn" data-idx="${idx}">${escapeHTML(opt)}</button>`).join('')}
        </div>
      </div>
    `;
    quizContainer.querySelector('.quiz-close-btn').onclick = closeQuiz;
    quizContainer.querySelectorAll('.quiz-option-btn').forEach(btn => {
      btn.onclick = function() {
        const idx = parseInt(this.getAttribute('data-idx'), 10);
        userAnswers.push(idx);
        if (idx === q.answer) score++;
        current++;
        if (current < quiz.length) {
          renderQuestion();
        } else {
          showResult();
        }
      };
    });
  }

  quizContainer.classList.add('active');
  renderQuestion();
}

// Dark/Light mode toggle implementation
const darkModeToggle = document.getElementById('darkModeToggle');

// Load theme from localStorage
if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark-mode');
  darkModeToggle.checked = true;
} else {
  document.body.classList.remove('dark-mode');
  darkModeToggle.checked = false;
}

darkModeToggle.addEventListener('change', function () {
  if (this.checked) {
    document.body.classList.add('dark-mode');
    localStorage.setItem('theme', 'dark');
  } else {
    document.body.classList.remove('dark-mode');
    localStorage.setItem('theme', 'light');
  }
});
  