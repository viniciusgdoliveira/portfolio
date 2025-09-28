/** @format */

import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { safeValidateContactForm, formatZodError } from "@/lib/validation";

const resend = new Resend(process.env.RESEND_API_KEY || "dummy-key-for-build");

export async function POST(request: NextRequest) {
	try {
		// Check if we have a valid API key
		if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY === "dummy-key-for-build") {
			return NextResponse.json({ error: "Email service not configured" }, { status: 503 });
		}

		const body = await request.json();
		
		// Validate request body using Zod
		const validationResult = safeValidateContactForm(body);
		if (!validationResult.success) {
			const formattedError = formatZodError(validationResult.error);
			return NextResponse.json(
				{ 
					error: formattedError.message, 
					details: formattedError.details 
				}, 
				{ status: 400 }
			);
		}

		const { firstName, lastName, email, subject, message } = validationResult.data;

		// Send email using Resend
		const { data, error } = await resend.emails.send({
			from: "Portfolio Contact Form <onboarding@resend.dev>",
			to: ["viniciusgdoliveira@gmail.com"],
			subject: `Portfolio Contact: ${subject}`,
			html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #495057; margin-top: 0;">Contact Information</h3>
            <p><strong>Name:</strong> ${firstName} ${lastName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
          </div>
          
          <div style="background-color: #ffffff; padding: 20px; border: 1px solid #dee2e6; border-radius: 8px;">
            <h3 style="color: #495057; margin-top: 0;">Message</h3>
            <p style="white-space: pre-wrap; line-height: 1.6;">${message}</p>
          </div>
          
          <div style="margin-top: 20px; padding: 15px; background-color: #e9ecef; border-radius: 8px; font-size: 14px; color: #6c757d;">
            <p style="margin: 0;">This message was sent from your portfolio contact form.</p>
            <p style="margin: 5px 0 0 0;">Reply directly to this email to respond to ${firstName}.</p>
          </div>
        </div>
      `,
			replyTo: email,
		});

		if (error) {
			console.error("Resend error:", error);
			return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
		}

		return NextResponse.json({ message: "Email sent successfully", id: data?.id }, { status: 200 });
	} catch (error) {
		console.error("Contact form error:", error);
		return NextResponse.json({ error: "Internal server error" }, { status: 500 });
	}
}
