# Uploading Your Theme to Shopify & Adding Your Logo

## 📤 How to Upload to Shopify

### Step 1: Download the Theme ZIP

The theme has been packaged as `poly-people-printing-theme.zip` (19KB).

**Download it from:**
- The repository: `/home/user/claude/poly-people-printing-theme.zip`
- Or from GitHub after I commit it

### Step 2: Upload to Shopify

1. **Log in to your Shopify Admin**
   - Go to: https://[your-store].myshopify.com/admin

2. **Navigate to Themes**
   - Click **Online Store** in the left sidebar
   - Click **Themes**

3. **Upload the Theme**
   - Scroll down to the **Theme Library** section
   - Click **Add theme** (top right)
   - Select **Upload zip file**
   - Choose `poly-people-printing-theme.zip`
   - Click **Upload**

4. **Preview Before Publishing**
   - Once uploaded, click **Actions** > **Preview**
   - Review the theme on your store
   - When satisfied, click **Actions** > **Publish**

---

## 🎨 Adding Your Business Logo & Custom Banner

### Option 1: Using Shopify Theme Editor (Easiest)

1. **Go to Theme Customization**
   - In Shopify Admin > Online Store > Themes
   - Click **Customize** on your active theme

2. **Add Your Header Banner Image**
   - Click on the **Header** section
   - Look for **Header Banner Image** setting
   - Click **Select image**
   - Upload your business banner/logo image
   - **Recommended size**: 1920px wide × 300px tall (or proportional)
   - The image will automatically scale to 15% of viewport height

3. **Add Custom/Service Order Form URL**
   - Still in Header settings
   - Find **Custom/Service Order Form URL**
   - Enter your order form link (e.g., Google Form, Typeform, or custom page)

4. **Save Changes**
   - Click **Save** in the top right

---

### Option 2: Adding Logo Programmatically

If you want to add a logo image that sits within the banner instead of replacing it:

#### Update the Header Section

Add this to `/shopify-theme/sections/header.liquid` in the schema settings:

```json
{
  "type": "image_picker",
  "id": "logo_image",
  "label": "Logo Image (Optional)",
  "info": "Logo will be displayed over the banner"
}
```

And update the header HTML to include the logo:

```liquid
<div class="header-banner header-banner--placeholder">
  {%- if section.settings.logo_image -%}
    <img
      src="{{ section.settings.logo_image | img_url: '300x' }}"
      alt="{{ shop.name }}"
      class="header-logo"
    >
  {%- else -%}
    <h1 class="site-name">{{ shop.name }}</h1>
  {%- endif -%}
</div>
```

#### Add Logo Styling to CSS

Add this to `/shopify-theme/assets/theme.css`:

```css
.header-logo {
  max-height: 120px;
  max-width: 400px;
  height: auto;
  width: auto;
  object-fit: contain;
}

@media (max-width: 768px) {
  .header-logo {
    max-height: 80px;
    max-width: 250px;
  }
}
```

---

## 🎨 Customizing Colors & Styling

### Through Shopify Theme Editor

I can add a settings schema that allows you to customize colors without touching code.

### Direct CSS Editing

To change colors directly, edit `/shopify-theme/assets/theme.css`:

```css
:root {
  --color-primary: #1a1a1a;      /* Main brand color (buttons, headers) */
  --color-secondary: #666666;     /* Secondary color */
  --color-accent: #007bff;        /* Links, search button */
  --color-background: #ffffff;    /* Page background */
  --color-text: #333333;          /* Text color */
  --color-border: #e0e0e0;        /* Borders */
}
```

---

## 📸 Recommended Image Sizes

### Header Banner
- **Desktop**: 1920px × 300px (15% of 1080p screen)
- **Mobile**: Will auto-scale, but ensure logo/text is centered

### Product Category Images
- **Size**: 600px × 600px (square)
- **Format**: JPG or PNG
- **File size**: Under 200KB for fast loading

### Organization Button Images (Seasonal/Clearance)
- **Size**: 600px × 600px (square)
- **Format**: JPG or PNG

### Product Images
- **Size**: 1000px × 1000px or larger (square recommended)
- **Format**: JPG or PNG

---

## 🎯 Quick Start Checklist

After uploading to Shopify:

- [ ] Upload theme ZIP to Shopify
- [ ] Add header banner image in theme customizer
- [ ] Set custom/service order form URL
- [ ] Create 4 main collections (3D Printing, Laser Engraving, DTF, Sublimation)
- [ ] Create automated collections for Seasonal and Clearance (tag-based)
- [ ] Add product category images in theme customizer
- [ ] Add seasonal/clearance button images
- [ ] Tag your products with: `always`, `seasonal`, `clearance`
- [ ] Test on mobile and desktop
- [ ] Publish theme!

---

## 🔧 Need Help?

**Want me to:**
1. Add logo support to the theme?
2. Create a color customizer in the theme editor?
3. Add more customization options?
4. Help with specific styling changes?

Just let me know!
