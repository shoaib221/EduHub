import { User } from "../../../../types/user";



export function generateEmailVerificationHTML(
    user: User,
    verificationUrl: string
): string {

    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8" />
        <title>Verify Email</title>
    </head>

    <body style="
        margin:0;
        padding:0;
        background:#f1f5f9;
        font-family:Arial,sans-serif;
    ">

        <div style="
            max-width:600px;
            margin:40px auto;
            background:white;
            padding:32px;
            border-radius:12px;
        ">

            <h2 style="
                color:#2563eb;
                margin-bottom:20px;
            ">
                Welcome to EduHub ${user.username}
            </h2>


            <p style="
                color:#334155;
                font-size:16px;
                line-height:1.6;
            ">
                Thank you for registering.
                Please verify your email address to activate your account.
            </p>


            <div style="
                text-align:center;
                margin:30px 0;
            ">

                <a
                    href="${verificationUrl}"
                    style="
                        display:inline-block;
                        padding:12px 24px;
                        background:#2563eb;
                        color:white;
                        text-decoration:none;
                        border-radius:8px;
                        font-weight:bold;
                    "
                >
                    Verify Email
                </a>

            </div>


            <p style="
                color:#64748b;
                font-size:14px;
            ">
                This link expires in 24 hours.
            </p>


            <p style="
                color:#64748b;
                font-size:14px;
            ">
                If you did not create this account,
                you can safely ignore this email.
            </p>


            <hr style="
                border:none;
                border-top:1px solid #e2e8f0;
                margin:30px 0;
            ">


            <p style="
                text-align:center;
                color:#94a3b8;
                font-size:12px;
            ">
                © ${new Date().getFullYear()} EduHub
            </p>


        </div>

    </body>
    </html>
    `;
}