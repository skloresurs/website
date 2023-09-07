export default function GetPosts(locale: string): string {
    return `
    query {
        Posts ( locale : ${locale === 'en' ? '"en-US"' : '"uk-UA"'} ) {
            items {
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
                }
            }
        }
    }
    `
}