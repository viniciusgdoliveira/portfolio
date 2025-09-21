/** @format */

"use client";

import { ProjectCard } from "./ProjectCard";
import { ProjectGridProps } from "@/types/project";
import { cn } from "@/lib/utils";

export function ProjectGrid({ projects, columns = 2, className }: ProjectGridProps) {
	if (!projects || projects.length === 0) {
		return (
			<div className="text-center py-12">
				<p className="text-white/60">No projects found.</p>
			</div>
		);
	}

	const gridClasses = {
		1: "grid-cols-1",
		2: "grid-cols-1 md:grid-cols-2",
		3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
		4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
	};

	return (
		<div className={cn("grid gap-6", gridClasses[columns], className)}>
			{projects.map((project) => (
				<ProjectCard
					key={project.id}
					project={project}
					size={columns === 1 ? "large" : columns <= 2 ? "medium" : "small"}
					showFullDescription={columns === 1}
				/>
			))}
		</div>
	);
}
