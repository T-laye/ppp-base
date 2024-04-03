import { prisma } from "../config/prisma.connect";

export function getPocProductLevel() {
    // when the customer uses a voucher in a poc, the available stock reduces
    // minus from the available stock
    // when the product gets to min limit
    // send email to admin ? (which of the admin? all admins or the admin and management tied to the poc)
    
}

export function getProductLevel() {
    // when ever a voucher uses a product per the poc
    // the product level reduces

}