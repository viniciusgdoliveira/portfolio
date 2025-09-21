/** @format */

import { Project, ProjectsData } from "@/types/project";
import { AboutSection, AboutSectionsData } from "@/types/about";

// Abstract interface for data services (Dependency Inversion Principle)
export interface DataService {
	getProjects(): Promise<ProjectsData>;
	getFeaturedProjects(): Promise<Project[]>;
	getProjectById(id: string): Promise<Project | null>;
	getAboutSections(): Promise<AboutSectionsData>;
}

// Concrete implementation for JSON-based data
export class JsonDataService implements DataService {
	private projectsCache: ProjectsData | null = null;
	private aboutCache: AboutSectionsData | null = null;

	async getProjects(): Promise<ProjectsData> {
		if (this.projectsCache) {
			return this.projectsCache;
		}

		try {
			const response = await fetch("/api/data/projects");
			if (!response.ok) {
				throw new Error("Failed to fetch projects data");
			}
			this.projectsCache = await response.json();
			return this.projectsCache;
		} catch (error) {
			console.error("Error fetching projects:", error);
			// Return fallback data
			return this.getFallbackProjectsData();
		}
	}

	async getFeaturedProjects(): Promise<Project[]> {
		const projectsData = await this.getProjects();
		return projectsData.featured;
	}

	async getProjectById(id: string): Promise<Project | null> {
		const projectsData = await this.getProjects();
		return projectsData.all.find((project) => project.id === id) || null;
	}

	async getAboutSections(): Promise<AboutSectionsData> {
		if (this.aboutCache) {
			return this.aboutCache;
		}

		try {
			const response = await fetch("/api/data/about-sections");
			if (!response.ok) {
				throw new Error("Failed to fetch about sections data");
			}
			this.aboutCache = await response.json();
			return this.aboutCache;
		} catch (error) {
			console.error("Error fetching about sections:", error);
			// Return fallback data
			return this.getFallbackAboutData();
		}
	}

	private getFallbackProjectsData(): ProjectsData {
		return {
			featured: [],
			all: [],
			categories: [],
			technologies: [],
		};
	}

	private getFallbackAboutData(): AboutSectionsData {
		return {
			sections: [],
			rotationSettings: {
				autoRotate: true,
				interval: 8000,
				pauseOnHover: false,
				enableManualNavigation: true,
			},
			meta: {
				title: "About Me",
				description: "Discover different aspects of who I am",
				totalSections: 0,
			},
		};
	}
}

// Factory function to create data service instance
export function createDataService(): DataService {
	return new JsonDataService();
}

// Export singleton instance
export const dataService = createDataService();
