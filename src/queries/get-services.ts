export default function GetServices(locale: string): string {
    return `
    query {
        Services ( locale : ${locale === 'en' ? '"en-US"' : '"uk-UA"'} ) {
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
    `
}