export default function GetVacancies(locale: string): string {
  return `
    query {
        Vacancies ( locale : ${locale === 'en' ? '"en-US"' : '"uk-UA"'}, limit : 100 ) {
            items {
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
    }
    `;
}
