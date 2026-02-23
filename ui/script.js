// Micro interaction: live filter for event cards (one feature).
(() => {
  const input = document.getElementById("search");
  const list = document.getElementById("eventList");
  if (!input || !list) return;

  const cards = Array.from(list.querySelectorAll("article[data-title]"));

  function normalize(s) {
    return (s || "").toLowerCase().trim();
  }

  function applyFilter() {
    const q = normalize(input.value);
    console.log(input.value)
    cards.forEach(card => {
      const title = normalize(card.getAttribute("data-title"));
      const venue = normalize(card.getAttribute("data-venue"));
      const match = !q || title.includes(q) || venue.includes(q);
      card.hidden = !match;
    });
  }

  input.addEventListener("input", applyFilter);
})();
