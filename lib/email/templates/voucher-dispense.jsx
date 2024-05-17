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

const VoucherDispenseNotification = ({
  firstName,
  pocName,
  pickUpName,
  vehicleType,
  vehicleNumber,
  timeStamp,
}) => {
  return (
    <Html>
      <Head />
      <Preview>Petroleum Personnel Privilege (PPP) Notification</Preview>
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
            Dear {firstName},
          </Text>
          <Text style={paragraph}>
            Your voucher has been used and product collected at our {pocName}{" "}
            Point of Collection (POC).
            <br /> Here are the details of the transaction: <br />
            Name of Pick up person: {pickUpName}
            <br />
            Vehicle Type: {vehicleType}
            <br />
            Vehicle Number: {vehicleNumber}
            <br />
            Time/Date: {timeStamp} <br /> <br />
            We trust your pick-up experience was seamless and stress free. Feel
            free to let us know if you have any complaints or suggestions for
            improvement. Send us an email to{" "}
            <a href="mailto:csu@ppp.com.ng">csu@ppp.com.ng</a>. Many thanks from
            the entire PPP community!
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

VoucherDispenseNotification.PreviewProps = {
  firstName: "Alan",
};

export default VoucherDispenseNotification;

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
