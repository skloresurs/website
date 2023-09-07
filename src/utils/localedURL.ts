import i18next from 'i18next';

export default function generatelocaledURL(url: string): string {
  const locale = i18next.language;
  if (locale === 'uk') {
    return url;
  }
  if (url === '/') {
    return `/${locale}`;
  }
  return `/${locale}${url}`;
}
