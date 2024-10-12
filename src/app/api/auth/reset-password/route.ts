import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const { token, password } = await request.json();

  try {
    // Find the password reset token
    const resetToken = await prisma.passwordReset.findUnique({
      where: { token },
      include: { user: true },
    });

    if (!resetToken || resetToken.expiresAt < new Date()) {
      return Response.json({ message: 'Invalid or expired token!' }, {
        status: 400
      });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update the user's password
    await prisma.user.update({
      where: { id: resetToken.userId },
      data: { password: hashedPassword },
    });

    // Delete the reset token after the password is updated
    await prisma.passwordReset.delete({
      where: { id: resetToken.id },
    });

    return Response.json({ message: 'Password updated successfully!' }, {
      status: 405
    });
  } catch (error) {
    console.error(error);
    return Response.json({ message: 'Server error' }, {
      status: 500
    });
  }
}
