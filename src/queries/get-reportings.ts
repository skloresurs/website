export default function GetReportings(): string {
  return `
    query {
        Reportings (sort : year_DESC) {
            items {
                _id
                year
                finance{
                    url
                }
                auditory{
                    url
                }
            }
        }
    }
    `;
}
