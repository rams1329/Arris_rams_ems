// server/controllers/emailController.js

const nodemailer = require("nodemailer");
const { differenceInMonths, format } = require("date-fns");
const Customer = require("../models/Customer");
require("dotenv").config();

// Configure NodeMailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAILID, // Use the environment variable for email ID
    pass: process.env.EMAILPASSWORD, // Use the environment variable for email password
  },
});

// Function to send emails
const sendEmail = async (to, subject, html) => {
  const mailOptions = {
    from: "ramspa05@gmail.com",
    to,
    subject,
    html,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully!");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

// Function to calculate months passed since a given date
const monthsPassed = (date) => {
  const currentDate = new Date();
  const startDate = new Date(date);
  return differenceInMonths(currentDate, startDate);
};

// Function to send 6-month and 1-year update emails
const sendUpdateEmails = async () => {
  console.log("Calling sendUpdateEmails function...");

  try {
    const customers = await Customer.find();

    for (const customer of customers) {
      if (customer.dlemail.trim() && customer.email.trim() !== "") {
        const sixMonthsPassed = monthsPassed(customer.doj) >= 6;
        const oneYearPassed = monthsPassed(customer.doj) >= 12;

        if (sixMonthsPassed && !customer.emailSent6Months) {
          // Send 6-month email
          const subject = "6-Month Update";
          const dojFormatted = format(new Date(customer.doj), "MMMM d, yyyy");

          const html = `
          <p>Dear Respected ${customer.dlname},</p>
          <p>We're excited to share with you that ${customer.firstName} ${customer.lastName} in the ${customer.Department} department has marked an impressive achievement — reaching the 6-month milestone at Arris!</p>
          <p>During these past six months, ${customer.firstName} has been an integral part of our team, contributing valuable insights and dedication to our shared goals.</p>
          <p>We appreciate ${customer.firstName}'s commitment and look forward to more collaborative success in the months to come.</p>
          <p>Date of Joining: ${customer.doj}</p>
          <p>Employee Type: ${customer.porc}</p>
          <p>Employee Status: ${customer.status}</p>
          `;

          await sendEmail(customer.dlemail, subject, html);

          // Update flag
          await Customer.findByIdAndUpdate(customer._id, {
            emailSent6Months: true,
          });
        }

        if (oneYearPassed && !customer.emailSent1Year) {
          // Send 1-year email
          const subject = "1-Year Update";
          const dojFormatted = format(new Date(customer.doj), "MMMM d, yyyy");

          const html = `
          <p>Dear Respected ${customer.dlname},</p>
          <p>We are delighted to inform you that ${customer.firstName} ${customer.lastName} from the ${customer.Department} department has reached a significant milestone at Arris — completing one successful year with us!</p>
          <p>We would like to take this opportunity to acknowledge ${customer.firstName}'s dedication and contributions to our organization over the past year.</p>
          <p>Date of Joining: ${customer.doj}</p>
          <p>Employee Type: ${customer.porc}</p>
          <p>Employee Status: ${customer.status}</p>
            
          `;

          await sendEmail(customer.dlemail, subject, html);

          // Update flag
          await Customer.findByIdAndUpdate(customer._id, {
            emailSent1Year: true,
          });
        }
      }
    }

    console.log("Emails sent successfully!");
  } catch (error) {
    console.error("Error in sendUpdateEmails:", error);
  }
};

module.exports = { sendUpdateEmails };
