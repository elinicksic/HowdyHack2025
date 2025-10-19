// Define all your reels content here
// Easy to add, remove, or modify blocks

export const reelsContent = [
  {
    id: 1,
    type: 'image',
    title: 'The Water Cycle',
    description: 'Learn how water moves through Earth\'s atmosphere',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    emoji: '💧',
    likes: 1234,
    comments: 56
  },
  {
    id: 2,
    type: 'quiz',
    question: 'What is the powerhouse of the cell?',
    options: ['Nucleus', 'Mitochondria', 'Ribosome', 'Chloroplast'],
    correctAnswer: 1,
    background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    emoji: '🧬',
    comments: 42
  },
  {
    id: 3,
    type: 'video',
    title: 'Photosynthesis Explained',
    description: 'How plants convert sunlight into energy',
    background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    emoji: '🌱',
    likes: 2456,
    comments: 89
  },
  {
    id: 4,
    type: 'text',
    title: 'Newton\'s First Law',
    content: 'An object at rest stays at rest, and an object in motion stays in motion unless acted upon by an external force.',
    background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    emoji: '⚛️',
    likes: 3421,
    comments: 134
  },
  {
    id: 5,
    type: 'poll',
    question: 'What\'s your favorite way to learn?',
    options: [
      { text: 'Reading', votes: 45 },
      { text: 'Videos', votes: 78 },
      { text: 'Practice', votes: 112 },
      { text: 'Discussions', votes: 34 }
    ],
    totalVotes: 269,
    background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    emoji: '📊',
    likes: 890,
    comments: 23
  },
  {
    id: 6,
    type: 'flashcard',
    front: 'What is DNA?',
    back: 'Deoxyribonucleic acid - the molecule that carries genetic information',
    background: 'linear-gradient(135deg, #fa8bff 0%, #2bd2ff 90%, #2bff88 100%)',
    emoji: '🧪',
    likes: 1567,
    comments: 45
  },
  {
    id: 7,
    type: 'list',
    title: 'Study Tips',
    items: [
      'Take regular breaks',
      'Use active recall',
      'Teach others',
      'Practice spaced repetition',
      'Stay organized'
    ],
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    emoji: '📝',
    likes: 3210,
    comments: 156
  }
];
