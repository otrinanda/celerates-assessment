# Celerates - Frontend Engineer Technical Assessment by Otrinanda Gandhi

## Overview
This is a Next.js application that allows users to fetch, edit, and customize user data from a public API and generate a professional PDF document.

## Features
* Data Fetching: Retrieves user data from JSONPlaceholder API.
* Form Interaction: Editable fields with validation using React Hook Form & Zod.
* PDF Export: Generates a PDF from form data with customizable layout and watermark.
* Advanced Form Validation: Enforces specific rules for user input.
* Responsive Design: Fully responsive UI using Tailwind CSS.

## Tech Stack
* Next.js 14
* TypeScript
* Tailwind CSS
* React Hook Form
* Zod (Validation)
* Shadcn UI
* @react-pdf/renderer

## Installation & Setup
1. Clone the repository:
```bash
git clone https://github.com/otrinanda/celerates-assessment.git
cd celerates-assessment
```
2. Install dependencies
```bash
npm install
```
3. Start the development server:
```bash
npm run dev
```
4. Open the app in your browser at  [http://localhost:3000](http://localhost:3000)


## Environment Variables

Create a .env.local file in the root directory and define the following environment variables:
```bash
NEXT_PUBLIC_API_URL=https://jsonplaceholder.typicode.com
```

## API Documentation
This application fetches user data from the JSONPlaceholder API:
* GET /users - Fetch a list of users
* GET /users/************:id - Fetch a specific user
* PUT /users/************:id - Update existing user information
* POST /users/************:id - Create new user information

## How It Works
1. Users are fetched from the API and displayed.
2. Users can select and edit a user profile.
3. Validation ensures proper data entry.
4. Users can generate and download a PDF of the profile.

## Assumptions & Decisions
* The app only supports editing user data locally (no real update to API since JSONPlaceholder is a mock API).
* PDF export includes watermark and company branding.

## Deployment
To build and start the production version:
```bash
npm run build
npm run start
```

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
