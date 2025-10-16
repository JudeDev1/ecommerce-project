// src/App.tsx
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Welcome to the Test App</h1>
        <p className="text-gray-700">
          If you see a gray navbar with items on the left, a centered logo, and a $ + cart on
          the right, Tailwind is working!
        </p>
      </main>
    </div>
  );
}
