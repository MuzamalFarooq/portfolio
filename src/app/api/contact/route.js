import { NextResponse } from "next/server";
import { saveContactMessage } from "@/lib/contactDb";

async function sendEmailNotification({ name, email, message }) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from =
    process.env.CONTACT_FROM_EMAIL || "Portfolio <onboarding@resend.dev>";

  if (!apiKey || !to) return;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: email,
      subject: `Portfolio contact from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    }),
  });

  if (!res.ok) {
    const err = await res.json();
    console.error("Resend error:", err);
  }
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
