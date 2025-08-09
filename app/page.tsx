"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface TestCategory {
  id: number;
  name: string;
  questionCount: number;
  icon: string;
  color: string;
}

export default function Home() {
  const [testCategories, setTestCategories] = useState<TestCategory[]>([]);
  const [user] = useState({ name: "Rumi Aktar", id: "1809", points: 160 });

  useEffect(() => {
    // Create test categories for tests 1-9
    const categories: TestCategory[] = [
      {
        id: 1,
        name: "Test 1",
        questionCount: 30,
        icon: "📄",
        color: "bg-orange-500",
      },
      {
        id: 2,
        name: "Test 2",
        questionCount: 30,
        icon: "📜",
        color: "bg-yellow-500",
      },
      {
        id: 3,
        name: "Test 3",
        questionCount: 30,
        icon: "⚛️",
        color: "bg-blue-400",
      },
      {
        id: 4,
        name: "Test 4",
        questionCount: 30,
        icon: "⚙️",
        color: "bg-purple-500",
      },
      {
        id: 5,
        name: "Test 5",
        questionCount: 30,
        icon: "🐍",
        color: "bg-green-500",
      },
      {
        id: 6,
        name: "Test 6",
        questionCount: 30,
        icon: "📚",
        color: "bg-indigo-500",
      },
      {
        id: 7,
        name: "Test 7",
        questionCount: 30,
        icon: "📚",
        color: "bg-pink-500",
      },
      {
        id: 8,
        name: "Test 8",
        questionCount: 30,
        icon: "📚",
        color: "bg-red-500",
      },
      {
        id: 9,
        name: "Test 9",
        questionCount: 30,
        icon: "📚",
        color: "bg-teal-500",
      },
    ];
    setTestCategories(categories);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="flex items-center justify-between px-6 py-4 max-w-md mx-auto">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-sm">RA</span>
            </div>
            <div>
              <h2 className="font-semibold text-gray-900">{user.name}</h2>
              <p className="text-sm text-gray-500">ID: {user.id}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1 bg-blue-100 px-3 py-1 rounded-full">
              <span className="text-blue-600 font-medium">🏆</span>
              <span className="text-blue-600 font-medium">{user.points}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div
        className="mx-6 my-6 bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl px-6 py-8 text-white relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #0F469A 0%, #407DD8 100%)",
        }}
      >
        <div className="relative z-10">
          <h1 className="text-xl font-bold mb-2">Test Your Knowledge with</h1>
          <h1 className="text-xl font-bold mb-4">Quizzes</h1>
          <p className="text-blue-100 mb-6">
            We're ready to help you learn and
            <br />
            practice new concepts
          </p>
          <button className="bg-white text-blue-600 px-6 py-2 rounded-lg font-medium">
            Play Now
          </button>
        </div>
        <div className="absolute right-4 top-4 opacity-20">
          <div className="w-24 h-24 bg-white rounded-full"></div>
          <div className="w-16 h-16 bg-white rounded-full mt-2"></div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="px-6 mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            🔍
          </button>
        </div>
      </div>

      {/* Categories */}
      <div className="px-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
        <div className="grid grid-cols-4 gap-4 mb-6">
          {testCategories.slice(0, 4).map((category) => (
            <Link key={category.id} href={`/quiz/${category.id}`}>
              <div className="flex flex-col items-center space-y-2 cursor-pointer">
                <div
                  className={`w-12 h-12 ${category.color} rounded-xl flex items-center justify-center text-white text-lg`}
                >
                  {category.icon}
                </div>
                <span className="text-xs text-gray-600 text-center">
                  {category.name}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="px-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Recent Activity
        </h3>
        <div className="space-y-3">
          {testCategories.map((category) => (
            <Link key={category.id} href={`/quiz/${category.id}`}>
              <div className="bg-white rounded-xl p-4 flex items-center justify-between shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-10 h-10 ${category.color} rounded-lg flex items-center justify-center text-white`}
                  >
                    {category.icon}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">
                      {category.name}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {category.questionCount} Question
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">
                    {Math.floor(Math.random() * 10) + 20}/30
                  </div>
                  <div className="text-xs text-gray-500">Score</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="flex justify-around py-3 max-w-md mx-auto">
          <button className="flex flex-col items-center space-y-1">
            <div className="w-6 h-6 text-blue-600">🏠</div>
          </button>
          <button className="flex flex-col items-center space-y-1">
            <div className="w-6 h-6 text-gray-400">📊</div>
          </button>
          <button className="flex flex-col items-center space-y-1">
            <div className="w-6 h-6 text-gray-400">❤️</div>
          </button>
          <button className="flex flex-col items-center space-y-1">
            <div className="w-6 h-6 text-gray-400">👤</div>
          </button>
        </div>
      </div>

      {/* Add padding to prevent content from being hidden behind fixed navigation */}
      <div className="h-20"></div>
    </div>
  );
}
