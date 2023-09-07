export default function GetProjectBySlug(locale: string, slug: string): string {
    return `
    query {
        Project ( locale : ${locale === 'en' ? '"en-US"' : '"uk-UA"'}, slug: "${slug}") {
            _id
            _slug
            title
            location
            glasstype
            year
            images{
                url
            }
        }
    }
    `
}