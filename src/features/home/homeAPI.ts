import {Product, User} from "../../app/types";

export interface FetchCharacterPagination {
    page: number
}

export async function fetchUsers(): Promise<User[]> {
    const users = await fetch("https://fakestoreapi.com/users").then(e=> e.json());
    return users?.map(({id, email, name: {firstname, lastname}}: User) => {
        return {id, email, name: {firstname, lastname}};
    });
}

export async function fetchProducts(): Promise<Product[]> {
    const products = await fetch("https://fakestoreapi.com/products").then(e=> e.json());
    return products?.map(({id, title, description}: Product) => {
        return {id, title, description};
    });
}

