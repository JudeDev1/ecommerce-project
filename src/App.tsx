// src/App.tsx
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4"></h1>
        <p className="text-gray-700">
        </p>
      </main>
    </div>
  );
}
