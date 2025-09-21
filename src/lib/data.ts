/** @format */

// Data imports
import personalInfo from "@/data/personal-info.json";
import projects from "@/data/projects.json";
import aboutSections from "@/data/about-sections.json";
import contactInfo from "@/data/contact-info.json";
import seoData from "@/data/seo-data.json";

// Type definitions
export interface PersonalInfo {
	name: string;
	title: string;
	specialization: string;
	description: string;
	location: string;
	email: string;
	phone: string;
	profile: {
		image: string;
		alt: string;
	};
	social: {
		github: { url: string; username: string };
		linkedin: { url: string; username: string };
		whatsapp: { url: string; number: string };
	};
	languages: Array<{
		language: string;
		level: string;
		code: string;
	}>;
	interests: string[];
	values: string[];
}

export interface Project {
	id: string;
	title: string;
	shortDescription: string;
	fullDescription: string;
	technologies: string[];
	category: string;
	status: string;
	featured: boolean;
	image: {
		type: "video" | "gradient";
		url: string;
		fallback: string;
	};
	links: {
		github: string;
		live: string;
	};
	keyFeatures: string[];
	challenges: string;
	learnings: string;
}

export interface ProjectsData {
	featured: Project[];
	all: Project[];
	categories: string[];
	technologies: string[];
}

export interface AboutSection {
	id: string;
	title: string;
	content: string;
	image: string;
	alt: string;
	techStack: string[];
	values: string[];
}

export interface AboutSectionsData {
	sections: AboutSection[];
	rotationSettings: {
		autoRotate: boolean;
		interval: number;
		pauseOnHover: boolean;
		enableManualNavigation: boolean;
	};
	meta: {
		title: string;
		description: string;
		totalSections: number;
	};
}

export interface ContactMethod {
	id: string;
	name: string;
	value: string;
	href: string;
	icon: string;
	description: string;
	primary: boolean;
	response_time: string;
	color: string;
}

export interface ContactInfo {
	contactMethods: ContactMethod[];
	socialLinks: Array<{
		platform: string;
		url: string;
		username: string;
		icon: string;
	}>;
	availability: {
		status: string;
		timezone: string;
		preferredContactTimes: string;
		responseCommitment: string;
		openTo: string[];
	};
	formConfiguration: {
		fields: Array<{
			name: string;
			type: string;
			required: boolean;
			label: string;
			placeholder: string;
			rows?: number;
		}>;
		submitMethod: string;
		submitTo: string;
	};
	meta: {
		title: string;
		description: string;
		preferredMethod: string;
	};
}

// Export typed data
export const getPersonalInfo = (): PersonalInfo => personalInfo;
export const getProjectsData = (): ProjectsData => projects;
export const getAboutSections = (): AboutSectionsData => aboutSections;
export const getContactInfo = (): ContactInfo => contactInfo;
export const getSeoData = () => seoData;

// Utility functions
export const getFeaturedProjects = (): Project[] => projects.featured;
export const getAllProjects = (): Project[] => projects.all;
export const getProjectById = (id: string): Project | undefined => projects.all.find((project) => project.id === id);

export const getProjectsByCategory = (category: string): Project[] => projects.all.filter((project) => project.category === category);

export const getProjectsByTechnology = (technology: string): Project[] => projects.all.filter((project) => project.technologies.some((tech) => tech.toLowerCase().includes(technology.toLowerCase())));

export const getAboutSectionById = (id: string): AboutSection | undefined => aboutSections.sections.find((section) => section.id === id);

export const getPrimaryContactMethods = (): ContactMethod[] => contactInfo.contactMethods.filter((method) => method.primary);

export const getContactMethodById = (id: string): ContactMethod | undefined => contactInfo.contactMethods.find((method) => method.id === id);

// SEO helpers
export const getStructuredData = (type: "person" | "website" | "portfolioWork" | "chat" | "breadcrumbs") => {
	return seoData[type];
};

export const getMetaData = () => seoData.meta;

// Project statistics
export const getProjectStats = () => {
	const stats = {
		totalProjects: projects.all.length,
		featuredProjects: projects.featured.length,
		categories: projects.categories.length,
		technologies: projects.technologies.length,
		completedProjects: projects.all.filter((p) => p.status === "completed").length,
		projectsWithLiveDemo: projects.all.filter((p) => p.links.live).length,
	};

	return stats;
};

export default {
	getPersonalInfo,
	getProjectsData,
	getAboutSections,
	getContactInfo,
	getSeoData,
	getFeaturedProjects,
	getAllProjects,
	getProjectById,
	getProjectsByCategory,
	getProjectsByTechnology,
	getAboutSectionById,
	getPrimaryContactMethods,
	getContactMethodById,
	getStructuredData,
	getMetaData,
	getProjectStats,
};
