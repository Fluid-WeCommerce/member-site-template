import { fluid } from "@fluid-app/sites";
import { useEffect, useState } from "react";

import { recommendations } from "../products";

export function Shop() {
  const [status, setStatus] = useState<string | null>(null);
  const [storeUrl, setStoreUrl] = useState<string | null>(null);

  // The storefront's own shop page, with this visit's credit. A plain link:
  // the SDK opens a click on it in the storefront's window, which the frame's
  // sandbox would not let a script do.
  useEffect(() => {
    fluid.storefront.url("/shop").then(setStoreUrl, () => setStoreUrl(null));
  }, []);

  const add = async (variantId: number) => {
    setStatus("Adding…");
    try {
      await fluid.cart.add([{ variant_id: variantId, quantity: 1 }]);
      setStatus("Added to your cart.");
    } catch (error) {
      setStatus(
        error instanceof Error ? error.message : "The cart did not answer.",
      );
    }
  };

  return (
    <section>
      <h1>Shop</h1>
      <ul className="products">
        {recommendations.map((product) => (
          <li key={product.variantId}>
            <h2>{product.name}</h2>
            <p>{product.blurb}</p>
            <button type="button" onClick={() => add(product.variantId)}>
              Add to cart
            </button>
          </li>
        ))}
      </ul>
      {status && <p role="status">{status}</p>}
      <p className="actions">
        <button type="button" onClick={() => fluid.cart.open()}>
          Open cart
        </button>
        <button type="button" onClick={() => fluid.cart.checkout()}>
          Checkout
        </button>
        {storeUrl && <a href={storeUrl}>The whole store</a>}
      </p>
    </section>
  );
}
