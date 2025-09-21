/** @format */

"use client";

import { useState } from "react";
import { ProjectCard } from "./ProjectCard";
import { ProjectSelector } from "./ProjectSelector";
import { Project } from "@/types/project";
import { cn } from "@/lib/utils";

interface ProjectShowcaseProps {
	projects: Project[];
	className?: string;
}

export function ProjectShowcase({ projects, className }: ProjectShowcaseProps) {
	const [selectedProject, setSelectedProject] = useState(0);
	const [isTransitioning, setIsTransitioning] = useState(false);

	const handleProjectSelect = (index: number) => {
		if (index === selectedProject) return;

		setIsTransitioning(true);
		setTimeout(() => {
			setSelectedProject(index);
			setIsTransitioning(false);
		}, 150);
	};

	const handlePrevious = () => {
		const newIndex = selectedProject === 0 ? projects.length - 1 : selectedProject - 1;
		handleProjectSelect(newIndex);
	};

	const handleNext = () => {
		const newIndex = selectedProject === projects.length - 1 ? 0 : selectedProject + 1;
		handleProjectSelect(newIndex);
	};

	if (!projects || projects.length === 0) {
		return (
			<div className="text-center py-12">
				<p className="text-white/60">No projects available.</p>
			</div>
		);
	}

	const currentProject = projects[selectedProject];
	const prevProject = projects[selectedProject === 0 ? projects.length - 1 : selectedProject - 1];
	const nextProject = projects[selectedProject === projects.length - 1 ? 0 : selectedProject + 1];

	return (
		<div className={cn("space-y-8", className)}>
			{/* Project Selector */}
			<ProjectSelector
				projects={projects}
				selectedIndex={selectedProject}
				onProjectSelect={handleProjectSelect}
			/>

			{/* Main Showcase */}
			<div className="flex items-center gap-6 md:gap-8">
				{/* Previous Project Preview */}
				<ProjectPreview
					project={prevProject}
					onClick={handlePrevious}
					className="opacity-60 hover:opacity-80"
				/>

				{/* Main Project Card */}
				<div className="flex-1 relative">
					<div className={cn("transition-all duration-700 cubic-bezier(0.175, 0.885, 0.32, 1.275)", isTransitioning ? "opacity-60 scale-98 blur-sm" : "opacity-100 scale-100 blur-0")}>
						<ProjectCard
							project={currentProject}
							size="large"
							showFullDescription={true}
							className="hover:scale-[1.02] hover:shadow-2xl"
						/>
					</div>
				</div>

				{/* Next Project Preview */}
				<ProjectPreview
					project={nextProject}
					onClick={handleNext}
					className="opacity-60 hover:opacity-80"
				/>
			</div>
		</div>
	);
}

interface ProjectPreviewProps {
	project: Project;
	onClick: () => void;
	className?: string;
}

function ProjectPreview({ project, onClick, className }: ProjectPreviewProps) {
	return (
		<div
			className={cn("flex-shrink-0 w-40 md:w-48 transition-opacity duration-300 cursor-pointer", className)}
			onClick={onClick}
		>
			<ProjectCard
				project={project}
				size="small"
				showFullDescription={false}
			/>
		</div>
	);
}
