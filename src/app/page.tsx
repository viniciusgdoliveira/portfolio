'use client';

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Home() {
  const [currentAboutIndex, setCurrentAboutIndex] = useState(0);

  const aboutSections = [
    {
      title: "Professional",
      content: "As a Software Engineer specializing in Shopify, Hydrogen, and modern web technologies, I bring methodical precision and punctuality to every project. My focus on work excellence drives me to deliver high-quality solutions that exceed client expectations.",
      image: "bg-gradient-to-br from-blue-500 to-indigo-600",
      icon: "💼"
    },
    {
      title: "Lifestyle", 
      content: "I'm a friendly, easy-going person who believes in the power of adaptation. Whether working solo or collaborating in teams, I bring respect and positivity to every interaction. Life's success comes from embracing different situations with an open mind.",
      image: "bg-gradient-to-br from-green-500 to-emerald-600",
      icon: "🌟"
    },
    {
      title: "Introspective",
      content: "Beyond code, I find fulfillment in exploring new technologies and contributing to open-source projects. I believe continuous learning and adaptation are essential not just for professional growth, but for personal development and meaningful connections.",
      image: "bg-gradient-to-br from-purple-500 to-pink-600", 
      icon: "🧠"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAboutIndex((prevIndex) => (prevIndex + 1) % aboutSections.length);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, [aboutSections.length]);

  return (
    <div className="min-h-screen liquid-bg">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <div className="w-32 h-32 liquid-glass mx-auto mb-6 flex items-center justify-center floating">
              <span className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">VG</span>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6">
            Hi, I&apos;m <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Vinícius Guimarães de Oliveira</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-4 max-w-3xl mx-auto">
            Software Engineer | Shopify | Hydrogen | TypeScript | ReactJS | Next.js | Firebase
          </p>
          
          <p className="text-lg text-slate-500 dark:text-slate-400 mb-8 max-w-2xl mx-auto">
            Creating beautiful, functional, and user-centered digital experiences with modern technologies.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/projects"
              className="liquid-button text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 hover:scale-105"
            >
              View My Work
            </Link>
            <Link
              href="/contact"
              className="liquid-glass-light text-blue-600 dark:text-blue-400 hover:text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 hover:scale-105"
            >
              Get In Touch
            </Link>
          </div>
        </div>
      </section>

      {/* Rotating About Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              About Me
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300">
              Discover different aspects of who I am
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Rotating Photo/Content */}
            <div className="relative">
              <div className={`aspect-square ${aboutSections[currentAboutIndex].image} rounded-3xl liquid-glass overflow-hidden transition-all duration-1000 ease-in-out`}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-white text-center">
                    <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <span className="text-6xl">{aboutSections[currentAboutIndex].icon}</span>
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{aboutSections[currentAboutIndex].title}</h3>
                    <p className="text-sm opacity-80">Photo Placeholder</p>
                  </div>
                </div>
              </div>
              
              {/* Navigation Dots */}
              <div className="flex justify-center space-x-3 mt-6">
                {aboutSections.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentAboutIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentAboutIndex 
                        ? 'bg-blue-600 dark:bg-blue-400 scale-125' 
                        : 'bg-slate-300 dark:bg-slate-600 hover:bg-slate-400 dark:hover:bg-slate-500'
                    }`}
                  />
                ))}
              </div>
            </div>
            
            {/* Content */}
            <div className="liquid-card p-8">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                  {aboutSections[currentAboutIndex].title}
                </h3>
                <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                  {aboutSections[currentAboutIndex].content}
                </p>
              </div>
              
              {/* Skills */}
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-2 liquid-glass-light text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium">
                  Shopify
                </span>
                <span className="px-4 py-2 liquid-glass-light text-green-600 dark:text-green-400 rounded-full text-sm font-medium">
                  Hydrogen
                </span>
                <span className="px-4 py-2 liquid-glass-light text-purple-600 dark:text-purple-400 rounded-full text-sm font-medium">
                  TypeScript
                </span>
                <span className="px-4 py-2 liquid-glass-light text-red-600 dark:text-red-400 rounded-full text-sm font-medium">
                  ReactJS
                </span>
                <span className="px-4 py-2 liquid-glass-light text-orange-600 dark:text-orange-400 rounded-full text-sm font-medium">
                  Next.js
                </span>
                <span className="px-4 py-2 liquid-glass-light text-cyan-600 dark:text-cyan-400 rounded-full text-sm font-medium">
                  Firebase
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Preview */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Featured Projects
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300">
              Here are some of my recent projects that I&apos;m particularly proud of.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Trail Making Test Digital",
                description: "Digital neuropsychological assessment tool for iPad and tablets.",
                tech: ["React Native", "Expo", "TypeScript"],
                image: "bg-gradient-to-br from-blue-400 to-purple-500"
              },
              {
                title: "Aula Firebase Next.js",
                description: "Learning management system with Firebase integration and real-time features.",
                tech: ["Next.js", "Firebase", "Vercel"],
                image: "bg-gradient-to-br from-green-400 to-blue-500"
              },
              {
                title: "Meu Assessor Fashion",
                description: "AI-powered fashion consultant with intelligent styling recommendations.",
                tech: ["Python", "Flask", "AI/ML"],
                image: "bg-gradient-to-br from-orange-400 to-red-500"
              }
            ].map((project, index) => (
              <div key={index} className="liquid-card overflow-hidden hover:scale-105 transition-all duration-300">
                <div className={`h-48 ${project.image} flex items-center justify-center`}>
                  <div className="text-white text-center">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                    </div>
                    <p className="text-sm opacity-80">Project Preview</p>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                    {project.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 mb-4 text-sm">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-2 py-1 liquid-glass-light text-slate-700 dark:text-slate-300 text-xs rounded-xl"
                    >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link
              href="/projects"
              className="inline-flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold transition-colors"
            >
              <span>View All Projects</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="liquid-card p-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">
              Let&apos;s Work Together
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto">
              I&apos;m always interested in new opportunities and exciting projects. 
              Whether you have a question or just want to say hi, I&apos;ll try my best to get back to you!
            </p>
            <Link
              href="/contact"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Get In Touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
