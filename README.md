This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `src/app/page.js`. The page auto-updates as you edit the file.

## Project Structure

```text
src/
├── app/          # App Router (pages, layout, SEO files)
├── components/   # common/ (Header, Footer), home/ (sections), ui/ (reusable UI)
├── constants/    # site.js (global site config)
├── data/         # content data
└── lib/          # utils (cn helper)
```

## Configuration and demo limitations

Contact and reservation email notifications require a Web3Forms access key. Add
the following to `.env.local` before running the app:

```text
NEXT_PUBLIC_WEB3FORMS_KEY=your_web3forms_access_key
```

Without this setting, the forms report that email delivery is unavailable
instead of claiming that a message was sent.

This project currently stores demo users, orders, reservations, and menu
changes in the browser's local storage. It does not provide production
authentication, shared server-side data, or online payment processing. Do not
use it to handle real customer accounts or payments until those services are
implemented.

Menu and order prices are displayed in USD. Language and currency selectors
have been removed from the header.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out the [Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
