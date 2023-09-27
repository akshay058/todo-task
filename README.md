# React Todo App

A simple offline TODO app for the browser built using React JS.

## Key Features

- A simple input bar to add Todo(s) on pressing the return key.
- A list of TODO cards where each todo is appended on creation.
- Clicking on a TODO card marks it as complete and moves it to the bottom of the list.
- Active TODO cards appear in order of creation (most recent on top), while completed todo cards appear in order of completion (most recent on top).
- A reset button on the top right corner of the App to clear all Todo(s) and return to the initial state.
- The app works offline like a regular offline app even on hard refresh.

## Demo

You can try out the Offline TODO App by visiting the live demo [here](https://akshay-todo-task.netlify.app/).

### Tech Stack Used

- **React** - JavaScript library for building user interfaces.

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/akshay058/todo-task.git
   ```

2. Change directory to the project folder:

   ```bash
   cd todo-task
   ```

3. Install dependencies:

   ```bash
   npm install  # or yarn install
   ```

4. Start development server:

   ```bash
   npm start   # or yarn run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000/) in your favorite web browser!

### Folder Structure

- src/: Contains the React application source code.
- public/: Contains static assets and the HTML template.

### Customization

- Modify the React components in the src/ directory to customize the app's behavior and appearance.
- You can style the app by editing CSS or using a CSS framework like Bootstrap.

### Contributing

Contributions to the Offline TODO App are welcome! To contribute, follow these steps:

1. Fork the repository.

2. Create a new branch for your feature or bug fix:

   ```bash
    git checkout -b feature-name
   ```

3. Make your changes and commit them with descriptive commit messages.

   ```bash
   git add . && git commit -m "commit message"
   ```

4. Push your commits back up to GitHub:

   ```bash
   git push origin <branch name>
   ```

5. Submit a pull request through the GitHub website.
