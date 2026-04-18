AutoParts Pro — Modern E-commerce Engine



\[!\[Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)](https://nextjs.org)

\[!\[React](https://img.shields.io/badge/React-18-blue?logo=react)](https://react.dev)

\[!\[TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org)

\[!\[Tailwind](https://img.shields.io/badge/Tailwind-3-cyan?logo=tailwind-css)](https://tailwindcss.com)



A professional, high-performance auto parts store built with Next.js 14 (App Router). This project features a complete sales funnel, professional admin dashboard, and advanced vehicle selection tools.



> Note for Developers: This is a frontend-heavy MVP. To provide maximum flexibility, no specific database is pre-connected. Data currently persists via optimized LocalStorage/Context API. The architecture is ready for seamless integration with PostgreSQL, Supabase, or MongoDB by updating the API layer.



🚀 Quick Start



1\. Install Dependencies:

 
npm install



2\. Run Development Server:

npm run dev



3\. Build for Production:

npm run build

npm run start


URL: `http://localhost:3000`



📦 Core Functionality



Key Features

Adaptive Design: Fully responsive, mobile-first UI.

Smart Search:\*\* Search by SKU or Part Number (exact and partial matches).

VIN Verification: Professional 17-character VIN search with input masking.

Vehicle Selector: Multi-step selection (Make → Model → Year → Engine).

Advanced Cart: Persistent shopping cart with cross-sell recommendations.

3-Step Checkout: Optimized flow with full form validation.

User Garage: Manage a list of personal vehicles for quick parts filtering.

SEO Optimized: Dynamic meta-tags and structured data for every product.



&#x20;Pages Overview (15+)

| Page | URL | Description |

|----------|-----|----------|

| Home | `/` | Banners, categories, trending products |

| Catalog | `/catalog` | Advanced filters, sorting, and pagination |

| Product | `/product/\[id]` | Photos, specs, compatibility, and reviews |

| Admin Panel | `/admin` | Full CRUD operations for products and orders |

| My Garage | `/account/garage` | Vehicle management for fast lookup |



🛠 Tech Stack



| Technology | Version | Purpose |

|------------|--------|------------|

| Next.js | 14.2.35 | Framework (App Router) |

| React | 18.3.1 | UI Library |

| TypeScript | 5.9.3 | Type Safety |

| Tailwind CSS | 3.4.19 | Styling |

| Lucide React | 0.344.0 | Iconography |

| Storage | LocalStorage | Demo data persistence |



🔐 Admin Dashboard

Access the management suite at `/admin` to:

Add, Edit, or Delete products.

Manage stock levels and categories.

Upload product images (Base64 ready).

Configure cross-reference numbers (Analogs).



🧪 Demo Test Data

Sample VINs for testing:

`JTDBU4EE3B9123456` — Toyota Camry 2011

`Z94CT41DBMR123456` — Kia Sportage 2021



📄 License

Standard Codester License.



Version: 1.0.0\*
