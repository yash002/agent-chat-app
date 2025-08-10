export interface Agent {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string;
}

export interface Category {
  id: string;
  name: string;
  icon?: string;
}

export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'agent';
  timestamp: Date;
}

export interface SamplePrompt {
  id: string;
  text: string;
}

export interface Chat {
  id: string;
  agentId: string;
  messages: Message[];
}
