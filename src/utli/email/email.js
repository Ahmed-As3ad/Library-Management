import nodemailer from 'nodemailer'
export const sendMail = async ({ to = "", subject = "", html = "" }) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        secure: true,
        auth: {
            user: process.env.COMPANY_MAIL,
            pass: process.env.COMPANY_MAIL_PASS,
        },
    });


    const info = await transporter.sendMail({
        from: `"Saraha App" <${process.env.COMPANY_MAIL}>`,
        to,
        subject,
        html
    });

    console.log("✅ Message sent: %s", info.messageId);
    return info
}
