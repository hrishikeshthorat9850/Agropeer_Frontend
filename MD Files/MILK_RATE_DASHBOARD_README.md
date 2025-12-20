# Milk Rate Dashboard - Implementation Guide

## 📁 Folder Structure

```
app/
├── milk-rate-calculator/
│   ├── page.jsx                    # Main dashboard page
│   └── [id]/
│       └── page.jsx                # Company detail page
├── api/
│   └── milk-companies/
│       ├── route.js                # GET all companies with filters
│       └── [id]/
│           └── route.js            # GET single company with history

components/
└── milk-rate/
    ├── MilkCompanyCard.jsx         # Individual company card
    ├── MilkRateSearch.jsx          # Search bar component
    ├── MilkRateFilters.jsx         # Filter controls (milk type, region)
    ├── MilkRateList.jsx            # List container with loading/error states
    ├── MilkRateLoader.jsx          # Loading skeleton component
    ├── ComparisonCalculator.jsx   # Comparison calculator component
    └── index.js                    # Barrel export

database/
├── milk_companies_schema.sql       # Database schema
└── milk_companies_example_data.json  # Sample data
```

## 🗄️ Database Setup

### 1. Create the Tables

Run the SQL schema from `database/milk_companies_schema.sql` in your Supabase SQL editor:

```sql
-- Main companies table
CREATE TABLE IF NOT EXISTS public.milk_companies (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  milk_type TEXT,
  region TEXT,
  category TEXT,
  fat_rate NUMERIC(10, 2),
  snf_rate NUMERIC(10, 2),
  base_rate NUMERIC(10, 2),
  fat_multiplier NUMERIC(10, 2),
  snf_multiplier NUMERIC(10, 2),
  per_liter_rate NUMERIC(10, 2),
  contact_info JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT milk_companies_pkey PRIMARY KEY (id)
);

-- Historical rates table (optional)
CREATE TABLE IF NOT EXISTS public.milk_company_rates (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES public.milk_companies(id) ON DELETE CASCADE,
  fat_rate NUMERIC(10, 2),
  snf_rate NUMERIC(10, 2),
  base_rate NUMERIC(10, 2),
  per_liter_rate NUMERIC(10, 2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT milk_company_rates_pkey PRIMARY KEY (id)
);
```

### 2. Create Indexes

```sql
CREATE INDEX IF NOT EXISTS idx_milk_companies_milk_type ON public.milk_companies(milk_type);
CREATE INDEX IF NOT EXISTS idx_milk_companies_region ON public.milk_companies(region);
CREATE INDEX IF NOT EXISTS idx_milk_companies_updated_at ON public.milk_companies(updated_at DESC);
CREATE INDEX IF NOT EXISTS idx_milk_company_rates_company_id ON public.milk_company_rates(company_id);
CREATE INDEX IF NOT EXISTS idx_milk_company_rates_created_at ON public.milk_company_rates(created_at DESC);
```

### 3. Insert Sample Data

Use the example data from `database/milk_companies_example_data.json` or insert via Supabase dashboard.

## 🎨 Features Implemented

### Dashboard Page (`/milk-rate-calculator`)

✅ **Comparison Calculator**
- Input fields for Fat and SNF
- Calculates rate for all companies
- Highlights best-paying company
- Shows average comparison
- Real-time updates

✅ **Search Functionality**
- Real-time search by company name
- Clean search UI with clear button

✅ **Filtering**
- Milk Type filter (Cow, Buffalo, Mixed)
- Region filter (All Indian states)
- Clear filters option

✅ **Modern Card Layout**
- Company name with placeholder icon (initials)
- Milk type and region badges
- Fat rate, SNF rate, and base rate display
- Last updated timestamp
- "View Details" button

✅ **Loading States**
- Skeleton loaders matching card design
- Loading spinner for initial load

✅ **Error Handling**
- User-friendly error messages
- Retry functionality

✅ **Pagination**
- 12 companies per page
- Page navigation controls
- Smooth scroll to top on page change

### Company Details Page (`/milk-rate-calculator/[id]`)

✅ **Header Section**
- Large company name with placeholder icon
- Milk type and region badges
- Last updated timestamp
- Back button

✅ **About Section**
- Company description

✅ **Rate Breakdown**
- Fat rate display
- SNF rate display
- Base rate display
- Formula explanation (if applicable)

✅ **Smart Calculator**
- Fat input
- SNF input
- Quantity input
- Calculated rate per liter
- Total amount calculation
- Uses company's specific formula

✅ **Trend Section**
- Last 30 days historical rates (if available)
- Friendly message if no data
- Rate history display

✅ **Related Companies**
- Shows similar companies (same milk type or region)
- Company cards

## 🎯 Design System Alignment

All components follow the existing project patterns:

- **Colors**: Uses `farm-*` color palette
- **Typography**: Uses `font-display` for headings, `font-sans` for body
- **Components**: Uses `farm-card`, `farm-button` classes
- **Animations**: Framer Motion with consistent delays
- **Spacing**: Follows existing padding/margin patterns
- **Responsive**: Mobile-first approach
- **Icons**: Text-based initials in colored circles (no copyrighted logos)

## 📱 Responsive Design

- **Mobile**: Single column, collapsible filters, optimized layout
- **Tablet**: 2-column grid for cards
- **Desktop**: 3-column grid, expanded filters

## 🔧 API Endpoints

### GET `/api/milk-companies`

Query Parameters:
- `page` (default: 1)
- `limit` (default: 12, max: 50)
- `milkType` (optional: Cow, Buffalo, Mixed)
- `region` (optional)
- `category` (optional)
- `search` (optional)
- `orderBy` (default: updated_at)
- `order` (default: desc)

Response:
```json
{
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 12,
    "total": 50,
    "totalPages": 5,
    "hasNextPage": true,
    "hasPreviousPage": false
  }
}
```

### GET `/api/milk-companies/[id]`

Response:
```json
{
  "data": {
    ...company,
    "historicalRates": [...],
    "relatedCompanies": [...]
  }
}
```

## 🚀 Usage

1. **Set up the database** using the provided schema
2. **Insert sample data** from the example JSON file
3. **Navigate to** `/milk-rate-calculator` to see the dashboard
4. **Click any company** to view details

## 📝 Data Format

### Rate Calculation

Companies can use either:
1. **Formula-based**: `base_rate + fat × fat_multiplier + snf × snf_multiplier`
2. **Fixed rate**: `per_liter_rate` (if formula fields are null)

### Required Fields
- `id`: UUID (auto-generated)
- `name`: Text (required)

### Optional Fields
- `description`: Text
- `milk_type`: Text (Cow, Buffalo, Mixed)
- `region`: Text
- `category`: Text (Cooperative, Private, Government)
- `fat_rate`: Numeric (rate per unit of fat)
- `snf_rate`: Numeric (rate per unit of SNF)
- `base_rate`: Numeric (base rate for formula)
- `fat_multiplier`: Numeric (multiplier for fat in formula)
- `snf_multiplier`: Numeric (multiplier for SNF in formula)
- `per_liter_rate`: Numeric (fixed rate if not using formula)
- `contact_info`: JSONB (phone, email, address, website)

## 🎨 Customization

### Adding New Regions

Edit `components/milk-rate/MilkRateFilters.jsx`:
```javascript
const REGIONS = [
  "All Regions",
  "Your New Region",
  // ...
];
```

### Styling

All components use Tailwind classes and can be customized by:
- Modifying Tailwind classes in component files
- Updating `tailwind.config.js` for global changes
- Using CSS variables from `app/globals.css`

### Icon Placeholders

Company icons are generated from initials:
- "Amul" → "AM"
- "Mother Dairy" → "MD"
- Single word companies use first 2 letters

## ✅ Production Checklist

- [x] API routes with error handling
- [x] Loading states
- [x] Error states
- [x] Empty states
- [x] Responsive design
- [x] Accessibility (semantic HTML, ARIA labels)
- [x] SEO-friendly URLs
- [x] Pagination
- [x] Search and filters
- [x] Smooth animations
- [x] Mobile optimizations
- [x] Comparison calculator
- [x] Company details page
- [x] Historical rates (if data available)
- [x] Related companies
- [x] No copyrighted logos (text-based initials only)

## 🔄 Future Enhancements

Potential improvements:
1. **Rate Alerts** - Notify users when rates change
2. **Favorites** - Save preferred companies
3. **Rate Predictions** - Based on historical trends
4. **Bulk Calculator** - Calculate for multiple quantities
5. **Export Data** - Download rates as CSV/PDF
6. **Rate Comparison Charts** - Visual comparison graphs
7. **Company Reviews** - User ratings and reviews
8. **Payment History** - Track payments from companies
9. **Notifications** - Push notifications for rate updates
10. **Multi-language Support** - Using existing i18n system

## 📞 Support

For issues or questions, refer to:
- Existing component patterns in `components/ui/`
- API route patterns in `app/api/`
- Styling system in `app/globals.css` and `tailwind.config.js`
- Government Schemes and News implementations (similar patterns)

## 🔍 Key Features

1. **No External APIs**: All data from database
2. **No Copyrighted Logos**: Uses text-based initials in colored circles
3. **Formula Support**: Supports both formula-based and fixed rates
4. **Comparison Calculator**: Compare all companies at once
5. **Historical Tracking**: Optional historical rates table
6. **Smart Calculator**: Per-company calculator on detail page
7. **Related Companies**: Shows similar companies for easy comparison

