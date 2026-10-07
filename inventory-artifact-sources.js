const artifactSources = new Map([
  [
    "Inventory 3.0 table with provider, resource and refreshed-at information",
    "assets/figma-originals/inventory-final-table-readable.png",
  ],
  [
    "Inventory table before the column settings enhancement",
    "assets/figma-originals/inventory-before-settings-figma.png",
  ],
  [
    "Updated inventory table with searchable column settings side panel",
    "assets/figma-originals/inventory-after-settings-figma.png",
  ],
  [
    "Before and after Global Inventory Search redesign, moving from detailed results to a metadata summary view",
    "assets/figma-originals/inventory-search-insight-readable.png",
  ],
  [
    "Inventory search view switching options and metadata summary concepts",
    "assets/figma-originals/inventory-view-switching-readable.png",
  ],
]);

const artifactCaptions = new Map([
  ["Inventory table before the column settings enhancement", "Before — advanced filter panel."],
  ["Updated inventory table with searchable column settings side panel", "After — column-level search and attribute discovery."],
]);

document.querySelectorAll(".inv-initiative .inv-artifacts img").forEach((image) => {
  const source = artifactSources.get(image.alt);
  if (source) {
    image.src = source;
    const caption = artifactCaptions.get(image.alt);
    const figcaption = image.closest("figure")?.querySelector("figcaption");
    if (caption && figcaption) figcaption.textContent = caption;
    if (caption) image.dataset.viewerFitMax = "1";
  }
});
