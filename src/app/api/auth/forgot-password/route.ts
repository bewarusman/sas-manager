import crypto from 'crypto';
import nodemailer from 'nodemailer';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const { email } = await request.json()

  try {
    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return Response.json({ message: 'User not found!' }, {
        status: 404
      });
    }

    // Create a unique token
    const token = crypto.randomBytes(32).toString('hex');

    // Token expires in 1 hour
    const expiresAt = new Date(Date.now() + 3600000);

    // Store the token in the PasswordReset table
    await prisma.passwordReset.create({
      data: {
        token,
        userId: user.id,
        expiresAt,
      },
    });

    // Send reset email
    const resetUrl = `${process.env.NEXT_PUBLIC_URL}/reset-password?token=${token}`;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Password Reset',
      html: `<p>You requested a password reset. Click <a href="${resetUrl}">here</a> to reset your password.</p>`,
    };

    await transporter.sendMail(mailOptions);

    return Response.json({ message: 'Password reset email sent!' }, {
      status: 200
    });
  } catch (error) {
    // console.error(error);
    return Response.json({ message: 'Method not allowed' }, {
      status: 500
    });
  }
}
