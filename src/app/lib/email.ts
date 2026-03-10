import { Order } from '@/types';

export async function sendOrderEmail(order: Order): Promise<boolean> {
  try {
    // Для frontend-only версии используем EmailJS или аналог
    // В продакшене нужен backend с Nodemailer
    
    const customerEmail = (order.customer as any).email;
    if (!customerEmail) return false;

    // Здесь будет вызов API для отправки email
    // Например: await fetch('/api/send-email', { method: 'POST', body: JSON.stringify(order) })
    
    console.log('Email would be sent to:', customerEmail);
    return true;
  } catch (error) {
    console.error('Email notification error:', error);
    return false;
  }
}

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