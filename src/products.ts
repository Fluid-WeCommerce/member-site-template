/**
 * The products the shop page recommends. Each is one of the company's
 * product variants, by its id. Replace these with your own: the ids are in
 * the company's admin, on each product's variants.
 */
export interface Recommendation {
  variantId: number;
  name: string;
  blurb: string;
}

export const recommendations: Recommendation[] = [
  { variantId: 0, name: "Your first product", blurb: "Say why you love it." },
];
