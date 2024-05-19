import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

const CustomerWelcomeEmail = ({ firstName, token }) => {
  return (
    <Html>
      <Head />
      <Preview>Petroleum Personnel Privilege (PPP) Onboard Email</Preview>
      <Body style={main}>
        <Container style={container}>
          <img
            src={`https://ppp-base.vercel.app/_next/image?url=%2Fimages%2Flogo-removebg.png&w=256&q=75`}
            width="50"
            height="50"
            alt="ppp-base logo"
            style={logo}
          />
          <Text
            style={{
              fontSize: "16px",
              lineHeight: "26px",
              fontWeight: " 500",
              textTransform: "capitalize",
            }}
          >
            Congratulations {firstName},
          </Text>
          <Text style={paragraph}>
            We sincerely hope this mail meets you well. Your pre-enrolment form
            was received, reviewed and you have been recommended for immediate
            enlisting in the Petroleum Personnel Privilege (PPP) system.
            Congratulations, once again. With this mail, we hereby acknowledge
            your genuine interest in joining our exclusive community whose
            membership guarantees you access to the essential products offered
            through the PPP system at highly discounted prices. Therefore,
            kindly see this mail as an official “ACCEPTANCE LETTER” requiring
            your full consent to validate your willingness to join the PPP
            community. We enjoin you to carefully read through the guidelines of
            the PPP system, make effort to understand each one, so you can make
            the most of your membership. Learn more about the guidelines of the
            PPP system, here. Now, you can accept this offer of membership which
            expressly communicates that you agree to follow the guidelines as
            presented above.
            <br />
            <br />
            Click on the button below to verify your profile.
          </Text>
          <Section style={btnContainer}>
            <Button
              style={button}
              href={`https://ppp-base.com.ng/verification/${token}`}
            >
              verify my profile
            </Button>
          </Section>
          <br />
          <h2
            style={{
              color: "#333",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <a href="https://myita.com.ng/welcome">Terms and Conditions</a>
          </h2>
          <br />
          <Text style={paragraph}>
            Once again, congratulations!
            <br />
            Onboard Team, Petroleum Personnel Privilege (PPP)
          </Text>
          <Hr style={hr} />
          <Text style={footer}>
            MYITA Farmers Multipurpose Cooperative Society Limited This message
            and any files transmitted with it &quot;email is intended only
            for the use of the person(s) to whom it is addressed Intended
            Recipient. The email may contain information which is privileged,
            confidential or protected by other intellectual property rights. If
            you are not the Intended Recipient you should notify the sender
            immediately and delete the email from your system, any use,
            disclosure, dissemination, forwarding, printing or copying is
            prohibited and will be considered a legal infringement. Any views or
            opinions presented in the email are solely those of the individual
            sender and do not necessarily represent those of MYITA Farmers MPCS.
            No contracts can be concluded via email. Emails cannot be guaranteed
            to be secure or error-free as information could be intercepted,
            corrupted, lost, destroyed, arrive late or incomplete, or contain
            viruses. MYITA Farmers MPCS therefore does not accept liability for
            any errors, omissions or viruses in the email and the recipient is
            responsible for checking each email for viruses.
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

CustomerWelcomeEmail.PreviewProps = {
  firstName: "Alan",
};

export default CustomerWelcomeEmail;

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
};

const logo = {
  margin: "0 auto",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
  textAlign: "justify",
};

const btnContainer = {
  textAlign: "center",
};

const button = {
  backgroundColor: "#008000",
  borderRadius: "3px",
  color: "#fff",
  fontSize: "16px",
  textDecoration: "none",
  textAlign: "center",
  display: "block",
  padding: "12px",
};

const hr = {
  borderColor: "#cccccc",
  margin: "20px 0",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
  display: "flex",
  justifyContent: "center",
};
