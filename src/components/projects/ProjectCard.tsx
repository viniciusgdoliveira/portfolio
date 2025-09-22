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
			keyFeatures: proj.keyFeatures, // Keep original keyFeatures
		};
	};

	const translatedProject = getTranslatedProject(project);

	const sizeClasses = {
		small: "h-auto",
		medium: "h-auto",
		large: "h-auto min-h-[500px] sm:min-h-[600px] max-h-[85vh]",
	};

	const mediaSizeClasses = {
		small: "h-32",
		medium: "h-48",
		large: "h-64 sm:h-80 md:h-96 lg:h-[400px]",
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
			<CardContent className="p-4 sm:p-5 md:p-6">
				<h3 className={cn("font-bold text-white mb-3", size === "large" ? "text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl" : "text-lg md:text-xl")}>{translatedProject.title}</h3>

				<p className={cn("text-white/80 mb-4 sm:mb-6 leading-relaxed", size === "large" ? "text-sm sm:text-base md:text-lg lg:text-xl" : "text-sm md:text-base")}>
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
				<div className="flex flex-wrap gap-1 sm:gap-2 mb-4">
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
				{size === "large" && translatedProject.keyFeatures && (
					<div className="mb-4 sm:mb-6">
						<h4 className="text-white font-semibold mb-2 sm:mb-3 text-sm sm:text-base md:text-lg">Key Features:</h4>
						<ul className="text-white/70 text-xs sm:text-sm md:text-base space-y-1 sm:space-y-2">
							{translatedProject.keyFeatures.slice(0, 4).map((feature, index) => (
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
			<CardFooter className="p-4 sm:p-5 md:p-6 pt-0">
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
