// app/page.tsx

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center p-6">
      <h1 className="text-4xl font-bold text-blue-700 mb-4">Welcome to School ERP</h1>
      <p className="text-lg text-gray-700 mb-6">
        Manage students, teachers, classes, and more efficiently.
      </p>
      <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
        Get Started
      </button>
    </main>
  );
}
