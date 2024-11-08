#!/bin/bash

# PARAMETERS
SENDER="noreply@demosfelipetrindade.top"
RECIPIENT="felipelaptrin@gmail.com"
SUBJECT="Test Email from AWS SES"
BODY_HTML="<html><body><h1>Test Email</h1><p>This is an <strong>AWS SES</strong> test email!</p></body></html>"
AWS_REGION="us-east-1"

aws ses send-email \
    --region "$AWS_REGION" \
    --from "$SENDER" \
    --destination "ToAddresses=$RECIPIENT" \
    --message "Subject={Data=$SUBJECT,Charset=utf-8},Body={Html={Data=$BODY_HTML,Charset=utf-8}}"

if [ $? -eq 0 ]; then
    echo "Email sent successfully!"
else
    echo "Failed to send email."
fi
