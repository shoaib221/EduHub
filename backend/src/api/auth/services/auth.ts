
import { envVariables } from "../../../../config/environment_variables";
import crypto from "crypto";
import { User } from "../../../../types/user";
import { sendEmail } from "../../../services/resend-mail";
import { generateEmailVerificationHTML } from "../shoaib/emailVerification";

// src/api/course-enrollment/services/course-enrollment.ts

export default {

    async sendEmailVerification(
        strapi: any,
        user: User,
    ) {


        // Random token
        const token = crypto.randomBytes(32).toString("hex");

        // Store only the hash
        const tokenHash = crypto
            .createHash("sha256")
            .update(token)
            .digest("hex");

        // Optional: invalidate previous unused tokens

        const expiresAt = new Date(
            Date.now() + 15 * 60 * 1000 // 15 minutes
        );

        await strapi.db
            .query("api::token.token")
            .update({
                where: {
                    user: user.id,
                },
                data: {
                    user: user.id,
                    passwordChange: tokenHash,
                    passwordChangeExpires: expiresAt,
                },
            });

        const resetLink = `${envVariables.frontendUrl}/reset-password?token=${token}`;

        const html = generateEmailVerificationHTML(user, resetLink);

        await sendEmail(
            user.email,
            "Verify your EduHub account",
            html
        );

        console.log(resetLink);

        return {

        }

    },


};