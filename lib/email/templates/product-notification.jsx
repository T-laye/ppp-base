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

export const ProductNotificationEmail = ({
  name,
  stockLimit,
  productAvailable,
  product,
  poc,
  address
}) => (
  <Html>
    <Head />
    <Preview>Product Notification Updates</Preview>
    <Body style={main}>
      <Container style={container}>
        <Text style={paragraph}>Hi {name},</Text>
        <Text style={paragraph}>
          The {product} product at has reached it's stock limit{stockLimit}, the
          product availability is {productAvailable} for this following poc:{" "}
          {poc} located at {address}.
        </Text>
        <Text style={paragraph}>
          Best,
          <br />
          PPP Team
        </Text>
        <Hr style={hr} />
        <Text style={footer}>
          courtesy, petroleum personal privilege support team
        </Text>
      </Container>
    </Body>
  </Html>
);

ProductNotificationEmail.PreviewProps = {
  name: "Alan",
};

export default ProductNotificationEmail;

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
  textTransform: "capitalize",
};

const btnContainer = {
  textAlign: "center",
};

const button = {
  backgroundColor: "#5F51E8",
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
};
