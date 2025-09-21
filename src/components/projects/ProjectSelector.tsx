/** @format */

"use client";

import { MediaDisplay } from "@/components/ui/MediaDisplay";
import { Project } from "@/types/project";
import { cn } from "@/lib/utils";

interface ProjectSelectorProps {
	projects: Project[];
	selectedIndex: number;
	onProjectSelect: (index: number) => void;
	className?: string;
}

export function ProjectSelector({ projects, selectedIndex, onProjectSelect, className }: ProjectSelectorProps) {
	return (
		<div className={cn("flex justify-center items-center gap-6 md:gap-7 overflow-x-auto pb-4", className)}>
			{projects.map((project, index) => (
				<ProjectSelectorItem
					key={project.id}
					project={project}
					index={index}
					isSelected={index === selectedIndex}
					onClick={() => onProjectSelect(index)}
				/>
			))}
		</div>
	);
}

interface ProjectSelectorItemProps {
	project: Project;
	index: number;
	isSelected: boolean;
	onClick: () => void;
}

function ProjectSelectorItem({ project, isSelected, onClick }: ProjectSelectorItemProps) {
	return (
		<div
			onClick={onClick}
			className={cn(
				"liquid-glass-light flex-shrink-0 w-28 h-28 md:w-34 md:h-34 rounded-2xl md:rounded-3xl",
				"transition-all duration-500 cubic-bezier(0.175, 0.885, 0.32, 1.275) transform cursor-pointer",
				"relative overflow-hidden group flex flex-col",
				isSelected ? "scale-110 shadow-2xl border-white/40" : "scale-100 hover:scale-105 border-white/20"
			)}
		>
			{/* Media Section */}
			<div className="h-20 md:h-24 relative">
				<MediaDisplay
					media={project.image}
					alt={`${project.title} preview`}
					className="rounded-t-2xl md:rounded-t-3xl"
					width={120}
					height={96}
				/>
			</div>

			{/* Content Section */}
			<div className="p-2 md:p-3 flex-1 flex items-center justify-center">
				<h4 className="text-xs md:text-sm font-medium text-white truncate max-w-[10ch]">{project.title}</h4>
			</div>

			{/* Selection indicator */}
			{isSelected && (
				<div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2">
					<div className="w-2 h-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg animate-pulse" />
				</div>
			)}
		</div>
	);
}
