# CMS App

This project is a Content Management System (CMS) application built using [Next.js](https://nextjs.org), and SQLite. The application allows you to manage a database of words and phrases in two languages, with features for editing and searching.


## Features

- **Manage Words and Phrases**: View, edit, and update words and phrases in two languages.
- **Search Functionality**: Filter words and phrases using a search bar.

## Requirements

- Node.js (version 14 or higher)
- npm or yarn

## Installation

1. Run the following command to install the necessary dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```
2. **Initialize the Database**:
   Run the script to populate the SQLite database:

   ```bash
   npm run init-db
   ```

## Running the Project Locally

1. **Start the Development Server**:
   Run the following command to start the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```
2. **Open the Application in Your Browser**:
   Open your web browser and go to [http://localhost:3000](http://localhost:3000) to see the application running.

## Project Structure

- **`src/app/page.tsx`**: Main component that handles the display and editing of words and phrases.
- **`src/app/components/Modal.tsx`**: Component for editing words and phrases.
- **`src/app/api/route.ts`**: API for handling GET and PATCH requests to the SQLite database.
