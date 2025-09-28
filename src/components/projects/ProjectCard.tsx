/** @format */

"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { Card, CardContent, CardFooter } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { MediaDisplay } from "@/components/ui/MediaDisplay";
import { ProjectCardProps } from "@/types/project";
import { cn } from "@/lib/utils";

export function ProjectCard({ project, size = "medium", showFullDescription = false, className }: ProjectCardProps) {
	const t = useTranslations("projects");

	// Get translated project content
	const getTranslatedProject = (proj: typeof project) => {
		const projectKey = proj.id;
		return {
			...proj,
			title: t(`items.${projectKey}.title`),
			shortDescription: t(`items.${projectKey}.description`),
			fullDescription: t(`items.${projectKey}.description`), // Using the same description for both
			keyFeatures: t.raw(`items.${projectKey}.keyFeatures`) || proj.keyFeatures || [], // Use translated keyFeatures
		};
	};

	const translatedProject = getTranslatedProject(project);

	const sizeClasses = {
		small: "h-auto",
		medium: "h-auto",
		large: "h-auto min-h-[600px] sm:min-h-[700px] lg:min-h-[800px]",
	};

	const mediaSizeClasses = {
		small: "h-32",
		medium: "h-48",
		large: "h-80 sm:h-96 md:h-[500px] lg:h-[600px]",
	};

	return (
		<Card
			variant="elevated"
			className={cn("overflow-hidden group", sizeClasses[size], className)}
		>
			{/* Media Section */}
			<div className={cn("relative", mediaSizeClasses[size])}>
				<MediaDisplay
					media={{
						...translatedProject.image,
						alt: `${translatedProject.title} preview`,
					}}
				/>
				<div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
			</div>

			{/* Content Section */}
			<CardContent className="p-3 sm:p-4 md:p-6 pb-6">
				<h2 className={cn("font-semibold text-white mb-3", size === "large" ? "text-lg sm:text-xl md:text-2xl lg:text-3xl" : "text-lg md:text-xl")}>{translatedProject.title}</h2>

				<p className={cn("text-white/80 mb-3 sm:mb-4 leading-relaxed", size === "large" ? "text-sm sm:text-base md:text-base lg:text-lg" : "text-sm md:text-base")}>
					{showFullDescription ? translatedProject.fullDescription : translatedProject.shortDescription}
				</p>

				{/* Category Badge */}
				<div className="mb-4">
					<Badge
						variant="secondary"
						size="sm"
					>
						{translatedProject.category}
					</Badge>
				</div>

				{/* Tech Stack */}
				<div className="flex flex-wrap gap-1 sm:gap-2 mb-3">
					{translatedProject.technologies.map((tech, index) => (
						<Badge
							key={index}
							size="sm"
							className="text-xs sm:text-sm"
						>
							{tech}
						</Badge>
					))}
				</div>

				{/* Key Features (for large cards) */}
				{size === "large" && translatedProject.keyFeatures && translatedProject.keyFeatures.length > 0 && (
					<div className="mb-3 sm:mb-4">
						<h3 className="text-white font-semibold mb-2 sm:mb-3 text-sm sm:text-sm md:text-base">Key Features:</h3>
						<ul className="text-white/70 text-xs sm:text-xs md:text-sm space-y-1 sm:space-y-1.5">
							{translatedProject.keyFeatures.map((feature: string, index: number) => (
								<li
									key={index}
									className="flex items-start"
								>
									<span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white/50 rounded-full mr-2 sm:mr-3 flex-shrink-0 mt-1.5 sm:mt-2" />
									<span className="leading-relaxed">{feature}</span>
								</li>
							))}
						</ul>
					</div>
				)}
			</CardContent>

			{/* Action Buttons */}
			<CardFooter className="p-3 sm:p-4 md:p-6 pt-0 pb-6">
				<div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full">
					{translatedProject.links.github && (
						<Button
							variant="glass"
							size={size === "large" ? "lg" : "sm"}
							className="flex-1 liquid-button hover:scale-105 transition-all duration-300"
							asChild
						>
							<Link
								href={translatedProject.links.github}
								target="_blank"
								rel="noopener noreferrer"
							>
								{t("actions.viewCode")}
							</Link>
						</Button>
					)}

					{translatedProject.links.live && (
						<Button
							variant="primary"
							size={size === "large" ? "lg" : "sm"}
							className="flex-1 liquid-button hover:scale-105 transition-all duration-300"
							asChild
						>
							<Link
								href={translatedProject.links.live}
								target="_blank"
								rel="noopener noreferrer"
							>
								{t("actions.liveDemo")}
							</Link>
						</Button>
					)}
				</div>
			</CardFooter>
		</Card>
	);
}
