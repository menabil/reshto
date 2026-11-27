/**
 * Zero-Backend Email Service via Web3Forms API
 * Sends direct notifications to restaurant inbox without needing a Node/Express backend.
 * https://web3forms.com
 */

const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

export async function sendEmailNotification({
  subject,
  from_name = "Biteon Restaurant Web",
  data = {},
}) {
  if (!WEB3FORMS_KEY) {
    return {
      success: false,
      message: "Email notifications are not configured. Please contact us by phone.",
    };
  }

  const payload = {
    access_key: WEB3FORMS_KEY,
    subject: subject || "New Notification from Biteon Restaurant",
    from_name,
    ...data,
  };

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();
    if (response.ok && result.success) {
      return { success: true, message: "Email notification sent successfully!" };
    }

    return {
      success: false,
      message: result.message || "The email could not be sent. Please try again.",
    };
  } catch {
    return {
      success: false,
      message: "The email service could not be reached. Please try again.",
    };
  }
}

export async function sendContactMessage({ name, email, phone, subject, message }) {
  return sendEmailNotification({
    subject: `📩 [Contact Inquiry] ${subject || "General Inquiry"} - from ${name}`,
    from_name: "Biteon Guest Inquiry",
    data: {
      name,
      email,
      phone: phone || "Not provided",
      inquiry_subject: subject,
      message,
    },
  });
}

export async function sendBookingNotification({
  id,
  guestName,
  email,
  phone,
  guests,
  date,
  time,
  seatingZone,
  table,
  occasion,
  decorationNotes,
}) {
  return sendEmailNotification({
    subject: `🏛️ [New Table Booking #${id}] ${guestName} (${guests} Guests - ${seatingZone})`,
    from_name: "Biteon Table Reservation Bot",
    data: {
      booking_id: id,
      guest_name: guestName,
      email: email || "Not provided",
      phone,
      party_size: `${guests} Guests`,
      schedule: `${date} at ${time}`,
      seating_zone: seatingZone,
      assigned_table: table,
      occasion,
      special_request: decorationNotes || "None",
    },
  });
}
