const nodemailer = "nodemailer";

// create reusable transporter object using the default SMTP  transport

const transporter = nodemailer.createTransport({
  port: 465,
  host: "smtp.gmail.com",
  auth: {
    user: "",
    pass: "",
  },
  secure: true,
});

const mailData = {
  from: "list@info.com", // sender address
  to: "", //list of recivers
  text: "",
  html: "",
  attachments: [
    {
      filename: `List.am - account ${new Date()
        .toISOString()
        .slice(0, 10)}.pdf`,
      content: pdf,
      contentType: "application/pdf",
    },
  ], //
};
