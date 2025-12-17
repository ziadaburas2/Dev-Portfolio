# Design Guidelines: Personal CV Web Application

## Design Approach
**Reference-Based Approach**: Drawing inspiration from modern developer portfolios (Linear, Vercel, GitHub) with emphasis on clean, professional presentation that showcases work effectively. This is a developer portfolio where credibility and clarity are paramount.

## Core Design Principles
1. **Content-First**: Information hierarchy prioritizes showcasing work and expertise
2. **Professional Polish**: Clean, trustworthy aesthetic that builds confidence
3. **Scannable Layout**: Easy navigation between CV, projects, products, and contact
4. **Dashboard Clarity**: Admin interface focuses on efficient content management

---

## Typography System

**Font Stack**:
- Primary: 'Inter' or 'Space Grotesk' (headers, UI elements)
- Body: 'Inter' (all content)

**Hierarchy**:
- Hero/Main Title: text-5xl to text-6xl, font-bold
- Section Headers: text-3xl to text-4xl, font-semibold
- Subsections: text-xl to text-2xl, font-medium
- Body Text: text-base to text-lg
- Captions/Meta: text-sm, slightly muted

---

## Layout System

**Spacing Units**: Use Tailwind units of 4, 6, 8, 12, 16, 20 for consistent rhythm (p-4, mb-8, gap-12, etc.)

**Container Strategy**:
- Public pages: max-w-6xl centered
- Dashboard: max-w-7xl for data tables

---

## Page-Specific Design

### 1. Homepage (CV/About Me)

**Hero Section** (60-70vh):
- Professional developer photo (circular or rounded-lg, 200-300px)
- Name as primary heading
- Brief tagline/role description
- Email and social links prominently displayed
- Clean, centered layout with ample whitespace

**About Section**:
- Two-column layout on desktop (bio text + key info sidebar)
- Bio paragraph with comfortable line-height (leading-relaxed)
- Skills/technologies as pill-style badges
- Download CV button (if applicable)

### 2. Projects Page

**Layout**: Masonry-style or card grid (2-3 columns on desktop, 1 on mobile)

**Project Cards**:
- Project title as heading (text-xl, font-semibold)
- Brief description (2-3 lines, text-base)
- Link button or external icon if URL provided
- Consistent card padding (p-6 to p-8)
- Subtle border or shadow for depth
- Hover state: slight elevation or border emphasis

### 3. Products Page

**Layout**: Vertical list or 2-column grid

**Product Cards**:
- Product name (text-2xl, font-semibold)
- Detailed description (paragraph format, max-w-prose)
- Visual separation between products (border-b or spacing)
- Organized, readable presentation

### 4. Contact Us Page

**Simple, Direct Layout**:
- Contact heading
- Developer email prominently displayed
- Social media links with icons (GitHub, LinkedIn, Twitter, etc.)
- Optional contact form for inquiries
- Location/timezone info if relevant
- No unnecessary complexity

### 5. Admin Dashboard

**Authentication Page**:
- Centered login form (max-w-sm)
- Username and password fields
- Clean, minimal design
- "Login to Dashboard" heading

**Dashboard Layout**:
- Sidebar navigation (fixed, w-64):
  - Dashboard Home
  - Profile Management
  - Projects Management
  - Products Management
  - Logout
- Main content area:
  - Page header with title and primary action (Add New)
  - Data tables for listing items
  - Edit/Delete action buttons per row
  - Forms for add/edit (single column, max-w-2xl)

**Data Tables**:
- Clear column headers
- Alternating row backgrounds for readability
- Action buttons right-aligned
- Responsive: stack on mobile

**Forms**:
- Clear labels above inputs
- Input fields: full width, adequate padding (px-4, py-3)
- Text areas for descriptions (min-h-32)
- Save/Cancel buttons (primary/secondary styling)
- Form validation feedback

---

## Navigation

**Public Site Header**:
- Logo/Name on left
- Nav links on right (CV, Projects, Products, Contact)
- Sticky or fixed top navigation
- Mobile: hamburger menu

**Dashboard Header**:
- App title/logo
- User indicator
- Logout option

---

## Component Library

**Buttons**:
- Primary: Solid background, medium padding (px-6, py-3)
- Secondary: Outline style
- Sizes: sm (text-sm, px-4, py-2), md (default), lg (px-8, py-4)

**Cards**:
- Border or subtle shadow
- Padding: p-6 to p-8
- Rounded corners: rounded-lg

**Form Inputs**:
- Border style with focus state
- Padding: px-4, py-3
- Full width in forms

**Badges/Pills** (for skills/tags):
- Small, rounded-full
- Inline-flex with gap-2

**Icons**: Use Heroicons via CDN for consistency

---

## Images

**Developer Photo**: Professional headshot, 400x400px minimum, displayed prominently on homepage hero section. Circular or rounded treatment.

**Project Thumbnails** (optional): If projects have visual representations, use 16:9 aspect ratio thumbnails in project cards.

No large background hero images needed - the focus is on content and clarity.

---

## Accessibility & Polish

- Consistent focus states on all interactive elements
- Semantic HTML structure
- Proper heading hierarchy (h1 → h2 → h3)
- Adequate color contrast (though colors not specified here)
- Responsive breakpoints: mobile (base), tablet (md), desktop (lg)

---

## Key Differentiators

- **Minimalist Confidence**: Less is more - don't overcomplicate
- **Developer-Focused**: Technical credibility through clean design
- **Efficient Dashboard**: Admin area prioritizes quick content updates
- **Portfolio Excellence**: Projects and products presented as professional work samples