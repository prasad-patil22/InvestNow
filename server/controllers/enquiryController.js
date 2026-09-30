import nodemailer from "nodemailer";
import Enquiry from "../models/enquiryModel.js";

// @desc    Submit a new service request / enquiry
// @route   POST /api/enquiries
// @access  Public
export const createEnquiry = async (req, res) => {
  try {
    const { fullName, email, phone, service, message } = req.body;

    if (!fullName || !email || !phone || !message) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all required fields (Full Name, Email, Phone, Message)."
      });
    }

    const enquiry = await Enquiry.create({
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      service: service ? service.trim() : "General Enquiry",
      message: message.trim()
    });

    res.status(201).json({
      success: true,
      message: "Your enquiry has been submitted successfully! Our team will contact you shortly.",
      data: enquiry
    });
  } catch (error) {
    console.error("Error creating enquiry:", error);
    res.status(500).json({
      success: false,
      message: "Server error while submitting enquiry",
      error: error.message
    });
  }
};

// @desc    Get all guest enquiries / service requests
// @route   GET /api/enquiries
// @access  Private (Admin)
export const getEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: enquiries.length,
      data: enquiries
    });
  } catch (error) {
    console.error("Error fetching enquiries:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching enquiries",
      error: error.message
    });
  }
};

// @desc    Reply to a guest enquiry and send email via Nodemailer
// @route   POST /api/enquiries/:id/reply
// @access  Private (Admin)
export const replyEnquiry = async (req, res) => {
  try {
    const { id } = req.params;
    const { replyText } = req.body;

    if (!replyText || !replyText.trim()) {
      return res.status(400).json({
        success: false,
        message: "Please enter a reply message before sending."
      });
    }

    const enquiry = await Enquiry.findById(id);
    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: "Enquiry not found."
      });
    }

    // Nodemailer setup
    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS;

    if (!emailUser || !emailPass) {
      return res.status(500).json({
        success: false,
        message: "Email credentials (EMAIL_USER / EMAIL_PASS) missing in server .env"
      });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: emailUser,
        pass: emailPass
      }
    });

    const mailOptions = {
      from: `"INVESTNOW Financial Services" <${emailUser}>`,
      to: enquiry.email,
      subject: `RE: [INVESTNOW] Support Response regarding ${enquiry.service}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 25px; border: 1px solid #DCE8E1; border-radius: 12px; background-color: #ffffff;">
          <div style="text-align: center; border-bottom: 2px solid #073B2A; padding-bottom: 15px; margin-bottom: 20px;">
            <h2 style="color: #073B2A; margin: 0;">INVESTNOW Financial Services</h2>
            <span style="color: #D4AF37; font-size: 13px; font-weight: bold;">Your Trusted Partner in Wealth Growth & Protection</span>
          </div>

          <p style="font-size: 15px; color: #17231E;">Hello <strong>${enquiry.fullName}</strong>,</p>
          <p style="font-size: 14px; color: #5B6B63;">Thank you for reaching out to us regarding <strong>${enquiry.service}</strong>.</p>
          
          <div style="background-color: #F5F8F6; border-left: 4px solid #D4AF37; padding: 15px; margin: 20px 0; border-radius: 4px;">
            <p style="margin: 0; font-size: 13px; color: #718096;"><strong>Your Original Enquiry:</strong></p>
            <p style="margin: 5px 0 0 0; font-style: italic; color: #4a5568;">"${enquiry.message}"</p>
          </div>

          <div style="margin: 20px 0;">
            <p style="margin: 0; font-size: 14px; font-weight: bold; color: #073B2A;">Our Official Response:</p>
            <div style="font-size: 15px; color: #17231E; line-height: 1.6; margin-top: 8px; padding: 15px; background: #ffffff; border: 1px solid #E2E8F0; border-radius: 8px;">
              ${replyText.replace(/\n/g, "<br/>")}
            </div>
          </div>

          <p style="font-size: 14px; color: #5B6B63; margin-top: 25px;">If you have further questions, feel free to reply to this email or call our support team.</p>

          <div style="border-top: 1px solid #E2E8F0; margin-top: 30px; padding-top: 15px; font-size: 12px; color: #A0AEC0; text-align: center;">
            <p style="margin: 0;">INVESTNOW FINANCIAL SERVICES PRIVATE LIMITED</p>
            <p style="margin: 3px 0 0 0;">Kundapura, Karnataka | Website: www.investnow.com</p>
          </div>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);

    // Update DB
    enquiry.status = "Replied";
    enquiry.reply = replyText.trim();
    enquiry.repliedAt = new Date();
    await enquiry.save();

    res.status(200).json({
      success: true,
      message: `Reply sent successfully via email to ${enquiry.email}!`,
      data: enquiry
    });
  } catch (error) {
    console.error("Error replying to enquiry:", error);
    res.status(500).json({
      success: false,
      message: "Failed to send email reply to guest",
      error: error.message
    });
  }
};
