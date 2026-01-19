# Poly People Printing - Shopify Theme

A custom Shopify theme built for Poly People Printing, featuring organized product categories and intuitive navigation.

## Business Overview

**Poly People Printing** offers a variety of printing and manufacturing services across multiple categories:

- 3D Printing
- Laser Engraving and Cutting
- Direct to Film Printing
- Sublimation Printing

## Theme Features

### Homepage Layout

The theme follows a structured layout optimized for customer experience:

1. **Header Banner** - Full-width business banner (max 15% viewport height)
2. **Search Bar & Custom/Service Button** - Search functionality and custom order button on the same line, center aligned
3. **Product Categories** - Visual grid showcasing all product categories
4. **Organization Buttons** - Quick access to Seasonal and Clearance items

### Product Organization

Products are organized using Shopify tags:

- `#always` - Products always in stock
- `#seasonal` - Seasonal items
- `#clearance` - Clearance items

Each product category can filter products by combining category tags with organizational tags.

### Responsive Design

- **Desktop**: 2-column grid for categories and organization buttons
- **Mobile**: Single-column layout for optimal mobile experience
- **Tablet**: Adaptive grid layout

## File Structure

```
shopify/
├── assets/
│   ├── theme.css           # Main stylesheet
│   └── theme.js            # JavaScript functionality
├── config/
│   ├── settings_schema.json  # Theme settings
│   └── settings_data.json    # Theme data
├── layout/
│   └── theme.liquid          # Main layout template
├── locales/
│   └── en.default.json       # English translations
├── sections/
│   ├── header.liquid         # Header with banner, search, custom button
│   ├── product-categories.liquid  # Product category grid
│   ├── organization-buttons.liquid  # Seasonal/Clearance buttons
│   └── footer.liquid         # Footer section
├── snippets/
│   └── meta-tags.liquid      # SEO meta tags
└── templates/
    ├── index.liquid          # Homepage
    ├── collection.liquid     # Collection pages
    ├── product.liquid        # Product pages
    ├── page.liquid           # Static pages
    ├── search.liquid         # Search results
    └── 404.liquid            # 404 error page
```

## Setup Instructions

### 1. Create Collections

Create the following collections in your Shopify admin:

- **3D Printing** (handle: `3d-printing`)
- **Laser Engraving** (handle: `laser-engraving`)
- **DTF Printing** (handle: `dtf-printing`)
- **Sublimation Printing** (handle: `sublimation-printing`)
- **Seasonal** (handle: `seasonal`) - Automated collection with condition: `Product tag = seasonal`
- **Clearance** (handle: `clearance`) - Automated collection with condition: `Product tag = clearance`

### 2. Tag Your Products

Apply the following tags to your products:

- `always` - For products always in stock
- `seasonal` - For seasonal items
- `clearance` - For clearance items
- Category-specific tags: `3d-printing`, `laser-engraving`, `dtf-printing`, `sublimation-printing`

### 3. Configure Theme Settings

1. Go to **Online Store > Themes**
2. Upload this theme
3. Click **Customize**
4. Configure:
   - Upload header banner image
   - Set custom/service order form URL
   - Customize colors and typography
   - Add category images in the Product Categories section
   - Add organization button images in the Organization Buttons section

### 4. Set Up Navigation

The theme uses the following URL structure:

- Homepage: `/`
- Collections: `/collections/{handle}`
- Products: `/products/{handle}`
- Search: `/search`
- Custom/Service: Set in theme settings

## Customization

### Colors

Edit color variables in `assets/theme.css`:

```css
:root {
  --color-primary: #1a1a1a;
  --color-secondary: #666666;
  --color-accent: #007bff;
  --color-background: #ffffff;
  --color-text: #333333;
}
```

### Layout

Adjust spacing and sizing variables in `assets/theme.css`:

```css
:root {
  --spacing-xs: 8px;
  --spacing-sm: 16px;
  --spacing-md: 24px;
  --spacing-lg: 32px;
  --spacing-xl: 48px;
  --max-width: 1200px;
}
```

### Banner Height

To adjust the maximum banner height, modify in `assets/theme.css`:

```css
.header-banner {
  max-height: 15vh; /* Adjust as needed */
}
```

## Product Category Pages

Each category collection page displays:

1. Products always in stock (tagged `#always`)
2. Seasonal items (tagged with category + `#seasonal`)
3. Clearance items (tagged with category + `#clearance`)

Products display visual tags indicating their status (always, seasonal, or clearance).

## Support

For theme support and customization requests, please contact your developer.

## Version

**Version**: 1.0.0
**Last Updated**: January 2026
