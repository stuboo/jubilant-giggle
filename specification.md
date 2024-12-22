Project Overview:
This is a web application designed to facilitate citizen engagement with legislators regarding a specific bill (Tennessee Senate Bill 0001). The application allows users to easily contact their representatives through various means: email, phone calls, and printed letters.

Key Components and Functionality:

1. User Information Form:

1. Collects user's contact information (name, email, address, city, state, ZIP code).
2. Information is stored temporarily in the browser's localStorage for the duration of the session.
3. The form must be completed before users can access other features.



2. Action Cards:

1. Three main actions are presented: Send Emails, Make Phone Calls, and Print Letters.
2. These cards are initially grayed out and disabled until the user completes the information form.



3. Email Functionality:

1. Allows users to send pre-filled emails to two legislators: Representative Iris Rudder and Senator Janice Bowling.
2. Email templates are populated with the user's information and customizable content.



4. Phone Call Script:

1. Provides users with a script for phone calls to both legislators.
2. Scripts are personalized with the user's name and city.



5. Printable Letters:

1. Generates printable letters addressed to both legislators.
2. Letters are pre-filled with the user's information and customizable content.





Backend Requirements:

1. User Data Handling:

1. The backend should NOT store any user information persistently. All data is meant to be temporary and session-based.
2. Implement appropriate security measures to handle sensitive user data during the session.



2. Email Sending Functionality:

1. Develop an API endpoint to handle email sending.
2. The endpoint should accept the email content and recipient details.
3. Implement email sending logic, potentially using a service like SendGrid or AWS SES.
4. Ensure proper error handling and response codes.



3. Legislator Information:

1. Store and provide legislator contact information (names, addresses, phone numbers).
2. This could be a simple database or configuration file that the frontend can query.



4. PDF Generation (Optional):

1. If server-side PDF generation is preferred over client-side, implement an endpoint that generates PDF letters based on the provided content.



5. Analytics (Optional):

1. If desired, implement endpoints to track usage statistics (e.g., number of emails sent, calls made, letters generated).



6. Security Considerations:

1. Implement rate limiting to prevent abuse of the email sending functionality.
2. Use HTTPS for all communications.
3. Validate and sanitize all user inputs to prevent injection attacks.



7. Environment Variables:

1. The backend should use environment variables for sensitive information like API keys, database credentials, etc.





API Endpoints to Implement:

1. POST /api/send-email

1. Accepts email content and recipient details.
2. Sends emails to legislators.



2. GET /api/legislator-info

1. Returns contact information for the legislators.



3. POST /api/generate-pdf (if implementing server-side PDF generation)

1. Accepts letter content and generates a PDF.



4. POST /api/log-action (if implementing analytics)

1. Logs user actions (email sent, call made, letter generated).





The backend should be designed to support the frontend's functionality while maintaining user privacy and data security. It should be scalable to handle potential high traffic and robust enough to prevent misuse.