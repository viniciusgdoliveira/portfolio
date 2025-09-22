/** @format */

"use client";

import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { useEffect, useState } from "react";
import { ProjectShowcase } from "@/components/projects/ProjectShowcase";
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

			{/* Hero Section */}
			<section className="container mx-auto px-4 py-10">
				<div className="max-w-4xl mx-auto text-center">
					<h1 className="text-5xl md:text-6xl font-bold text-white mb-6">{t("title")}</h1>
					<p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">{t("description")}</p>
				</div>
			</section>

			{/* Projects Showcase */}
			<section className="container mx-auto px-4 py-8">
				<div className="max-w-5xl mx-auto">
					{projects.length > 0 ? (
						<ProjectShowcase projects={projects} />
					) : (
						<div className="text-center py-12">
							<p className="text-white/60">No projects found.</p>
						</div>
					)}
				</div>
			</section>

			{/* Back to Home */}
			<section className="container mx-auto px-4 py-10">
				<div className="max-w-4xl mx-auto text-center">
					<Button
						variant="secondary"
						size="md"
						asChild
					>
						<Link
							href={`/${locale}`}
							className="inline-flex items-center space-x-2"
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
					</Button>
				</div>
			</section>
		</div>
	);
}
