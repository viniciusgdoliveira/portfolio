'use client';

import Link from "next/link";
import { useTranslations, useLocale } from 'next-intl';

export default function Projects() {
  const t = useTranslations('projects');
  const locale = useLocale();

  const projects = [
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
    },
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
  ];

  return (
    <div className="min-h-screen liquid-bg">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            {t('title')}
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
            {t('description')}
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="container mx-auto px-4 py-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
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
                      <p className="text-sm opacity-80">{t('projectPreview')}</p>
                    </div>
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">
                    {t(`items.${project.key}.title`)}
                  </h3>
                  <p className="text-white/80 mb-4 text-sm">
                    {t(`items.${project.key}.description`)}
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
                      {t('code')}
                    </a>
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-[20px] transition-colors duration-200 text-center text-sm"
                      >
                        {t('demo')}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Back to Home */}
      <section className="container mx-auto px-4 py-10">
        <div className="max-w-4xl mx-auto text-center">
          <Link
            href={`/${locale}`}
            className="inline-flex items-center space-x-2 text-white hover:text-white/80 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 rounded-[20px] px-4 py-2 bg-white/10 hover:bg-white/20"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>{t('backToHome')}</span>
          </Link>
        </div>
      </section>
    </div>
  );
}