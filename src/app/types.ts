export type User = {
    id: number,
    name: {
        firstname: string,
        lastname: string
    },
    email: string
}

export type Product = {
    id: number,
    title: string,
    description: string
}

export type AddItem = {
    id: number,
    text: string
}
