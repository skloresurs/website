export default function GetProjects(locale: string): string {
    return `
    query {
        Projects ( locale : ${locale === 'en' ? '"en-US"' : '"uk-UA"'} ) {
            items {
                _id
                _slug
                title
                images{
                    url
                }
            }
        }
    }
    `
}