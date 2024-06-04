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
      <Preview>YOUR RFDA HAS BEEN PROCESSED</Preview>
      <Body style={main}>
        <Container style={container}>
          <img
            src={`http://ppp.com.ng/_next/image?url=%2Fimages%2Flogo-removebg.png&w=256&q=75`}
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
            Dear {firstName},
          </Text>
          <Text style={paragraph}>
            This mail is to notify you that the deposit for your voucher was
            received and processed successfully.
            <br />
            <br />
            Going forward, a{" "}
            <span style={{ fontWeight: "bold" }}>
              REQUEST FOR DISCOUNT APPROVAL (RFDA)
            </span>{" "}
            has been raised on your behalf and you will be notified once your
            approval is issued which may take between one(1) to ten (10) days.
            <br />
            <br />
            We advise patience and wish you all the best.
          </Text>
          Best Regards,
          <Text
            style={{ ...paragraph, fontWeight: "500", fontStyle: "italic;" }}
          >
            <br />
            Team POC, <br />
            Petroleum Personnel Privilege (PPP) <br />
            MYITA FARMER MPCS, Delta State, Nigeria
          </Text>
          <Hr style={hr} />
          <Text style={footer}>
            MYITA Farmers Multipurpose Cooperative Society Limited This message
            and any files transmitted with it email is intended only for the use
            of the person(s) to whom it is addressed Intended Recipient. The
            email may contain information which is privileged, confidential or
            protected by other intellectual property rights. If you are not the
            Intended Recipient you should notify the sender immediately and
            delete the email from your system, any use, disclosure,
            dissemination, forwarding, printing or copying is prohibited and
            will be considered a legal infringement. Any views or opinions
            presented in the email are solely those of the individual sender and
            do not necessarily represent those of MYITA Farmers MPCS. No
            contracts can be concluded via email. Emails cannot be guaranteed to
            be secure or error-free as information could be intercepted,
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
