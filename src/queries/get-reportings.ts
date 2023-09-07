export default function GetReportings(): string {
    return `
    query {
        Reportings {
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
    `
}