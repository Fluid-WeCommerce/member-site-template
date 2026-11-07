import { Link } from "../Link";

export function Home() {
  return (
    <section>
      <h1>Welcome</h1>
      <p>
        This is a member site. It runs on the storefront, inside the
        storefront's cart, sign-in and account menu, and it is built and
        published like any static app.
      </p>
      <p>
        <Link to="/shop">See what I recommend</Link> or{" "}
        <Link to="/guestbook">sign the guestbook</Link>.
      </p>
    </section>
  );
}
