export default function GetProjects(locale: string, page: number): string {
  return `
    query {
        Projects ( locale : ${
          locale === 'en' ? '"en-US"' : '"uk-UA"'
        }, limit : 2, skip : ${page}, sort: year_DESC ) {
            items {
                _id
                title
                location
                glasstype
                year
                images{
                    url,
                    width,
                    height 
                }
            }
        }
    }
    `;
}
