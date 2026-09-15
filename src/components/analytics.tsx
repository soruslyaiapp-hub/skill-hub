import Script from "next/script";

// Privacy-friendly analytics, off unless configured. No cookies, so no consent banner.
export function Analytics() {
  const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
  const umamiId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;
  const umamiSrc = process.env.NEXT_PUBLIC_UMAMI_SRC ?? "https://cloud.umami.is/script.js";
  return (
    <>
      {plausibleDomain ? <Script defer data-domain={plausibleDomain} src="https://plausible.io/js/script.js" strategy="afterInteractive" /> : null}
      {umamiId ? <Script defer data-website-id={umamiId} src={umamiSrc} strategy="afterInteractive" /> : null}
    </>
  );
}
