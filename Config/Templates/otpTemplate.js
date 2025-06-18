const otpTemplate = (otp) => {
  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>OTP Verification Email</title>
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
            background-color: #f7f7f7;
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

        .header h1 {
        color: #ffffff}
        
        .content {
            background-color: #ffffff;
            padding: 30px 20px;
        }
        
        .footer {
            background-color: #f1f1f1;
            padding: 20px;
            text-align: center;
            font-size: 12px;
            color: #999999;
        }
        
        .otp-box {
            background-color: #f5f5f5;
            border: 2px dashed #ffc107;
            padding: 15px;
            text-align: center;
            font-size: 28px;
            font-weight: bold;
            letter-spacing: 5px;
            color: #ffc107;
            margin: 20px 0;
            border-radius: 5px;
        }
        
        .note {
            background-color: #fff8e1;
            border-left: 4px solid #ffc107;
            padding: 10px 15px;
            font-size: 14px;
            margin: 20px 0;
        }
        
        h1 {
            color: #4a90e2;
            font-size: 24px;
            margin-top: 0;
        }
        
        p {
            line-height: 1.6;
            margin-bottom: 20px;
        }
        
        @media screen and (max-width: 480px) {
            .container {
                width: 100% !important;
            }
            .header, .content, .footer {
                padding-left: 15px !important;
                padding-right: 15px !important;
            }
            .otp-box {
                font-size: 22px;
                padding: 10px;
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
                            <h1>OTP Verification</h1>
                        </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                        <td class="content" align="left" valign="top">
                            <p>Dear User,</p>
                            
                            <p>Your One-Time Password (OTP) for verification is:</p>
                            
                            <div class="otp-box">
                                <!-- Replace 123456 with your dynamic OTP value -->
                                ${otp}
                            </div>
                            
                            <div class="note">
                                <strong>Note:</strong> This OTP is valid for 5 minutes only. Do not share this OTP with anyone for security reasons.
                            </div>
                            
                            <p>If you didn't request this OTP, please ignore this email or contact our support team immediately.</p>
                            
                            <p>Thank you,<br/>Team E-Com</p>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td class="footer" align="center" valign="top">
                            <p>&copy; 2023 Example Company. All rights reserved.</p>
                            <p>
                                <a href="https://example.com/privacy">Privacy Policy</a> | 
                                <a href="https://example.com/terms">Terms of Service</a> | 
                                <a href="https://example.com/unsubscribe">Unsubscribe</a>
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`;
};

module.exports = otpTemplate;
