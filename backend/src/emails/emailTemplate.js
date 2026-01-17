export function createWelcomeEmailTemplate(name, clienturl) {
    return `
    <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome Email</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f7;
      color: #333333;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 40px auto;
      background-color: #ffffff;
      padding: 30px;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0,0,0,0.1);
    }
    .header {
      text-align: center;
      padding-bottom: 20px;
    }
    .header h1 {
      color: #4CAF50;
      margin: 0;
    }
    .content {
      line-height: 1.6;
      font-size: 16px;
    }
    .button {
      display: inline-block;
      padding: 12px 25px;
      margin-top: 20px;
      background-color: #4CAF50;
      color: white;
      text-decoration: none;
      border-radius: 5px;
      font-weight: bold;
    }
    .footer {
      text-align: center;
      margin-top: 30px;
      font-size: 12px;
      color: #777777;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Welcome to Chatify-App!</h1>
    </div>
    <div class="content">
      <p>Hi dear ${name}</p>
      <p>Thank you for signing up for <strong>Chatify-App</strong>! We're excited to have you on board.</p>
      <p>Explore our features, connect with the community, and enjoy all the benefits our platform offers.</p>
      <a href= "${clienturl}" class="button">Get Started</a>
      <p>If you have any questions or need help, feel free to reply to this email. We're always happy to assist!</p>
      <p>Cheers,<br>The Chatify-App Team</p>
    </div>
    <div class="footer">
      <p>&copy; 2026 Chatify-App. All rights reserved.</p>
    </div>
  </div>
</body>
</html>

    `;
}