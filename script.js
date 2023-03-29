// First, create a new XMLHttpRequest object
var xhr = new XMLHttpRequest();

// Set the URL of the JSON file you want to load
var url = "questions.JSON";

// Set the type of request you want to make (in this case, a GET request)
xhr.open("GET", url, true);

// Set the response type to "json"
xhr.responseType = "json";

var forms = document.querySelectorAll("form");
forms.forEach(function (form) {
  form.addEventListener("change", function () {
    checkForms();
  });
});

function checkForms() {
  var forms = document.querySelectorAll("form");
  var allSelected = true;
  forms.forEach(function (form) {
    var selectedOption = form.querySelector('input[type="radio"]:checked');
    if (!selectedOption) {
      allSelected = false;
    }
  });
  var button = document.querySelector("button");
  button.disabled = !allSelected;
}

var userAnswer = [];

function showQuiz() {
  xhr.onload = function () {
    if (xhr.status === 200) {
      var quizData = xhr.response;

      for (var i = 0; i < quizData.questions.length; i++) {
        var question = quizData.questions[i].question;
        console.log("Question #" + (i + 1) + ": " + question);
        document.write(question);
        // Loop over each answer to the question
        for (var j = 0; j < quizData.questions[i].answers.length; j++) {
          var answer = quizData.questions[i].answers[j].text;
          console.log("  Answer #" + (j + 1) + ": " + answer);
          document.write(answer);
        }
      }
    } else {
      console.log("Failed to load quiz data: " + xhr.statusText);
    }
  };
  xhr.send();
}

function QuizResults() {
  const radioButtons = document.querySelectorAll('input[name="radio"]');

  // create an empty array to store the selected values

  // loop through all the radio buttons
  for (let i = 0; i < radioButtons.length; i++) {
    // check if the current radio button is checked
    if (radioButtons[i].checked) {
      // add the selected value to the array
      userAnswer.push(radioButtons[i].value);
    }
  }
  console.log(userAnswer);

  xhr.onload = function () {
    if (xhr.status === 200) {
      var quizData = xhr.response;

      // for (var i = 0; i < quizData.questions.length; i++) {
      //   var question = quizData.questions[i].question;
      //   console.log("Question #" + (i + 1) + ": " + question);

      //   // Loop over each answer to the question
      //   for (var j = 0; j < quizData.questions[i].answers.length; j++) {
      //     var answer = quizData.questions[i].answers[j].text;
      //     console.log("  Answer #" + (j + 1) + ": " + answer);
      //   }
      // }

      var GryffindorScore = 0;
      var SlytherianScore = 0;
      var RavenclawScore = 0;
      var HufflepuffScore = 0;

      // Loop over each question in the quiz data
      for (var i = 0; i < quizData.questions.length; i++) {
        var question = quizData.questions[i].question;
        // console.log("Question #" + (i + 1) + ": " + question);

        // Loop over each answer to the question
        for (var j = 0; j < quizData.questions[i].answers.length; j++) {
          var answer = quizData.questions[i].answers[j].text;

          // Check if the user's answer matches the current answer text
          if (userAnswer[i] === answer) {
            // If the user's answer matches, add the answer weight to the score
            GryffindorScore += quizData.questions[i].answers[j].Gryffindor;
            SlytherianScore += quizData.questions[i].answers[j].Slytherin;
            HufflepuffScore += quizData.questions[i].answers[j].Hufflepuff;
            RavenclawScore += quizData.questions[i].answers[j].Ravenclaw;
          }
        }
      }

      if (
        GryffindorScore >= SlytherianScore &&
        GryffindorScore >= RavenclawScore &&
        GryffindorScore >= HufflepuffScore
      ) {
        window.location.href = "houses/Griffindor.html";
        console.log(GryffindorScore);
        console.log(SlytherianScore);
        console.log(RavenclawScore);
        console.log(HufflepuffScore);
      }
      if (
        SlytherianScore >= GryffindorScore &&
        SlytherianScore >= RavenclawScore &&
        SlytherianScore >= HufflepuffScore
      ) {
        window.location.href = "houses/Slytherian.html";
        console.log(GryffindorScore);
        console.log(SlytherianScore);
        console.log(RavenclawScore);
        console.log(HufflepuffScore);
      }
      if (
        RavenclawScore >= SlytherianScore &&
        RavenclawScore >= GryffindorScore &&
        RavenclawScore >= HufflepuffScore
      ) {
        window.location.href = "houses/Ravenclaw.html";
        console.log(GryffindorScore);
        console.log(SlytherianScore);
        console.log(RavenclawScore);
        console.log(HufflepuffScore);
      }
      if (
        HufflepuffScore >= SlytherianScore &&
        HufflepuffScore >= GryffindorScore &&
        HufflepuffScore >= RavenclawScore
      ) {
        window.location.href = "houses/Hufflepuff.html";
        console.log(GryffindorScore);
        console.log(SlytherianScore);
        console.log(RavenclawScore);
        console.log(HufflepuffScore);
      }
    } else {
      console.log("Failed to load quiz data: " + xhr.statusText);
    }
  };
  xhr.send();
}

//showQuiz();
// Send the request
