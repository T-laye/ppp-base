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
            N/B: this is an automated email, thus cannot send or receive replies
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
