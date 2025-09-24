/** @format */

export interface MediaItem {
	type: "video" | "image" | "gradient" | "iframe";
	url: string;
	fallback?: string;
	alt?: string;
}

export interface ProjectLinks {
	github?: string;
	live?: string;
	demo?: string;
}

export interface Project {
	id: string;
	title: string;
	shortDescription: string;
	fullDescription: string;
	technologies: string[];
	category: string;
	status: "completed" | "in-progress" | "planned";
	featured: boolean;
	image: MediaItem;
	links: ProjectLinks;
	keyFeatures: string[];
	challenges?: string;
	learnings?: string;
}

export interface ProjectsData {
	featured: Project[];
	all: Project[];
	categories: string[];
	technologies: string[];
}

export interface ProjectCardProps {
	project: Project;
	size?: "small" | "medium" | "large";
	showFullDescription?: boolean;
	className?: string;
}

export interface ProjectGridProps {
	projects: Project[];
	columns?: 1 | 2 | 3 | 4;
	className?: string;
}
