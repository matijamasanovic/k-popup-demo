import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export type OrderEmailData = {
  orderId: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string | null;
  addressStreet: string;
  addressCity: string;
  addressPostalCode?: string | null;
  addressCountry: string;
  items: {
    name: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
    image?: string | null;
  }[];
  subtotal: number;
  shippingCost: number;
  total: number;
  customerNote?: string | null;
};

function adminEmailHtml(data: OrderEmailData): string {
  const itemsHtml = data.items
    .map(
      (item) => `
      <tr>
        <td style="padding:12px 16px;border-bottom:1px solid #f0f0f0;font-size:14px;color:#111;">
          ${item.name}
        </td>
        <td style="padding:12px 16px;border-bottom:1px solid #f0f0f0;font-size:14px;color:#666;text-align:center;">
          x${item.quantity}
        </td>
        <td style="padding:12px 16px;border-bottom:1px solid #f0f0f0;font-size:14px;color:#111;text-align:right;font-weight:600;">
          €${item.totalPrice.toFixed(2)}
        </td>
      </tr>
    `
    )
    .join("");

  return `
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8"></head>
    <body style="margin:0;padding:0;background:#f5f5f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
      <div style="max-width:580px;margin:40px auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
        
        <!-- Header -->
        <div style="background:#e11d48;padding:32px 40px;">
          <h1 style="margin:0;color:#fff;font-size:22px;font-weight:700;letter-spacing:-0.5px;">
            🛒 New Order Received!
          </h1>
          <p style="margin:6px 0 0;color:rgba(255,255,255,0.85);font-size:14px;">
            Order #${data.orderId.slice(0, 8).toUpperCase()}
          </p>
        </div>

        <div style="padding:32px 40px;">

          <!-- Customer info -->
          <h2 style="margin:0 0 16px;font-size:14px;font-weight:600;color:#666;text-transform:uppercase;letter-spacing:0.5px;">
            Customer
          </h2>
          <div style="background:#f9f9f9;border-radius:12px;padding:16px 20px;margin-bottom:24px;">
            <p style="margin:0 0 6px;font-size:15px;font-weight:600;color:#111;">${
              data.customerName
            }</p>
            <p style="margin:0 0 4px;font-size:14px;color:#666;">${
              data.customerEmail
            }</p>
            ${
              data.customerPhone
                ? `<p style="margin:0;font-size:14px;color:#666;">${data.customerPhone}</p>`
                : ""
            }
          </div>

          <!-- Shipping -->
          <h2 style="margin:0 0 16px;font-size:14px;font-weight:600;color:#666;text-transform:uppercase;letter-spacing:0.5px;">
            Shipping Address
          </h2>
          <div style="background:#f9f9f9;border-radius:12px;padding:16px 20px;margin-bottom:24px;">
            <p style="margin:0 0 4px;font-size:14px;color:#111;">${
              data.addressStreet
            }</p>
            <p style="margin:0 0 4px;font-size:14px;color:#111;">${
              data.addressPostalCode ?? ""
            } ${data.addressCity}</p>
            <p style="margin:0;font-size:14px;color:#111;">${
              data.addressCountry
            }</p>
          </div>

          <!-- Items -->
          <h2 style="margin:0 0 16px;font-size:14px;font-weight:600;color:#666;text-transform:uppercase;letter-spacing:0.5px;">
            Items
          </h2>
          <table style="width:100%;border-collapse:collapse;margin-bottom:24px;background:#f9f9f9;border-radius:12px;overflow:hidden;">
            ${itemsHtml}
            <tr>
              <td colspan="2" style="padding:12px 16px;font-size:14px;color:#666;">Subtotal</td>
              <td style="padding:12px 16px;font-size:14px;color:#111;text-align:right;">€${data.subtotal.toFixed(
                2
              )}</td>
            </tr>
            <tr>
              <td colspan="2" style="padding:12px 16px;font-size:14px;color:#666;">Shipping</td>
              <td style="padding:12px 16px;font-size:14px;color:#111;text-align:right;">
                ${
                  data.shippingCost === 0
                    ? "Free"
                    : `€${data.shippingCost.toFixed(2)}`
                }
              </td>
            </tr>
            <tr style="background:#fff8f9;">
              <td colspan="2" style="padding:14px 16px;font-size:15px;font-weight:700;color:#111;border-top:2px solid #f0e0e3;">Total</td>
              <td style="padding:14px 16px;font-size:15px;font-weight:700;color:#e11d48;text-align:right;border-top:2px solid #f0e0e3;">€${data.total.toFixed(
                2
              )}</td>
            </tr>
          </table>

          ${
            data.customerNote
              ? `
          <!-- Note -->
          <h2 style="margin:0 0 12px;font-size:14px;font-weight:600;color:#666;text-transform:uppercase;letter-spacing:0.5px;">Customer Note</h2>
          <div style="background:#fffbeb;border:1px solid #fde68a;border-radius:12px;padding:16px 20px;margin-bottom:24px;">
            <p style="margin:0;font-size:14px;color:#92400e;">${data.customerNote}</p>
          </div>`
              : ""
          }

          <!-- CTA -->
          <div style="text-align:center;padding-top:8px;">
            <a href="${
              process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
            }/dashboard/orders"
              style="display:inline-block;background:#e11d48;color:#fff;text-decoration:none;padding:12px 28px;border-radius:10px;font-size:14px;font-weight:600;">
              View in Dashboard →
            </a>
          </div>

        </div>

        <!-- Footer -->
        <div style="background:#f9f9f9;padding:20px 40px;text-align:center;border-top:1px solid #f0f0f0;">
          <p style="margin:0;font-size:12px;color:#999;">K-Popup Admin Notification</p>
        </div>

      </div>
    </body>
    </html>
  `;
}

function customerEmailHtml(data: OrderEmailData): string {
  const itemsHtml = data.items
    .map(
      (item) => `
      <tr>
        <td style="padding:12px 16px;border-bottom:1px solid #f0f0f0;font-size:14px;color:#111;">
          ${item.name}
        </td>
        <td style="padding:12px 16px;border-bottom:1px solid #f0f0f0;font-size:14px;color:#666;text-align:center;">
          x${item.quantity}
        </td>
        <td style="padding:12px 16px;border-bottom:1px solid #f0f0f0;font-size:14px;color:#111;text-align:right;font-weight:600;">
          €${item.totalPrice.toFixed(2)}
        </td>
      </tr>
    `
    )
    .join("");

  return `
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8"></head>
    <body style="margin:0;padding:0;background:#f5f5f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
      <div style="max-width:580px;margin:40px auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
        
        <!-- Header -->
        <div style="background:#e11d48;padding:32px 40px;text-align:center;">
          <h1 style="margin:0;color:#fff;font-size:24px;font-weight:700;letter-spacing:-0.5px;">
            Thank you, ${data.customerName}! 🎉
          </h1>
          <p style="margin:10px 0 0;color:rgba(255,255,255,0.85);font-size:15px;">
            Your order has been received and is being processed.
          </p>
        </div>

        <div style="padding:32px 40px;">

          <!-- Order ID -->
          <div style="background:#fff8f9;border:1px solid #fce7f0;border-radius:12px;padding:16px 20px;margin-bottom:28px;text-align:center;">
            <p style="margin:0 0 4px;font-size:12px;color:#999;text-transform:uppercase;letter-spacing:0.5px;">Order ID</p>
            <p style="margin:0;font-size:20px;font-weight:700;color:#e11d48;font-family:monospace;">
              #${data.orderId.slice(0, 8).toUpperCase()}
            </p>
          </div>

          <!-- Items -->
          <h2 style="margin:0 0 16px;font-size:14px;font-weight:600;color:#666;text-transform:uppercase;letter-spacing:0.5px;">
            Your Order
          </h2>
          <table style="width:100%;border-collapse:collapse;margin-bottom:24px;background:#f9f9f9;border-radius:12px;overflow:hidden;">
            ${itemsHtml}
            <tr>
              <td colspan="2" style="padding:12px 16px;font-size:14px;color:#666;">Subtotal</td>
              <td style="padding:12px 16px;font-size:14px;color:#111;text-align:right;">€${data.subtotal.toFixed(
                2
              )}</td>
            </tr>
            <tr>
              <td colspan="2" style="padding:12px 16px;font-size:14px;color:#666;">Shipping</td>
              <td style="padding:12px 16px;font-size:14px;color:#111;text-align:right;">
                ${
                  data.shippingCost === 0
                    ? '<span style="color:#16a34a;font-weight:600;">Free</span>'
                    : `€${data.shippingCost.toFixed(2)}`
                }
              </td>
            </tr>
            <tr style="background:#fff8f9;">
              <td colspan="2" style="padding:14px 16px;font-size:15px;font-weight:700;color:#111;border-top:2px solid #f0e0e3;">Total</td>
              <td style="padding:14px 16px;font-size:15px;font-weight:700;color:#e11d48;text-align:right;border-top:2px solid #f0e0e3;">€${data.total.toFixed(
                2
              )}</td>
            </tr>
          </table>

          <!-- Delivery info -->
          <h2 style="margin:0 0 16px;font-size:14px;font-weight:600;color:#666;text-transform:uppercase;letter-spacing:0.5px;">
            Delivery Address
          </h2>
          <div style="background:#f9f9f9;border-radius:12px;padding:16px 20px;margin-bottom:24px;">
            <p style="margin:0 0 4px;font-size:14px;color:#111;">${
              data.addressStreet
            }</p>
            <p style="margin:0 0 4px;font-size:14px;color:#111;">${
              data.addressPostalCode ?? ""
            } ${data.addressCity}</p>
            <p style="margin:0;font-size:14px;color:#111;">${
              data.addressCountry
            }</p>
          </div>

          <!-- Payment -->
          <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:12px;padding:16px 20px;margin-bottom:24px;">
            <p style="margin:0;font-size:14px;color:#166534;">
              💵 <strong>Payment:</strong> Cash on Delivery — you'll pay when your order arrives.
            </p>
          </div>

          <p style="font-size:14px;color:#666;text-align:center;margin:0;">
            We'll contact you shortly to confirm your order. If you have any questions, reply to this email.
          </p>

        </div>

        <!-- Footer -->
        <div style="background:#f9f9f9;padding:20px 40px;text-align:center;border-top:1px solid #f0f0f0;">
          <p style="margin:0 0 4px;font-size:13px;font-weight:600;color:#e11d48;">K-Popup</p>
          <p style="margin:0;font-size:12px;color:#999;">Premium Korean Food Store</p>
        </div>

      </div>
    </body>
    </html>
  `;
}

export async function sendOrderEmails(data: OrderEmailData) {
  const adminEmail = process.env.ADMIN_EMAIL!;
  const fromEmail = "onboarding@resend.dev";

  const results = await Promise.allSettled([
    // Admin notification
    resend.emails.send({
      from: fromEmail,
      to: adminEmail,
      subject: `🛒 New Order #${data.orderId
        .slice(0, 8)
        .toUpperCase()} — €${data.total.toFixed(2)}`,
      html: adminEmailHtml(data),
    }),

    // Customer confirmation
    resend.emails.send({
      from: fromEmail,
      to: data.customerEmail,
      subject: `✅ Order Confirmed — K-Popup #${data.orderId
        .slice(0, 8)
        .toUpperCase()}`,
      html: customerEmailHtml(data),
    }),
  ]);

  return results;
}
