import react from 'react';

const courses = [
    {
        name: 'React basics',
        chapters: [
            {
                name: 'JSX',
                videoUrl: "https://www.youtube.com/embed/7fPXI_MnBOY?si=fEaCTkzBbuKYmiTm",
                description: 'Learn the basics of JSX, the syntax extension for JavaScript used in React.',
                quiz: [
                    { question: 'What does JSX stand for?', options: ['JavaScript XML', 'Java Syntax Extension', 'JavaScript Extra'], answer: 'JavaScript XML' },
                    { question: 'Which tag is used to render JSX?', options: ['<div>', '<React>', '<JSX>'], answer: '<div>' },
                ]
            },
            {
                name: 'Components',
                videoUrl: 'https://www.example.com/react-basics/components',
                description: 'Understand how to create and use components in React.',
                quiz: [
                    { question: 'What is a React component?', options: ['A function or class', 'A CSS file', 'A database'], answer: 'A function or class' },
                    { question: 'How do you pass data to a component?', options: ['Props', 'State', 'Context'], answer: 'Props' },
                ]
            },
            {
                name: 'Props',
                videoUrl: 'https://www.example.com/react-basics/props',
                description: 'Learn how to pass data between components using props.'
            },
            {
                name: 'State',
                videoUrl: 'https://www.example.com/react-basics/state',
                description: 'Explore how to manage component state in React.'
            },
            {
                name: 'Lifecycle methods',
                videoUrl: 'https://www.example.com/react-basics/lifecycle-methods',
                description: 'Understand React lifecycle methods and their use cases.'
            },
        ],
    },
    {
        name: 'React Advanced',
        chapters: [
            {
                name: 'Hooks',
                videoUrl: 'https://www.example.com/react-advanced/hooks',
                description: 'Learn about React Hooks and how they simplify state and lifecycle management.'
            },
            {
                name: 'Context API',
                videoUrl: 'https://www.example.com/react-advanced/context-api',
                description: 'Understand how to use the Context API for managing global state in React.'
            },
            {
                name: 'Redux',
                videoUrl: 'https://www.example.com/react-advanced/redux',
                description: 'Learn the basics of Redux for state management in React applications.'
            },
        ],
    },
    {
        name: 'React Native',
        chapters: [
            {
                name: 'Components',
                videoUrl: 'https://www.example.com/react-native/components',
                description: 'Learn how to create and use components in React Native.'
            },
            {
                name: 'Navigation',
                videoUrl: 'https://www.example.com/react-native/navigation',
                description: 'Understand navigation in React Native using libraries like React Navigation.'
            },
            {
                name: 'State management',
                videoUrl: 'https://www.example.com/react-native/state-management',
                description: 'Explore state management techniques in React Native applications.'
            },
            {
                name: 'APIs',
                videoUrl: 'https://www.example.com/react-native/apis',
                description: 'Learn how to integrate APIs in React Native applications.'
            },
        ],
    },
    {
        name: 'Node.js',
        chapters: [
            {
                name: 'Express.js',
                videoUrl: 'https://www.example.com/nodejs/express',
                description: 'Learn how to build web applications using Express.js.'
            },
            {
                name: 'MongoDB',
                videoUrl: 'https://www.example.com/nodejs/mongodb',
                description: 'Understand how to use MongoDB as a database for Node.js applications.'
            },
            {
                name: 'REST APIs',
                videoUrl: 'https://www.example.com/nodejs/rest-apis',
                description: 'Learn how to create RESTful APIs using Node.js and Express.'
            },
            {
                name: 'Authentication',
                videoUrl: 'https://www.example.com/nodejs/authentication',
                description: 'Explore authentication techniques in Node.js applications.'
            },
        ],
    },
    {
        name: 'JavaScript',
        chapters: [
            {
                name: 'Variables',
                videoUrl: 'https://www.example.com/javascript/variables',
                description: 'Learn about variables in JavaScript and how to use them.'
            },
            {
                name: 'Functions',
                videoUrl: 'https://www.example.com/javascript/functions',
                description: 'Understand how to create and use functions in JavaScript.'
            },
            {
                name: 'ES6+ features',
                videoUrl: 'https://www.example.com/javascript/es6-features',
                description: 'Explore the new features introduced in ES6 and beyond.'
            },
            {
                name: 'Asynchronous JS',
                videoUrl: 'https://www.example.com/javascript/async-js',
                description: 'Learn about asynchronous programming in JavaScript.'
            },
        ],
    },
    {
        name: 'CSS',
        chapters: [
            {
                name: 'Flexbox',
                videoUrl: 'https://www.example.com/css/flexbox',
                description: 'Learn how to use Flexbox for layout in CSS.'
            },
            {
                name: 'Grid',
                videoUrl: 'https://www.example.com/css/grid',
                description: 'Understand how to use CSS Grid for layout.'
            },
            {
                name: 'Animations',
                videoUrl: 'https://www.example.com/css/animations',
                description: 'Explore how to create animations using CSS.'
            },
            {
                name: 'Responsive design',
                videoUrl: 'https://www.example.com/css/responsive-design',
                description: 'Learn about responsive design principles and techniques.'
            },
        ],
    },
    {
        name: 'HTML',
        chapters: [
            {
                name: 'Semantic HTML',
                videoUrl: 'https://www.example.com/html/semantic-html',
                description: 'Understand the importance of semantic HTML and how to use it.'
            },
            {
                name: 'Forms',
                videoUrl: 'https://www.example.com/html/forms',
                description: 'Learn how to create and use forms in HTML.'
            },
            {
                name: 'Accessibility',
                videoUrl: 'https://www.example.com/html/accessibility',
                description: 'Explore how to make web applications accessible.'
            },
        ],
    },
];

export default courses;