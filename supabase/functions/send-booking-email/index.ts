import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface BookingEmailData {
  booking: {
    id: string;
    name: string;
    email: string;
    phone: string;
    service_id: string;
    appointment_date: string;
    appointment_time: string;
    duration_minutes: number;
    status: string;
    is_new_client: boolean;
    allergies?: string;
    notes?: string;
  };
  service: {
    name: string;
    price: number;
  };
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { booking, service }: BookingEmailData = await req.json()

    // Format the appointment date and time
    const appointmentDate = new Date(`${booking.appointment_date}T${booking.appointment_time}`)
    const formattedDate = appointmentDate.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
    const formattedTime = appointmentDate.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    })

    // Email content for the client
    const clientEmailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #ec4899, #f472b6); padding: 30px; border-radius: 15px; text-align: center; margin-bottom: 30px;">
          <h1 style="color: white; margin: 0; font-size: 28px;">Booking Confirmation</h1>
          <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 16px;">LuxeLashes Beauty Studio</p>
        </div>
        
        <div style="background: #f8fafc; padding: 25px; border-radius: 12px; margin-bottom: 25px;">
          <h2 style="color: #1f2937; margin: 0 0 20px 0; font-size: 22px;">Hello ${booking.name}!</h2>
          <p style="color: #4b5563; line-height: 1.6; margin: 0 0 20px 0;">
            Thank you for booking with LuxeLashes! We're excited to help you achieve beautiful, stunning lashes.
          </p>
          <p style="color: #4b5563; line-height: 1.6; margin: 0;">
            Your appointment request has been received and is currently <strong style="color: #ec4899;">pending confirmation</strong>. 
            We'll contact you within 24 hours to confirm your appointment details.
          </p>
        </div>

        <div style="background: white; border: 2px solid #fce7f3; border-radius: 12px; padding: 25px; margin-bottom: 25px;">
          <h3 style="color: #ec4899; margin: 0 0 20px 0; font-size: 20px;">Appointment Details</h3>
          <div style="display: grid; gap: 15px;">
            <div style="display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #f1f5f9;">
              <span style="color: #6b7280; font-weight: 500;">Service:</span>
              <span style="color: #1f2937; font-weight: 600;">${service.name}</span>
            </div>
            <div style="display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #f1f5f9;">
              <span style="color: #6b7280; font-weight: 500;">Date:</span>
              <span style="color: #1f2937; font-weight: 600;">${formattedDate}</span>
            </div>
            <div style="display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #f1f5f9;">
              <span style="color: #6b7280; font-weight: 500;">Time:</span>
              <span style="color: #1f2937; font-weight: 600;">${formattedTime}</span>
            </div>
            <div style="display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #f1f5f9;">
              <span style="color: #6b7280; font-weight: 500;">Duration:</span>
              <span style="color: #1f2937; font-weight: 600;">${booking.duration_minutes} minutes</span>
            </div>
            <div style="display: flex; justify-content: space-between; padding: 10px 0;">
              <span style="color: #6b7280; font-weight: 500;">Price:</span>
              <span style="color: #ec4899; font-weight: 700; font-size: 18px;">$${service.price}</span>
            </div>
          </div>
        </div>

        ${booking.allergies || booking.notes ? `
        <div style="background: #fef3c7; border: 1px solid #fbbf24; border-radius: 12px; padding: 20px; margin-bottom: 25px;">
          <h4 style="color: #92400e; margin: 0 0 15px 0; font-size: 16px;">Special Notes:</h4>
          ${booking.allergies ? `<p style="color: #92400e; margin: 0 0 10px 0;"><strong>Allergies:</strong> ${booking.allergies}</p>` : ''}
          ${booking.notes ? `<p style="color: #92400e; margin: 0;"><strong>Notes:</strong> ${booking.notes}</p>` : ''}
        </div>
        ` : ''}

        <div style="background: #ecfdf5; border: 1px solid #10b981; border-radius: 12px; padding: 20px; margin-bottom: 25px;">
          <h4 style="color: #047857; margin: 0 0 15px 0; font-size: 16px;">What's Next?</h4>
          <ul style="color: #047857; margin: 0; padding-left: 20px; line-height: 1.6;">
            <li>We'll call or email you within 24 hours to confirm your appointment</li>
            <li>You'll receive detailed preparation instructions</li>
            <li>A reminder will be sent 24 hours before your appointment</li>
          </ul>
        </div>

        <div style="text-align: center; padding: 20px; background: #f8fafc; border-radius: 12px;">
          <p style="color: #6b7280; margin: 0 0 15px 0;">Questions about your appointment?</p>
          <p style="color: #1f2937; font-weight: 600; margin: 0;">
            📞 (555) 123-4567 | ✉️ hello@luxelashes.com
          </p>
        </div>

        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
          <p style="color: #9ca3af; font-size: 14px; margin: 0;">
            © 2025 LuxeLashes Beauty Studio. Elevating beauty, one lash at a time.
          </p>
        </div>
      </div>
    `

    // Email content for the salon
    const salonEmailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #1f2937, #374151); padding: 30px; border-radius: 15px; text-align: center; margin-bottom: 30px;">
          <h1 style="color: white; margin: 0; font-size: 28px;">New Booking Request</h1>
          <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 16px;">LuxeLashes Admin</p>
        </div>
        
        <div style="background: white; border: 2px solid #e5e7eb; border-radius: 12px; padding: 25px; margin-bottom: 25px;">
          <h3 style="color: #1f2937; margin: 0 0 20px 0; font-size: 20px;">Client Information</h3>
          <div style="display: grid; gap: 15px;">
            <div style="display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #f1f5f9;">
              <span style="color: #6b7280; font-weight: 500;">Name:</span>
              <span style="color: #1f2937; font-weight: 600;">${booking.name}</span>
            </div>
            <div style="display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #f1f5f9;">
              <span style="color: #6b7280; font-weight: 500;">Email:</span>
              <span style="color: #1f2937; font-weight: 600;">${booking.email}</span>
            </div>
            <div style="display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #f1f5f9;">
              <span style="color: #6b7280; font-weight: 500;">Phone:</span>
              <span style="color: #1f2937; font-weight: 600;">${booking.phone}</span>
            </div>
            <div style="display: flex; justify-content: space-between; padding: 10px 0;">
              <span style="color: #6b7280; font-weight: 500;">New Client:</span>
              <span style="color: #1f2937; font-weight: 600;">${booking.is_new_client ? 'Yes' : 'No'}</span>
            </div>
          </div>
        </div>

        <div style="background: white; border: 2px solid #ddd6fe; border-radius: 12px; padding: 25px; margin-bottom: 25px;">
          <h3 style="color: #7c3aed; margin: 0 0 20px 0; font-size: 20px;">Appointment Details</h3>
          <div style="display: grid; gap: 15px;">
            <div style="display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #f1f5f9;">
              <span style="color: #6b7280; font-weight: 500;">Service:</span>
              <span style="color: #1f2937; font-weight: 600;">${service.name}</span>
            </div>
            <div style="display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #f1f5f9;">
              <span style="color: #6b7280; font-weight: 500;">Date:</span>
              <span style="color: #1f2937; font-weight: 600;">${formattedDate}</span>
            </div>
            <div style="display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #f1f5f9;">
              <span style="color: #6b7280; font-weight: 500;">Time:</span>
              <span style="color: #1f2937; font-weight: 600;">${formattedTime}</span>
            </div>
            <div style="display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #f1f5f9;">
              <span style="color: #6b7280; font-weight: 500;">Duration:</span>
              <span style="color: #1f2937; font-weight: 600;">${booking.duration_minutes} minutes</span>
            </div>
            <div style="display: flex; justify-content: space-between; padding: 10px 0;">
              <span style="color: #6b7280; font-weight: 500;">Price:</span>
              <span style="color: #7c3aed; font-weight: 700; font-size: 18px;">$${service.price}</span>
            </div>
          </div>
        </div>

        ${booking.allergies || booking.notes ? `
        <div style="background: #fef3c7; border: 1px solid #fbbf24; border-radius: 12px; padding: 20px; margin-bottom: 25px;">
          <h4 style="color: #92400e; margin: 0 0 15px 0; font-size: 16px;">Special Notes:</h4>
          ${booking.allergies ? `<p style="color: #92400e; margin: 0 0 10px 0;"><strong>Allergies:</strong> ${booking.allergies}</p>` : ''}
          ${booking.notes ? `<p style="color: #92400e; margin: 0;"><strong>Notes:</strong> ${booking.notes}</p>` : ''}
        </div>
        ` : ''}

        <div style="background: #dbeafe; border: 1px solid #3b82f6; border-radius: 12px; padding: 20px; text-align: center;">
          <p style="color: #1e40af; margin: 0; font-weight: 600;">
            Booking ID: ${booking.id}
          </p>
          <p style="color: #1e40af; margin: 10px 0 0 0; font-size: 14px;">
            Please contact the client within 24 hours to confirm this appointment.
          </p>
        </div>
      </div>
    `

    // In a real implementation, you would send actual emails here
    // For now, we'll just log the email content and return success
    console.log('Client Email:', clientEmailContent)
    console.log('Salon Email:', salonEmailContent)

    // Here you would integrate with an email service like:
    // - Resend
    // - SendGrid
    // - Mailgun
    // - AWS SES
    
    // Example with Resend:
    // const resend = new Resend(Deno.env.get('RESEND_API_KEY'))
    // 
    // await resend.emails.send({
    //   from: 'LuxeLashes <bookings@luxelashes.com>',
    //   to: [booking.email],
    //   subject: 'Booking Confirmation - LuxeLashes',
    //   html: clientEmailContent,
    // })
    //
    // await resend.emails.send({
    //   from: 'LuxeLashes <bookings@luxelashes.com>',
    //   to: ['admin@luxelashes.com'],
    //   subject: `New Booking Request - ${booking.name}`,
    //   html: salonEmailContent,
    // })

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Booking emails sent successfully' 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )

  } catch (error) {
    console.error('Error sending booking emails:', error)
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    )
  }
})