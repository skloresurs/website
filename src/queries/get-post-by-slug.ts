export default function GetPostBySlug(locale: string, slug: string): string {
    return `
    query {
        Post ( locale : ${locale === 'en' ? '"en-US"' : '"uk-UA"'}, slug: "${slug}") {
            _id
            _slug
            title
            description
            image{
                url
            }
            body {
                __typename
                ... on Text {
                    body
                    format
                }
                ... on Assets {
                    items {
                        url
                    }
                }
            }
        }
    }
    `
}