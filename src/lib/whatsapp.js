// Only builds encoded wa.me URLs. Never calls window.open.
// Components must render the result inside a real <a href> tag
// so Safari treats it as a direct user gesture.

const DEFAULT_NUMBER = "918983294206";

export const buildWhatsAppUrl = (message, number = DEFAULT_NUMBER) => {
  const digitsOnly = String(number).replace(/[^0-9]/g, "");
  return `https://wa.me/${digitsOnly}?text=${encodeURIComponent(message)}`;
};

export const buildEnrollmentMessage = ({ name, phone, email }) =>
  `Hello FOA Mini Importation, I have made the ₦15,000 Tutorial enrollment payment.\n\nName: ${name}\nPhone: ${phone}\nEmail: ${email}\n\nI'm attaching my payment receipt in this chat now.`;

export const buildMembershipMessage = ({ name, phone, email }) =>
  `Hello FOA Mini Importation, I have made the ₦5,000 Membership payment.\n\nName: ${name}\nPhone: ${phone}\nEmail: ${email}\n\nI'm attaching my payment receipt in this chat now.`;

export const buildOrderMessage = ({ order, name, phone }) => {
  const lines = order.items
    .map((item) => `- ${item.name}${item.size ? ` (Size ${item.size})` : ""} x${item.qty} — ₦${(item.price * item.qty).toLocaleString()}`)
    .join("\n");

  return `Hello FOA Mini Importation, I have made payment for my order.\n\nOrder ID: ${order._id}\nName: ${name}\nPhone: ${phone}\n\nItems:\n${lines}\n\nSubtotal: ₦${order.subtotal.toLocaleString()}\nDelivery: ₦${order.deliveryFee.toLocaleString()}\nTotal: ₦${order.total.toLocaleString()}\n\nDelivery address: ${order.address.street}, ${order.address.city}, ${order.address.state}\n\nI'm attaching my payment receipt in this chat now.`;
};
