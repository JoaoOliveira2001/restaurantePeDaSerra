export async function fetchSiteStatus() {
  const res = await fetch(
    "https://script.google.com/macros/s/AKfycbyjWFLXCmwFwK4noiIyLIxMYp2WLjQJGd5JL6NkOSR98M12n9Tz7Qc2dXm8E52V80GI/exec"
  );
  if (!res.ok) {
    throw new Error(`HTTP error ${res.status}`);
  }
  const data = await res.json();
  return data?.ligar_site === "on";
}
