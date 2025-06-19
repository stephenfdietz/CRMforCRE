# AI Session Context for CRMforCRE

## Quick Project Summary
I'm working on **CRMforCRE**, a commercial real estate CRM prototype built with Next.js. This is a greenfield project for a SaaS company with 150 customers and 1200 buildings.

## Key Context for AI Assistant
- **User Learning Style**: I'm a novice programmer who wants explanations of what we're doing and why as we go
- **Current Phase**: Phase 2 complete - MVP with interactive stage management is working
- **Next Steps**: Backend integration, advanced features, production readiness

## What's Already Built ✅ (Updated: Dec 2024)
1. **6-Stage Pipeline System**: NEW → QUALIFIED → NEGOTIATING → LEASE_DRAFTING → CLOSED_WON/LOST
2. **OpportunitySpace Junction Table**: Handles multi-location deals with individual stages per space
3. **Interactive Stage Management**: Dropdown selectors on opportunity detail page update stages in real-time
4. **Competitive Intelligence**: Visual warnings when multiple tenants pursue same space
5. **Three Views**: 6-column kanban board, enhanced table view, comprehensive opportunity detail page
6. **Calendar Placeholder**: "Coming Soon" page with feature preview
7. **Documentation System**: Comprehensive README, technical design docs, and automated update tracking
8. **Development Tools**: Script-based documentation update helper and npm commands

## Core Innovation
**OpportunitySpace junction table** allows:
- Multi-building opportunities (e.g., tenant wants space in 3 cities)
- Individual stage tracking per space within same opportunity
- Competitive intelligence (Space 1205 pursued by 3 different opportunities)
- Space reservation logic when deals advance

## Current Architecture
- **Frontend**: Next.js 15, TypeScript, Tailwind, ShadCN/UI
- **Data Model**: Opportunity → OpportunitySpace → Building/Space
- **Stage System**: System stages (backend analytics) + Display names (customer customization)

## How to Help Me
1. **Always explain what you're doing** and why (I'm learning)
2. **Build on existing code** rather than starting over
3. **Focus on the opportunity detail page** - it demonstrates all key relationships
4. **Reference the documentation** in README.md and TECHNICAL_DESIGN.md

## Running the Project
```bash
npm install --legacy-peer-deps
npm run dev
# Visit http://localhost:3000/leasing
```

## Key URLs to Test
- `/leasing` - Kanban board with 6 stages
- `/leasing/opportunities/1` - Interactive opportunity detail
- Table view and calendar placeholder work

**Goal**: Get this frontend prototype ready for backend integration and production deployment. 