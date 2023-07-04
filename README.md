# Express TypeScript WebSocket Chatroom

This is a simple chatroom application built with Express, TypeScript, and WebSocket. It allows multiple users to chat simultaneously without their messages interfering with different chatrooms.

## Features

- Multiple chatrooms: Users can join different chatrooms and communicate within each chatroom separately.
- Real-time messaging: Messages are delivered instantly to all users in the same chatroom.

## Prerequisites

Before running the application, ensure you have the following installed:

- Node.js
- npm (Node Package Manager)

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/davelin18yufan/chatroom.git
   ```

2. Navigate to the project directory:

   ```bash
   cd chatroom
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Build the TypeScript code:

   ```bash
   npm run build
   ```

5. Start the server:

   ```bash
   npm start
   ```

6. Open your browser and visit `http://localhost:3000/main` to access the chatroom application.

## Usage

1. Enter a username and select a chatroom to join.
2. Start sending and receiving messages with other users in the same chatroom.
3. To switch to a different chatroom, click on the chatroom name in the sidebar and select another chatroom from the list.
4. Enjoy chatting with multiple users in separate chatrooms without any interference.

## Technologies Used

- Express.js: A fast and minimalist web application framework for Node.js.
- TypeScript: A typed superset of JavaScript that compiles to plain JavaScript.
- WebSocket: A communication protocol that provides full-duplex communication channels over a single TCP connection.

