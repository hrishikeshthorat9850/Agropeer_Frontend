# News Feature - Implementation Guide

## 📁 Folder Structure

```
app/
├── news/
│   ├── page.jsx                    # Main news listing page
│   └── [id]/
│       └── page.jsx                # News detail page
├── api/
│   └── news/
│       ├── route.js                # GET all news with filters (already exists)
│       └── [id]/
│           └── route.js            # GET single news (already exists)

components/
└── news/
    ├── NewsCard.jsx                # Individual news card
    ├── NewsSearch.jsx              # Search bar component
    ├── NewsFilterBar.jsx           # Category filter controls
    ├── NewsList.jsx                # List container with loading/error states
    ├── NewsLoader.jsx              # Loading skeleton component
    └── index.js                    # Barrel export

database/
├── news_schema.sql                 # Database schema
└── news_example_data.json          # Sample data
```

## 🗄️ Database Setup

### 1. Table Structure

The `news` table should have the following structure (if not already created):

```sql
CREATE TABLE IF NOT EXISTS public.news (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  summary TEXT,
  content TEXT NOT NULL,
  category TEXT,
  image_url TEXT,
  source TEXT,
  date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT news_pkey PRIMARY KEY (id)
);
```

### 2. Indexes

```sql
CREATE INDEX IF NOT EXISTS idx_news_category ON public.news(category);
CREATE INDEX IF NOT EXISTS idx_news_date ON public.news(date DESC);
CREATE INDEX IF NOT EXISTS idx_news_created_at ON public.news(created_at DESC);
```

### 3. Sample Data

Use the example data from `database/news_example_data.json` or insert via Supabase dashboard.

## 🎨 Features Implemented

### Listing Page (`/news`)

✅ **Search Functionality**
- Real-time search across title, summary, and content
- Clean search UI with clear button
- Debounced search for better performance

✅ **Category Filtering**
- Filter by categories: Agriculture, Market Rates, Government Updates, Weather, Dairy, Technology, etc.
- "All" option to show all categories
- Clear filter button
- Mobile-responsive filter panel

✅ **Modern Grid Layout**
- Responsive grid: 1 column (mobile), 2 columns (tablet), 3 columns (desktop)
- Clean card design with hover effects
- Image thumbnails with lazy loading
- Category badges
- Relative date formatting (e.g., "2 days ago")

✅ **News Card Features**
- Title with line clamp
- Summary/description preview
- Thumbnail image (if available)
- Category label with icon
- Published date (relative format)
- "Read More" button with arrow animation

✅ **Loading States**
- Skeleton loaders matching card design
- Loading spinner for initial load

✅ **Error Handling**
- User-friendly error messages
- Retry functionality

✅ **Pagination**
- 12 articles per page
- Page navigation controls
- Smooth scroll to top on page change
- Results count display

### Detail Page (`/news/[id]`)

✅ **Header Section**
- Large title with gradient background
- Category badge
- Published date (full format)
- Source/author information
- Back button

✅ **Content Section**
- Featured image (full width, responsive)
- Summary/lead text in highlighted box
- Full article content
- Proper typography and spacing
- Line breaks preserved

✅ **UX Enhancements**
- Smooth animations using Framer Motion
- Share functionality (WhatsApp, Copy Link)
- Previous/Next article navigation
- Related articles section (same category)
- Responsive design
- Consistent with project styling

✅ **Additional Features**
- Breadcrumb navigation (back button)
- Share buttons with visual feedback
- Related news cards
- Next/Previous article links

## 🎯 Design System Alignment

All components follow the existing project patterns:

- **Colors**: Uses `farm-*` color palette
- **Typography**: Uses `font-display` for headings, `font-sans` for body
- **Components**: Uses `farm-card`, `farm-button` classes
- **Animations**: Framer Motion with consistent delays
- **Spacing**: Follows existing padding/margin patterns
- **Responsive**: Mobile-first approach

## 📱 Responsive Design

- **Mobile**: Single column, collapsible filters, optimized images
- **Tablet**: 2-column grid for cards
- **Desktop**: 3-column grid, expanded filters

## 🔧 API Endpoints

### GET `/api/news`

Query Parameters:
- `page` (default: 1)
- `limit` (default: 12, max: 50)
- `category` (optional)
- `search` (optional)
- `orderBy` (default: date)
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

### GET `/api/news/[id]`

Response:
```json
{
  "data": {
    ...article,
    "relatedNews": [...],
    "prevArticle": {...},
    "nextArticle": {...}
  }
}
```

## 🚀 Usage

1. **Ensure the database table exists** (check Supabase dashboard)
2. **Insert sample data** from the example JSON file if needed
3. **Navigate to** `/news` to see the listing page
4. **Click any article** to view details

## 📝 Data Format

### Required Fields
- `id`: UUID (auto-generated)
- `title`: Text (required)
- `content`: Text (required)
- `date`: Timestamp (defaults to NOW())

### Optional Fields
- `summary`: Text (short description)
- `category`: Text (Agriculture, Market Rates, etc.)
- `image_url`: Text (URL to featured image)
- `source`: Text (news source or author name)

## 🎨 Customization

### Adding New Categories

Edit `components/news/NewsFilterBar.jsx`:
```javascript
const CATEGORIES = [
  "All",
  "Agriculture",
  "Your New Category",
  // ...
];
```

### Styling

All components use Tailwind classes and can be customized by:
- Modifying Tailwind classes in component files
- Updating `tailwind.config.js` for global changes
- Using CSS variables from `app/globals.css`

### Date Formatting

The components use `date-fns` for relative date formatting (e.g., "2 days ago"). To change the format:

1. Modify `formatDate` function in `NewsCard.jsx`
2. Modify `formatDate` function in `app/news/[id]/page.jsx`

## ✅ Production Checklist

- [x] API routes with error handling (already existed)
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
- [x] Image optimization (Next.js Image component)
- [x] Related articles
- [x] Previous/Next navigation

## 🔄 Future Enhancements

Potential improvements:
1. **Bookmark/Favorite** articles for logged-in users
2. **Comments Section** for articles
3. **Reading Time** estimation
4. **Print Article** functionality
5. **Email Newsletter** subscription
6. **Push Notifications** for breaking news
7. **Video Content** support
8. **Author Profiles** and bio pages
9. **Article Tags** for better categorization
10. **Trending Articles** section
11. **Most Read** articles sidebar
12. **Article Search History** for users

## 📞 Support

For issues or questions, refer to:
- Existing component patterns in `components/ui/`
- API route patterns in `app/api/`
- Styling system in `app/globals.css` and `tailwind.config.js`
- Government Schemes implementation (similar pattern)

## 🔍 Key Differences from Government Schemes

1. **Date Formatting**: Uses relative dates ("2 days ago") instead of absolute dates
2. **Image Handling**: Uses Next.js Image component for optimization
3. **Content Display**: Supports HTML content with proper formatting
4. **Navigation**: Includes Previous/Next article navigation
5. **Source Attribution**: Displays article source/author

## 📦 Dependencies

- `date-fns`: Already installed (v4.1.0) - used for date formatting
- `framer-motion`: Already installed - used for animations
- `next/image`: Built-in Next.js component - used for optimized images
- `react-icons`: Already installed - used for icons

All dependencies are already present in the project, no new installations required.

