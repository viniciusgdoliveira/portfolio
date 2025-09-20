'use client';

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useTranslations, useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';

export default function Home() {
  const [currentAboutIndex, setCurrentAboutIndex] = useState(0);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const t = useTranslations('home');
  const locale = useLocale();
  const pathname = usePathname();
  
  // Extract locale from pathname as fallback
  const pathLocale = pathname.split('/')[1] || 'en';
  const currentLocale = locale || pathLocale;

  const aboutSections = [
    {
      title: t('atWork.title'),
      content: t('atWork.content'),
      image: "https://cdn.shopify.com/s/files/1/0666/0207/4202/files/MG_7808.jpg?v=1758300880",
      techStack: t.raw('atWork.techStack')
    },
    {
      title: t('beyondWork.title'), 
      content: t('beyondWork.content'),
      image: "https://cdn.shopify.com/s/files/1/0666/0207/4202/files/WhatsApp_Image_2025-09-19_at_13.37.57.jpg?v=1758300008",
      techStack: t.raw('beyondWork.techStack')
    },
    {
      title: t('alwaysLearning.title'),
      content: t('alwaysLearning.content'),
      image: "https://cdn.shopify.com/s/files/1/0666/0207/4202/files/MG_7850.jpg?v=1758300881",
      techStack: t.raw('alwaysLearning.techStack')
    }
  ];
  

  useEffect(() => {
    if (!isAutoRotating) return;
    
    const interval = setInterval(() => {
      setCurrentAboutIndex((prevIndex) => (prevIndex + 1) % aboutSections.length);
    }, 8000); // Change every 8 seconds (slower)

    return () => clearInterval(interval);
  }, [aboutSections.length, isAutoRotating]);

  return (
    <div className="min-h-screen liquid-bg">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Vinícius Guimarães de Oliveira",
            "jobTitle": "Software Engineer",
            "description": "Software Engineer specializing in Shopify, Hydrogen, TypeScript, ReactJS, Next.js, and Firebase",
            "url": "https://viniciusgdoliveira.vercel.app",
            "sameAs": [
              "https://github.com/viniciusgdoliveira",
              "https://linkedin.com/in/viniciusgdoliveira"
            ],
            "knowsAbout": [
              "Shopify",
              "Hydrogen",
              "TypeScript",
              "ReactJS",
              "Next.js",
              "Firebase",
              "Software Engineering",
              "Web Development",
              "Frontend Development"
            ],
            "worksFor": {
              "@type": "Organization",
              "name": "Freelance"
            }
          })
        }}
      />
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <div className="w-32 h-32 liquid-glass mx-auto mb-6 flex items-center justify-center floating overflow-hidden rounded-full">
              <Image 
                src="https://cdn.shopify.com/s/files/1/0666/0207/4202/files/vinicius-transparent-bg.png?v=1752328643" 
                alt="Vinícius Guimarães de Oliveira" 
                width={128}
                height={128}
                className="w-full h-full object-cover"
                priority
              />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">Vinícius Guimarães de Oliveira</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-4 max-w-3xl mx-auto">
            {t('subtitle')}
          </p>
          
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            {t('description')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href={`/${currentLocale}/projects`}
              className="liquid-button text-white font-semibold py-3 px-8 rounded-[20px] transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              {t('viewWork')}
            </Link>
            <Link
              href={`/${currentLocale}/contact`}
              className="liquid-glass-light text-white hover:text-white font-semibold py-3 px-8 rounded-[20px] transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
            >
              {t('getInTouch')}
            </Link>
          </div>
        </div>
      </section>

      {/* Rotating About Section */}
      <section className="container mx-auto px-4 py-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t('aboutMe')}
            </h2>
            <p className="text-lg text-white/80">
              {t('aboutDescription')}
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Rotating Photo/Content */}
            <div className="relative">
              <div className="aspect-square md:aspect-[4/5] lg:aspect-square rounded-3xl liquid-glass overflow-hidden transition-all duration-1000 ease-in-out">
                <Image 
                  src={aboutSections[currentAboutIndex].image}
                  alt={`${aboutSections[currentAboutIndex].title} - Vinícius Guimarães de Oliveira`}
                  width={500}
                  height={500}
                  className="w-full h-full object-cover transition-all duration-1000 ease-in-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
              
                </div>
                {/* Play/Pause Button - Inside Image */}
                <div className="absolute bottom-4 right-4">
                  <button
                    onClick={() => setIsAutoRotating(!isAutoRotating)}
                    className="p-2 rounded-full bg-black/30 backdrop-blur-sm text-white/90 hover:text-white hover:bg-black/50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
                    aria-label={isAutoRotating ? "Pause auto-rotation" : "Resume auto-rotation"}
                  >
                    {isAutoRotating ? (
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    )}
                  </button>
                </div>
              </div>
              
              {/* Navigation Dots */}
              <div className="flex justify-center space-x-3 mt-6">
                {aboutSections.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentAboutIndex(index);
                      // Optionally pause auto-rotation when user manually navigates
                      // setIsAutoRotating(false);
                    }}
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
            <div className="liquid-card p-6 md:p-8 min-h-[400px] md:min-h-[500px] flex flex-col justify-between">
              <div className="mb-6">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-4">
                  {aboutSections[currentAboutIndex].title}
                </h3>
                <p className="text-base md:text-lg text-white/80 leading-relaxed">
                  {aboutSections[currentAboutIndex].content}
                </p>
              </div>
              
              {/* Dynamic Skills */}
              <div className="flex flex-wrap gap-2 md:gap-3">
                {aboutSections[currentAboutIndex].techStack.map((skill: string, index: number) => (
                  <span key={index} className="px-3 py-2 md:px-4 md:py-2 liquid-glass-light text-white rounded-full text-xs md:text-sm font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Preview */}
      <section className="container mx-auto px-4 py-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t('featuredProjects.title')}
            </h2>
            <p className="text-lg text-white/80">
              {t('featuredProjects.description')}
            </p>
          </div>
          
          <div className="space-y-8">
            {/* First Row - 2 Big Cards */}
            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  key: "trailMakingTest",
                  tech: ["React Native", "Expo", "TypeScript"],
                  image: "bg-gradient-to-br from-blue-400 to-purple-500",
                  github: "https://github.com/viniciusgdoliveira/trail-making-test-digital",
                  live: "",
                  videoUrl: "https://cdn.shopify.com/videos/c/o/v/61e3792a038e4e04a9e5bc85c3f1a54d.mp4"
                },
                {
                  key: "aulaFirebase",
                  tech: ["Next.js", "Firebase", "Vercel"],
                  image: "bg-gradient-to-br from-green-400 to-blue-500",
                  github: "https://github.com/viniciusgdoliveira/aula-firebase-nextjs",
                  live: "http://aula-firebase.vercel.app/",
                  videoUrl: "https://cdn.shopify.com/videos/c/o/v/c1bd79ad562d433a9ab0369763c316e2.mov"
                }
              ].map((project, index) => (
              <div key={index} className="liquid-card overflow-hidden hover:scale-105 transition-all duration-300">
                {project.videoUrl ? (
                  <div className="h-64 relative">
                    <video 
                      src={project.videoUrl}
                      className="w-full h-full object-cover"
                      muted
                      loop
                      autoPlay
                      playsInline
                    />
                  </div>
                ) : (
                  <div className={`h-64 ${project.image} flex items-center justify-center`}>
                    <div className="text-white text-center">
                      <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                      </div>
                      <p className="text-sm opacity-80">Project Preview</p>
                    </div>
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">
                    {t(`featuredProjects.items.${project.key}.title`)}
                  </h3>
                  <p className="text-white/80 mb-4 text-sm">
                    {t(`featuredProjects.items.${project.key}.description`)}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-2 py-1 liquid-glass-light text-white text-xs rounded-xl"
                    >
                      {tech}
                    </span>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-white/10 hover:bg-white/20 text-white py-2 px-4 rounded-[20px] transition-colors duration-200 text-center text-sm"
                    >
                      {t('featuredProjects.github')}
                    </a>
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-[20px] transition-colors duration-200 text-center text-sm"
                      >
                        {t('featuredProjects.liveDemo')}
                      </a>
                    )}
                  </div>
                </div>
              </div>
              ))}
            </div>
            
            {/* Second Row - 4 Small Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  key: "meuAssessorFashion",
                  tech: ["Python", "Flask", "AI/ML"],
                  image: "bg-gradient-to-br from-orange-400 to-red-500",
                  github: "https://github.com/viniciusgdoliveira/meuassessorfashion",
                  live: "https://meuassessorfashion.onrender.com",
                  videoUrl: "https://cdn.shopify.com/videos/c/o/v/f459b50c1b074da3b190bb9c0bd90ae7.mp4"
                },
                {
                  key: "pythonAutomation",
                  tech: ["Python", "Automation", "APIs"],
                  image: "bg-gradient-to-br from-yellow-400 to-orange-500",
                  github: "https://github.com/viniciusgdoliveira/python-code-automation",
                  live: "",
                  videoUrl: "https://cdn.shopify.com/videos/c/o/v/98c41452a4fa445dbd00971e81601fea.mp4"
                },
                {
                  key: "hydrogenMush",
                  tech: ["Hydrogen", "React", "TypeScript"],
                  image: "bg-gradient-to-br from-purple-400 to-pink-500",
                  github: "https://github.com/viniciusgdoliveira/hydrogen-mush",
                  live: "https://mush.company",
                  videoUrl: "https://cdn.shopify.com/videos/c/o/v/1088c712e6a7457aae52e3694c54674d.mp4"
                },
                {
                  key: "mushShopify",
                  tech: ["Shopify", "Liquid", "JavaScript"],
                  image: "bg-gradient-to-br from-indigo-400 to-purple-500",
                  github: "https://github.com/viniciusgdoliveira/mush-shopify",
                  live: "https://mushcompany.myshopify.com",
                  videoUrl: ""
                }
              ].map((project, index) => (
              <div key={index} className="liquid-card overflow-hidden hover:scale-105 transition-all duration-300">
                {project.videoUrl ? (
                  <div className="h-32 relative">
                    <video 
                      src={project.videoUrl}
                      className="w-full h-full object-cover"
                      muted
                      loop
                      autoPlay
                      playsInline
                    />
                  </div>
                ) : (
                  <div className={`h-32 ${project.image} flex items-center justify-center`}>
                    <div className="text-white text-center">
                      <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                      </div>
                      <p className="text-xs opacity-80">Project Preview</p>
                    </div>
                  </div>
                )}
                <div className="p-4">
                  <h3 className="text-lg font-bold text-white mb-2">
                    {t(`featuredProjects.items.${project.key}.title`)}
                  </h3>
                  <p className="text-white/80 mb-3 text-xs">
                    {t(`featuredProjects.items.${project.key}.description`)}
                  </p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {project.tech.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-2 py-1 liquid-glass-light text-white text-xs rounded-xl"
                    >
                      {tech}
                    </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-white/10 hover:bg-white/20 text-white py-1 px-2 rounded-[20px] text-center text-xs transition-colors duration-200"
                    >
                      {t('featuredProjects.github')}
                    </a>
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded-[20px] text-center text-xs transition-colors duration-200"
                      >
                        {t('featuredProjects.liveDemo')}
                      </a>
                    )}
                  </div>
                </div>
              </div>
              ))}
            </div>
          </div>
          
          <div className="text-center mt-6">
            <Link
              href={`/${currentLocale}/projects`}
              className="inline-flex items-center space-x-2 text-white hover:text-white/80 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 rounded-[20px] px-4 py-2 bg-white/10 hover:bg-white/20"
            >
              <span>{t('featuredProjects.viewAllProjects')}</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="liquid-card p-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              {t('cta.title')}
            </h2>
            <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
              {t('cta.description')}
            </p>
            <Link
              href={`/${currentLocale}/contact`}
              className="liquid-button text-white font-semibold py-3 px-8 rounded-[20px] transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              {t('cta.getInTouch')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
