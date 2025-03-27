require('dotenv').config({ path: './.env' });

const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/send-email', async (req, res) => {
    const { name, email, subject, message } = req.body;

    // Set up the transporter for email
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER, // Fetching email from .env
            pass: process.env.EMAIL_PASS  // Fetching password from .env
        }
    });
    

    const mailOptions = {
        from: email,
        to: process.env.RECEIVER_EMAIL, // Receiving email from .env
        subject: `New Contact Message: ${subject}`,
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    };
    

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Email sent successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to send email', error });
    }
});

app.listen(5501, () => {
    console.log('Server running on port 5501');
});
