import { adjectives, nouns } from "./words";
import nodemailer from "nodemailer";
import sgTransport from "nodemailer-sendgrid-transport";
import jwt from "jsonwebtoken";

export const generateSecret = () => {
  const adjIndex = Math.floor(adjectives.length * Math.random());
  const nounIndex = Math.floor(nouns.length * Math.random());
  return `${adjectives[adjIndex]} ${nouns[nounIndex]}`;
};

const sendMail = (email) => {
  const options = {
    auth: {
      api_user: process.env.SENDGRID_USERNAME,
      api_key: process.env.SENDGRID_PASSWORD,
    },
  };
  const client = nodemailer.createTransport(sgTransport(options));
  return client.sendMail(email);
};

export const sendSecretMail = (address, secret) => {
  const email = {
    from: process.env.FROM_EMAIL,
    to: address,
    subject: "🔒Login Secret for Prismagram",
    html: `Hello! Your login secret is <strong>${secret}</strong>.<br/>Copy paste on the app/website to log in`,
  };

  return sendMail(email);
};

export const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};
