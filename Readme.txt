## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager
- Supabase account (for database functionality)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd luxelashes-website
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Configure your Supabase project:
   - Create a new Supabase project
   - Add your project URL and anon key to `.env`
   - Run the database migrations in the Supabase SQL editor

5. Start the development server:
```bash
npm run dev
```

## Database Setup

The project includes SQL migrations to set up the required database tables:

- **services**: Service offerings with pricing and duration
- **business_hours**: Operating hours configuration
- **bookings**: Customer booking information and status

To set up the database:
1. Create a new Supabase project
2. Run the migration file in the Supabase SQL editor
3. Configure Row Level Security policies as needed

## Environment Variables

Create a `.env` file with the following variables:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
RESEND_API_KEY=your_resend_api_key (optional)
```
