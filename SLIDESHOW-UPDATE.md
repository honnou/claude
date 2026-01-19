# Theme Update - Slideshow & Custom Button Fixes

## ✨ New Features Added

### 1. Product Slideshow in Categories!

Your category boxes now automatically display product photos from each collection as an animated slideshow!

**How it works:**
- Each category automatically pulls products from its collection
- Product images cycle through in a smooth fade transition
- Fully customizable through the theme editor

**Settings in Theme Editor:**
- **Enable product slideshow** - Toggle slideshow on/off (Default: ON)
- **Number of products to show** - Choose 3-10 products per category (Default: 5)
- **Slideshow speed** - Set transition speed from 2-10 seconds (Default: 3 seconds)

**To customize:**
1. Go to Shopify Admin → Customize Theme
2. Click on the **Product Categories** section
3. Adjust the slideshow settings to your preference

**What you'll see:**
- If slideshow is ON and products exist: Product photos cycle automatically
- If slideshow is OFF or no products: Shows category image or placeholder
- Smooth fade transitions between product images
- Hover effect still works - category boxes lift up on hover

---

### 2. Custom/Service Button Fixed! ✅

The Custom/Service Orders button is now back on the same line as the search bar!

**What was fixed:**
- Button now always appears next to the search bar
- Center-aligned layout maintained
- If you haven't set a URL yet, button shows as placeholder
- Easy to configure in Theme Settings → Header

**To set the button URL:**
1. Go to Shopify Admin → Customize Theme
2. Click **Theme Settings** in left sidebar
3. Find **Custom Links** section
4. Enter your **Custom/Service Order Form URL**
5. Save!

---

## 🎨 Visual Changes

### Homepage Layout (Updated):
1. **Header Banner** - 15% viewport height
2. **Search Bar + Custom Button** - On same line, center aligned ✨
3. **Product Categories** - Now with product slideshows! 🎬
4. **Organization Buttons** - Seasonal & Clearance

### Category Boxes Now Show:
- **Animated slideshow** of product photos (if enabled & products exist)
- **Smooth fade transitions** between images
- **Automatic cycling** at your chosen speed
- **Fallback** to category image or placeholder if no products

---

## 📋 What's Changed

### Files Modified:
- ✅ `sections/product-categories.liquid` - Added slideshow functionality
- ✅ `sections/header.liquid` - Fixed Custom/Service button to always display
- ✅ `assets/theme.css.liquid` - Added slideshow animation styles
- ✅ `config/settings_data.json` - Pre-configured slideshow settings

### New Features:
- 🎬 Product slideshow with fade transitions
- ⚙️ Customizable slideshow settings in theme editor
- 🔧 Custom/Service button always visible and configurable
- 🎨 Smooth animations with 0.8s fade effect

---

## 🚀 How to Use the Slideshow

### Automatic Setup:
1. **Upload the theme** (poly-people-printing-theme.zip)
2. **Create your collections** (3d-printing, laser-engraving, etc.)
3. **Add products to collections**
4. **That's it!** Slideshows will start automatically

### The slideshow will:
- Automatically fetch up to 5 products from each collection (customizable)
- Show the featured image of each product
- Cycle through images every 3 seconds (customizable)
- Fade smoothly between images

### Customization:
Go to **Customize Theme** → **Product Categories section**:
- Turn slideshow on/off
- Adjust number of products (3-10)
- Change transition speed (2-10 seconds)

---

## 🎯 Requirements for Slideshow to Work

For the slideshow to display:
1. ✅ Collections must be created in Shopify
2. ✅ Collection handles must match URLs in settings:
   - `/collections/3d-printing`
   - `/collections/laser-engraving`
   - `/collections/dtf-printing`
   - `/collections/sublimation-printing`
3. ✅ Products must be added to collections
4. ✅ Products must have featured images

**Fallback behavior:**
- If no products exist: Shows category image (if uploaded) or placeholder
- If slideshow is disabled: Shows category image or placeholder

---

## 💡 Pro Tips

### For Best Results:
- **Product images**: Use high-quality square images (600x600px or larger)
- **Slideshow speed**: 3-4 seconds works well for most stores
- **Number of products**: 5-7 products shows good variety without too much cycling
- **Mix it up**: Feature your best products in each collection

### Performance:
- Images are lazy-loaded for fast page load times
- Smooth CSS transitions (no jank!)
- Only images from first few products are loaded
- Minimal JavaScript for slideshow logic

---

## 🔧 Troubleshooting

**Slideshow not showing?**
- Check that collections exist with correct handles
- Verify products are added to collections
- Make sure products have featured images
- Check that slideshow is enabled in theme settings

**Custom/Service button missing?**
- It should always show now, even without a URL
- If missing, re-upload the theme
- Configure URL in Theme Settings → Custom Links

**Images not cycling?**
- Check browser console for JavaScript errors
- Verify at least 2 products exist in collection
- Try increasing slideshow speed to test

---

## 📦 Updated Theme Ready

**File**: `poly-people-printing-theme.zip` (19KB)

**What's included:**
- ✅ Product slideshow feature
- ✅ Custom/Service button fixed
- ✅ All previous features (color picker, singular tags, etc.)
- ✅ Pre-configured and ready to use

Upload and enjoy your new animated category sections! 🎉
