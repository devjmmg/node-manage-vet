import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD
    }
});

const sendConfirmationEmail =  async user => {
    
    const { name, email, token } = user;
    
    await transport.sendMail({
        from: '"APV - Administrador de Veterinaria" <no-reply@apv.com>',
        to: email,
        subject: "Confirma tu cuenta en APV",
        text: "Confirma tu cuenta en APV.",
        html: `
            <div style="max-width:600px;margin:0 auto;font-family:Arial,sans-serif;background:#ffffff;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;">
                
                <div style="background:#4f46e5;padding:24px;text-align:center;">
                    <h1 style="color:#ffffff;margin:0;">
                        APV
                    </h1>
                    <p style="color:#e0e7ff;margin-top:8px;">
                        Administrador de Veterinaria
                    </p>
                </div>
        
                <div style="padding:32px;">
                    <h2 style="color:#111827;">
                        ¡Hola ${name}!
                    </h2>
        
                    <p style="color:#4b5563;line-height:1.6;">
                        Gracias por crear una cuenta en <strong>APV</strong>.
                    </p>
        
                    <p style="color:#4b5563;line-height:1.6;">
                        Para activar tu cuenta, confirma tu correo electrónico haciendo clic en el siguiente botón.
                    </p>
        
                    <div style="text-align:center;margin:40px 0;">
                        <a
                            href="${process.env.FRONTEND_URL}/confirm-account/${token}"
                            style="background:#4f46e5;color:#ffffff;text-decoration:none;padding:14px 28px;border-radius:6px;font-weight:bold;display:inline-block;"
                        >
                            Confirmar cuenta
                        </a>
                    </div>
        
                    <p style="color:#6b7280;font-size:14px;">
                        Si el botón no funciona, copia y pega el siguiente enlace en tu navegador:
                    </p>
        
                    <p style="word-break:break-all;color:#4f46e5;font-size:14px;">
                        http://localhost:5173/confirm-account/${token}
                    </p>
        
                    <hr style="border:none;border-top:1px solid #e5e7eb;margin:32px 0;">
        
                    <p style="color:#9ca3af;font-size:13px;">
                        Si tú no creaste esta cuenta, puedes ignorar este correo.
                    </p>
                </div>
        
            </div>
        `
    });
    
}

const sendResetPasswordEmail =  async user => {
    
    const { name, email, token } = user;
    
    await transport.sendMail({
        from: '"APV - Administrador de Veterinaria" <no-reply@apv.com>',
        to: email,
        subject: "Restablecer tu contraseña",
        text: "Restablecer tu contraseña.",
        html: `
            <div style="max-width:600px;margin:0 auto;font-family:Arial,sans-serif;background:#ffffff;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;">

                <div style="background:#4f46e5;padding:24px;text-align:center;">
                    <h1 style="color:#ffffff;margin:0;">
                        APV
                    </h1>
                    <p style="color:#e0e7ff;margin-top:8px;">
                        Administrador de Veterinaria
                    </p>
                </div>

                <div style="padding:32px;">
                    <h2 style="color:#111827;">
                        ¡Hola ${name}!
                    </h2>

                    <p style="color:#4b5563;line-height:1.6;">
                        Recibimos una solicitud para restablecer la contraseña de tu cuenta en <strong>APV</strong>.
                    </p>

                    <p style="color:#4b5563;line-height:1.6;">
                        Haz clic en el siguiente botón para crear una nueva contraseña. Por motivos de seguridad, este enlace es válido por un tiempo limitado.
                    </p>

                    <div style="text-align:center;margin:40px 0;">
                        <a
                            href="${process.env.FRONTEND_URL}/reset-password/${token}"
                            style="background:#4f46e5;color:#ffffff;text-decoration:none;padding:14px 28px;border-radius:6px;font-weight:bold;display:inline-block;"
                        >
                            Restablecer contraseña
                        </a>
                    </div>

                    <p style="color:#6b7280;font-size:14px;">
                        Si el botón no funciona, copia y pega el siguiente enlace en tu navegador:
                    </p>

                    <p style="word-break:break-all;color:#4f46e5;font-size:14px;">
                        ${process.env.FRONTEND_URL}/reset-password/${token}
                    </p>

                    <hr style="border:none;border-top:1px solid #e5e7eb;margin:32px 0;">

                    <p style="color:#9ca3af;font-size:13px;line-height:1.6;">
                        Si no solicitaste restablecer tu contraseña, puedes ignorar este correo de forma segura. Tu contraseña permanecerá sin cambios.
                    </p>

                    <p style="color:#9ca3af;font-size:13px;">
                        Este mensaje fue enviado automáticamente. Por favor, no respondas a este correo.
                    </p>
                </div>

            </div>
        `
    });
    
}

export {
    sendConfirmationEmail,
    sendResetPasswordEmail
}