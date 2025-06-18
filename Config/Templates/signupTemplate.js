const signupTemplate = (name, date) => {
  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Welcome!</title>
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
            background-color: #4CAF50;
            padding: 40px 20px;
            text-align: center;
            color: #ffffff;
        }
        
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
        
        .button {
            background-color: #4CAF50;
            color: #ffffff !important;
            display: inline-block;
            padding: 12px 25px;
            text-decoration: none;
            border-radius: 4px;
            font-weight: bold;
            margin: 15px 0;
        }
        
        .confetti-icon {
            font-size: 48px;
            color: #FFD700;
            margin-bottom: 15px;
        }
        
        h1 {
            color: #4CAF50;
            font-size: 28px;
            margin-top: 0;
        }
        
        p {
            line-height: 1.6;
            margin-bottom: 20px;
        }
        
        .features {
            margin: 25px 0;
        }
        
        .feature-item {
            margin-bottom: 15px;
            padding-left: 25px;
            position: relative;
        }
        
        .feature-item:before {
            content: "✓";
            color: #4CAF50;
            position: absolute;
            left: 0;
            font-weight: bold;
        }
        
        @media screen and (max-width: 480px) {
            .container {
                width: 100% !important;
            }
            .header, .content, .footer {
                padding-left: 15px !important;
                padding-right: 15px !important;
            }
            .header {
                padding: 30px 15px;
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
                            <div class="confetti-icon">🎉</div>
                            <h1 style="color: #ffffff; margin-bottom: 10px;">Welcome to [Your Service]!</h1>
                            <p style="color: #e8f5e9; margin-bottom: 0;">Your account has been successfully created</p>
                        </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                        <td class="content" align="left" valign="top">
                            <p>Dear ${name},</p>
                            
                            <p>Congratulations and welcome! We're thrilled to have you as part of our community.</p>
                            
                            <p>Your account is now ready to use. Here's what you can do next:</p>
                            
                            <div class="features">
                                <div class="feature-item">Complete your profile to personalize your experience</div>
                                <div class="feature-item">Explore our features and services</div>
                                <div class="feature-item">Connect with other community members</div>
                                <div class="feature-item">Start achieving your goals with our platform</div>
                            </div>
                            
                            <div align="center">
                                <a href="[Dashboard URL]" class="button">Go to Your Dashboard</a>
                            </div>
                            
                            <p>If you have any questions or need assistance, don't hesitate to contact our support team at <a href="mailto:support@example.com">support@example.com</a>.</p>
                            
                            <p>Once again, welcome aboard!</p>
                            
                            <p>Best regards,<br/>
                            The E-Com Team</p>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td class="footer" align="center" valign="top">
                            <p>&copy; 2023 [Your Company]. All rights reserved.</p>
                            <p>
                                <a href="[Privacy Policy URL]">Privacy Policy</a> | 
                                <a href="[Terms of Service URL]">Terms of Service</a> | 
                                <a href="[Unsubscribe URL]">Unsubscribe</a>
                            </p>
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
</html>`;
};

module.exports = signupTemplate;
