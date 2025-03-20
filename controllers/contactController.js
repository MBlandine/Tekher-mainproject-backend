import Contact from "../models/contactModel.js";

export const createContact = async (req, res) => {
    try {
        const { names, email, subject, message, phone } = req.body;
        const newContact = new Contact({ names, email, subject, message, phone });

        await newContact.save();

        res.status(201).json({ success: true, message: "Contact created successfully" });
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
}



export const getAllcontact = async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.status(200).json({ success: true, contacts })
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
}



export const getContactById = async (req, res) => {
    try {
        const { Id } = req.params;
        const contacts = await Contact.findById(Id);
        if (!contacts) {
            return res.status(404).json({ success: false, message: "contact not found" });
        }
        res.status(200).json({ success: true, contacts });
    }
    catch (error) {
        res.status(500).json({ success: false, message: "server error", error: error.message });
    }
}



export const deleteContactById = async (req, res) => {
    try {
        const { Id } = req.params;
        const contact = await Contact.findByIdAndDelete(Id);
        if (!contact) {
            return res.status(404).json({ success: false, message: "contact not found" });
        }
        res.status(200).json({ success: true, message: " contact deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ success: false, meassage: "server error", error: error.message });
    }

}


export const updateDataById = async (req, res) => {
    try {
        const { Id } = req.params;
        const updateData = await Contact.findByIdAndUpdate( Id, req.body );
        if (!updateData) {
            return res.status(404).json({ success: false, message: "contact not found" });
        }
        res.status(200).json({ success: true, message: " contact Updated successfully" });
    }
    catch (error) {
        res.status(500).json({ success: false, meassage: "server error", error: error.message });
    }
}





// export const createContact = async (req, res) => {
//     try {
//       const { names, email, subject, message } = req.body;
  
//       // Create a new contact entry
//       const newContact = new Contact({ names, email, subject, message });
//       const savedContact = await newContact.save();
  
//       // Create HTML content for the email
//       const htmlContent = `
//         <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
//           <h2 style="color: #ea7b30;">Thank You for Contacting Us!</h2>
//           <p>Hi ${names},</p>
//           <p>Thank you for reaching out. We have received your message and will get back to you shortly.</p>
          
//           <p>Best Regards,<br>Future Focus Rwanda Team</p>
//         </div>
//       `;
  
//       // Send the email
//       const emailSent = await sendEmail(email, subject, htmlContent);
//       if (emailSent) {
//         console.log("Confirmation email sent to:", email);
//       }
  
//       res.status(201).json(savedContact);
//     } catch (error) {
//       console.error("Error creating contact:", error);
//       res.status(500).json({ error: "Failed to create contact" });
//     }
//   };