## Add new Curated product — "The Art of Rowena" Book (T56-015)

A new 1-of-1 curated Shopify product using the two uploaded photos. Same pattern as T56-014 Frazetta ICON.

### Photos
| Local file | Source upload | Subject |
|---|---|---|
| `src/assets/rowena/T56-015_001.jpg` | `T56-015_ART-OF-ROWENA-BOOK_EDT_001.jpg` | Front cover — Rowena Morrill painting, redhead figure draped over a temple deity |
| `src/assets/rowena/T56-015_002.jpg` | `T56-015_ART-OF-ROWENA-BOOK_EDT_002.jpg` | Back cover — sage-green panel, "Text by Doris Vallejo", two interior plates, Paper Tiger imprint, ISBN 1-85585-778-2 |

### Shopify product

- **Title**: The Art of Rowena — Morrill Retrospective
- **Vendor**: Thrift 56
- **Type**: Curated
- **Tags**: `1-of-1, curated, rowena-morrill, fantasy-art, vintage-book, paper-tiger, found-object, hardcover`
- **Price**: $75
- **SKU**: `T56-015`
- **Inventory**: 1, tracked via Shopify
- **Images**: front cover (lead), back cover

### Description (in brand voice)

> *The first lady of fantasy paperback covers — hardcover, hand-found.*
>
> The Art of Rowena. A full retrospective of Rowena Morrill, the painter who put oil-glazed witches, sea queens, and impossible monsters on the front of every fantasy paperback worth reading from the late seventies through the nineties. Stephen King covers. Anne McCaffrey covers. Piers Anthony. Asimov. If you grew up in a used bookstore, you grew up inside a Rowena.
>
> Text by Doris Vallejo — yes, that Vallejo — pulling apart the technique behind the polish: the layered glazes, the sculptural figure work, the way she made fantasy feel like Renaissance portraiture instead of pulp.
>
> Pulled from a Pacific Northwest estate lot. Original Paper Tiger dust jacket intact, sage-green back panel still vivid, spine tight, full-color plates clean throughout.
>
> **The Find:** Estate lot, Pacific Northwest.
> **Condition:** Excellent. Original dust jacket, no tears, binding tight, interior plates crisp.
> **Format:** Hardcover, full-color plates throughout.
> **Publisher:** Paper Tiger (UK) — ISBN 1-85585-778-2.
> **Quantity:** One. Once it's gone, it stays gone.

### Implementation steps

1. Copy both uploads into `src/assets/rowena/` as `T56-015_001.jpg` and `T56-015_002.jpg`.
2. Single `shopify--create_product` call: title, body, vendor, type, tags, one variant (price 75, SKU T56-015, inventory_management `shopify`), images `[001, 002]`.

No code or component edits — `/shop` and `/product/<handle>` already render any Shopify product with `tag:1-of-1` as a purchasable curated piece.