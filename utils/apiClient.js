import { useLanguage } from "@/Context/languagecontext";

export function useApi() {
  const { locale } = useLanguage();

  const get = (url) =>
    fetch(url, { headers: { "Accept-Language": locale } }).then((r) => r.json());

  const post = (url, body) =>
    fetch(url, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        "Accept-Language": locale,
      },
    }).then((r) => r.json());

  return { get, post };
}
