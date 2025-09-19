'use client';

import { useState } from 'react';

export default function Projects() {
  const projects = [
    {
      id: 1,
      title: "Trail Making Test Digital",
      description: "A digital adaptation of the Trail Making Test (TMT) neuropsychological assessment tool, developed for iPad and tablets. Features Part A (number sequencing) and Part B (alternating number-letter sequences) to evaluate visual attention and task switching abilities. Built for Ph.D. research and optimized for touch interfaces.",
      image: "https://cdn.shopify.com/s/files/1/0666/0207/4202/files/Screenshot_2025-09-19_at_16.59.30.png?v=1758311986",
      technologies: ["React Native", "Expo", "TypeScript", "iOS/Android"],
      github: "https://github.com/viniciusgdoliveira/trail-making-test-digital",
      live: "", // Mobile app - no web version
      videoUrl: "https://cdn.shopify.com/videos/c/o/v/61e3792a038e4e04a9e5bc85c3f1a54d.mp4",
      featured: true
    },
    {
      id: 2,
      title: "Aula Firebase Next.js",
      description: "A comprehensive learning management system demonstrating Firebase integration with Next.js. Features user authentication, Firestore document management, Cloud Storage for image uploads, and real-time data synchronization. Deployed on Vercel with full CRUD operations and file management capabilities.",
      image: "https://cdn.shopify.com/s/files/1/0666/0207/4202/files/Screenshot_2025-09-19_at_16.57.00.png?v=1758311880",
      technologies: ["Next.js", "Firebase", "Firestore", "Vercel", "TypeScript"],
      github: "https://github.com/viniciusgdoliveira/aula-firebase-nextjs",
      live: "http://aula-firebase.vercel.app/",
      videoUrl: "https://cdn.shopify.com/videos/c/o/v/c1bd79ad562d433a9ab0369763c316e2.mov",
      featured: true
    },
    {
      id: 3,
      title: "Meu Assessor Fashion",
      description: "An AI-powered fashion consultant application that provides personalized styling recommendations and outfit suggestions. Features intelligent image analysis, style matching algorithms, and interactive fashion advice to help users discover their perfect look.",
      image: "https://cdn.shopify.com/s/files/1/0666/0207/4202/files/Screenshot_2025-09-19_at_16.56.03.png?v=1758311883",
      technologies: ["Python", "Flask", "HTML", "CSS", "AI/ML"],
      github: "https://github.com/viniciusgdoliveira/meuassessorfashion",
      live: "https://meuassessorfashion.onrender.com",
      videoUrl: "https://cdn.shopify.com/videos/c/o/v/f459b50c1b074da3b190bb9c0bd90ae7.mp4", // Will be provided later
      featured: false
    },
    {
      id: 4,
      title: "Python Code Automation",
      description: "A powerful automation toolkit built with Python for streamlining development workflows and repetitive tasks. Features script automation, file processing, API integrations, and custom workflow management to enhance developer productivity.",
      image: "https://cdn.shopify.com/s/files/1/0666/0207/4202/files/Screenshot_2025-09-19_at_16.54.56.png?v=1758311882",
      technologies: ["Python", "Automation", "Scripting", "APIs", "Workflow Management"],
      github: "https://github.com/viniciusgdoliveira/python-code-automation",
      live: "", // CLI tool - no web version
      videoUrl: "https://cdn.shopify.com/videos/c/o/v/98c41452a4fa445dbd00971e81601fea.mp4", // Will be provided later
      featured: false
    },
    {
      id: 5,
      title: "Hydrogen Mush",
      description: "A modern e-commerce platform built with Shopify Hydrogen, featuring advanced product customization and seamless checkout experience. Optimized for performance with headless commerce architecture.",
      image: "https://cdn.shopify.com/s/files/1/0666/0207/4202/files/Screenshot_2025-09-19_at_16.55.46.png?v=1758311888",
      technologies: ["Shopify Hydrogen", "React", "TypeScript", "Tailwind CSS", "Shopify Storefront API"],
      github: "https://github.com/viniciusgdoliveira/hydrogen-mush",
      live: "https://mush.company",
      videoUrl: "https://cdn.shopify.com/videos/c/o/v/1088c712e6a7457aae52e3694c54674d.mp4", // Will be provided later
      featured: false
    },
    {
      id: 6,
      title: "Mush Shopify Store",
      description: "A comprehensive Shopify store with custom themes, advanced product filtering, and integrated payment solutions. Features responsive design and optimized conversion funnels.",
      image: "/api/placeholder/600/400",
      technologies: ["Shopify", "Liquid", "JavaScript", "CSS3", "Shopify Apps"],
      github: "https://github.com/viniciusgdoliveira/mush-shopify",
      live: "https://mushcompany.myshopify.com",
      videoUrl: "", // Will be provided later
      featured: false
    }
  ];


  const ProjectCard = ({ project, isFeatured = false }: { project: typeof projects[0], isFeatured?: boolean }) => {
    const [activeTab, setActiveTab] = useState<'image' | 'video'>('image');

    return (
      <div className="liquid-card overflow-hidden hover:scale-105 transition-all duration-300">
        {/* Image/Video/Live Container */}
        <div className="aspect-video bg-gradient-to-br from-blue-400 to-purple-500 relative overflow-hidden">
          {activeTab === 'image' && (
            <div className="absolute inset-0">
              <img
                src={project.image}
                alt={`${project.title} Preview`}
                className="w-full h-full object-cover"
                loading="lazy"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const fallbackDiv = target.nextElementSibling as HTMLElement;
                  if (fallbackDiv) {
                    fallbackDiv.style.display = 'flex';
                  }
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center" style={{ display: 'none' }}>
                <div className="text-white text-center">
                  <div className={`${isFeatured ? 'w-16 h-16' : 'w-12 h-12'} bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <svg className={`${isFeatured ? 'w-8 h-8' : 'w-6 h-6'}`} fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  </div>
                  <p className={`${isFeatured ? 'text-sm' : 'text-xs'} opacity-80`}>Project Preview</p>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'video' && project.videoUrl && (
            <div className="absolute inset-0">
              <video
                src={project.videoUrl}
                className="w-full h-full object-cover"
                controls
                muted
                loop
                playsInline
                title={`${project.title} Video`}
              />
            </div>
          )}
          
          {activeTab === 'video' && !project.videoUrl && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-white text-center">
                <div className={`${isFeatured ? 'w-16 h-16' : 'w-12 h-12'} bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <svg className={`${isFeatured ? 'w-8 h-8' : 'w-6 h-6'}`} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
                <p className={`${isFeatured ? 'text-sm' : 'text-xs'} opacity-80`}>Video Coming Soon</p>
              </div>
            </div>
          )}
          
        </div>

        {/* Tab Navigation */}
        <div className="px-6 pt-4">
          <div className="flex space-x-1 liquid-glass-light rounded-[20px] p-1">
            <button
              onClick={() => setActiveTab('image')}
              className={`flex-1 py-2 px-3 rounded-[20px] text-xs font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                activeTab === 'image'
                  ? 'liquid-glass text-blue-600 dark:text-blue-400'
                  : 'text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400'
              }`}
            >
              📷 Image
            </button>
            <button
              onClick={() => setActiveTab('video')}
              className={`flex-1 py-2 px-3 rounded-[20px] text-xs font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                activeTab === 'video'
                  ? 'liquid-glass text-blue-600 dark:text-blue-400'
                  : 'text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400'
              }`}
            >
              🎥 Video
            </button>
          </div>
        </div>

        {/* Project Content */}
        <div className="p-6">
          <h3 className={`${isFeatured ? 'text-2xl' : 'text-xl'} font-bold text-white mb-2`}>
            {project.title}
          </h3>
          <p className={`text-white/80 mb-4 ${isFeatured ? 'text-sm' : 'text-sm'} leading-relaxed`}>
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.slice(0, isFeatured ? 5 : 3).map((tech: string, index: number) => (
              <span
                key={index}
                className={`px-2 py-1 liquid-glass-light text-white text-xs rounded-xl`}
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > (isFeatured ? 5 : 3) && (
              <span className="px-2 py-1 liquid-glass-light text-white text-xs rounded-xl">
                +{project.technologies.length - (isFeatured ? 5 : 3)}
              </span>
            )}
          </div>
          <div className="flex space-x-3">
            <a
              href={project.github}
              className="flex items-center space-x-1 text-white/80 hover:text-white transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 rounded-[20px] px-3 py-2 bg-white/10 hover:bg-white/20"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              <span>Code</span>
            </a>
            {project.live && (
              <a
                href={project.live}
                className="flex items-center space-x-1 text-white/80 hover:text-white transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 rounded-[20px] px-3 py-2 bg-blue-500/20 hover:bg-blue-500/30"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                <span>Demo</span>
              </a>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen liquid-bg">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              My Projects
            </h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              A collection of projects that showcase my skills and passion for creating 
              innovative solutions to real-world problems.
            </p>
          </div>

          {/* All Projects */}
          <section>
            <div className="space-y-8">
              {/* Row 1 */}
              <div className="grid lg:grid-cols-2 gap-8">
                {projects.slice(0, 2).map((project) => (
                  <ProjectCard key={project.id} project={project} isFeatured={true} />
                ))}
              </div>
              
              {/* Row 2 */}
              <div className="grid lg:grid-cols-2 gap-8">
                {projects.slice(2, 4).map((project) => (
                  <ProjectCard key={project.id} project={project} isFeatured={true} />
                ))}
              </div>
              
              {/* Row 3 */}
              <div className="grid lg:grid-cols-2 gap-8">
                {projects.slice(4, 6).map((project) => (
                  <ProjectCard key={project.id} project={project} isFeatured={true} />
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
