/** @format */

"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { MediaDisplay } from "@/components/ui/MediaDisplay";
import { Project } from "@/types/project";

interface ProjectModalProps {
	project: Project | null;
	isOpen: boolean;
	onClose: () => void;
}

export function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
	const t = useTranslations("projects");

	// Handle escape key
	useEffect(() => {
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				onClose();
			}
		};

		if (isOpen) {
			document.addEventListener("keydown", handleEscape);
			document.body.style.overflow = "hidden";
		}

		return () => {
			document.removeEventListener("keydown", handleEscape);
			document.body.style.overflow = "unset";
		};
	}, [isOpen, onClose]);

	if (!project || !isOpen) return null;

	// Get translated project content
	const getTranslatedProject = (proj: Project) => {
		const projectKey = proj.id;
		return {
			...proj,
			title: t(`items.${projectKey}.title`),
			shortDescription: t(`items.${projectKey}.description`),
			fullDescription: t(`items.${projectKey}.description`),
			keyFeatures: proj.keyFeatures,
		};
	};

	const translatedProject = getTranslatedProject(project);

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center p-4">
			{/* Backdrop */}
			<div
				className="absolute inset-0 bg-black/60 backdrop-blur-xl"
				onClick={onClose}
			/>

			{/* Modal Content */}
			<div className="relative w-full max-w-6xl max-h-[90vh] overflow-y-auto">
				{/* Outer glow effect */}
				<div className="absolute -inset-2 bg-gradient-to-br from-white/20 via-white/10 to-transparent rounded-[2rem] blur-2xl" />

				<div className="relative liquid-glass-light rounded-[2rem] border border-white/30 overflow-hidden shadow-2xl">
					{/* Inner glass effect */}
					<div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5 rounded-[2rem]" />
					<div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent rounded-[2rem]" />
					{/* Close Button */}
					<button
						onClick={onClose}
						className="absolute top-6 right-6 z-10 w-12 h-12 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/20 hover:scale-110 transition-all duration-300 flex items-center justify-center shadow-lg"
						aria-label="Close modal"
					>
						<svg
							className="w-6 h-6 text-white/90"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					</button>

					{/* Media Section */}
					<div className="relative h-80 sm:h-96 md:h-[500px] lg:h-[600px] overflow-hidden">
						<MediaDisplay
							media={{
								...translatedProject.image,
								alt: `${translatedProject.title} preview`,
							}}
						/>
						{/* iOS 26 gradient overlay */}
						<div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
						<div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent" />

						{/* Title Overlay with glass effect */}
						<div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
							<div className="relative">
								{/* Glass background for title */}
								<div className="absolute inset-0 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10" />
								<div className="relative p-6">
									<h1 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 drop-shadow-lg">{translatedProject.title}</h1>
									<div className="flex items-center gap-3">
										<div className="px-4 py-2 bg-white/10 backdrop-blur-xl rounded-full border border-white/20">
											<span className="text-white/90 text-sm font-medium">{translatedProject.category}</span>
										</div>
										<div className={`px-4 py-2 rounded-full border ${translatedProject.status === "completed" ? "bg-green-500/20 border-green-400/30" : "bg-yellow-500/20 border-yellow-400/30"}`}>
											<span className={`text-sm font-medium ${translatedProject.status === "completed" ? "text-green-300" : "text-yellow-300"}`}>{translatedProject.status}</span>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* Content Section */}
					<div className="relative p-6 lg:p-8">
						{/* Content background glass effect */}
						<div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-white/10" />
						{/* Description */}
						<div className="relative mb-8">
							<div className="absolute inset-0 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10" />
							<div className="relative p-6">
								<h2 className="text-white text-xl sm:text-2xl font-semibold mb-4 flex items-center">
									<div className="w-1 h-6 bg-gradient-to-b from-blue-400 to-purple-500 rounded-full mr-3" />
									About This Project
								</h2>
								<p className="text-white/80 text-base sm:text-lg leading-relaxed">{translatedProject.fullDescription}</p>
							</div>
						</div>

						{/* Tech Stack */}
						<div className="relative mb-8">
							<div className="absolute inset-0 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10" />
							<div className="relative p-6">
								<h2 className="text-white text-xl sm:text-2xl font-semibold mb-4 flex items-center">
									<div className="w-1 h-6 bg-gradient-to-b from-green-400 to-blue-500 rounded-full mr-3" />
									Technologies Used
								</h2>
								<div className="flex flex-wrap gap-3">
									{translatedProject.technologies.map((tech, index) => (
										<div
											key={index}
											className="px-4 py-2 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300"
										>
											<span className="text-white/90 text-sm font-medium">{tech}</span>
										</div>
									))}
								</div>
							</div>
						</div>

						{/* Key Features */}
						{translatedProject.keyFeatures && translatedProject.keyFeatures.length > 0 && (
							<div className="relative mb-8">
								<div className="absolute inset-0 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10" />
								<div className="relative p-6">
									<h2 className="text-white text-xl sm:text-2xl font-semibold mb-4 flex items-center">
										<div className="w-1 h-6 bg-gradient-to-b from-purple-400 to-pink-500 rounded-full mr-3" />
										Key Features
									</h2>
									<ul className="text-white/80 text-base sm:text-lg space-y-3">
										{translatedProject.keyFeatures.map((feature, index) => (
											<li
												key={index}
												className="flex items-start"
											>
												<div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full mr-4 flex-shrink-0 mt-2" />
												<span className="leading-relaxed">{feature}</span>
											</li>
										))}
									</ul>
								</div>
							</div>
						)}

						{/* Challenges & Learnings */}
						{(translatedProject.challenges || translatedProject.learnings) && (
							<div className="relative mb-8">
								<div className="absolute inset-0 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10" />
								<div className="relative p-6">
									<h2 className="text-white text-xl sm:text-2xl font-semibold mb-4 flex items-center">
										<div className="w-1 h-6 bg-gradient-to-b from-orange-400 to-red-500 rounded-full mr-3" />
										Project Insights
									</h2>
									<div className="grid md:grid-cols-2 gap-6">
										{translatedProject.challenges && (
											<div className="relative">
												<div className="absolute inset-0 bg-white/5 backdrop-blur-xl rounded-xl border border-white/10" />
												<div className="relative p-4">
													<h3 className="text-white font-medium mb-3 flex items-center">
														<div className="w-1 h-4 bg-gradient-to-b from-orange-400 to-yellow-500 rounded-full mr-2" />
														Challenges
													</h3>
													<p className="text-white/70 text-sm sm:text-base leading-relaxed">{translatedProject.challenges}</p>
												</div>
											</div>
										)}
										{translatedProject.learnings && (
											<div className="relative">
												<div className="absolute inset-0 bg-white/5 backdrop-blur-xl rounded-xl border border-white/10" />
												<div className="relative p-4">
													<h3 className="text-white font-medium mb-3 flex items-center">
														<div className="w-1 h-4 bg-gradient-to-b from-green-400 to-emerald-500 rounded-full mr-2" />
														Key Learnings
													</h3>
													<p className="text-white/70 text-sm sm:text-base leading-relaxed">{translatedProject.learnings}</p>
												</div>
											</div>
										)}
									</div>
								</div>
							</div>
						)}

						{/* Action Buttons */}
						<div className="relative">
							<div className="absolute inset-0 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10" />
							<div className="relative p-6">
								<div className="flex flex-col sm:flex-row gap-4">
									{translatedProject.links.github && (
										<Button
											variant="glass"
											size="lg"
											className="flex-1 liquid-button hover:scale-105 transition-all duration-300 bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/20"
											asChild
										>
											<Link
												href={translatedProject.links.github}
												target="_blank"
												rel="noopener noreferrer"
											>
												<svg
													className="w-5 h-5 mr-2"
													fill="currentColor"
													viewBox="0 0 24 24"
												>
													<path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
												</svg>
												{t("actions.viewCode")}
											</Link>
										</Button>
									)}

									{translatedProject.links.live && (
										<Button
											variant="primary"
											size="lg"
											className="flex-1 liquid-button hover:scale-105 transition-all duration-300 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
											asChild
										>
											<Link
												href={translatedProject.links.live}
												target="_blank"
												rel="noopener noreferrer"
											>
												<svg
													className="w-5 h-5 mr-2"
													fill="none"
													stroke="currentColor"
													viewBox="0 0 24 24"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth={2}
														d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
													/>
												</svg>
												{t("actions.liveDemo")}
											</Link>
										</Button>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
