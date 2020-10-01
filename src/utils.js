import { adjectives, nouns } from "./words";
import nodemailer from "nodemailer";
import sgTransport from "nodemailer-sendgrid-transport";
const dotenv = require('dotenv');
dotenv.config();

export const generateSecret = () => {
    const adjIndex = Math.floor(adjectives.length * Math.random());
    const nounIndex = Math.floor(nouns.length * Math.random());
    return `${adjectives[adjIndex]} ${nouns[nounIndex]}`
};

const sendMail = (email) => {
    const options = {
        auth: {
            api_user: process.env.SENDGRID_USERNAME,
            api_key: process.env.SENDGRID_PASSWORD
        }
    }
    const client = nodemailer.createTransport(sgTransport(options))
    return client.sendMail(email)
}

export const sendSecretMail = (address, secret) => {
    const email = {
        from : process.env.FROM_EMAIL,
        to: address,
        subject: "🔒Login Secret for Prismagram",
        html: `Hello! Your login secret it ${secret}.<br/>Copy paste on the app/website to log in`
    }; 

    return sendMail(email)
}