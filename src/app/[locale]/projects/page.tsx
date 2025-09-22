/** @format */

"use client";

import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { useEffect, useState } from "react";
import { ProjectShowcase } from "@/components/projects/ProjectShowcase";
import { MiniatureProjectCard } from "@/components/projects/MiniatureProjectCard";
import { Button } from "@/components/ui/Button";
import { StructuredData, createWebPageSchema } from "@/components/seo/StructuredData";
import { dataService } from "@/services/data.service";
import { Project } from "@/types/project";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Projects() {
	const t = useTranslations("projects");
	const locale = useLocale();
	const { currentLanguage } = useLanguage();

	const [projects, setProjects] = useState<Project[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);

	useEffect(() => {
		const loadProjects = async () => {
			try {
				setIsLoading(true);
				const projectsData = await dataService.getProjects();
				setProjects(projectsData.all);
			} catch (error) {
				console.error("Error loading projects:", error);
			} finally {
				setIsLoading(false);
			}
		};

		loadProjects();
	}, [currentLanguage]); // Trigger reload when language changes

	if (isLoading) {
		return (
			<div className="min-h-screen liquid-bg flex items-center justify-center">
				<div className="text-white text-center">
					<div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4" />
					<p>Loading projects...</p>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen liquid-bg">
			<StructuredData data={createWebPageSchema(locale, "Projects")} />

			{/* Mobile-first responsive layout */}
			<div className="flex min-h-[calc(100vh-5rem)] flex-col lg:flex-row lg:h-[calc(100vh-3rem)] gap-4 lg:gap-6">
				{/* Main Display Area */}
				<div className="flex-1 flex flex-col order-2 lg:order-1">
					{/* Main Project Display */}
					<main className="flex-1 p-4 lg:p-0">
						{projects.length > 0 ? (
							<ProjectShowcase
								projects={projects}
								selectedIndex={selectedProjectIndex}
								onProjectSelect={setSelectedProjectIndex}
								showBackButton={true}
								backButtonHref={`/${locale}`}
							/>
						) : (
							<div className="h-full flex items-center justify-center">
								<p className="text-white/60 text-lg">No projects found.</p>
							</div>
						)}
					</main>
				</div>

				{/* Mobile/Desktop Sidebar */}
				<aside className="w-full lg:w-72 lg:h-[calc(100vh-2rem)] liquid-glass-light rounded-t-3xl lg:rounded-l-3xl lg:rounded-t-none border-t lg:border-t-0 lg:border-l border-white/10 p-4 lg:p-6 flex flex-col order-1 lg:order-2">
					{/* Header with Navigation */}
					<div className="mb-4 lg:mb-6 flex items-center justify-between">
						<h3 className="text-white font-semibold text-base lg:text-sm">Projects ({projects.length})</h3>
						{/* Mobile Navigation Arrows */}
						<div className="flex lg:hidden gap-2 ">
							<button
								onClick={() => setSelectedProjectIndex(Math.max(0, selectedProjectIndex - 1))}
								disabled={selectedProjectIndex === 0}
								className="w-8 h-8 rounded-full liquid-button hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-all duration-300"
							>
								<svg
									className="w-4 h-4 text-white"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M15 19l-7-7 7-7"
									/>
								</svg>
							</button>
							<button
								onClick={() => setSelectedProjectIndex(Math.min(projects.length - 1, selectedProjectIndex + 1))}
								disabled={selectedProjectIndex === projects.length - 1}
								className="w-8 h-8 rounded-full liquid-button hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-all duration-300"
							>
								<svg
									className="w-4 h-4 text-white"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M9 5l7 7-7 7"
									/>
								</svg>
							</button>
						</div>
						{/* Desktop Navigation Arrows */}
						<div className="hidden lg:flex gap-2">
							<button
								onClick={() => setSelectedProjectIndex(Math.max(0, selectedProjectIndex - 1))}
								disabled={selectedProjectIndex === 0}
								className="w-6 h-6 rounded-full liquid-button hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-all duration-300"
							>
								<svg
									className="w-3 h-3 text-white"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M5 15l7-7 7 7"
									/>
								</svg>
							</button>
							<button
								onClick={() => setSelectedProjectIndex(Math.min(projects.length - 1, selectedProjectIndex + 1))}
								disabled={selectedProjectIndex === projects.length - 1}
								className="w-6 h-6 rounded-full liquid-button hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-all duration-300"
							>
								<svg
									className="w-3 h-3 text-white"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M19 9l-7 7-7-7"
									/>
								</svg>
							</button>
						</div>
					</div>

					{/* Mobile: Horizontal scroll with enhanced styling */}
					<div className="lg:hidden">
						<div className="relative">
							{/* Gradient fade effects */}
							<div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-transparent to-white/5 z-10 pointer-events-none" />
							<div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-transparent to-white/5 z-10 pointer-events-none" />

							<div className="flex gap-4 overflow-x-auto py-4 px-2 scrollbar-hide">
								{projects.map((project, index) => (
									<div
										key={project.id}
										className="flex-shrink-0 w-72"
									>
										<MiniatureProjectCard
											project={project}
											index={index}
											isSelected={index === selectedProjectIndex}
											onClick={() => setSelectedProjectIndex(index)}
										/>
									</div>
								))}
							</div>
						</div>
					</div>

					{/* Desktop: Vertical stack with scroll */}
					<div className="hidden lg:block h-[calc(3.5*280px+3*16px)] overflow-y-auto pr-2">
						<div className="space-y-4">
							{projects.map((project, index) => (
								<MiniatureProjectCard
									key={project.id}
									project={project}
									index={index}
									isSelected={index === selectedProjectIndex}
									onClick={() => setSelectedProjectIndex(index)}
								/>
							))}
						</div>
					</div>
				</aside>
			</div>
		</div>
	);
}
