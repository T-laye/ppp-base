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

const VoucherApprovalNotification = ({ firstName, voucherCode }) => {
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
            }}
          >
            Dear {firstName[0].toUpperCase() + firstName.slice(1)},
          </Text>
          <Text style={paragraph}>
            Your voucher has been approved and you can proceed to pick up your
            product at any of our Point of Collection (POC). <br />
            VOUCHER CODE: {voucherCode} as generated by the system. <br />
            DO NOT SHARE THIS CODE WITH ANYONE TO AVOID THEFT OF YOUR PRODUCTS.
            <h3>PICK UP INSTRUCTIONS</h3>
            We have made pick up of products very seamless and stress-free at
            any of our Point of Collection (POC) nationwide. To enjoy our pick
            up experience, here are the following instructions to guide you.
            They are: <br />
            <h3>POINT OF COLLECTION, OUR PERSONNEL AND DATA COLLECTION</h3>
            <ol type="1">
              <li>
                All Point of Collection (POC) is manned by a professional,
                courteous and well trained customer support associate (CSA), so
                do well to contact them to request any assistance required to
                pick up your products successfully.
              </li>
              <br />
              <li>
                Point of Collection (POC) are businesses owned by our partners
                and not us, so you are advised to deal primarily with our
                Customer Support Associate (CSA) on ground and not their staff
                member.
              </li>
              <li>
                Point of Collection (POC) are independent businesses with
                different opening and closing times. To enjoy your pick up
                experience, endeavor to call the POC whenever you want to pick
                up a product.
              </li>
              <li>
                It is your right to be served with utmost professionalism and
                decorum, so kindly send us an email to CSU@PPP.COM.NG, whenever
                you are not satisfied with the performance of our personnel at
                the POC.
              </li>
              <li>
                As standard procedure, before pick up, we collect data such as
                name of pick up person (if third party), vehicle type and plate
                number, as all this information helps us maintain our records
                and will be sent to your email in your pick up notification.
              </li>
            </ol>
            <br />
            <br />
            <h3>THIRD PARTY PICK-UP</h3>
            <ol type="1">
              <li>
                To avoid theft, we advised you to handle your voucher with
                utmost confidentiality and secrecy.
              </li>
              <li>
                If you have to use a third party to pick up your product, then
                you must call the POC and give verbal authorization before
                sending the person, in order to avoid delays in pick up.
              </li>
              <li>
                When the person arrives and enters the voucher, the system will
                reveal the real owner and as a standard procedure, our customer
                support associate (CSA) will call you to secure another
                confirmation, just to be sure you haven&apos;t changed you mind
                as it is extremely difficult to retrieve products that have
                already be dispensed.
              </li>
              <li>
                After securing your confirmation, we will capture the
                person&apos;s and vehicle&apos;s data for our records.
              </li>
            </ol>
            <br />
            <br />
            <h3>PICK UP USING JERRY CANS</h3>
            <ol type="1">
              <li>
                We are 100% against black market activities thus completely
                discouraging the use of Jerry Cans to pick products – especially
                Petrol (PMS).
              </li>
              <li>
                The use of Jerry cans is permitted for picking up diesel and
                other products.
              </li>
              <li>
                For ease in pick up, you are allowed to pick up Petrol (PMS) in
                your vehicle and are allowed to use one unit of 50 liter jerry
                can ONLY, in the case that your vehicle couldn&apos;t take the
                entire product. This allows one unit of 50 liter of Jerry can to
                each vehicle owned.
              </li>
            </ol>
            <br />
            <br />
            <h3>POINT OF COLLECTION LOCATIONS</h3>
            <ol type="1">
              <li>
                Matrix Energy Petrol Station, Airport Road, beside Ecobank Plc,
                Warri, Delta State
              </li>
            </ol>
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

VoucherApprovalNotification.PreviewProps = {
  firstName: "Alan",
};

export default VoucherApprovalNotification;

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
