import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

# Parameters
smtp_server = "email-smtp.us-east-1.amazonaws.com"
smtp_port = 587
smtp_username = "YOUR_SMTP_USERNAME"
smtp_password = "YOUT_SMTP_PASSWORD"
sender = "noreply@demosfelipetrindade.top"
recipient = "felipelaptrin@gmail.com"
subject = "Test Email from SMTP"
message = """
Test SMTP Email
This is an AWS SES SMTP test email!
"""
body_html = f"<html><body><h1>Test SMTP Email</h1><p>{message}</p></body></html>"

msg = MIMEMultipart("alternative")
msg["Subject"] = subject
msg["From"] = sender
msg["To"] = recipient

part1 = MIMEText(message, "plain")
part2 = MIMEText(body_html, "html")

msg.attach(part1)
msg.attach(part2)

try:
    with smtplib.SMTP(smtp_server, smtp_port) as server:
        server.starttls()
        server.login(smtp_username, smtp_password)
        server.sendmail(sender, recipient, msg.as_string())
    print("Email sent successfully!")
except Exception as e:
    print(f"Failed to send email: {e}")
