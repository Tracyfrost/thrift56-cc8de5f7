
The current description on T56-002 has a JSON image-array string accidentally appended to it, plus the existing copy could lean harder into the throwback car-culture voice. The screenshot confirms the bug — the raw `[{"file_path":...}]` blob is rendering inside the description block.

## Plan

Use `shopify--update_product` on product `7774491181133` to overwrite the `body` (description) field only. No other fields touched. No code changes — the PDP pulls live from Shopify.

### New description (throwback cool, brand voice intact)

> Two cars. One box. Frozen in time.
>
> A 1/32 scale die-cast set pairing the Pontiac Firebird with the Shelby Cobra 427 S/C #99 — sealed in the original collector packaging since the day it hit the shelf. Worn edges. Sun-faded blacks. Shrink-wrap creases that prove it sat untouched for two decades before we found it.
>
> Opening doors. Die-cast metal. Original box. As-found, as-photographed.
>
> Built when muscle meant something and chrome wasn't ironic. The Firebird's screaming chicken on the hood. The Cobra's racing stripes still loud after all these years. A pocket-sized garage from an era that doesn't make 'em like this anymore.
>
> 1 of 1. When it's gone, it stays gone.

### What this fixes
- Strips the JSON image-array junk that's currently rendering as text
- Adds a throwback hook ("Frozen in time") and an era-defining middle paragraph (muscle, chrome, screaming chicken, racing stripes)
- Keeps the closing brand stamp ("1 of 1. When it's gone, it stays gone.")
- Preserves all existing product setup — title, $50 price, tags, images, variant, inventory policy
