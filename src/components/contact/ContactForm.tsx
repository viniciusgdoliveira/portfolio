/** @format */

"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

interface FormData {
	firstName: string;
	lastName: string;
	email: string;
	subject: string;
	message: string;
}

interface ContactFormProps {
	className?: string;
}

export function ContactForm({ className }: ContactFormProps) {
	const t = useTranslations("contact");

	const [formData, setFormData] = useState<FormData>({
		firstName: "",
		lastName: "",
		email: "",
		subject: "",
		message: "",
	});

	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);
		setSubmitStatus("idle");

		try {
			const response = await fetch("/api/contact", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});

			if (response.ok) {
				setSubmitStatus("success");
				setFormData({
					firstName: "",
					lastName: "",
					email: "",
					subject: "",
					message: "",
				});
			} else {
				const errorData = await response.json();
				console.error("Form submission error:", errorData);
				setSubmitStatus("error");
			}
		} catch (error) {
			console.error("Network error:", error);
			setSubmitStatus("error");
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<Card className={className}>
			<CardHeader>
				<CardTitle className="text-2xl">{t("sendMessage")}</CardTitle>
			</CardHeader>

			<CardContent>
				<form
					onSubmit={handleSubmit}
					className="space-y-6"
				>
					<div className="grid md:grid-cols-2 gap-6">
						<FormField
							label={t("firstName")}
							name="firstName"
							type="text"
							value={formData.firstName}
							onChange={handleChange}
							placeholder={t("firstName")}
							required
						/>
						<FormField
							label={t("lastName")}
							name="lastName"
							type="text"
							value={formData.lastName}
							onChange={handleChange}
							placeholder={t("lastName")}
							required
						/>
					</div>

					<FormField
						label={t("email")}
						name="email"
						type="email"
						value={formData.email}
						onChange={handleChange}
						placeholder={t("email")}
						required
					/>

					<FormField
						label={t("subject")}
						name="subject"
						type="text"
						value={formData.subject}
						onChange={handleChange}
						placeholder={t("subject")}
						required
					/>

					<FormField
						label={t("message")}
						name="message"
						type="textarea"
						value={formData.message}
						onChange={handleChange}
						placeholder={t("message")}
						rows={6}
						required
					/>

					{/* Status Messages */}
					{submitStatus === "success" && (
						<StatusMessage
							type="success"
							title="Message sent successfully!"
							message="Thank you for your message. I'll get back to you soon!"
						/>
					)}

					{submitStatus === "error" && (
						<StatusMessage
							type="error"
							title="Error sending message"
							message="Please try again or contact me directly via email."
						/>
					)}

					<Button
						type="submit"
						disabled={isSubmitting}
						className="w-full"
						variant="primary"
						size="lg"
					>
						{isSubmitting ? (
							<div className="flex items-center justify-center space-x-2">
								<div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
								<span>Sending...</span>
							</div>
						) : (
							t("sendButton")
						)}
					</Button>
				</form>
			</CardContent>
		</Card>
	);
}

interface FormFieldProps {
	label: string;
	name: string;
	type: "text" | "email" | "textarea";
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
	placeholder?: string;
	required?: boolean;
	rows?: number;
}

function FormField({ label, name, type, value, onChange, placeholder, required = false, rows = 4 }: FormFieldProps) {
	const baseClassName = "w-full px-4 py-3 liquid-glass-light text-white placeholder-white/60 rounded-[20px] focus:outline-none focus:ring-2 focus:ring-blue-500";

	return (
		<div>
			<label
				htmlFor={name}
				className="block text-white text-sm font-medium mb-2"
			>
				{label}
			</label>
			{type === "textarea" ? (
				<textarea
					id={name}
					name={name}
					value={value}
					onChange={onChange}
					required={required}
					className={`${baseClassName} resize-none`}
					placeholder={placeholder}
					rows={rows}
				/>
			) : (
				<input
					type={type}
					id={name}
					name={name}
					value={value}
					onChange={onChange}
					required={required}
					className={baseClassName}
					placeholder={placeholder}
				/>
			)}
		</div>
	);
}

interface StatusMessageProps {
	type: "success" | "error";
	title: string;
	message: string;
}

function StatusMessage({ type, title, message }: StatusMessageProps) {
	const isSuccess = type === "success";
	const bgColor = isSuccess ? "bg-green-500/20 border-green-500/20" : "bg-red-500/20 border-red-500/20";
	const textColor = isSuccess ? "text-green-400" : "text-red-400";

	return (
		<div className={`p-4 liquid-glass-light border rounded-[20px] ${bgColor}`}>
			<div className="flex items-center space-x-2">
				<svg
					className={`w-5 h-5 ${textColor}`}
					fill="currentColor"
					viewBox="0 0 20 20"
				>
					{isSuccess ? (
						<path
							fillRule="evenodd"
							d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
							clipRule="evenodd"
						/>
					) : (
						<path
							fillRule="evenodd"
							d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
							clipRule="evenodd"
						/>
					)}
				</svg>
				<span className={`font-medium ${textColor}`}>{title}</span>
			</div>
			<p className="text-white/80 text-sm mt-2">{message}</p>
		</div>
	);
}
