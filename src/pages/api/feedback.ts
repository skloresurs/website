import axios from "axios";
import { telegramToken, telegramUsers, captchaSecret } from "src/utils/env";

export async function POST({params, request}: {params: unknown, request: Request}): Promise<Response> {
    const {name, email, text, captcha} = await request.json();
    if (!name || !email || !text){
        return new Response(null, {
            status: 400,
            statusText: 'Name and Email and Text are required'
        });
    }

    const captchaVerify = await axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${captchaSecret}&response=${captcha}`);

    if (!captchaVerify?.data?.success) {
        return new Response(null, {
            status: 400,
            statusText: 'Captcha verification failed'
        });
    }

    for (const user of telegramUsers) {
        axios.post(`https://api.telegram.org/bot${telegramToken}/sendMessage`, {
            chat_id: user,
            text: `Нове повідомлення з сайту skloresurs.com\n\nВід: ${name}\nEmail: ${email}\n\nТекст: ${text}`
        })
    }

    return new Response(
        JSON.stringify({})
    )
}