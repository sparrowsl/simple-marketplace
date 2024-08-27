import { writable } from "svelte/store";
import type { Product } from "./types";

export const cart = writable<Product[]>([]);
