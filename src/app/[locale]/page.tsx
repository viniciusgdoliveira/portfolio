/** @format */

"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { HeroSection } from "@/components/home/HeroSection";
import { AboutMeSection } from "@/components/home/AboutMeSection";
import { FeaturedProjectsSection } from "@/components/home/FeaturedProjectsSection";
import { CtaSection } from "@/components/home/CtaSection";
import { StructuredData, createPersonSchema } from "@/components/seo/StructuredData";
import { dataService } from "@/services/data.service";
import { Project } from "@/types/project";
import { AboutSection } from "@/types/about";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Home() {
	const pathname = usePathname();
	const pathLocale = pathname.split("/")[1] || "en";
	const { currentLanguage } = useLanguage();

	const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
	const [aboutSections, setAboutSections] = useState<AboutSection[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const loadData = async () => {
			try {
				setIsLoading(true);

				const [projectsResult, aboutResult] = await Promise.all([dataService.getFeaturedProjects(), dataService.getAboutSections()]);

				setFeaturedProjects(projectsResult);
				setAboutSections(aboutResult.sections);
			} catch (error) {
				console.error("Error loading page data:", error);
			} finally {
				setIsLoading(false);
			}
		};

		loadData();
	}, [currentLanguage]); // Trigger reload when language changes

	if (isLoading) {
		return (
			<div className="flex-1 liquid-bg flex items-center justify-center">
				<div className="text-white text-center">
					<div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4" />
					<p>Loading...</p>
				</div>
			</div>
		);
	}

	return (
		<div className="flex-1 liquid-bg flex flex-col">
			<StructuredData data={createPersonSchema()} />

			<HeroSection locale={pathLocale} />

			{aboutSections.length > 0 && <AboutMeSection sections={aboutSections} />}

			{featuredProjects.length > 0 && (
				<FeaturedProjectsSection
					projects={featuredProjects}
					locale={pathLocale}
				/>
			)}

			<CtaSection locale={pathLocale} />
		</div>
	);
}
