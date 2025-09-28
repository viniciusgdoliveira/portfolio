/** @format */

"use client";

import { useTranslations } from "next-intl";
import { MediaDisplay } from "@/components/ui/MediaDisplay";
import { Badge } from "@/components/ui/Badge";
import { Project } from "@/types/project";
import { cn } from "@/lib/utils";

interface MiniatureProjectCardProps {
	project: Project;
	index: number;
	isSelected: boolean;
	onClick: () => void;
	className?: string;
}

export function MiniatureProjectCard({ project, index, isSelected, onClick, className }: MiniatureProjectCardProps) {
	const t = useTranslations("projects");

	// Get translated project content
	const getTranslatedProject = (proj: typeof project) => {
		const projectKey = proj.id;
		return {
			...proj,
			title: t(`items.${projectKey}.title`),
			shortDescription: t(`items.${projectKey}.description`),
		};
	};

	const translatedProject = getTranslatedProject(project);

	return (
		<div
			onClick={onClick}
			className={cn(
				"liquid-glass-light rounded-xl p-4 sm:p-6 transition-all duration-300 cursor-pointer group relative",
				"border border-white/20 hover:border-white/40",
				"hover:scale-[1.02] hover:shadow-lg hover:shadow-white/10",
				isSelected && "border-white/60 bg-white/10 shadow-lg scale-[1.02] shadow-white/20",
				className
			)}
		>
			{/* Glow effect for selected card */}
			{isSelected && <div className="absolute -inset-0.5 bg-gradient-to-r from-white/20 via-white/10 to-white/20 rounded-xl blur-sm -z-10" />}

			{/* Project Number/Channel */}
			<div className="flex items-center justify-between mb-3">
				<div className={cn("w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold", isSelected ? "bg-white text-black" : "bg-white/20 text-white")}>{index + 1}</div>
				<Badge
					size="sm"
					variant="secondary"
				>
					{translatedProject.category}
				</Badge>
			</div>

			{/* Media Section */}
			<div className="relative h-28 sm:h-32 rounded-lg overflow-hidden mb-3">
				<MediaDisplay
					media={{
						...translatedProject.image,
						alt: `${translatedProject.title} preview`,
					}}
					className="rounded-lg"
					width={120}
					height={128}
				/>
				<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
				{/* Subtle shimmer effect */}
				<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
			</div>

			{/* Content Section */}
			<div className="space-y-2">
				<h2 className="text-white font-medium text-sm sm:text-base leading-tight">{translatedProject.title}</h2>
				<p className="text-white/70 text-xs sm:text-sm leading-relaxed line-clamp-2">{translatedProject.shortDescription}</p>
			</div>

			{/* Tech Stack */}
			<div className="flex flex-wrap gap-1 mt-3">
				{translatedProject.technologies.slice(0, 3).map((tech, techIndex) => (
					<Badge
						key={techIndex}
						size="sm"
						className="text-xs px-2 py-1"
					>
						{tech}
					</Badge>
				))}
				{translatedProject.technologies.length > 3 && (
					<Badge
						size="sm"
						className="text-xs px-2 py-1 bg-white/20 text-white/70 leading-relaxed"
					>
						+{translatedProject.technologies.length - 3}
					</Badge>
				)}
			</div>

			{/* Selection indicator */}
			{isSelected && (
				<div className="absolute -right-1 top-1/2 transform -translate-y-1/2">
					<div className="w-2 h-8 bg-white/90 backdrop-blur-sm rounded-full shadow-lg" />
				</div>
			)}
		</div>
	);
}
