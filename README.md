# Poly People Printing - Theme Preview

This directory contains a static HTML preview of the Shopify theme.

## Preview Pages

- **index.html** - Homepage with all category and organization buttons
- **collection-3d-printing.html** - Example collection page showing the 3D Printing category
- **product.html** - Example product page showing a PLA Filament product

## How to View

A local web server is running on port 8080. You can view the preview by:

1. **In your browser**, navigate to:
   - Homepage: http://localhost:8080/
   - Collection Page: http://localhost:8080/collection-3d-printing.html
   - Product Page: http://localhost:8080/product.html

2. **Or use the following commands**:
   ```bash
   # View in default browser (if available)
   xdg-open http://localhost:8080/
   ```

## Features Demonstrated

### Homepage (index.html)
- Full-width business banner at top (currently showing placeholder with business name)
- Search bar immediately under banner
- Custom/Service Orders button
- 4 Product Categories in a 2-column grid:
  - 3D Printing
  - Laser Engraving and Cutting
  - Direct to Film Printing
  - Sublimation Printing
- 2 Organization buttons below categories:
  - Seasonal
  - Clearance

### Collection Page (collection-3d-printing.html)
- Product grid showing multiple products
- Visual tags for product status:
  - Green badge: "Always In Stock"
  - Yellow badge: "Seasonal"
  - Red badge: "Clearance"
- Sale pricing display for clearance items
- Responsive grid layout

### Product Page (product.html)
- Large product image area
- Product title and pricing
- Status badges
- Detailed description
- Variant selector (color)
- Quantity selector
- Add to Cart button

## Responsive Design

The theme is fully responsive and will adapt to:
- Desktop (1200px+)
- Tablet (768px - 1024px)
- Mobile (< 768px)

On mobile devices, the category and organization grids stack into a single column.

## Customization Notes

When you upload this theme to Shopify, you'll be able to:
- Upload your own banner image (replaces the placeholder)
- Add product images for each category
- Add images for seasonal and clearance buttons
- Customize colors in the theme settings
- Link the Custom/Service button to your order form

## Stopping the Preview Server

If you need to stop the web server, run:
```bash
pkill -f "python3 -m http.server 8080"
```
