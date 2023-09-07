const url = import.meta.env.PREPR_ENDPOINT ?? ''

export async function Prepr(query: string): Promise<Response> {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
    })
    return response
}