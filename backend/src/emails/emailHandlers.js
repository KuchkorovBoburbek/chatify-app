import { resentClient, sender } from "../lib/resend.js";
import { createWelcomeEmailTemplate } from "./emailTemplate.js";


export const sendWelcomeEmail = async (email, name, clientURL  ) => {
    const {data, error} =await resentClient.emails.send({
        from : `${sender.name}  <${sender.email}>`,
        to : email,
        subject : "Welcome to Chatify",
        html: createWelcomeEmailTemplate(name, clientURL)
    });

    if(error) {
        console.error("ERROR sending welcome email:", error);
        throw new Error ("Failed to send Welcome email")
    }
    console.log("Welcome email sent successfully: ", data)
}