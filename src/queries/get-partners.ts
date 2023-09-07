export default function GetPartners(locale: string): string {
    return `
    query {
        Partners ( locale : ${locale === 'en' ? '"en-US"' : '"uk-UA"'} ) {
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
    `
}