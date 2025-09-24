/** @format */

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import ThemeToggle from "./ThemeToggle";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Navigation() {
	const pathname = usePathname();
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const t = useTranslations("navigation");
	const urlLocale = useLocale();
	const { currentLanguage } = useLanguage();
	const { style } = useTheme();

	// Use the context language, fallback to URL locale
	const activeLocale = currentLanguage || urlLocale;

	const navItems = [
		{ name: t("home"), href: `/${activeLocale}` },
		{ name: t("projects"), href: `/${activeLocale}/projects` },
		{ name: t("chat"), href: `/${activeLocale}/chat` },
		{ name: t("contact"), href: `/${activeLocale}/contact` },
	];

	return (
		<nav className="fixed top-0 left-0 right-0 z-50 w-full">
			<div className="container mx-auto px-6">
				<div className="flex items-center justify-between h-16">
					{/* Desktop Layout */}
					<div className="hidden md:flex items-center justify-between w-full">
						{/* Left: Language Switcher */}
						<div className="flex items-center">
							<LanguageSwitcher />
						</div>

						{/* Center: Navigation Menu */}
						<div className="flex items-center space-x-2">
							{navItems.map((item) => (
								<Link
									key={item.name}
									href={item.href}
									className={`px-6 h-10 flex items-center justify-center rounded-[20px] text-sm font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 ${
										pathname === item.href ? "nav-selected text-white dark:text-white shadow-lg" : "text-white/80 hover:text-white hover:liquid-glass-light"
									}`}
								>
									{item.name}
								</Link>
							))}
						</div>

						{/* Right: Theme Toggle */}
						<div className="flex items-center">
							<ThemeToggle />
						</div>
					</div>

					{/* Mobile Layout */}
					<div className="md:hidden flex items-center justify-between w-full">
						{/* Left: Mobile menu button */}
						<button
							onClick={() => setIsMenuOpen(!isMenuOpen)}
							className={`p-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
								style === 'dos-style' 
									? 'bg-[var(--dos-bg)] border border-dashed border-[var(--dos-border)] text-[var(--dos-fg)] hover:bg-[var(--dos-fg)] hover:text-[var(--dos-bg)] focus:ring-[var(--dos-accent)]'
									: 'rounded-[20px] liquid-glass-light text-white/80 hover:text-white focus:ring-white'
							}`}
							aria-label="Toggle menu"
						>
							<svg
								className="w-6 h-6"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								{isMenuOpen ? (
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M6 18L18 6M6 6l12 12"
									/>
								) : (
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M4 6h16M4 12h16M4 18h16"
									/>
								)}
							</svg>
						</button>

						{/* Center: VGO Initials */}
						<Link
							href={`/${activeLocale}`}
							className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
						>
							VGO
						</Link>

						{/* Right: Language Switcher and Theme Toggle */}
						<div className="flex items-center space-x-2">
							<LanguageSwitcher isMobile={true} />
							<ThemeToggle isMobile={true} />
						</div>
					</div>
				</div>

				{/* Mobile Navigation */}
				{isMenuOpen && (
					<div className={`md:hidden py-4 mt-4 ${
						style === 'dos-style' 
							? 'bg-[var(--dos-bg)] border border-dashed border-[var(--dos-border)]'
							: 'liquid-glass-light rounded-[20px]'
					}`}>
						<div className="flex flex-col space-y-2 px-4">
							{navItems.map((item) => (
								<Link
									key={item.name}
									href={item.href}
									className={`px-6 h-10 flex items-center justify-center rounded-[20px] text-sm font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 ${
										pathname === item.href ? "nav-selected text-white dark:text-white shadow-lg" : "text-white/80 hover:text-white hover:liquid-glass-light"
									}`}
									onClick={() => setIsMenuOpen(false)}
								>
									{item.name}
								</Link>
							))}
						</div>
					</div>
				)}
			</div>
		</nav>
	);
}
