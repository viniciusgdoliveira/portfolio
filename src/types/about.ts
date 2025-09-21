/** @format */

export interface AboutSection {
	id: string;
	title: string;
	content: string;
	image: string;
	alt?: string;
	techStack: string[];
	values?: string[];
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

export interface AboutCarouselProps {
	sections: AboutSection[];
	autoRotate?: boolean;
	interval?: number;
	className?: string;
}
