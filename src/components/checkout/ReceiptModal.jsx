"use client";

import { useRef } from "react";
import { siteConfig } from "@/constants/site";
import { generateWhatsAppOrderUrl } from "@/lib/whatsapp";

export const ReceiptModal = ({ order, onClose }) => {
  const receiptRef = useRef(null);

  if (!order) return null;

  const handlePrint = () => {
    window.print();
  };

  const whatsAppUrl = generateWhatsAppOrderUrl({
    items: order.items || [],
    customer: order.customer,
    phone: order.phone,
    address: order.address,
    orderType: order.orderType || order.type,
    notes: order.notes,
    subtotal: order.subtotal,
    discount: order.discount,
    coupon: order.coupon,
    deliveryFee: order.deliveryFee,
    tax: order.tax,
    total: order.total,
    orderId: order.id,
  });

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto bg-black/75 backdrop-blur-sm animate-in fade-in"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-2xl rounded-3xl bg-white shadow-2xl dark:bg-[#1a1816] text-ink dark:text-white border border-ink/10 dark:border-white/10 overflow-hidden my-8">
        
        {/* Top Control Bar (Hidden when printing) */}
        <div className="flex items-center justify-between border-b border-ink/10 bg-[#faf8f5] px-6 py-4 dark:border-white/10 dark:bg-[#22201d] print:hidden">
          <div className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400 font-bold">
              <i className="ri-bill-line" />
            </span>
            <span className="text-xs font-bold text-ink dark:text-white">
              Official Digital Invoice &bull; #{order.id}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="flex items-center gap-1.5 rounded-xl bg-ink/10 hover:bg-ink/15 dark:bg-white/10 dark:hover:bg-white/15 px-3 py-1.5 text-xs font-bold transition text-ink dark:text-white"
              title="Print or Save PDF"
            >
              <i className="ri-printer-line" /> Print / PDF
            </button>
            <a
              href={whatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 px-3 py-1.5 text-xs font-bold text-white transition"
              title="Share receipt on WhatsApp"
            >
              <i className="ri-whatsapp-line" /> WhatsApp
            </a>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close invoice"
              className="grid h-8 w-8 place-items-center rounded-full hover:bg-ink/10 dark:hover:bg-white/10 transition"
            >
              <i className="ri-close-line text-lg" />
            </button>
          </div>
        </div>

        {/* Printable Invoice Container */}
        <div ref={receiptRef} className="p-6 md:p-8 space-y-6 print:p-0 print:m-0">
          
          {/* Invoice Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-ink/10 pb-6 dark:border-white/10">
            <div>
              <div className="flex items-center gap-2">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand text-white font-black text-sm">
                  <i className="ri-restaurant-2-fill" />
                </span>
                <span className="font-display text-2xl font-black text-ink dark:text-white">
                  {siteConfig.name}
                </span>
              </div>
              <p className="mt-1 text-xs text-ink-700 dark:text-white/60">
                Fresh &amp; Delicious Gourmet Dining
              </p>
              <p className="text-[11px] text-ink-700/80 dark:text-white/50">
                {siteConfig.contact.address}
              </p>
              <p className="text-[11px] text-ink-700/80 dark:text-white/50">
                Tel: {siteConfig.contact.phone} | {siteConfig.contact.email}
              </p>
            </div>

            <div className="sm:text-right">
              <span className="inline-block rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-extrabold text-emerald-600 dark:text-emerald-400">
                {order.paymentStatus || "Order Confirmed"}
              </span>
              <h1 className="mt-2 text-lg font-black text-ink dark:text-white font-mono">
                {order.id}
              </h1>
              <p className="text-xs text-ink-700 dark:text-white/60">
                Date: {order.date || "Today"}
              </p>
              <p className="text-xs text-ink-700 dark:text-white/60">
                Type: <strong>{order.orderType || order.type || "Delivery"}</strong>
              </p>
            </div>
          </div>

          {/* Customer & Delivery Information */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 rounded-2xl bg-[#faf8f5] p-4 text-xs dark:bg-[#22201d] dark:text-white">
            <div>
              <span className="font-extrabold uppercase tracking-wider text-brand dark:text-brand-300 text-[10px]">
                Billed To:
              </span>
              <p className="mt-1 font-bold text-ink dark:text-white text-sm">
                {order.customer}
              </p>
              <p className="text-ink-700 dark:text-white/70">{order.phone}</p>
              {order.email && <p className="text-ink-700 dark:text-white/70">{order.email}</p>}
            </div>

            <div>
              <span className="font-extrabold uppercase tracking-wider text-brand dark:text-brand-300 text-[10px]">
                Delivery Details:
              </span>
              <p className="mt-1 font-medium text-ink dark:text-white">
                {order.address || "Dine-in / Pickup at Counter"}
              </p>
              <p className="mt-0.5 text-ink-700 dark:text-white/70">
                Payment: <strong>{order.paymentMethod || "Cash on Delivery"}</strong>
              </p>
              {order.notes && (
                <p className="mt-1 italic text-amber-700 dark:text-amber-300">
                  Note: &ldquo;{order.notes}&rdquo;
                </p>
              )}
            </div>
          </div>

          {/* Itemized Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-ink/10 pb-2 text-ink-700 dark:border-white/10 dark:text-white/60">
                  <th className="py-2.5 font-bold">Dish Item</th>
                  <th className="py-2.5 text-center font-bold">Qty</th>
                  <th className="py-2.5 text-right font-bold">Price</th>
                  <th className="py-2.5 text-right font-bold">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink/8 dark:divide-white/8">
                {(order.items || []).map((item, idx) => {
                  const qty = item.qty || item.quantity || 1;
                  const priceStr = item.price || item.menuItemPrice || "$0.00";
                  const unitPrice = Number(String(priceStr).replace("$", "")) || 0;
                  const lineTotal = (unitPrice * qty).toFixed(2);

                  return (
                    <tr key={idx} className="py-2">
                      <td className="py-2.5 font-semibold text-ink dark:text-white">
                        {item.name || item.menuItemName}
                      </td>
                      <td className="py-2.5 text-center text-ink-700 dark:text-white/70">
                        {qty}
                      </td>
                      <td className="py-2.5 text-right text-ink-700 dark:text-white/70">
                        ${unitPrice.toFixed(2)}
                      </td>
                      <td className="py-2.5 text-right font-bold text-ink dark:text-white">
                        ${lineTotal}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Financial Breakdown */}
          <div className="border-t border-ink/10 pt-4 dark:border-white/10">
            <div className="ml-auto max-w-xs space-y-1.5 text-xs">
              <div className="flex justify-between text-ink-700 dark:text-white/70">
                <span>Items Subtotal:</span>
                <span className="font-semibold text-ink dark:text-white">
                  {order.subtotal}
                </span>
              </div>

              {order.discount && order.discount !== "$0.00" && (
                <div className="flex justify-between font-semibold text-emerald-600 dark:text-emerald-400">
                  <span>
                    Discount {order.coupon ? `(${order.coupon})` : ""}:
                  </span>
                  <span>{order.discount}</span>
                </div>
              )}

              <div className="flex justify-between text-ink-700 dark:text-white/70">
                <span>Delivery Charge:</span>
                <span className="font-semibold text-ink dark:text-white">
                  {order.deliveryFee || "FREE"}
                </span>
              </div>

              {order.tax && (
                <div className="flex justify-between text-ink-700 dark:text-white/70">
                  <span>Estimated Tax (5%):</span>
                  <span className="font-semibold text-ink dark:text-white">
                    {order.tax}
                  </span>
                </div>
              )}

              <div className="flex justify-between border-t border-ink/10 pt-2 text-base font-extrabold text-ink dark:border-white/10 dark:text-white">
                <span>Grand Total:</span>
                <span className="font-display text-lg text-brand dark:text-brand-300">
                  {order.total}
                </span>
              </div>
            </div>
          </div>

          {/* Receipt Footer */}
          <div className="border-t border-dashed border-ink/15 pt-4 text-center text-[11px] text-ink-700 dark:border-white/10 dark:text-white/50">
            <p className="font-bold">Thank you for dining with {siteConfig.name}!</p>
            <p className="mt-0.5">
              Questions about this order? Call our kitchen hotline at {siteConfig.contact.phone}.
            </p>
          </div>
        </div>

        {/* Modal Bottom Actions (Hidden when printing) */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-ink/10 bg-[#faf8f5] px-6 py-4 dark:border-white/10 dark:bg-[#22201d] print:hidden">
          <p className="text-xs text-ink-700 dark:text-white/60">
            Receipt saved in your order history.
          </p>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={handlePrint}
              className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 rounded-xl bg-ink text-white dark:bg-white dark:text-ink px-4 py-2.5 text-xs font-bold transition hover:opacity-90"
            >
              <i className="ri-printer-line" /> Print Receipt
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 sm:flex-none rounded-xl border border-ink/15 bg-white px-4 py-2.5 text-xs font-bold text-ink hover:bg-ink/5 dark:border-white/15 dark:bg-[#1a1816] dark:text-white transition"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReceiptModal;
