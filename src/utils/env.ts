const telegramToken = import.meta.env.TELEGRAM_TOKEN;
const telegramUsers = import.meta.env.TELEGRAM_USERS?.split(',') ?? [];
const captchaSecret = import.meta.env.CAPTCHA_SECRET;

export { telegramToken, telegramUsers, captchaSecret }