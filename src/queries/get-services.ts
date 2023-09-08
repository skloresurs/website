export default function GetServices(locale: string, category: string): string {
  return `
    query {
        Services ( locale : ${
          locale === 'en' ? '"en-US"' : '"uk-UA"'
        }, where: {category: "${category}"}) {
            items {
                _id
                _slug
                title
                category
                body
                image{
                    url
                }
            }
        }
    }
    `;
}
