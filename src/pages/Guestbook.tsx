import { fluid } from "@fluid-app/sites";
import {
  type FormEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

interface Entry {
  id: string;
  name: string;
  message: string;
  created_at: string;
}

/**
 * A table in the site's own database (db/schema.json): a signed-in member
 * reads and writes. A guest is asked to sign in.
 */
export function Guestbook() {
  const [entries, setEntries] = useState<Entry[]>([]);
  // A read that failed can be tried again; a message that was not saved is
  // the member's to send again, so it is told apart and never replayed.
  const [readProblem, setReadProblem] = useState<string | null>(null);
  const [signProblem, setSignProblem] = useState<string | null>(null);
  // Only the newest read may show: an older one that answers late is dropped.
  const latestRead = useRef(0);

  const load = useCallback(async () => {
    const read = ++latestRead.current;
    const { data, error } = await fluid.db
      .from("guestbook")
      .select("id,name,message,created_at")
      .order("created_at", { ascending: false })
      .limit(50);
    if (read !== latestRead.current) return;
    if (error) {
      setReadProblem(
        error.code === "rule_denied"
          ? "Sign in to read the guestbook."
          : error.message,
      );
      return;
    }
    setReadProblem(null);
    setEntries((data ?? []) as unknown as Entry[]);
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const sign = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const fields = new FormData(form);
    const { error } = await fluid.db.from("guestbook").insert({
      name: String(fields.get("name") ?? ""),
      message: String(fields.get("message") ?? ""),
    });
    if (error) {
      setSignProblem(
        error.code === "rule_denied"
          ? "Sign in to leave a message."
          : `Your message was not saved: ${error.message}`,
      );
      return;
    }
    form.reset();
    setSignProblem(null);
    await load();
  };

  return (
    <section>
      <h1>Guestbook</h1>
      <form onSubmit={sign} className="guestbook-form">
        <input name="name" placeholder="Your name" required maxLength={80} />
        <textarea
          name="message"
          placeholder="Say hello"
          required
          maxLength={500}
        />
        <button type="submit">Sign</button>
      </form>
      {signProblem && <p role="alert">{signProblem}</p>}
      {readProblem && (
        <p role="alert">
          {readProblem}{" "}
          <button type="button" onClick={() => void load()}>
            Try again
          </button>
        </p>
      )}
      <ul className="entries">
        {entries.map((entry) => (
          <li key={entry.id}>
            <strong>{entry.name}</strong> {entry.message}
          </li>
        ))}
      </ul>
    </section>
  );
}
