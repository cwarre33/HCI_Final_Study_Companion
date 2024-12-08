import React, { useState } from 'react';
import './App.css';

// Simple local implementation of Card component
const Card = ({ children, className = '' }) => (
  <div className={`border rounded-lg shadow-md p-4 ${className}`}>
    {children}
  </div>
);

// Simple local implementation of Button component
const Button = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  className = '' 
}) => {
  const variantStyles = {
    primary: 'bg-blue-500 text-white hover:bg-blue-600',
    secondary: 'bg-gray-200 text-black hover:bg-gray-300',
    destructive: 'bg-red-500 text-white hover:bg-red-600',
    outline: 'border border-gray-300 hover:bg-gray-100'
  };

  return (
    <button 
      onClick={onClick}
      className={`px-4 py-2 rounded-md transition ${variantStyles[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

const HCIStudyApp = () => {
  const [currentSection, setCurrentSection] = useState('home');
  const [quizScore, setQuizScore] = useState(0);

  const sections = [
    { 
      name: 'Evaluation', 
      topics: [
        'Characteristics of evaluation techniques',
        'Types of techniques (interviews, surveys, experiments)',
        'Think-aloud protocols',
        'Heuristic evaluation',
        'When to use different techniques',
        'Data analysis approaches'
      ]
    },
    {
      name: 'Prototyping', 
      topics: [
        'Prototyping fidelity',
        'Various prototyping techniques',
        'Strengths and weaknesses of different approaches',
        'Wizard of Oz technique',
        'Critiquing methods'
      ]
    },
    {
      name: 'Accessibility', 
      topics: [
        'Universal design principles',
        'Designing for diverse populations',
        'Inclusive design strategies'
      ]
    },
    {
      name: 'AI in HCI', 
      topics: [
        'Evolution of human-computer interaction',
        'Sensing and automation',
        'Human-centered AI perspectives'
      ]
    }
  ];

  const triviaQuestions = [
    {
      question: "Evaluation is performed after a design is created to assess how well the design achieves what?",
      answer: "Design and usability goals"
    },
    {
      question: "In A/B testing, A and B are what kind of experimental variables?",
      answer: "Compared/alternative design variations"
    },
    {
      question: "What prototyping technique does NOT use any computing or technology?",
      answer: "Paper prototyping"
    },
    {
      question: "What kind of measurement is a Likert-type scale? (categorical, ordinal, interval, or ratio)",
      answer: "Ordinal"
    },
    {
      question: "What is the technique where participants are asked to vocalize what is in their head as they perform tasks?",
      answer: "Think-aloud protocol"
    },
    {
      question: "What is an evaluation technique used in class that does NOT involve feedback from users?",
      answer: "Heuristic evaluation"
    },
    {
      question: "The prototyping technique where a human operator simulates a machine is called what?",
      answer: "Wizard of Oz"
    },
    {
      question: "Interviews with a starting set of questions that can include follow-up and additional questions are called what?",
      answer: "Semi-structured interviews"
    },
    {
      question: "What design approach aims to make products usable by all people to the greatest extent possible?",
      answer: "Universal design"
    },
    {
      question: "In an experiment, what are the factors you try to prevent from impacting the outcomes called?",
      answer: "Controlled variables"
    },
    {
      question: "What are evaluations done in a user's natural environment called?",
      answer: "Field studies"
    },
    {
      question: "How close a prototype resembles the final product is referred to as what? (one word)",
      answer: "Fidelity"
    },
    {
      question: "When an evaluation team says people are 15% faster with a new design, what additional information would you need to trust the result?",
      answer: "Statistical significance/p-value"
    },
    {
      question: "A set of images or drawings showing the layout and functional elements of different screens is called a what? (one word)",
      answer: "Storyboard"
    },
    {
      question: "Before starting a design or evaluation, what is important to determine first? (the desired activities or outcomes)",
      answer: "Goals"
    },
    {
      question: "What is the key difference between formative and summative evaluations?",
      answer: "Formative evaluation is done during the design process to improve it, while summative evaluation assesses the final design."
    },
    {
      question: "What principle of HCI focuses on ensuring designs are useful to people with different abilities?",
      answer: "Accessibility"
    },
    {
      question: "What prototyping technique allows rapid testing of ideas with users before committing to a final design?",
      answer: "Low-fidelity prototyping"
    },
    {
      question: "In HCI, what is the term used to describe how easy and intuitive a system is to use?",
      answer: "Usability"
    },
    {
      question: "Which type of usability test involves participants completing tasks while being observed, often with tasks given by the researcher?",
      answer: "Controlled usability testing"
    },
    {
      question: "What design methodology emphasizes the involvement of users throughout the design process?",
      answer: "User-centered design"
    },
    {
      question: "Which principle refers to the consistency of the design throughout all elements of the interface?",
      answer: "Consistency principle"
    }
  ];

  const [currentQuizQuestion, setCurrentQuizQuestion] = useState(0);
  const [quizMode, setQuizMode] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const startQuiz = () => {
    setQuizMode(true);
    setCurrentQuizQuestion(0);
    setQuizScore(0);
    setShowResults(false);
    setQuizAnswers(triviaQuestions.map(() => ''));
  };

  const handleAnswerChange = (index, answer) => {
    const newAnswers = [...quizAnswers];
    newAnswers[index] = answer;
    setQuizAnswers(newAnswers);
  };

  const submitQuiz = () => {
    const score = quizAnswers.filter((answer, index) => 
      answer.toLowerCase().trim() === triviaQuestions[index].answer.toLowerCase().trim()
    ).length;
    setQuizScore(score);
    setQuizMode(false);
    setShowResults(true);
  };

  const renderContent = () => {
    if (showResults) {
      return (
        <Card>
          <h2 className="text-xl font-bold mb-4">Quiz Results</h2>
          <p className="text-xl font-bold mb-4">Your Score: {quizScore} out of {triviaQuestions.length}</p>
          {triviaQuestions.map((q, index) => (
            <div key={index} className="mb-4 p-2 border rounded">
              <p className="font-bold">{q.question}</p>
              <p>Correct Answer: {q.answer}</p>
              <p>Your Answer: {quizAnswers[index]}</p>
              {quizAnswers[index].toLowerCase().trim() !== q.answer.toLowerCase().trim() && (
                <p className="text-red-500">Incorrect</p>
              )}
            </div>
          ))}
          <Button 
            onClick={() => {
              setCurrentSection('home');
              setShowResults(false);
            }}
          >
            Return to Home
          </Button>
        </Card>
      );
    }

    if (quizMode) {
      return (
        <Card>
          <h2 className="text-xl font-bold mb-4">HCI Trivia Quiz</h2>
          <div className="space-y-4">
            <p className="font-bold">Question {currentQuizQuestion + 1} of {triviaQuestions.length}</p>
            <p className="text-lg">{triviaQuestions[currentQuizQuestion].question}</p>
            <input 
              type="text" 
              value={quizAnswers[currentQuizQuestion]}
              onChange={(e) => handleAnswerChange(currentQuizQuestion, e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Type your answer here"
            />
          </div>
          <div className="flex justify-between mt-4">
            {currentQuizQuestion > 0 && (
              <Button 
                variant="outline" 
                onClick={() => setCurrentQuizQuestion(current => current - 1)}
              >
                Previous
              </Button>
            )}
            {currentQuizQuestion < triviaQuestions.length - 1 ? (
              <Button 
                onClick={() => setCurrentQuizQuestion(current => current + 1)}
              >
                Next
              </Button>
            ) : (
              <Button 
                onClick={submitQuiz}
                variant="destructive"
              >
                Submit Quiz
              </Button>
            )}
          </div>
        </Card>
      );
    }

    if (currentSection !== 'home' && !quizMode && !showResults) {
      const section = sections.find(sec => sec.name === currentSection);
      return (
        <Card>
          <h2 className="text-xl font-bold mb-4">{section.name}</h2>
          <ul className="list-disc pl-5 space-y-2">
            {section.topics.map((topic, index) => (
              <li key={index}>{topic}</li>
            ))}
          </ul>
          <Button 
            onClick={() => setCurrentSection('home')}
            className="mt-4"
          >
            Return to Home
          </Button>
        </Card>
      );
    }

    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">HCI Final Exam Study Guide</h1>
        <p>Select a section to review or test your knowledge!</p>
        <div className="grid grid-cols-2 gap-4">
          {sections.map((section, index) => (
            <Button 
              key={index} 
              onClick={() => setCurrentSection(section.name)}
            >
              {section.name}
            </Button>
          ))}
          <Button 
            onClick={startQuiz}
            variant="secondary"
          >
            Start Trivia Quiz
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      {renderContent()}
    </div>
  );
};

export default HCIStudyApp;
