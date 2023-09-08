export default function GetProjects(locale: string, page: number): string {
  return `
    query {
        Projects ( locale : ${locale === 'en' ? '"en-US"' : '"uk-UA"'}, limit : 2, skip : ${
          page - 1
        } ) {
            items {
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
    }
    `;
}
