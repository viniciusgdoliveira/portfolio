/** @format */

"use client";

import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { useState, useEffect } from "react";

export default function Projects() {
	const t = useTranslations("projects");
	const locale = useLocale();
	const [selectedProject, setSelectedProject] = useState(0);
	const [isTransitioning, setIsTransitioning] = useState(false);

	const handleProjectSelect = (index: number) => {
		if (index === selectedProject) return;

		setIsTransitioning(true);
		setTimeout(() => {
			setSelectedProject(index);
			setIsTransitioning(false);
		}, 150);
	};

	const handlePrevious = () => {
		const newIndex = selectedProject === 0 ? projects.length - 1 : selectedProject - 1;
		handleProjectSelect(newIndex);
	};

	const handleNext = () => {
		const newIndex = selectedProject === projects.length - 1 ? 0 : selectedProject + 1;
		handleProjectSelect(newIndex);
	};

	const projects = [
		{
			key: "trailMakingTest",
			tech: ["React Native", "Expo", "TypeScript"],
			image: "bg-gradient-to-br from-blue-400 to-purple-500",
			github: "https://github.com/viniciusgdoliveira/trail-making-test-digital",
			live: "",
			videoUrl: "https://cdn.shopify.com/videos/c/o/v/61e3792a038e4e04a9e5bc85c3f1a54d.mp4",
		},
		{
			key: "aulaFirebase",
			tech: ["Next.js", "Firebase", "Vercel"],
			image: "bg-gradient-to-br from-green-400 to-blue-500",
			github: "https://github.com/viniciusgdoliveira/aula-firebase-nextjs",
			live: "http://aula-firebase.vercel.app/",
			videoUrl: "https://cdn.shopify.com/videos/c/o/v/c1bd79ad562d433a9ab0369763c316e2.mov",
		},
		{
			key: "meuAssessorFashion",
			tech: ["Python", "Flask", "AI/ML"],
			image: "bg-gradient-to-br from-orange-400 to-red-500",
			github: "https://github.com/viniciusgdoliveira/meuassessorfashion",
			live: "https://meuassessorfashion.onrender.com",
			videoUrl: "https://cdn.shopify.com/videos/c/o/v/f459b50c1b074da3b190bb9c0bd90ae7.mp4",
		},
		{
			key: "pythonAutomation",
			tech: ["Python", "Automation", "APIs"],
			image: "bg-gradient-to-br from-yellow-400 to-orange-500",
			github: "https://github.com/viniciusgdoliveira/python-code-automation",
			live: "",
			videoUrl: "https://cdn.shopify.com/videos/c/o/v/98c41452a4fa445dbd00971e81601fea.mp4",
		},
		{
			key: "hydrogenMush",
			tech: ["Hydrogen", "React", "TypeScript"],
			image: "bg-gradient-to-br from-purple-400 to-pink-500",
			github: "https://github.com/viniciusgdoliveira/hydrogen-mush",
			live: "https://mush.company",
			videoUrl: "https://cdn.shopify.com/videos/c/o/v/1088c712e6a7457aae52e3694c54674d.mp4",
		},
		{
			key: "mushShopify",
			tech: ["Shopify", "Liquid", "JavaScript"],
			image: "bg-gradient-to-br from-indigo-400 to-purple-500",
			github: "https://github.com/viniciusgdoliveira/mush-shopify",
			live: "https://mushcompany.myshopify.com",
			videoUrl: "",
		},
	];

	const currentProject = projects[selectedProject];

	return (
		<div className="min-h-screen liquid-bg">
			{/* Hero Section */}
			<section className="container mx-auto px-4 py-10">
				<div className="max-w-4xl mx-auto text-center">
					<h1 className="text-5xl md:text-6xl font-bold text-white mb-6">{t("title")}</h1>
					<p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">{t("description")}</p>
				</div>
			</section>

			{/* Character Selection Miniatures */}
			<section className="container mx-auto px-4 py-8">
				<div className="max-w-5xl mx-auto">
					<div className="flex justify-center items-center gap-6 md:gap-7 overflow-x-auto pb-4">
						{projects.map((project, index) => (
							<div
								key={index}
								onClick={() => handleProjectSelect(index)}
								className={`
                    liquid-glass-light flex-shrink-0 w-28 h-28 md:w-34 md:h-34 rounded-2xl md:rounded-3xl 
                    transition-all duration-500 cubic-bezier(0.175, 0.885, 0.32, 1.275) transform cursor-pointer
                    ${selectedProject === index ? "scale-110 shadow-2xl border-white/40" : "scale-100 hover:scale-105 border-white/20"}
                    ${project.image}
                    relative overflow-hidden group flex flex-col
                  `}
							>
								{/* Media Section */}
								<div className="h-20 md:h-24 relative">
									{project.videoUrl ? (
										<video
											src={project.videoUrl}
											className="w-full h-full object-cover rounded-t-2xl md:rounded-t-3xl"
											muted
											loop
											autoPlay
											playsInline
										/>
									) : (
										<div className="w-full h-full flex items-center justify-center">
											<div className="w-8 h-8 md:w-10 md:h-10 bg-white/30 rounded-full flex items-center justify-center group-hover:bg-white/40 transition-colors duration-300">
												<svg
													className="w-4 h-4 md:w-5 md:h-5"
													fill="currentColor"
													viewBox="0 0 24 24"
												>
													<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
												</svg>
											</div>
										</div>
									)}
								</div>

								{/* Content Section */}
								<div className="p-2 md:p-3 flex-1 flex items-center justify-center">
									<h4 className="text-xs md:text-sm font-medium text-white truncate max-w-[10ch]">{t(`items.${project.key}.title`)}</h4>
								</div>

								{/* Selection indicator with liquid glass styling */}
								{selectedProject === index && (
									<div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2">
										<div className="w-2 h-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg animate-pulse"></div>
									</div>
								)}
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Giant Project Card */}
			<section className="container mx-auto px-4 py-8">
				<div className="max-w-5xl mx-auto">
					<div className="flex items-center gap-6 md:gap-8">
						{/* Previous Project Preview */}
						<div
							className="flex-shrink-0 w-40 md:w-48 opacity-60 hover:opacity-80 transition-opacity duration-300 cursor-pointer"
							onClick={handlePrevious}
						>
							<div className="liquid-glass-light rounded-2xl md:rounded-3xl overflow-hidden group">
								<div className="h-32 md:h-40 relative">
									{projects[selectedProject === 0 ? projects.length - 1 : selectedProject - 1].videoUrl ? (
										<video
											src={projects[selectedProject === 0 ? projects.length - 1 : selectedProject - 1].videoUrl}
											className="w-full h-full object-cover"
											muted
											loop
											autoPlay
											playsInline
										/>
									) : (
										<div className={`w-full h-full ${projects[selectedProject === 0 ? projects.length - 1 : selectedProject - 1].image} flex items-center justify-center`}>
											<div className="w-10 h-10 md:w-12 md:h-12 bg-white/30 rounded-full flex items-center justify-center">
												<svg
													className="w-5 h-5 md:w-6 md:h-6"
													fill="currentColor"
													viewBox="0 0 24 24"
												>
													<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
												</svg>
											</div>
										</div>
									)}
								</div>
								<div className="p-3 md:p-4">
									<h4 className="text-sm md:text-base font-medium text-white truncate">{t(`items.${projects[selectedProject === 0 ? projects.length - 1 : selectedProject - 1].key}.title`)}</h4>
								</div>
							</div>
						</div>

						{/* Main Card Container */}
						<div className="flex-1 relative">
							{/* Main Card */}
							<div
								className={`
              liquid-card overflow-hidden
              transition-all duration-700 cubic-bezier(0.175, 0.885, 0.32, 1.275)
              ${isTransitioning ? "opacity-60 scale-98 blur-sm" : "opacity-100 scale-100 blur-0"}
              hover:scale-[1.02] hover:shadow-2xl
            `}
							>
								{/* Media Section */}
								<div className="relative h-64 md:h-80 lg:h-96">
									{currentProject.videoUrl ? (
										<video
											src={currentProject.videoUrl}
											className="w-full h-full object-cover"
											muted
											loop
											autoPlay
											playsInline
										/>
									) : (
										<div className={`w-full h-full ${currentProject.image} flex items-center justify-center`}>
											<div className="text-white text-center">
												<div className="w-20 h-20 md:w-24 md:h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
													<svg
														className="w-10 h-10 md:w-12 md:h-12"
														fill="currentColor"
														viewBox="0 0 24 24"
													>
														<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
													</svg>
												</div>
												<p className="text-sm md:text-base opacity-80">{t("projectPreview")}</p>
											</div>
										</div>
									)}

									{/* Gradient overlay for better text readability */}
									<div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
								</div>

								{/* Content Section */}
								<div className="p-6 md:p-8">
									<div
										className={`
                  transition-all duration-300 ease-out
                  ${isTransitioning ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"}
                `}
									>
										<h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">{t(`items.${currentProject.key}.title`)}</h3>
										<p className="text-white/80 mb-6 text-base md:text-lg leading-relaxed">{t(`items.${currentProject.key}.description`)}</p>

										{/* Tech Stack */}
										<div className="flex flex-wrap gap-2 mb-6">
											{currentProject.tech.map((tech, techIndex) => (
												<span
													key={techIndex}
													className="px-3 py-1.5 liquid-glass-light text-white text-sm rounded-full
                          hover:bg-white/20 transition-colors duration-200"
												>
													{tech}
												</span>
											))}
										</div>

										{/* Action Buttons */}
										<div className="flex flex-col sm:flex-row gap-3">
											<a
												href={currentProject.github}
												target="_blank"
												rel="noopener noreferrer"
												className="liquid-button flex-1 text-white py-3 px-6 rounded-2xl 
                        text-center text-sm md:text-base font-medium
                        hover:scale-105 hover:shadow-lg"
											>
												{t("code")}
											</a>
											{currentProject.live && (
												<a
													href={currentProject.live}
													target="_blank"
													rel="noopener noreferrer"
													className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 
                          text-white py-3 px-6 rounded-2xl transition-all duration-300 text-center text-sm md:text-base font-medium
                          hover:scale-105 hover:shadow-lg backdrop-blur-sm border border-blue-400/30"
												>
													{t("demo")}
												</a>
											)}
										</div>
									</div>
								</div>
							</div>
						</div>

						{/* Next Project Preview */}
						<div
							className="flex-shrink-0 w-40 md:w-48 opacity-60 hover:opacity-80 transition-opacity duration-300 cursor-pointer"
							onClick={handleNext}
						>
							<div className="liquid-glass-light rounded-2xl md:rounded-3xl overflow-hidden group">
								<div className="h-32 md:h-40 relative">
									{projects[selectedProject === projects.length - 1 ? 0 : selectedProject + 1].videoUrl ? (
										<video
											src={projects[selectedProject === projects.length - 1 ? 0 : selectedProject + 1].videoUrl}
											className="w-full h-full object-cover"
											muted
											loop
											autoPlay
											playsInline
										/>
									) : (
										<div className={`w-full h-full ${projects[selectedProject === projects.length - 1 ? 0 : selectedProject + 1].image} flex items-center justify-center`}>
											<div className="w-10 h-10 md:w-12 md:h-12 bg-white/30 rounded-full flex items-center justify-center">
												<svg
													className="w-5 h-5 md:w-6 md:h-6"
													fill="currentColor"
													viewBox="0 0 24 24"
												>
													<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
												</svg>
											</div>
										</div>
									)}
								</div>
								<div className="p-3 md:p-4">
									<h4 className="text-sm md:text-base font-medium text-white truncate">{t(`items.${projects[selectedProject === projects.length - 1 ? 0 : selectedProject + 1].key}.title`)}</h4>
								</div>
							</div>
						</div>
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
						<svg
							className="w-5 h-5"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M10 19l-7-7m0 0l7-7m-7 7h18"
							/>
						</svg>
						<span>{t("backToHome")}</span>
					</Link>
				</div>
			</section>
		</div>
	);
}
