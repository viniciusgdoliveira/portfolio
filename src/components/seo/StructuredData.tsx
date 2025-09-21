/** @format */

"use client";

interface StructuredDataProps {
	data: Record<string, any>;
}

export function StructuredData({ data }: StructuredDataProps) {
	return (
		<script
			type="application/ld+json"
			dangerouslySetInnerHTML={{
				__html: JSON.stringify(data),
			}}
		/>
	);
}

// Predefined structured data generators
export const createPersonSchema = () => ({
	"@context": "https://schema.org",
	"@type": "Person",
	"name": "Vinícius Guimarães de Oliveira",
	"jobTitle": "Software Engineer",
	"description": "Software Engineer specializing in Shopify, Hydrogen, TypeScript, ReactJS, Next.js, and Firebase",
	"url": "https://viniciusgdoliveira.vercel.app",
	"sameAs": ["https://github.com/viniciusgdoliveira", "https://linkedin.com/in/viniciusgdoliveira"],
	"knowsAbout": ["Shopify", "Hydrogen", "TypeScript", "ReactJS", "Next.js", "Firebase", "Software Engineering", "Web Development", "Frontend Development"],
	"worksFor": {
		"@type": "Organization",
		"name": "Freelance",
	},
});

export const createWebPageSchema = (locale: string, pageName: string) => ({
	"@context": "https://schema.org",
	"@type": "WebPage",
	"name": `${pageName} - Vinícius Guimarães de Oliveira`,
	"description": "Interactive page to learn about Vinícius's projects, tech stack, and software development experiences",
	"url": `https://viniciusgdoliveira.vercel.app/${locale}/${pageName.toLowerCase()}`,
	"author": {
		"@type": "Person",
		"name": "Vinícius Guimarães de Oliveira",
		"jobTitle": "Software Engineer",
		"sameAs": ["https://github.com/viniciusgdoliveira", "https://linkedin.com/in/viniciusgdoliveira"],
	},
});
