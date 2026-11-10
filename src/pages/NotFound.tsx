import { Link } from "../Link";

export function NotFound() {
  return (
    <section className="hero">
      <h1>Not here</h1>
      <p>
        There is no page at this address. <Link to="/">Go home</Link>.
      </p>
    </section>
  );
}
