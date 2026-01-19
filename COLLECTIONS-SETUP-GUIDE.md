# Collections Setup Guide - Making Your Categories Work

## ✅ What's Been Fixed

### 1. Tag Labels Changed to Singular
- ✅ "Seasonal Items" → "Seasonal Item"
- ✅ "Clearance Items" → "Clearance Item"

### 2. Categories Pre-Configured
The 4 product categories and 2 organization buttons are now pre-configured in the theme and will display automatically!

---

## 🔧 Why Categories Weren't Showing Up

The categories are **configured and ready**, but they link to **collections that need to be created in Shopify**. The theme is looking for these collection URLs:

**Product Categories:**
- `/collections/3d-printing`
- `/collections/laser-engraving`
- `/collections/dtf-printing`
- `/collections/sublimation-printing`

**Organization Collections:**
- `/collections/seasonal`
- `/collections/clearance`

---

## 📋 Step-by-Step: Create Your Collections

### Step 1: Create the 4 Main Product Collections

1. **Go to Shopify Admin** → Products → Collections
2. **Click "Create collection"**
3. **For each category, create a collection:**

#### Collection 1: 3D Printing
- **Title**: `3D Printing`
- **Collection type**: Manual
- **Handle**: Make sure it's `3d-printing` (Shopify auto-generates this)
- **Save**

#### Collection 2: Laser Engraving
- **Title**: `Laser Engraving and Cutting`
- **Collection type**: Manual
- **Handle**: Make sure it's `laser-engraving`
- **Save**

#### Collection 3: DTF Printing
- **Title**: `Direct to Film Printing`
- **Collection type**: Manual
- **Handle**: Make sure it's `dtf-printing`
- **Save**

#### Collection 4: Sublimation
- **Title**: `Sublimation Printing`
- **Collection type**: Manual
- **Handle**: Make sure it's `sublimation-printing`
- **Save**

---

### Step 2: Create the Automated Organization Collections

#### Collection 5: Seasonal (Automated)
1. **Title**: `Seasonal`
2. **Collection type**: **Automated**
3. **Conditions**:
   - Product tag IS EQUAL TO `seasonal`
4. **Handle**: Make sure it's `seasonal`
5. **Save**

#### Collection 6: Clearance (Automated)
1. **Title**: `Clearance`
2. **Collection type**: **Automated**
3. **Conditions**:
   - Product tag IS EQUAL TO `clearance`
4. **Handle**: Make sure it's `clearance`
5. **Save**

---

## 🏷️ How to Tag Your Products

For products to appear in the right places, tag them correctly:

### Main Category Tags:
Use these to manually add products to your main collections:
- Add to **3D Printing** collection manually
- Add to **Laser Engraving** collection manually
- Add to **DTF Printing** collection manually
- Add to **Sublimation** collection manually

### Status Tags (Appear as Badges):
Add these tags to your products, and they'll:
1. Get a colored badge on the product
2. Automatically appear in Seasonal/Clearance collections (if configured as automated)

**Available Tags:**
- `always` = Shows green "Always In Stock" badge
- `seasonal` = Shows yellow "Seasonal Item" badge + auto-adds to Seasonal collection
- `clearance` = Shows red "Clearance Item" badge + auto-adds to Clearance collection

---

## 💡 Example: How to Set Up a Product

Let's say you have **"PLA Filament - 1kg"**:

### Step 1: Add to Main Collection
1. Go to Products → Collections → "3D Printing"
2. Click "Add products"
3. Select "PLA Filament - 1kg"
4. Save

### Step 2: Add Status Tags
1. Go to Products → All products
2. Click "PLA Filament - 1kg"
3. In the **Tags** field, add:
   - `always` (if it's always in stock)
   - `seasonal` (if it's a seasonal item)
   - `clearance` (if it's on clearance)
4. Save

---

## 🎯 Quick Setup Checklist

After uploading the new theme:

- [ ] Create 4 main collections (3D Printing, Laser Engraving, DTF, Sublimation)
- [ ] Create 2 automated collections (Seasonal, Clearance) with tag conditions
- [ ] Add products to their main collections manually
- [ ] Tag products with `always`, `seasonal`, or `clearance` as appropriate
- [ ] Refresh your homepage - categories should now show up!
- [ ] Click each category to verify products appear
- [ ] Check that Seasonal and Clearance buttons work

---

## 🔍 Verification

Once set up, you should see:

**Homepage:**
- ✅ 4 category boxes (3D Printing, Laser Engraving, DTF, Sublimation)
- ✅ 2 organization buttons (Seasonal, Clearance)

**Category Pages:**
- ✅ Products with appropriate badges (green, yellow, red)

**Product Pages:**
- ✅ "Seasonal Item" or "Clearance Item" badges (singular form)

---

## ⚙️ Optional: Add Category Images

To make categories look better:

1. Go to **Customize** theme
2. Find the **"Product Categories"** section
3. For each category block:
   - Upload an image (600×600px recommended)
   - The placeholder will be replaced with your image

Same for Organization Buttons!

---

## 🆘 Troubleshooting

**Categories still not showing?**
- Make sure collection handles match exactly (no spaces, use hyphens)
- Check that collections are published
- Clear browser cache (Ctrl+Shift+R)

**Products not appearing in collections?**
- For manual collections: Add products manually
- For automated collections: Check product tags match exactly

**Badges not showing?**
- Check product tags are spelled correctly: `always`, `seasonal`, `clearance` (all lowercase)
- Tags are case-sensitive!

---

## 📦 New Theme ZIP Ready

The updated theme with all fixes is ready to upload:
- ✅ Singular tag labels ("Seasonal Item", "Clearance Item")
- ✅ Categories pre-configured
- ✅ Ready to connect to your collections

**File**: `poly-people-printing-theme.zip`

Upload and follow this guide to get everything working! 🚀
