export default function GetVacancyBySlug(locale: string, slug: string): string {
  return `
    query {
        Vacancy ( locale : ${locale === 'en' ? '"en-US"' : '"uk-UA"'}, slug: "${slug}") {
            _id
            _slug
            title
            image{
                url
            }
            description
            body {
                __typename
                ... on Text {
                    body
                     format
                }
            }
        }
    }
    `;
}
