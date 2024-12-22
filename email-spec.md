### **Specification for Implementing Email Links for Contacting Legislators**

**Objective:**  
Create a simple, user-friendly webpage that allows users to email their legislators (Senator Janice Bowling and Representative Iris Rudder) opposing the "Education Freedom Act of 2025." The webpage should dynamically generate email links for Gmail, Outlook, Yahoo, AOL, and classic `mailto`, prefilled with the recipient’s email, subject, and body text.

---

### **Key Features:**

1. **Dynamic Email Links**  
   Provide prefilled email links for the following platforms:
   - Gmail
   - Outlook (Hotmail, Live Mail)
   - Yahoo Mail
   - AOL Mail
   - Classic Mailto

2. **Prefilled Fields**  
   Each link should prefill:
   - **Recipient’s Email Address:**  
     - Senator Janice Bowling: `janice.bowling@capitol.tn.gov`  
     - Representative Iris Rudder: `iris.rudder@capitol.tn.gov`  
   - **Email Subject:**  
     `"Oppose the Education Freedom Act of 2025"`  
   - **Email Body:**  
     ```
     Dear [Senator Bowling/Representative Rudder],

     I urge you to oppose the Education Freedom Act of 2025. This bill risks harming public schools, which serve all students, regardless of their background or needs. We must focus on fully funding and strengthening our public schools, not diverting resources to private institutions.

     Thank you for considering this important issue.

     Sincerely,  
     [Your Name]  
     [Your Address]
     ```

3. **URL Encoding**  
   Ensure all dynamic parameters are URL-encoded to handle spaces, line breaks, and special characters:
   - Space → `%20`  
   - Newline → `%0D%0A`  

4. **User Interface**  
   - Display each platform as a clickable button with clear labels:
     - "Email with Gmail"
     - "Email with Outlook"
     - "Email with Yahoo"
     - "Email with AOL"
     - "Email with Mailto"
   - Buttons should be visually distinct and easy to use.

5. **Form for User Input**  
   - Add optional fields for users to enter their name and address to personalize the email.  
   - Dynamically insert these details into the email body before generating the link.

6. **Fallback Option**  
   - Provide a section with copyable email addresses and a pre-written template for users without supported email clients.
   - Example format:  
     ```
     Email: janice.bowling@capitol.tn.gov  
     Subject: Oppose the Education Freedom Act of 2025  
     Body: [Pre-written template]
     ```

7. **Testing and Validation**  
   - Ensure links open correctly in each respective email platform.
   - Validate URL encoding for all dynamic parameters.

---

### **Implementation Details:**

#### **Email Links for Each Platform**
1. **Gmail:**  
   `https://mail.google.com/mail/?view=cm&fs=1&to=TO_EMAIL&su=SUBJECT&body=BODY`  

2. **Outlook:**  
   `https://outlook.live.com/owa/#subject=SUBJECT&body=BODY&to=TO_EMAIL&path=%2fmail%2faction%2fcompose`  

3. **Yahoo Mail:**  
   `http://compose.mail.yahoo.com/?to=TO_EMAIL&subj=SUBJECT&body=BODY`  

4. **AOL Mail:**  
   `http://mail.aol.com/mail/compose-message.aspx?to=TO_EMAIL&subject=SUBJECT&body=BODY`  

5. **Mailto:**  
   `mailto:TO_EMAIL?subject=SUBJECT&body=BODY`

#### **Dynamic Parameters**
- Replace placeholders (`TO_EMAIL`, `SUBJECT`, `BODY`) with:
  - **TO_EMAIL:** Legislator’s email address
  - **SUBJECT:** `"Oppose the Education Freedom Act of 2025"`
  - **BODY:** Personalized email body (include optional name and address if provided)

#### **Example Email Links**
- Gmail Example:  
  ```
  https://mail.google.com/mail/?view=cm&fs=1&to=janice.bowling@capitol.tn.gov&su=Oppose%20the%20Education%20Freedom%20Act%20of%202025&body=Dear%20Senator%20Bowling,%0D%0A%0D%0AI%20urge%20you%20to%20oppose%20the%20Education%20Freedom%20Act%20of%202025.%20This%20bill%20risks%20harming%20public%20schools.%0D%0A%0D%0ASincerely,%0D%0A[Your%20Name]%0D%0A[Your%20Address]
  ```

---

### **Deliverables**
- Functional webpage with email links for all platforms.
- Optional form for name and address input, with dynamic insertion into email body.
- Clear fallback option with email addresses and a copyable template.
- Tested and validated links for all platforms.

---

This specification provides all the necessary details for a streamlined implementation. Let me know if you need any clarifications!