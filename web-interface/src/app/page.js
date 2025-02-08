"use client";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [addRecipeName, setAddRecipeName] = useState("");
  const [modifyRecipeId, setModifyRecipeId] = useState("");
  const [modifyRecipeName, setModifyRecipeName] = useState("");
  const [deleteRecipeId, setDeleteRecipeId] = useState("");
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [modifyFeedbackMessage, setModifyFeedbackMessage] = useState("");
  const [deleteFeedbackMessage, setDeleteFeedbackMessage] = useState("");

  const handleAddRecipe = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3006/recipe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: addRecipeName }),
      });
      const data = await response.json();
      if (response.ok) {
        setFeedbackMessage("Recipe added successfully!");
      } else {
        setFeedbackMessage(`Error: ${data.error}`);
      }
    } catch (error) {
      setFeedbackMessage("Error adding recipe.");
      console.error("Error adding recipe:", error);
    }
  };

  const handleModifyRecipe = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3006/recipe/${modifyRecipeId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: modifyRecipeName }),
      });
      const data = await response.json();
      if (response.ok) {
        setModifyFeedbackMessage("Recipe modified successfully!");
      } else {
        setModifyFeedbackMessage(`Error: ${data.error}`);
      }
    } catch (error) {
      setModifyFeedbackMessage("Error modifying recipe.");
      console.error("Error modifying recipe:", error);
    }
  };

  const handleDeleteRecipe = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3006/recipe/${deleteRecipeId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setDeleteFeedbackMessage("Recipe deleted successfully!");
      } else {
        const data = await response.json();
        setDeleteFeedbackMessage(`Error: ${data.error}`);
      }
    } catch (error) {
      setDeleteFeedbackMessage("Error deleting recipe.");
      console.error("Error deleting recipe:", error);
    }
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2">
            Get started by editing{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
              src/app/page.js
            </code>
            .
          </li>
          <li>Save and see your changes instantly.</li>
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Deploy now
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read our docs
          </a>
        </div>

        <form onSubmit={handleAddRecipe} className="flex flex-col gap-4">
          <h2>Add Recipe</h2>
          <input
            type="text"
            placeholder="Recipe Name"
            value={addRecipeName}
            onChange={(e) => setAddRecipeName(e.target.value)}
            className="border p-2 rounded"
          />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            Add Recipe
          </button>
          {feedbackMessage && (
            <p className="mt-2 text-sm text-green-600">{feedbackMessage}</p>
          )}
        </form>

        <form onSubmit={handleModifyRecipe} className="flex flex-col gap-4">
          <h2>Modify Recipe</h2>
          <input
            type="text"
            placeholder="Recipe ID"
            value={modifyRecipeId}
            onChange={(e) => setModifyRecipeId(e.target.value)}
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="New Recipe Name"
            value={modifyRecipeName}
            onChange={(e) => setModifyRecipeName(e.target.value)}
            className="border p-2 rounded"
          />
          <button type="submit" className="bg-yellow-500 text-white p-2 rounded">
            Modify Recipe
          </button>
          {modifyFeedbackMessage && (
            <p className="mt-2 text-sm text-green-600">{modifyFeedbackMessage}</p>
          )}
        </form>

        <form onSubmit={handleDeleteRecipe} className="flex flex-col gap-4">
          <h2>Delete Recipe</h2>
          <input
            type="text"
            placeholder="Recipe ID"
            value={deleteRecipeId}
            onChange={(e) => setDeleteRecipeId(e.target.value)}
            className="border p-2 rounded"
          />
          <button type="submit" className="bg-red-500 text-white p-2 rounded">
            Delete Recipe
          </button>
          {deleteFeedbackMessage && (
            <p className="mt-2 text-sm text-green-600">{deleteFeedbackMessage}</p>
          )}
        </form>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}