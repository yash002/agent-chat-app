import { create } from 'zustand';
import { Agent, Category, Chat, Message, SamplePrompt } from '../types';

interface AgentStore {
  agents: Agent[];
  categories: Category[];
  chats: Chat[];
  activeCategory: string;
  currentAgent: Agent | null;
  currentChat: Chat | null;
  
  // Actions
  setActiveCategory: (categoryId: string) => void;
  setCurrentAgent: (agent: Agent) => void;
  createOrGetChat: (agentId: string, initialPrompt?: string) => Chat;
  createNewChat: (agentId: string, initialPrompt?: string) => Chat;
  addMessage: (chatId: string, message: Omit<Message, 'id' | 'timestamp'>) => void;
  regenerateLastResponse: (chatId: string) => void;
  clearCurrentChat: () => void; 
}

const mockAgents: Agent[] = [
  {
    id: '1',
    name: 'TikTok',
    description: 'Generate My Video hashtags',
    category: 'social',
    icon: 'logo-tiktok',
  },
  {
    id: '2',
    name: 'Telegram',
    description: 'Generate popular Channels in telegram',
    category: 'social',
    icon: 'send',
  },
  {
    id: '3',
    name: 'Twitter',
    description: 'Generate My Trending Hashtags',
    category: 'social',
    icon: 'logo-twitter',
  },
  {
    id: '4',
    name: 'Medicine',
    description: 'Generate Text For My All Medicine',
    category: 'health',
    icon: 'medical',
  },
  {
    id: '5',
    name: 'Disease',
    description: 'Generate Text For All Disease problems',
    category: 'health',
    icon: 'bug',
  },
  {
    id: '6',
    name: 'Natural',
    description: 'Generate Text For Natural Medicines',
    category: 'health',
    icon: 'leaf',
  },
  {
    id: '7',
    name: 'Football',
    description: 'Generate Football Analysis and Stats',
    category: 'sports',
    icon: 'football',
  },
  {
    id: '8',
    name: 'Basketball',
    description: 'Generate Basketball Tips and Strategies',
    category: 'sports',
    icon: 'basketball',
  },
  {
    id: '9',
    name: 'Tennis',
    description: 'Generate Tennis Training Programs',
    category: 'sports',
    icon: 'tennisball',
  },
  {
    id: '10',
    name: 'Fitness',
    description: 'Generate Workout Plans and Diet Tips',
    category: 'sports',
    icon: 'fitness',
  },
];

const mockCategories: Category[] = [
  { id: 'all', name: 'All' },
  { id: 'health', name: 'Health', icon: 'heart' },
  { id: 'sports', name: 'Sports', icon: 'basketball' },
  { id: 'music', name: 'Music', icon: 'musical-notes' },
  { id: 'social', name: 'Social Media' },
];

const samplePrompts: Record<string, SamplePrompt[]> = {
  '1': [
    { id: '1', text: 'Most Follower TikTok Account' },
    { id: '2', text: 'small Quote of Muhammad' },
    { id: '3', text: 'Best TikTok trends for 2024' },
    { id: '4', text: 'How to create viral content' },
  ],
  '7': [
    { id: '1', text: 'Best football formation for attacking play' },
    { id: '2', text: 'Top football players of 2024' },
    { id: '3', text: 'How to improve passing accuracy' },
    { id: '4', text: 'Football training drills for beginners' },
  ],
  '8': [
    { id: '1', text: 'Best basketball shooting techniques' },
    { id: '2', text: 'NBA MVP predictions' },
    { id: '3', text: 'How to improve your free throw percentage' },
    { id: '4', text: 'Basketball defense strategies' },
  ],
  '4': [
    { id: '1', text: 'What are common side effects of aspirin?' },
    { id: '2', text: 'How to store medications properly' },
    { id: '3', text: 'Drug interactions to watch for' },
    { id: '4', text: 'When to take medications with food' },
  ],
};

const getMockResponse = (userMessage: string, agentId: string): string => {
  const lowerMessage = userMessage.toLowerCase();
  
  const responses: Record<string, Record<string, string[]>> = {
    // TikTok Agent responses
    '1': {
      follower: [
        "As of my knowledge cutoff in September 2021, the most followed TikTok account was that of Charli D'Amelio (@charlidamelio), an American social media personality and dancer. At that time, she had amassed a large following of over 100 million followers on TikTok.",
      ],
      quote: [
        '"Conquer your own anger with forgiveness, conquer evil with good, and conquer falsehood with truth." - Muhammad',
        '"The best of people are those who benefit others." - Muhammad',
      ],
      trend: [
        "For viral TikTok content in 2024: Focus on trending sounds, participate in challenges, use popular hashtags, keep videos under 30 seconds, and post consistently during peak hours (6-10 PM).",
        "Current TikTok trends include: AI filters, day-in-my-life content, micro-learning videos, aesthetic transitions, and relatable storytelling.",
      ],
      viral: [
        "To create viral content: 1) Hook viewers in first 3 seconds, 2) Use trending sounds, 3) Jump on trending topics quickly, 4) Engage with comments, 5) Post at optimal times for your audience.",
        "Viral content tips: Tell authentic stories, use popular hashtags strategically, collaborate with other creators, and maintain consistent posting schedule.",
      ],
      general: [
        "TikTok is all about creativity and authenticity. Focus on creating content that resonates with your audience and don't be afraid to experiment with different formats!",
        "The key to TikTok success is understanding your audience and staying up-to-date with current trends while adding your unique perspective.",
        "Remember, consistency is key on TikTok. Post regularly, engage with your community, and always be ready to adapt to new trends and features.",
      ]
    },
    
    // Football Agent responses
    '7': {
      formation: [
        "The 4-3-3 formation is excellent for attacking play as it provides width through wingers and allows for quick transitions. The three forwards create multiple attacking options while maintaining defensive stability.",
        "For attacking play, consider 4-2-3-1 formation which offers great flexibility with an attacking midfielder supporting the striker while providing defensive balance.",
      ],
      players: [
        "Top players in 2024 include Kylian Mbappé, Erling Haaland, Lionel Messi, and emerging talents like Jude Bellingham. The game is evolving with younger players making significant impacts.",
        "Current football stars dominating the game include Pedri, Phil Foden, Vinicius Jr, and many young talents who are reshaping modern football.",
      ],
      passing: [
        "To improve passing accuracy: 1) Focus on your first touch, 2) Keep your head up to scan the field, 3) Use the inside of your foot for short passes, 4) Practice with both feet, 5) Work on your body positioning.",
      ],
      drills: [
        "Essential drills for beginners: Cone dribbling, passing against a wall, shooting practice, basic juggling, and small-sided games to develop game awareness.",
      ],
      general: [
        "Football is about technique, teamwork, and tactical understanding. Focus on mastering the basics before moving to advanced skills.",
        "The beautiful game requires dedication, practice, and patience. Work on your weak foot, improve your fitness, and always think one step ahead.",
        "Modern football emphasizes versatility. Train different positions, understand various tactical systems, and develop both physical and mental aspects of the game.",
      ]
    },

    // Basketball Agent responses
    '8': {
      shooting: [
        "For better shooting: 1) Proper form with elbow alignment, 2) Consistent follow-through, 3) Practice from close range first, 4) Use your legs for power, 5) Develop muscle memory through repetition.",
      ],
      mvp: [
        "MVP candidates for 2024 include established stars and rising players. Performance depends on team success, individual stats, and impact on winning games.",
      ],
      free: [
        "Free throw improvement: 1) Develop a consistent routine, 2) Focus on your breathing, 3) Keep the same mechanics every time, 4) Practice under pressure, 5) Visualize success.",
      ],
      defense: [
        "Defensive strategies: 1) Stay low and move your feet, 2) Keep hands active, 3) Communicate with teammates, 4) Study opponent tendencies, 5) Practice help defense rotations.",
      ],
      general: [
        "Basketball success comes from consistent practice, understanding fundamentals, and developing basketball IQ alongside physical skills.",
        "Focus on the fundamentals: shooting form, ball handling, footwork, and court vision. These basics will serve you throughout your basketball journey.",
        "Great basketball players combine physical skills with mental toughness. Study the game, learn from mistakes, and always hustle on both ends of the court.",
      ]
    },

    // Medicine Agent responses
    '4': {
      aspirin: [
        "Common aspirin side effects include stomach irritation, heartburn, nausea, and increased bleeding risk. Always consult your healthcare provider about any concerning symptoms.",
      ],
      store: [
        "Store medications in a cool, dry place away from direct sunlight. Avoid bathroom medicine cabinets due to humidity. Keep medications in original containers with labels.",
      ],
      interactions: [
        "Important drug interactions include blood thinners with aspirin, certain antibiotics with birth control, and alcohol with many medications. Always inform your doctor of all medications you're taking.",
      ],
      food: [
        "Take medications with food when directed to reduce stomach irritation. Some medications need empty stomach for better absorption. Follow your pharmacist's specific instructions.",
      ],
      general: [
        "Always consult with healthcare professionals before starting, stopping, or changing any medications. Your health and safety are the top priority.",
        "Proper medication management includes following prescribed dosages, timing, and storage instructions. Keep a list of all your medications updated.",
        "If you experience any unusual symptoms or side effects, contact your healthcare provider immediately. Never hesitate to ask questions about your medications.",
      ]
    }
  };

  // Get agent-specific responses
  const agentResponses = responses[agentId];
  if (!agentResponses) {
    return getDefaultResponse(userMessage);
  }

  // Try to match message content to specific response categories
  for (const [key, responseArray] of Object.entries(agentResponses)) {
    if (lowerMessage.includes(key)) {
      return responseArray[Math.floor(Math.random() * responseArray.length)];
    }
  }

  // Return general response for the agent
  const generalResponses = agentResponses.general || [];
  if (generalResponses.length > 0) {
    return generalResponses[Math.floor(Math.random() * generalResponses.length)];
  }

  return getDefaultResponse(userMessage);
};

// Default responses for unmatched queries
const getDefaultResponse = (userMessage: string): string => {
  const defaultResponses = [
    "Thank you for your question! I'm here to help you with information and guidance on this topic.",
    "That's an interesting question. Let me provide you with some helpful information about that.",
    "I understand you're looking for information about this. Here's what I can tell you based on my knowledge.",
    "Great question! I'm happy to help you understand more about this topic.",
    "I appreciate your inquiry. Let me share some insights that might be helpful for you.",
    "That's a thoughtful question. I'll do my best to provide you with useful information.",
  ];
  
  return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
};

// Generate initial sample messages for prompts
const generateSampleMessages = (prompt: string, agentId: string): Message[] => {
  const userMessage: Message = {
    id: `sample-user-${Date.now()}`,
    content: prompt,
    sender: 'user',
    timestamp: new Date(Date.now() - 1000),
  };

  const agentMessage: Message = {
    id: `sample-agent-${Date.now()}`,
    content: getMockResponse(prompt, agentId),
    sender: 'agent',
    timestamp: new Date(),
  };

  return [userMessage, agentMessage];
};

export const useAgentStore = create<AgentStore>((set, get) => ({
  agents: mockAgents,
  categories: mockCategories,
  chats: [],
  activeCategory: 'all',
  currentAgent: null,
  currentChat: null,

  setActiveCategory: (categoryId: string) => {
    set({ activeCategory: categoryId });
  },

  setCurrentAgent: (agent: Agent) => {
    set({ currentAgent: agent });
  },

  clearCurrentChat: () => {
    set({ currentChat: null });
  },

  createOrGetChat: (agentId: string, initialPrompt?: string) => {
    const { chats } = get();
    let existingChat = chats.find(chat => chat.agentId === agentId);
    
    if (!existingChat) {
      const sampleMessages = initialPrompt ? generateSampleMessages(initialPrompt, agentId) : [];
      existingChat = {
        id: `chat-${agentId}-${Date.now()}`,
        agentId,
        messages: sampleMessages,
      };
      set({ chats: [...chats, existingChat] });
    }
    
    set({ currentChat: existingChat });
    return existingChat;
  },

  // New function - always creates a fresh chat
  createNewChat: (agentId: string, initialPrompt?: string) => {
    const { chats } = get();
    const sampleMessages = initialPrompt ? generateSampleMessages(initialPrompt, agentId) : [];
    
    const newChat: Chat = {
      id: `chat-${agentId}-${Date.now()}-${Math.random()}`,
      agentId,
      messages: sampleMessages,
    };
    
    set({ chats: [...chats, newChat], currentChat: newChat });
    return newChat;
  },

  addMessage: (chatId: string, message: Omit<Message, 'id' | 'timestamp'>) => {
    const { chats, currentAgent } = get();
    const newMessage: Message = {
      ...message,
      id: `msg-${Date.now()}-${Math.random()}`,
      timestamp: new Date(),
    };

    // Update the specific chat with the new message
    const updatedChats = chats.map(chat => 
      chat.id === chatId 
        ? { ...chat, messages: [...chat.messages, newMessage] }
        : chat
    );

    set({ chats: updatedChats });

    // Also update currentChat if it's the same chat
    const { currentChat } = get();
    if (currentChat && currentChat.id === chatId) {
      set({ 
        currentChat: { 
          ...currentChat, 
          messages: [...currentChat.messages, newMessage] 
        } 
      });
    }

    // Auto-reply from agent after 1 second
    if (message.sender === 'user' && currentAgent) {
      setTimeout(() => {
        const agentResponse = getMockResponse(message.content, currentAgent.id);
        const responseMessage: Message = {
          id: `msg-${Date.now()}-${Math.random()}`,
          content: agentResponse,
          sender: 'agent',
          timestamp: new Date(),
        };

        const { chats: currentChats, currentChat: currentChatState } = get();
        const finalUpdatedChats = currentChats.map(chat => 
          chat.id === chatId 
            ? { ...chat, messages: [...chat.messages, responseMessage] }
            : chat
        );

        set({ chats: finalUpdatedChats });

        // Also update currentChat if it's the same chat
        if (currentChatState && currentChatState.id === chatId) {
          set({ 
            currentChat: { 
              ...currentChatState, 
              messages: [...currentChatState.messages, responseMessage] 
            } 
          });
        }
      }, 1000);
    }
  },

  regenerateLastResponse: (chatId: string) => {
    const { chats, currentAgent } = get();
    const chat = chats.find(c => c.id === chatId);
    if (!chat || !currentAgent) return;

    const messages = [...chat.messages];
    const lastAgentMessageIndex = messages.map((msg, idx) => 
      msg.sender === 'agent' ? idx : -1
    ).filter(idx => idx !== -1).pop();

    if (lastAgentMessageIndex !== undefined) {
      const previousUserMessage = messages[lastAgentMessageIndex - 1];
      const userContent = previousUserMessage ? previousUserMessage.content : 'regenerate';
      
      messages[lastAgentMessageIndex] = {
        ...messages[lastAgentMessageIndex],
        content: getMockResponse(userContent, currentAgent.id),
        timestamp: new Date(),
      };

      const updatedChats = chats.map(c => 
        c.id === chatId ? { ...c, messages } : c
      );

      set({ chats: updatedChats });

      // Also update currentChat if it's the same chat
      const { currentChat } = get();
      if (currentChat && currentChat.id === chatId) {
        set({ currentChat: { ...currentChat, messages } });
      }
    }
  },
}));

export const getSamplePrompts = (agentId: string): SamplePrompt[] => {
  return samplePrompts[agentId] || [
    { id: '1', text: 'Remembers what user said earlier in the conversation' },
    { id: '2', text: 'Allows user to provide follow-up corrections With AI' },
    { id: '3', text: 'Limited knowledge of world and events after 2021' },
    { id: '4', text: 'May occasionally generate incorrect information' },
    { id: '5', text: 'May occasionally produce harmful instructions or biased content' },
  ];
};
