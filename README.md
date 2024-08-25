# CollabBlog: The Collaborative Writing Platform

## Overview

CollabBlog is an innovative blogging platform designed to foster teamwork and collective creativity. Unlike traditional blogging sites, CollabBlog requires a minimum of two authors for every post, ensuring diverse perspectives and richer content.

## Local Setup Instructions

### Prerequisites

- Node.js (v20.11.0 or later, but less than v21.0.0)
- VS Code (v1.22.0 or later) recommended
- MongoDB

### Steps

1. Clone the repository:
    
    ```bash
        git clone https://github.com/OVECJOE/collablog.git
        cd collablog
    ```

2. Set up environment variables:
Copy the `*.env.example` file to a new file named `*.env` for the client and server directories respectively. Update the values in the new files as needed.

3. Install all dependencies (server and client):
    
    ```bash
        npm run install-all
    ```

4. Start the server and client concurrently:
    
    ```bash
        npx concurrently "npm run start:server" "npm run start:client"
    ```

6. Open your browser and navigate to `http://localhost:5173` to view the application.

### Additional npm Scripts

- Run all tests (server and client): `npm test`
- Format code: `npm run format`
- Update dependencies to their latest versions: `npm run install-update`

## Development

This project uses nodemon for auto-reloading during development. The server will automatically restart when you make changes to the backend code.

## VS Code Integration

This project is optimized for development in Visual Studio Code. Make sure you're using VS Code version 1.22.0 or later for the best development experience.

## Decisions Made

- **Frontend**: React, React-Router, TailwindCSS and MantineUI for the frontend. I had to choose these technologies to quickly build the frontend and make it responsive.

- **Backend**: Node.js, Express, and MongoDB for the backend.

I struggled mostly with the frontend part of the project. I believed I should have stick to a simpler and straightforward UI since I am being tested for React and Node.js skills, not UI/UX design, but I couldn't resist the temptation to make it look good enough.

> Though I couldn't finish the project, especially the frontend part due to time constraints, I believe that what I have implemented so far is good enough to showcase my skills and experience. I hope you like it.

Thank you for the opportunity.
