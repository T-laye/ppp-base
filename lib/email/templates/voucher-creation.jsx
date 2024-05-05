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

const VoucherCreationEmail = ({ firstName }) => {
  return (
    <Html>
      <Head />
      <Preview>Petroleum Personnel Privilege (PPP) Notification</Preview>
      <Body style={main}>
        <Container style={container}>
          <img
            src={`logo-removebg.png`}
            width="170"
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
            Dear {firstName},
          </Text>
          <Text style={paragraph}>
            This mail is to notify you that the deposit for your voucher was
            received and processed successfully.
            <br />
            Going forward, a{" "}
            <span style={{ fontWeight: "bold" }}>
              REQUEST FOR DISCOUNT APPROVAL (RFDA)
            </span>{" "}
            has been raised on your behalf and you will be notified once your
            approval is issued which may take between one(1) to ten (10) days.
            <br />
            We advise patience and wish you all the best.
          </Text>
          <Text style={paragraph}>
            Best Regards,
            <br />
            Team POC, <br />
            Petroleum Personnel Privilege (PPP)
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

VoucherCreationEmail.PreviewProps = {
  firstName: "Alan",
};

export default VoucherCreationEmail;

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
