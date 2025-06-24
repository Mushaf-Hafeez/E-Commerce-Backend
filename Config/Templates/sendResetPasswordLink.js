require("dotenv").config();

const sendForgotPasswordLink = (name, token) => {
  return `<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Password Reset Request</title>
    <style type="text/css">
        /* Client-specific styles */
        body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
        table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
        img { -ms-interpolation-mode: bicubic; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
        
        /* Reset styles */
        body { margin: 0 !important; padding: 0 !important; width: 100% !important; }
        
        /* iOS BLUE LINKS */
        a[x-apple-data-detectors] {
            color: inherit !important;
            text-decoration: none !important;
            font-size: inherit !important;
            font-family: inherit !important;
            font-weight: inherit !important;
            line-height: inherit !important;
        }
        
        /* Main styles */
        body {
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
            color: #333333;
            background-color: #ffffff;
        }
        
        .container {
            max-width: 600px;
            margin: 0 auto;
        }
        
        .header {
            background-color: #ffc107;
            padding: 30px 20px;
            text-align: center;
            color: #ffffff;
        }
        
        .content {
            background-color: #ffffff;
            padding: 30px 20px;
        }
        
        .footer {
            background-color: #ffffff;
            padding: 20px;
            text-align: center;
            font-size: 12px;
            color: #999999;
        }
        
        .button {
            background-color: #ffc107;
            color: #ffffff !important;
            display: inline-block;
            padding: 12px 25px;
            text-decoration: none;
            border-radius: 4px;
            font-weight: bold;
            margin: 20px 0;
        }
        
        .security-note {
            background-color: #ffffff;
            border-left: 4px solid #ffc107;
            padding: 12px 15px;
            font-size: 14px;
            margin: 20px 0;
        }
        
        h1 {
            color: #ffc107;
            font-size: 24px;
            margin-top: 0;
        }
        
        p {
            line-height: 1.6;
            margin-bottom: 20px;
        }
        
        .reset-link {
            word-break: break-all;
            color: #ffc107;
            text-decoration: none;
        }
        
        @media screen and (max-width: 480px) {
            .container {
                width: 100% !important;
            }
            .header, .content, .footer {
                padding-left: 15px !important;
                padding-right: 15px !important;
            }
        }
    </style>
</head>
<body>
    <!-- Main Container -->
    <table border="0" cellpadding="0" cellspacing="0" width="100%">
        <tr>
            <td align="center" valign="top">
                <table class="container" border="0" cellpadding="0" cellspacing="0" width="600">
                    <!-- Header -->
                    <tr>
                        <td class="header" align="center" valign="top">
                            <h1 style="color: #ffffff; margin-bottom: 0;">Password Reset Request</h1>
                        </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                        <td class="content" align="left" valign="top">
                            <p>Hello ${name},</p>
                            
                            <p>We received a request to reset your password for your E-Com account. If you didn't make this request, you can safely ignore this email.</p>
                            
                            <div align="center">
                                <a href="${
                                  process.env.FRONTEND_URL
                                }/reset-password/${token}" class="button">Reset Your Password</a>
                            </div>
                            
                            <p>Or copy and paste this link into your browser:</p>
                            <p><a href="${
                              process.env.FRONTEND_URL
                            }/${token}" class="reset-link">${
    process.env.FRONTEND_URL
  }/reset-password/${token}</a></p>
                            
                            <div class="security-note">
                                <strong>Security tip:</strong> This link will expire in 5 minutes. For your security, never share this link with anyone. Our support team will never ask for this information.
                            </div>
                            
                            <p>If you're having trouble with the button above, please contact our support team at <a href="mailto:${
                              process.env.MAIL_USER
                            }">${process.env.MAIL_USER}</a>.</p>
                            
                            <p>Thanks,<br/>
                            The E-Com Team</p>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td class="footer" align="center" valign="top">
                            <p>&copy; ${new Date().getFullYear()} E-Com. All rights reserved.</p>
                            <p>
                                E-Com<br />
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
`;
};

module.exports = sendForgotPasswordLink;
