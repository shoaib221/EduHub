import { Resend } from "resend";
import { envVariables } from "../../config/environment_variables";

const resend = new Resend(
    envVariables.resendApiKey
);


export async function sendEmail(
    receiver: string,
    subject: string,
    html: string
) {

    await resend.emails.send({

        from: "EduHub <noreply@eduhub.com>",

        to: receiver,

        subject: "Verify your EduHub account",

        html,
    });

}