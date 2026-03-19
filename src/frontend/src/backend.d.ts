import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Inquiry {
    id: bigint;
    name: string;
    productId: bigint;
    phone: string;
}
export interface ContactInfo {
    email: string;
    address: string;
    phone: string;
}
export interface Product {
    id: bigint;
    weight: string;
    name: string;
    price: bigint;
}
export interface backendInterface {
    addProduct(name: string, weight: string, price: bigint): Promise<void>;
    deleteProduct(id: bigint): Promise<void>;
    getContactInfo(): Promise<ContactInfo>;
    getInquiries(): Promise<Array<Inquiry>>;
    getProducts(): Promise<Array<Product>>;
    initializeAdmin(): Promise<void>;
    initializeDefaultContactInfo(): Promise<void>;
    submitInquiry(name: string, phone: string, productId: bigint): Promise<void>;
    updateContactInfo(address: string, phone: string, email: string): Promise<void>;
    updateProduct(id: bigint, name: string, weight: string, price: bigint): Promise<void>;
}
