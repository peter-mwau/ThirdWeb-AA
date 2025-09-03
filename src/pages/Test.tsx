import { CheckoutWidget } from "thirdweb/react";
import { defineChain } from "thirdweb";
import React, { useState } from "react";
import { client } from "../client";
import { X, ExternalLink, BookOpen, Clock, Users, Star } from "lucide-react";

const courses = [
  {
    id: "C101",
    name: "React Fundamentals",
    description:
      "Learn the basics of React, including components, state, and props. Build your first React application with hands-on projects and expert guidance.",
    creator: "0x4E7a158f78507F234DA41badFB6C4E6325f0F181",
    price: 0.0034,
    duration: "6 hours",
    students: 1250,
    rating: 4.8,
    level: "Beginner",
    image: "/public/mine.jpeg",
  },
  {
    id: "C102",
    name: "Smart Contracts 101",
    description:
      "Introduction to Ethereum smart contracts and Solidity. Master the fundamentals of blockchain development and deploy your first smart contract.",
    creator: "0xabcdefabcdefabcdefabcdefabcdefabcdefabcd",
    price: 0.00156,
    duration: "10 hours",
    students: 890,
    rating: 4.9,
    level: "Intermediate",
    image: "/public/mine1.jpeg",
  },
  {
    id: "C103",
    name: "Web3 Dapp Development",
    description:
      "Build decentralized applications using Web3 technologies. Learn to integrate wallets, interact with smart contracts, and deploy fully functional dApps.",
    creator: "0x9876543210abcdef9876543210abcdef98765432",
    price: 0.0023,
    duration: "15 hours",
    students: 2100,
    rating: 4.7,
    level: "Advanced",
    image: "/public/mine2.jpeg",
  },
];

function Test() {
  const [selectedCourse, setSelectedCourse] = useState(null);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* 3D Background will be here from vanta.js */}

      {/* Main Content Overlay */}
      <div className="relative z-10 pt-8 pb-16 px-4">
        {/* Header Section */}
        <header className="max-w-6xl mx-auto mb-12 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 animate-fade-in-down">
            Web3
            <span
              className="text-transparent bg-clip-text"
              style={{
                backgroundImage: "linear-gradient(to right, #20d42b, #1f3c5f)",
              }}
            >
              Academy
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Discover blockchain courses and master Web3 development. Purchase
            courses securely with crypto.
          </p>
        </header>

        {/* Courses Grid */}
        <main className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course, index) => (
              <div
                key={course.id}
                className="bg-gray-900/70 backdrop-blur-md rounded-2xl p-6 border border-gray-700/50 shadow-xl overflow-hidden group animate-fade-in-up"
                style={{ animationDelay: `${0.1 * index}s` }}
              >
                {/* Course Header */}
                <div className="mb-4 flex justify-between items-start">
                  <span
                    className="text-xs font-semibold px-2 py-1 rounded-full text-white"
                    style={{ backgroundColor: "#20d42b33" }}
                  >
                    {course.level}
                  </span>
                  <div className="flex items-center text-yellow-400">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm ml-1">{course.rating}</span>
                  </div>
                </div>

                {/* Course Title */}
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#20d42b] transition-colors duration-300">
                  {course.name}
                </h3>

                {/* Course Description */}
                <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                  {course.description}
                </p>

                {/* Course Meta Info */}
                <div className="flex items-center justify-between text-xs text-gray-500 mb-5">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    <span>{course.students.toLocaleString()}</span>
                  </div>
                </div>

                {/* Creator Info */}
                <div className="mb-5">
                  <p className="text-xs text-gray-400 mb-1">Created by</p>
                  <div className="flex items-center">
                    <span className="text-xs font-mono text-gray-300 truncate max-w-[120px]">
                      {course.creator.slice(0, 6)}...{course.creator.slice(-4)}
                    </span>
                    <ExternalLink className="w-3 h-3 ml-1 text-[#20d42b]" />
                  </div>
                </div>

                {/* Price and Action */}
                <div className="flex items-center justify-between mt-4">
                  <div>
                    <p className="text-xs text-gray-400">Price</p>
                    <p className="text-lg font-bold text-white">
                      {course.price} ETH
                    </p>
                  </div>
                  <button
                    className="px-4 py-2 rounded-xl font-semibold text-white transition-all duration-300 flex items-center space-x-2 group-hover:scale-105"
                    style={{
                      background: "linear-gradient(to right, #20d42b, #1f3c5f)",
                      boxShadow: "0 4px 14px 0 rgba(32, 212, 43, 0.25)",
                    }}
                    onClick={() => setSelectedCourse(course)}
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>Enroll Now</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Additional Info */}
          <div
            className="mt-12 text-center animate-fade-in-up"
            style={{ animationDelay: "0.4s" }}
          >
            <div className="inline-flex items-center bg-gray-800/70 backdrop-blur-sm border border-gray-700/50 text-gray-300 rounded-xl px-6 py-4">
              <div className="w-3 h-3 bg-[#20d42b] rounded-full mr-3 animate-pulse"></div>
              All payments are processed securely on the blockchain
            </div>
          </div>
        </main>
      </div>

      {/* CheckoutWidget Modal */}
      {selectedCourse && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 pt-[100px] z-[99999] animate-fade-in">
          <div className="bg-gray-900/90 backdrop-blur-lg rounded-2xl border border-gray-700/50 shadow-2xl max-w-md w-full relative animate-scale-in">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors p-1 rounded-full hover:bg-gray-700/50 z-10"
              onClick={() => setSelectedCourse(null)}
            >
              <X className="w-6 h-6" />
            </button>

            <div className="p-6">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-white mb-2">
                  Enroll in {selectedCourse.name}
                </h3>
                <p className="text-gray-400 text-sm">
                  Complete your purchase using crypto
                </p>
              </div>

              {/* <div className="mb-6 p-4 rounded-xl bg-gray-800/50 border border-gray-700/30">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-400">Price:</span>
                  <span className="font-bold text-white">
                    {selectedCourse?.price} ETH
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Course ID:</span>
                  <span className="font-mono text-sm text-[#20d42b]">
                    {selectedCourse.id}
                  </span>
                </div>
              </div> */}

              <CheckoutWidget
                client={client}
                chain={defineChain(8453)}
                amount={selectedCourse.price.toString()}
                seller={selectedCourse.creator}
                name={selectedCourse.name}
                description={selectedCourse.description}
                image={selectedCourse?.image}
                onSuccess={() => {
                  setSelectedCourse(null);
                  // You might want to use a toast notification here instead of alert
                  alert(
                    "Purchase successful! You now have access to the course."
                  );
                }}
              />

              <p className="text-xs text-gray-500 mt-4 text-center">
                Transaction will be processed on Base network
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Test;
