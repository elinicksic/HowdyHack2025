// Define all your reels content here
// Easy to add, remove, or modify blocks

export const reelsContent = [
  {
    id: 1,
    type: 'image',
    title: 'The Water Cycle',
    description: 'Learn how water moves through Earth\'s atmosphere',
    images: ['/water1.jpg', '/water2.jpg', '/water3.jpg'],  // NEW: Use 'images' array
    emoji: '💧',
    category: 'Science',
    likes: 1234,
    comments: 56,
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' // Fallback if no images
  },
  {
    id: 2,
    type: 'quiz',
    question: 'What is the powerhouse of the cell?',
    options: ['Nucleus', 'Mitochondria', 'HELP ME', 'Chloroplast'],
    correctAnswer: 2, // index starts from 0
    background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    emoji: '🧬',
    comments: 42
  },
  {
    id: 4,
    type: 'text',
    title: 'Newton\'s First Law',
    content: 'An object at rest stays at rest, and an object in motion stays in motion unless acted upon by an external force.',
    background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    emoji: '⚛️',
    likes: 6700,
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
    likes: 67.00,
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
    likes: 0.67,
    comments: 156
  },
  {
  id: 8,
  type: 'video',
  title: 'Duckie Video',
  videoUrl: '/duckie.mp4',  // Add this line
  emoji: '🦆',
  likes: 2456,
  comments: 89,
  muted: true,  // Start muted (Instagram style)
  autoPlay: true  // Auto-play when visible
},
{
  id: 9,
  type: 'video',
  title: 'Skateboard Video',
  videoUrl: '/Skate.mp4',  // Add this line
  emoji: '🦆',
  likes: 2456,
  comments: 89,
  muted: true,  // Start muted (Instagram style)
  autoPlay: true  // Auto-play when visible
},
{
  id: 10,
  type: 'video',
  title: 'Pizza Video',
  videoUrl: '/Pizza.mp4',  // Add this line
  emoji: '🦆',
  likes: 2456,
  comments: 89,
  muted: true,  // Start muted (Instagram style)
  autoPlay: true  // Auto-play when visible
}

];
