import axios from 'axios';
import { JWT } from 'google-auth-library';
import { GoogleSpreadsheet } from 'google-spreadsheet';

const SCOPES = [
  'https://www.googleapis.com/auth/spreadsheets',
  'https://www.googleapis.com/auth/drive.file',
];

const SPREADSHEET_ID = import.meta.env.SPREADSHEET_ID ?? '';
const TELEGRAM_BOT_TOKEN = import.meta.env.TELEGRAM_BOT_TOKEN ?? '';
const TELEGRAM_USERS = import.meta.env.TELEGRAM_USERS?.split(',') ?? [];
const TELEGRAM_API_ROUTE = 'https://api.telegram.org/bot' + TELEGRAM_BOT_TOKEN + '/sendMessage';
const RECAPTCHA_SECRET = import.meta.env.RECAPTCHA_SECRET ?? '';

export async function POST({
  params,
  request,
}: {
  params: unknown;
  request: any;
}): Promise<Response> {
  try {
    const body = await request.json();

    if (!body?.name) {
      return new Response(JSON.stringify({ error: 'Missing name' }), { status: 400 });
    }
    if (!body?.email) {
      return new Response(JSON.stringify({ error: 'Missing email' }), { status: 400 });
    }
    if (!body?.telephone) {
      return new Response(JSON.stringify({ error: 'Missing telephone' }), { status: 400 });
    }
    if (!body?.message) {
      return new Response(JSON.stringify({ error: 'Missing message' }), { status: 400 });
    }

    const { data } = await axios
      .post(
        `https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_SECRET}&response=${body.captcha}`
      )
      .catch(() => {
        return { data: { success: false } };
      });
    if (!data.success) {
      return new Response(JSON.stringify({ error: 'Captcha failed' }), { status: 400 });
    }

    const jwt = new JWT({
      email: import.meta.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: import.meta.env.GOOGLE_PRIVATE_KEY,
      scopes: SCOPES,
    });
    const doc = new GoogleSpreadsheet(SPREADSHEET_ID, jwt);
    await doc.loadInfo();
    const sheet = doc.sheetsByTitle['Відгуки'];
    await sheet.addRow({
      Дата: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString(),
      'E-mail': body.email,
      "Ім'я": body.name,
      'Номер телефону': body.telephone.toString(),
      'Передзвонити?': body.call ? 'Так' : 'Ні',
      Повідомлення: body.message,
    });
    for (const user of TELEGRAM_USERS) {
      axios
        .post(TELEGRAM_API_ROUTE, {
          chat_id: user,
          text: `🔔 Нове сповіщення з сайту\n🧑 Від: ${body.name}\n📧 E-mail: ${
            body.email
          }\n📞 Номер телефону: ${body.telephone.toString()}\n🤙 Передзвонити: ${
            body.call ? 'Так' : 'Ні'
          }\n💬 Повідомлення: ${body.message}`,
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: 'Переглянути всі відгуки',
                  url: `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/edit`,
                },
              ],
            ],
          },
        })
        .catch(() => {
          return new Response(JSON.stringify({}), {
            status: 400,
          });
        });
    }
    return new Response(JSON.stringify({}), {
      status: 200,
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Unknown error' }), {
      status: 500,
    });
  }
}
