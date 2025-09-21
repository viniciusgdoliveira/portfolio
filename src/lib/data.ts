/** @format */

// Data imports
import personalInfo from "@/data/personal-info.json";
import projects from "@/data/projects.json";
import aboutSections from "@/data/about-sections.json";
import contactInfo from "@/data/contact-info.json";
import seoData from "@/data/seo-data.json";

// Type imports
import { Project, ProjectsData } from "@/types/project";
import { AboutSection, AboutSectionsData } from "@/types/about";

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
export const getProjectsData = (): ProjectsData => projects as ProjectsData;
export const getAboutSections = (): AboutSectionsData => aboutSections as AboutSectionsData;
export const getContactInfo = (): ContactInfo => contactInfo;
export const getSeoData = () => seoData;

// Utility functions
export const getFeaturedProjects = (): Project[] => (projects as ProjectsData).featured;
export const getAllProjects = (): Project[] => (projects as ProjectsData).all;
export const getProjectById = (id: string): Project | undefined => (projects as ProjectsData).all.find((project) => project.id === id);

export const getProjectsByCategory = (category: string): Project[] => (projects as ProjectsData).all.filter((project) => project.category === category);

export const getProjectsByTechnology = (technology: string): Project[] =>
	(projects as ProjectsData).all.filter((project) => project.technologies.some((tech) => tech.toLowerCase().includes(technology.toLowerCase())));

export const getAboutSectionById = (id: string): AboutSection | undefined => (aboutSections as AboutSectionsData).sections.find((section) => section.id === id);

export const getPrimaryContactMethods = (): ContactMethod[] => contactInfo.contactMethods.filter((method) => method.primary);

export const getContactMethodById = (id: string): ContactMethod | undefined => contactInfo.contactMethods.find((method) => method.id === id);

// SEO helpers
export const getStructuredData = (type: "person" | "website" | "portfolioWork" | "chat" | "breadcrumbs") => {
	return seoData[type];
};

export const getMetaData = () => seoData.meta;

// Project statistics
export const getProjectStats = () => {
	const projectsData = projects as ProjectsData;
	const stats = {
		totalProjects: projectsData.all.length,
		featuredProjects: projectsData.featured.length,
		categories: projectsData.categories.length,
		technologies: projectsData.technologies.length,
		completedProjects: projectsData.all.filter((p) => p.status === "completed").length,
		projectsWithLiveDemo: projectsData.all.filter((p) => p.links.live).length,
	};

	return stats;
};

const dataLib = {
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

export default dataLib;
