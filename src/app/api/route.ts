// route.js
// Import the necessary modules for SQLite
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import { Database } from 'sqlite';

// Initialize a variable to hold the SQLite database connection
let db: Database | null = null;

// Handler for GET requests to retrieve all todos
export async function GET(req, res) {
    // Open a new connection if there is none
    if (!db) {
        db = await open({
            filename: "./cms.db",
            driver: sqlite3.Database,
        });
    }

    // Query to get all words from the "words" table
    const words = await db.all("SELECT * FROM words");

    // Return the words as a JSON response with a 200 status code
    return new Response(JSON.stringify(words), {
        headers: { "content-type": "application/json" },
        status: 200,
    });
}
// Handler for PATCH requests to update a todo by ID
export async function PATCH(req, res) {
    // Open a new connection if there is none
    if (!db) {
        db = await open({
            filename: "./cms.db",
            driver: sqlite3.Database,
        });
    }

    // Extract the ID and task from the request body
    const { id, wordFirstLang, wordSecondLang, sentenceFirstLang, sentenceSecondLang } = await req.json();

    // Update the todo with the specified ID in the "todo" table
    await db.run("UPDATE words SET wordFirstLang = ?, wordSecondLang = ?, sentenceFirstLang = ?, sentenceSecondLang = ? WHERE id = ?", wordFirstLang, wordSecondLang, sentenceFirstLang, sentenceSecondLang, id);

    // Return a success message as a JSON response with a 200 status code
    return new Response(
        JSON.stringify(
            { message: "success" },
            { headers: { "content-type": "application/json" }, status: 200 }
        )
    );
}