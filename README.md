# 🔍 React Product Autocomplete (Next.js + Tailwind CSS)

A fast and responsive product autocomplete component built using **Next.js App Router**, **Tailwind CSS v4**, and **TypeScript**. It fetches product suggestions from an external API and displays them in an interactive dropdown with infinite scroll.

---

## 🚀 Live Demo on vercel

[autocomplete-8xhjjfdux-prakhar-mishras-projects-967c52ce.vercel.app]()

---

## 📦 Features

- 🔍 Product search using [dummyjson.com API](https://dummyjson.com/products/search)
- ⏱️ Debounced search with 500ms delay (starts after 2+ characters)
- 📄 Pagination using `limit` and `skip` parameters
- 🔄 Infinite scroll in dropdown results
- ⚠️ Loading, error, and empty-state handling
- ✨ Clean, responsive UI with Tailwind CSS v4
- 🧩 Modular and reusable components
- 🔒 Fully typed with TypeScript
- ⚙️ `.env` environment variable support

---

## 🛠️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/PrakharMishra639/AutocompleteApp.git

cd AutocompleteApp

Install Dependencies
npm install

Create a .env.local file in the root directory:
NEXT_PUBLIC_API_URL=https://dummyjson.com/products/search
NEXT_PUBLIC_PAGE_LIMIT=10

 Run Development Server
 npm run dev
 Open your browser at http://localhost:3000 to view the app.
```
