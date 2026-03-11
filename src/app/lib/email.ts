import { Order } from '@/types';

export const sendOrderEmail = async (order: any) => {
  try {
    const customerEmail = order.customer?.email || (order as any).email;
    
    if (!customerEmail) return false;

    console.log(`Sending email to ${customerEmail} for order ${order.id}`);
    // Логика отправки будет настроена позже
    return true;
  } catch (error) {
    console.error("Email error:", error);
    return false;
  }
};

// Для отправки через EmailJS (frontend решение)
export async function sendOrderEmailEmailJS(order: Order): Promise<boolean> {
  try {
    // Установи: npm install @emailjs/browser
    // const emailjs = await import('@emailjs/browser');
    
    // await emailjs.send(
    //   'YOUR_SERVICE_ID',
    //   'YOUR_TEMPLATE_ID',
    //   {
    //     to_email: order.customer.email,
    //     order_id: order.id,
    //     total: order.total,
    //     items: order.items.map((i: any) => i.name).join(', ')
    //   },
    //   'YOUR_PUBLIC_KEY'
    // );
    
    return true;
  } catch (error) {
    console.error('EmailJS error:', error);
    return false;
  }
}