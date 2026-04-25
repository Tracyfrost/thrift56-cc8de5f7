## Add new Curated product — Frank Frazetta "ICON" Retrospective Book (T56-014)

A new 1-of-1 curated Shopify product using the two uploaded photos. Follows the same pattern as the other curated drops (Versace, Avedon, Wheaties, Omega).

### Photos
| Local file | Source upload | Subject |
|---|---|---|
| `src/assets/frazetta/T56-014_001.jpg` | `T56-014_FRANK-FRAZETTA-ICON-BOOK_EDT_001-2.jpg` | Front cover — "ICON: A Retrospective by the Grand Master of Fantastic Art / Frank Frazetta" |
| `src/assets/frazetta/T56-014_002.jpg` | `T56-014_FRANK-FRAZETTA-ICON-BOOK_EDT_002-2.jpg` | Back cover — "Night They Raided Minsky's" poster art + critic blurbs (Bradbury, Kurtzman, Maitz, Blackshear, Punchatz) |

### Shopify product

- **Title**: Frank Frazetta — "ICON" Retrospective
- **Vendor**: Thrift 56
- **Type**: Curated
- **Tags**: `1-of-1, curated, frazetta, fantasy-art, vintage-book, retrospective, found-object, hardcover`
- **Price**: $85
- **SKU**: `T56-014`
- **Inventory**: 1, tracked via Shopify
- **Images**: front cover (lead), back cover

### Description (in brand voice)

> *The Grand Master, hardcover, hand-found.*
>
> ICON — the definitive Frank Frazetta retrospective, edited by Arnie & Cathy Fenner. The book that put every barbarian, every spacefaring queen, every snarling beast Frazetta ever painted between two covers and called it what it always was: the canon.
>
> Death Dealer. Conan. The Princess of Mars. The covers that taught three generations of illustrators what "epic" actually means. Bradbury called it mythological. Kurtzman said it was impossible to explain. Don Maitz called the draftsmanship unequaled. They were all right.
>
> Pulled from a Pacific Northwest estate lot — original dust jacket intact, protective mylar sleeve still on, spine tight, plates crisp. The kind of book that lived on a shelf, not a coffee table.
>
> **The Find:** Estate lot, Pacific Northwest.
> **Condition:** Excellent. Original dust jacket with mylar protector, no tears, binding tight, interior plates clean.
> **Format:** Hardcover, full-color plates throughout.
> **Original cover price:** $35 US / $50.95 CAN.
> **Quantity:** One. Once it's gone, it stays gone.

### Implementation steps

1. Copy both uploads into `src/assets/frazetta/` as `T56-014_001.jpg` and `T56-014_002.jpg`.
2. Single `shopify--create_product` call with the title, body, vendor, type, tags, one variant (price 85, SKU T56-014, inventory_management `shopify`), and `images: [001, 002]` in that order.

No code, route, or component edits — `/shop` and `/product/<handle>` already render any Shopify product with `tag:1-of-1` as a purchasable curated piece.