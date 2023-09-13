export default function GetPartners(locale: string): string {
  return `
    query {
        Partners (limit:100 ) {
            items {
                _id
                title
                url
                logo{
                    url
                }
            }
        }
    }
    `;
}
