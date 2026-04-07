<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics into Padmalaya Textiles. The existing client-side `PostHogProvider` was upgraded with the `defaults`, `capture_exceptions`, and `/ingest` reverse-proxy options. A new server-side PostHog client was created and wired into the enquiry submission server action. New client-side events were added for admin login, collection expansion, sample requests, and form errors. The `next.config.ts` was updated with PostHog reverse-proxy rewrites to reduce ad-blocker interference.

| Event | Description | File |
|---|---|---|
| `product_viewed` | Product detail page opened (funnel top) | `src/components/ui/ProductViewTracker.tsx` |
| `product_added_to_quote` | User added a product to their quote basket | `src/context/QuoteContext.tsx` |
| `product_removed_from_quote` | User removed a product from their quote basket | `src/context/QuoteContext.tsx` |
| `quote_form_submitted` | Client-side: quote/enquiry form submitted successfully | `src/components/sections/ContactSection.tsx` |
| `quote_form_error` | Quote form submission failed (server or network error) | `src/components/sections/ContactSection.tsx` |
| `enquiry_submitted` | **Server-side**: enquiry persisted to DB and emails dispatched | `src/app/actions/enquiry.ts` |
| `sample_requested` | User clicked "Request Sample" on a product detail page | `src/components/ui/SampleRequestLink.tsx` |
| `collection_expanded` | User expanded the collapsed product collection grid | `src/components/sections/CollectionGrid.tsx` |
| `admin_logged_in` | Admin successfully authenticated via the admin portal | `src/app/admin/login/page.tsx` |
| `admin_login_failed` | Admin login attempt failed | `src/app/admin/login/page.tsx` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- **Dashboard — Analytics basics**: https://us.posthog.com/project/372208/dashboard/1438560
- **Quote Request Conversion Funnel** (product_viewed → product_added_to_quote → quote_form_submitted): https://us.posthog.com/project/372208/insights/jrnHKMdy
- **Enquiries Submitted Over Time** (daily server-confirmed conversions): https://us.posthog.com/project/372208/insights/vvPLP4YZ
- **Product Engagement: Views, Quotes & Sample Requests** (drop-off analysis): https://us.posthog.com/project/372208/insights/G3GbskHA
- **Quote Form Success vs Error Rate** (reliability monitoring): https://us.posthog.com/project/372208/insights/AmUOyOqC

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
