import { siteConfig } from "@/constants/site";

/**
 * Generate a prefilled WhatsApp order message and direct wa.me link
 */
export function generateWhatsAppOrderUrl({
  items = [],
  customer = "Guest Customer",
  phone = "",
  address = "",
  orderType = "Delivery",
  notes = "",
  subtotal = "$0.00",
  discount = "$0.00",
  coupon = null,
  deliveryFee = "$0.00",
  tax = "$0.00",
  total = "$0.00",
  orderId = "",
  date = "",
}) {
  const cleanPhone = (siteConfig.contact.phone || "+1 415-555-1234").replace(/[^\d]/g, "");

  const lines = [
    `🍽️ *NEW ORDER - RESHTO RESTAURANT*`,
    date ? `📅 ${date}` : null,
    orderId ? `🔖 *Order ID:* ${orderId}` : null,
    `----------------------------------------`,
    `👤 *Customer:* ${customer}`,
    phone ? `📞 *Phone:* ${phone}` : null,
    `🛵 *Type:* ${orderType}`,
    address ? `📍 *Address:* ${address}` : null,
    `----------------------------------------`,
    `📋 *ORDERED DISHES:*`,
    ...items.map(
      (item) => `• ${item.name || item.menuItemName} x${item.qty || item.quantity} (${item.price || item.menuItemPrice})`
    ),
    `----------------------------------------`,
    `💵 *Subtotal:* ${typeof subtotal === "number" ? `$${subtotal.toFixed(2)}` : subtotal}`,
    discount && discount !== "$0.00" && discount !== "0"
      ? `🏷️ *Discount${coupon ? ` (${coupon})` : ""}:* ${discount}`
      : null,
    deliveryFee && deliveryFee !== "$0.00"
      ? `🛵 *Delivery Fee:* ${deliveryFee}`
      : `🛵 *Delivery:* FREE`,
    tax && tax !== "$0.00" ? `🧾 *Tax:* ${tax}` : null,
    `💰 *GRAND TOTAL:* ${typeof total === "number" ? `$${total.toFixed(2)}` : total}`,
    notes ? `\n📝 *Special Cooking Note:* ${notes}` : null,
    `----------------------------------------`,
    `Please confirm my order. Thank you! 🙏`,
  ].filter(Boolean);

  const messageText = lines.join("\n");
  const encodedText = encodeURIComponent(messageText);

  return `https://wa.me/${cleanPhone}?text=${encodedText}`;
}
