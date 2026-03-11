import { Order } from '@/types';

export async function sendOrderNotification(order: any): Promise<boolean> {
  try {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!token || !chatId) {
      console.warn('Telegram credentials not configured');
      return false;
    }

    const itemsList = order.items
      .map((item: any) => `• ${item.name} — ${item.quantity} шт. × ${item.price.toLocaleString()} ₸`)
      .join('\n');

    const message = `
🛒 *Новый заказ №${order.id.slice(-8)}*

👤 *Клиент:* ${order.customer.name}
📞 *Телефон:* ${order.customer.phone}
📧 *Email:* ${order.customer.email || 'Не указан'}

📦 *Товары:*
${itemsList}

💰 *Итого:* ${order.total.toLocaleString()} ₸

🚚 *Доставка:* ${order.delivery.type === 'pickup' ? 'Самовывоз' : order.delivery.type === 'courier' ? 'Курьер' : 'Почта'}
📍 *Адрес:* ${order.delivery.city}, ${order.delivery.address}

💳 *Оплата:* ${order.payment.method === 'cash' ? 'Наличными' : order.payment.method === 'card' ? 'Картой' : 'Kaspi'}
    `.trim();

    const response = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: 'Markdown'
        })
      }
    );

    const data = await response.json();
    return data.ok;
  } catch (error) {
    console.error('Telegram notification error:', error);
    return false;
  }
}