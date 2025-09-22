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
		};
	};

	const translatedProject = getTranslatedProject(project);

	const sizeClasses = {
		small: "h-auto",
		medium: "h-auto",
		large: "h-auto min-h-[500px]",
	};

	const mediaSizeClasses = {
		small: "h-32",
		medium: "h-48",
		large: "h-64 md:h-80 lg:h-96",
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
			<CardContent className="p-4 md:p-6">
				<h3 className={cn("font-bold text-white mb-2", size === "large" ? "text-2xl md:text-3xl" : "text-lg md:text-xl")}>{translatedProject.title}</h3>

				<p className="text-white/80 mb-4 text-sm md:text-base leading-relaxed">{showFullDescription ? translatedProject.fullDescription : translatedProject.shortDescription}</p>

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
				<div className="flex flex-wrap gap-2 mb-4">
					{translatedProject.technologies.map((tech, index) => (
						<Badge
							key={index}
							size="sm"
						>
							{tech}
						</Badge>
					))}
				</div>

				{/* Key Features (for large cards) */}
				{size === "large" && translatedProject.keyFeatures && (
					<div className="mb-4">
						<h4 className="text-white font-semibold mb-2 text-sm">Key Features:</h4>
						<ul className="text-white/70 text-sm space-y-1">
							{translatedProject.keyFeatures.slice(0, 4).map((feature, index) => (
								<li
									key={index}
									className="flex items-center"
								>
									<span className="w-1.5 h-1.5 bg-white/50 rounded-full mr-2 flex-shrink-0" />
									{feature}
								</li>
							))}
						</ul>
					</div>
				)}
			</CardContent>

			{/* Action Buttons */}
			<CardFooter className="p-4 md:p-6 pt-0">
				<div className="flex gap-3 w-full">
					{translatedProject.links.github && (
						<Button
							variant="glass"
							size={size === "large" ? "md" : "sm"}
							className="flex-1"
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
							size={size === "large" ? "md" : "sm"}
							className="flex-1"
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
