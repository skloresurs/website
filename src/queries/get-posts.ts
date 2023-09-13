export default function GetPosts(locale: string): string {
  return `
    query {
        Posts ( locale : ${locale === 'en' ? '"en-US"' : '"uk-UA"'}, limit : 100 ) {
            items {
                _id
                _slug
                title
                type
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
                video
            }
        }
    }
    `;
}
