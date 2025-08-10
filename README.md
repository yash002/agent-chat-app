AI Agents Chat App

A React Native app built with Expo featuring dark-themed UI for interacting with specialized AI agents. Pixel-perfect implementation matching Figma designs with real-time chat functionality.

# Setup Steps

Prerequisites
Node.js (v16+)

Expo CLI

Installation & Running

# Clone and install

git clone repo-url
cd agentchatapp
npm install

# Start development server

npx expo start

# Run on devices

# Scan QR code with Expo Go app (iOS/Android)

# Or press 'i' for iOS Simulator

# Or press 'a' for Android Emulator

Project Structure
text
src/
├── components/ # AgentCard, CategoryChips, ChatBubble
├── screens/ # AgentsListScreen, AgentHomeScreen, AgentChatScreen  
├── store/ # Zustand state management
├── types/ # TypeScript definitions
└── theme/ # Design system (colors, typography)

# Architectural Decisions & Trade-offs

State Management: Zustand

Why: Simpler than Redux, excellent TypeScript support, minimal boilerplate
Trade-off: Less ecosystem than Redux, but sufficient for app scope

Local State vs Backend

Decision: Mock AI responses with local state management
Why: Faster development, no API dependencies, demonstrates chat logic
Trade-off: No real AI intelligence, but shows complete UX flow

Chat Isolation Strategy

Decision: Each prompt creates a fresh chat session
Why: Clear conversation context, matches expected UX
Implementation: createNewChat() vs createOrGetChat() for different use cases

Navigation Flow

Decision: Stack navigation with programmatic prompt-to-chat flow
Why: Smooth UX matching Figma designs
Trade-off: Slightly complex state management for chat isolation

Component Architecture

Decision: Atomic design with reusable components
Why: Maintainable, testable, matches Figma component structure
Trade-off: More files, but better organization

# Bonus Features

Enhanced Chat Experience
Context-Aware Responses: Agent responses match user input and agent specialization

1-Second Response Delay: Realistic chat feel with typing simulation

Regenerate Functionality: Replace last agent response with fresh content

Chat State Isolation: Each prompt starts independent conversation

UI Polish
Smooth Animations: Transitions and interactions with proper feedback

Keyboard Handling: Fixed input positioning that doesn't move on focus

Visual States: Active/inactive states for all interactive elements

Full-Width Agent Messages: Agent chat bubbles extend edge-to-edge as per design

Developer Experience
TypeScript Strict Mode: Full type safety throughout app

Theme System: Centralized design tokens matching Figma

Clean Architecture: Separation of concerns with reusable components

Performance Optimized: FlatList optimizations, memoized components

Agent Specialization
Each agent provides contextual responses:

TikTok: Social media trends, viral content strategies

Football: Formations, training drills, player insights

Basketball: Shooting techniques, game strategies

Medicine: Drug information, storage guidelines

Tech Stack: React Native (Expo) - TypeScript - Zustand - React Navigation - Expo Vector Icons
