
User wants to create a new 1-of-1 product in their Shopify store: a vintage San Francisco trolley/cable car ceramic ashtray, "T56-003_TROLLY-ASHTRAY" listed at $24.99, with two attached photos. Needs an era-appropriate description that highlights the unusual cigarette rests on the corners (not center).

## Plan

Create new Shopify product via `shopify--create_product`:

- **Title:** "Powell & Mason St. Cable Car Ashtray — Vintage SNCO Japan"
- **Product type:** Decor / Ashtray
- **Tags:** `1-of-1, vintage, ceramic, ashtray, mid-century, japan, san-francisco, smokeware`
- **Vendor:** Thrift 56
- **Price:** $24.99
- **Variant:** single, inventory tracked, qty 1, deny when sold out (1-of-1)
- **Images:** 
  1. `user-uploads://T56-003_TROLLY-ASHTRAY_EDT_001.jpg` — front (relief sculpt, hero)
  2. `user-uploads://T56-003_TROLLY-ASHTRAY_EDT_002.jpg` — reverse with SNCO Japan stamp

### Description (throwback voice, brand tone, integrating the corner-rest detail)

> Powell & Mason St. Pulled from the back of a curio cabinet where it sat through six decades of cocktail hours.
>
> A glazed ceramic ashtray cast in the shape of a San Francisco cable car — passengers molded into the sides, "POWELL & MASON ST" stamped above the windows, "SAN FRANCISCO" running along the deck. Stamped SNCO Japan on the underside. Mid-century era, 1950s–60s souvenir-ware, back when bringing home a small ceramic something from a trip felt like proof you went.
>
> Here's the kicker most folks miss: the cigarette rests are tucked into the four corners — not notched into the center like every other tray of its time. A small rebellion in tableware design. Whoever sculpted this wanted the trolley to stay the star of the show, undisturbed, while the smoke happened around the edges.
>
> Vintage glaze. Honest patina. Some original lacquer-orange brilliance still intact on the back. A working ashtray, a coin dish, a desk catch-all — or just a piece of someone else's holiday left out where you can see it.
>
> 1 of 1. When it's gone, it stays gone.

### What this delivers
- Era-fitting voice (cocktail hours, souvenir-ware, "small rebellion in tableware design")
- The unusual corner-rest detail framed as the hidden differentiator — exactly as the user asked
- Brand-consistent closer ("1 of 1. When it's gone, it stays gone.")
- Both images attached with descriptive alt text
- Inventory locked at 1 with `deny` policy so it can't oversell

No code changes — Shop page pulls live from Shopify and the new product appears on next refresh.
