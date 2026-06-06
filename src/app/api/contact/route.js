import { NextResponse } from "next/server";
import { saveContactMessage } from "@/lib/contactDb";
import nodemailer from "nodemailer";

async function sendEmailNotification({ name, email, message }) {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  const to = process.env.CONTACT_TO_EMAIL || user;

  if (!user || !pass) {
    console.warn("Gmail notifications not sent: GMAIL_USER or GMAIL_APP_PASSWORD is not configured.");
    return;
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: user,
      pass: pass,
    },
  });

  const mailOptions = {
    from: `"${name}" <${user}>`,
    replyTo: email,
    to: to,
    subject: `Portfolio Contact: ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    html: `
      <h3>New Message from Portfolio Contact Form</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <p style="white-space: pre-wrap;">${message}</p>
    `,
  };

  await transporter.sendMail(mailOptions);
}

export async function POST(request) {
  try {
    const { name, email, message } = await request.json();

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const saved = await saveContactMessage({ name, email, message });

    try {
      await sendEmailNotification({ name, email, message });
    } catch (emailErr) {
      console.error("Email notification failed:", emailErr);
    }

    return NextResponse.json({
      success: true,
      id: saved.id.toString(),
      message: "Message saved successfully",
    });
  } catch (error) {
    console.error("Contact API error:", error);

    const isMongoError =
      error.name === "MongoServerError" ||
      error.name === "MongoNetworkError" ||
      error.message?.includes("ECONNREFUSED");

    return NextResponse.json(
      {
        error: isMongoError
          ? "Database unavailable. Ensure MongoDB is running on localhost."
          : "Failed to save message. Please try again.",
      },
      { status: 500 }
    );
  }
}
