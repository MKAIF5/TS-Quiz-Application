"use strict";
// Define the questions array
const questions = [
    { question: "What is the capital of France?", options: ["Paris", "London", "Rome", "Berlin"], answer: "Paris" },
    { question: "What is 2 + 2?", options: ["3", "4", "5", "6"], answer: "4" },
    { question: "What is the largest ocean?", options: ["Atlantic", "Indian", "Pacific", "Arctic"], answer: "Pacific" },
    { question: "Who wrote 'To Kill a Mockingbird'?", options: ["Harper Lee", "Mark Twain", "J.K. Rowling", "Ernest Hemingway"], answer: "Harper Lee" },
    { question: "What is the hardest natural substance on Earth?", options: ["Gold", "Iron", "Diamond", "Platinum"], answer: "Diamond" },
    { question: "What planet is known as the Red Planet?", options: ["Earth", "Venus", "Mars", "Jupiter"], answer: "Mars" },
    { question: "What is the chemical symbol for gold?", options: ["Au", "Ag", "Pb", "Fe"], answer: "Au" },
    { question: "What year did the Titanic sink?", options: ["1912", "1905", "1898", "1923"], answer: "1912" },
    { question: "What is the smallest prime number?", options: ["0", "1", "2", "3"], answer: "2" },
    { question: "Who painted the Mona Lisa?", options: ["Vincent van Gogh", "Leonardo da Vinci", "Pablo Picasso", "Claude Monet"], answer: "Leonardo da Vinci" }
];
// Define the QuizApp class
class QuizApp {
    constructor(container) {
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.container = container;
    }
    // Render the quiz application
    render() {
        this.container.innerHTML = this.getQuestionHtml();
        this.addEventListeners();
        this.animateEntrance();
    }
    // Generate HTML for the current question
    getQuestionHtml() {
        const question = questions[this.currentQuestionIndex];
        return `
            <div class="quiz-container">
                <h1>Quiz Application</h1>
                <div class="question-container">
                    <p>${question.question}</p>
                    <div class="options-container">
                        ${question.options.map(option => `
                            <button class="option-button">${option}</button>
                        `).join('')}
                    </div>
                </div>
                <p class="score">Score: ${this.score}</p>
            </div>
        `;
    }
    // Add event listeners to option buttons
    addEventListeners() {
        const buttons = document.querySelectorAll('.option-button');
        buttons.forEach(button => {
            button.addEventListener('click', (event) => this.handleAnswer(event.target.textContent || ''));
        });
    }
    // Handle answer selection
    handleAnswer(answer) {
        const correctAnswer = questions[this.currentQuestionIndex].answer;
        if (answer === correctAnswer) {
            this.score++;
        }
        this.currentQuestionIndex++;
        if (this.currentQuestionIndex < questions.length) {
            this.animateTransition();
            setTimeout(() => {
                this.render();
            }, 1000); // Delay for animation
        }
        else {
            alert(`Quiz completed! Your score is ${this.score} out of ${questions.length}`);
        }
    }
    // Animate the entrance of the quiz container
    animateEntrance() {
        const container = this.container.querySelector('.quiz-container');
        if (container) {
            container.classList.add('animate__animated', 'animate__fadeIn');
        }
    }
    // Animate the transition between questions
    animateTransition() {
        const container = this.container.querySelector('.quiz-container');
        if (container) {
            container.classList.remove('animate__fadeIn');
            container.classList.add('animate__animated', 'animate__fadeOut');
            setTimeout(() => {
                container.classList.remove('animate__fadeOut');
                container.classList.add('animate__fadeIn');
            }, 800); // Duration of the fade-out animation
        }
    }
}
// Initialize and render the QuizApp after the DOM content is loaded
document.addEventListener('DOMContentLoaded', () => {
    const appElement = document.getElementById('app');
    if (appElement) {
        const app = new QuizApp(appElement);
        app.render();
    }
});
