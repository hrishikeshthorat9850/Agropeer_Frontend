# Government Schemes Feature - Implementation Guide

## 📁 Folder Structure

```
app/
├── government-schemes/
│   ├── page.jsx                    # Main listing page
│   └── [id]/
│       └── page.jsx                # Scheme detail page
├── api/
│   └── government-schemes/
│       ├── route.js                # GET all schemes with filters
│       └── [id]/
│           └── route.js            # GET single scheme

components/
└── government-schemes/
    ├── SchemeCard.jsx              # Individual scheme card
    ├── SchemeSearch.jsx             # Search bar component
    ├── SchemeFilterBar.jsx          # Filter controls (category, state)
    ├── SchemeList.jsx               # List container with loading/error states
    ├── SchemeLoader.jsx             # Loading skeleton component
    └── index.js                     # Barrel export

database/
├── government_schemes_schema.sql    # Database schema
└── government_schemes_example_data.json  # Sample data
```

## 🗄️ Database Setup

### 1. Create the Table

Run the SQL schema from `database/government_schemes_schema.sql` in your Supabase SQL editor:

```sql
CREATE TABLE IF NOT EXISTS public.government_schemes (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  tagline TEXT,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  state TEXT,
  icon TEXT,
  benefits JSONB,
  eligibility JSONB,
  documents JSONB,
  application_steps JSONB,
  official_links JSONB,
  faqs JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT government_schemes_pkey PRIMARY KEY (id)
);
```

### 2. Create Indexes

```sql
CREATE INDEX IF NOT EXISTS idx_government_schemes_category ON public.government_schemes(category);
CREATE INDEX IF NOT EXISTS idx_government_schemes_state ON public.government_schemes(state);
CREATE INDEX IF NOT EXISTS idx_government_schemes_created_at ON public.government_schemes(created_at DESC);
```

### 3. Insert Sample Data

Use the example data from `database/government_schemes_example_data.json` or insert via Supabase dashboard.

## 🎨 Features Implemented

### Listing Page (`/government-schemes`)

✅ **Search Functionality**
- Real-time search across title, description, and benefits
- Clean search UI with clear button

✅ **Filtering**
- Category filter (Agriculture, Business, Women, Kisan Credit, Insurance, etc.)
- State filter (All Indian states)
- Clear filters option

✅ **Modern Card Layout**
- Scheme name with icon
- Category badge
- Short description
- Key benefits preview (first 2)
- State indicator
- "View Details" button with hover effects

✅ **Loading States**
- Skeleton loaders matching the card design
- Loading spinner for initial load

✅ **Error Handling**
- User-friendly error messages
- Retry functionality

✅ **Pagination**
- 12 schemes per page
- Page navigation controls
- Smooth scroll to top on page change

### Detail Page (`/government-schemes/[id]`)

✅ **Hero Section**
- Large scheme title with icon
- Tagline
- Category and state badges
- Back button

✅ **Content Sections**
- **Overview**: Full description
- **Key Benefits**: Bulleted list
- **Eligibility Criteria**: Requirements list
- **Required Documents**: Document checklist
- **How to Apply**: Step-by-step instructions
- **Official Links**: External website buttons
- **FAQ Section**: Accordion-style Q&A
- **Related Schemes**: Cards from same category

✅ **UX Enhancements**
- Smooth animations using Framer Motion
- Sticky "Apply Now" button on mobile
- Share functionality (WhatsApp, Copy Link)
- Responsive design
- Consistent with project styling

## 🎯 Design System Alignment

All components follow the existing project patterns:

- **Colors**: Uses `farm-*` color palette
- **Typography**: Uses `font-display` for headings, `font-sans` for body
- **Components**: Uses `farm-card`, `farm-button` classes
- **Animations**: Framer Motion with consistent delays
- **Spacing**: Follows existing padding/margin patterns
- **Responsive**: Mobile-first approach

## 📱 Responsive Design

- **Mobile**: Single column, collapsible filters, sticky apply button
- **Tablet**: 2-column grid for cards
- **Desktop**: 3-column grid, expanded filters

## 🔧 API Endpoints

### GET `/api/government-schemes`

Query Parameters:
- `page` (default: 1)
- `limit` (default: 12, max: 50)
- `state` (optional)
- `category` (optional)
- `search` (optional)
- `orderBy` (default: created_at)
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

### GET `/api/government-schemes/[id]`

Response:
```json
{
  "data": {
    ...scheme,
    "relatedSchemes": [...]
  }
}
```

## 🚀 Usage

1. **Set up the database** using the provided schema
2. **Insert sample data** from the example JSON file
3. **Navigate to** `/government-schemes` to see the listing page
4. **Click any scheme** to view details

## 📝 Data Format

### Benefits, Eligibility, Documents, Application Steps

Can be stored as:
- **Array of strings**: `["Benefit 1", "Benefit 2"]`
- **Array of objects**: `[{"text": "Benefit 1"}, {"text": "Benefit 2"}]`

### Official Links

Can be stored as:
- **Single URL string**: `"https://example.com"`
- **Array of objects**: `[{"label": "Website", "url": "https://example.com"}]`

### FAQs

Stored as array of objects:
```json
[
  {
    "question": "Question text?",
    "answer": "Answer text"
  }
]
```

Or alternative format:
```json
[
  {
    "q": "Question text?",
    "a": "Answer text"
  }
]
```

## 🎨 Customization

### Adding New Categories

Edit `components/government-schemes/SchemeFilterBar.jsx`:
```javascript
const CATEGORIES = [
  "All",
  "Agriculture",
  "Your New Category",
  // ...
];
```

### Adding New States

Edit the `INDIAN_STATES` array in `SchemeFilterBar.jsx`.

### Styling

All components use Tailwind classes and can be customized by:
- Modifying Tailwind classes in component files
- Updating `tailwind.config.js` for global changes
- Using CSS variables from `app/globals.css`

## ✅ Production Checklist

- [x] API routes with error handling
- [x] Loading states
- [x] Error states
- [x] Empty states
- [x] Responsive design
- [x] Accessibility (semantic HTML, ARIA labels)
- [x] SEO-friendly URLs
- [x] Share functionality
- [x] Pagination
- [x] Search and filters
- [x] Smooth animations
- [x] Mobile optimizations

## 🔄 Future Enhancements

Potential improvements:
1. **Bookmark/Favorite** schemes for logged-in users
2. **Application Status Tracking** for applied schemes
3. **Notifications** for new schemes matching user criteria
4. **PDF Downloads** for scheme documents
5. **Multi-language Support** using existing i18n system
6. **Scheme Comparison** feature
7. **User Reviews/Ratings** for schemes
8. **Application Form** integration
9. **Calendar Reminders** for application deadlines
10. **Analytics** for popular schemes

## 📞 Support

For issues or questions, refer to:
- Existing component patterns in `components/ui/`
- API route patterns in `app/api/`
- Styling system in `app/globals.css` and `tailwind.config.js`

