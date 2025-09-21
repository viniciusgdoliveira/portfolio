/** @format */

"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { Button } from "@/components/ui/Button";
import { Project } from "@/types/project";

interface FeaturedProjectsSectionProps {
	projects: Project[];
	locale: string;
	className?: string;
}

export function FeaturedProjectsSection({ projects, locale, className }: FeaturedProjectsSectionProps) {
	const t = useTranslations("home");

	// Split projects for different layouts
	const bigProjects = projects.slice(0, 2);
	const smallProjects = projects.slice(2, 6);

	return (
		<section className={`container mx-auto px-4 py-10 ${className || ""}`}>
			<div className="max-w-6xl mx-auto">
				<div className="text-center mb-8">
					<h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t("featuredProjects.title")}</h2>
					<p className="text-lg text-white/80">{t("featuredProjects.description")}</p>
				</div>

				<div className="space-y-8">
					{/* First Row - 2 Big Cards */}
					{bigProjects.length > 0 && (
						<ProjectGrid
							projects={bigProjects}
							columns={2}
						/>
					)}

					{/* Second Row - 4 Small Cards */}
					{smallProjects.length > 0 && (
						<ProjectGrid
							projects={smallProjects}
							columns={4}
						/>
					)}
				</div>

				<div className="text-center mt-6">
					<Button
						variant="secondary"
						size="md"
						asChild
					>
						<Link
							href={`/${locale}/projects`}
							className="inline-flex items-center space-x-2"
						>
							<span>{t("featuredProjects.viewAllProjects")}</span>
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
									d="M17 8l4 4m0 0l-4 4m4-4H3"
								/>
							</svg>
						</Link>
					</Button>
				</div>
			</div>
		</section>
	);
}
