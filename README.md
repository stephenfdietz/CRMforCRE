# CRMforCRE - Commercial Real Estate CRM Platform

## Project Overview

**CRMforCRE** is a purpose-built CRM for commercial real estate Asset Managers and Executives. This is a greenfield Next.js prototype that will serve as the frontend foundation for a production SaaS platform.

### Business Context
- **Company**: SaaS business with 150 customers, 1200 buildings currently
- **Strategy**: CRM as entry point to sell additional workflows (HubSpot model)
- **Target Users**: Asset Managers, Executives, Brokers (brokers are first target personas)
- **Scale Requirements**: Must handle large portfolios (1,500+ buildings, thousands of deals)
- **Goal**: Fast MVP to production for important customers

## MVP Requirements

### Core Features (Phase 1 - ✅ COMPLETED)
1. **✅ Opportunity Object** - Central deal tracking entity
2. **✅ Opportunity Record View** - Detail page with editable attributes  
3. **✅ Kanban UI** - 6-stage pipeline management
4. **✅ List UI** - Alternative table view of opportunities
5. **✅ Custom Stage Labels** - Customer display names with system stage tracking
6. **✅ Contacts Integration** - People mapped to opportunities
7. **✅ Calendar Placeholder** - "Coming Soon" page for future development
8. **✅ Real Estate Visuals** - Building imagery, suite info, competitive intelligence
9. **✅ Multi-Space Support** - Handle opportunities across multiple buildings

### Enhanced Features (Phase 2 - ✅ COMPLETED)
- **✅ Interactive Stage Management** - Change stages from opportunity detail page
- **✅ Competitive Intelligence** - Space reservation warnings and competition tracking
- **✅ OpportunitySpace Junction** - Individual stages per space within opportunity
- **✅ Enhanced Activity Timeline** - Building-specific events and activities

## System Architecture

### 6-Stage Pipeline System
We implemented a sophisticated dual-stage architecture:

**System Stages (Backend - for analytics):**
1. `NEW` - Initial inquiry or lead
2. `QUALIFIED` - Qualified prospect with confirmed needs  
3. `NEGOTIATING` - Active negotiations and proposals
4. `LEASE_DRAFTING` - Legal review and lease documentation
5. `CLOSED_WON` - Deal successfully closed (triggers Lease object creation)
6. `CLOSED_LOST` - Deal lost or abandoned

**Display Names (Frontend - customizable per customer):**
- NEW → "Prospect" 
- QUALIFIED → "Qualified Lead"
- NEGOTIATING → "Hot Pursuit"
- LEASE_DRAFTING → "Legal Review"
- CLOSED_WON → "Deal Closed"
- CLOSED_LOST → "Lost Deal"

**Benefits:**
- Cross-customer analytics (average time NEW → CLOSED_WON)
- Flexible customer branding
- Consistent reporting across platform

### Core Data Model

#### Opportunity (Central Entity)
```typescript
{
  id: string
  name: string
  stage: SystemStage // Overall opportunity stage
  company: Company
  opportunitySpaces: OpportunitySpace[] // Junction table
  contacts: Person[]
  totalSF: string
  expectedValue: string
  dates: { targetClose, leaseStart, created, lastActivity }
  notes: string
  attachments: Attachment[]
}
```

#### OpportunitySpace (Junction Table - KEY INNOVATION)
```typescript
{
  id: string
  stage: SystemStage // Individual stage for this space
  reservationStatus: 'available' | 'reserved' | 'competing'
  competingOpportunities: string[] // Other opportunities considering this space
  lastUpdated: string
  stageHistory: StageHistory[]
  building: Building
  spaces: Space[]
  leaseTerms: LeaseTerms
}
```

**Why OpportunitySpace is Critical:**
- Handles multi-location deals (e.g., EcoVolt wanting space in 2 buildings)
- Tracks individual progress per space (Cobblestone at "Qualified", Innovation Tower at "Negotiating")
- Enables competitive intelligence (Suite 1205 being pursued by 3 tenants)
- Supports space reservation logic

#### Supporting Objects
- **Building** - Physical properties with amenities, parking, class
- **Space** - Leasable units within buildings (defined by Space Mapper tool)
- **Person** - Contacts with roles (tenant reps, decision makers, brokers)
- **Company** - Tenant companies, landlords, brokerage firms
- **Activity** - Events, tours, calls, emails tied to opportunities
- **Lease** - Created when opportunity reaches CLOSED_WON (separate lifecycle)

## Current Implementation Status

### ✅ What's Working (Updated: Dec 2024)
1. **Enhanced Opportunity Detail Page** (`/leasing/opportunities/[id]`)
   - Multi-building display with individual stage management
   - Interactive stage dropdowns that update in real-time
   - Competitive intelligence warnings (yellow alerts for competing spaces)
   - Comprehensive contact management with role identification
   - Building-specific document organization
   - Enhanced activity timeline with building context

2. **6-Column Kanban Board** (`/leasing`)
   - Complete 6-stage system (NEW → QUALIFIED → NEGOTIATING → LEASE_DRAFTING → CLOSED_WON/LOST)
   - System stages with customer display names
   - Competition level indicators on cards
   - Multi-space opportunity support with space count badges
   - Proper stage counts and visual hierarchy

3. **Enhanced Table View** 
   - Filterable and searchable interface
   - Competition indicators with colored dots
   - Stage badges using customer display names
   - Currency formatting and contact avatars
   - Direct links to opportunity detail pages

4. **Calendar Placeholder**
   - "Coming Soon" page with feature preview and planned functionality

5. **Documentation System**
   - Comprehensive project README with business context
   - Technical design document with database schema and API specs
   - AI session context file for easy conversation restoration
   - Automated documentation update tracking system

### 🐛 Known Issues (Updated: Dec 2024)
- ~~Some TypeScript type definitions need cleanup~~ - Partially resolved
- Mock data structure is solid, but could use more variety in examples
- Need proper error handling for stage change failures
- Stage change animations/transitions not implemented
- No validation for invalid stage transitions yet
- Documentation update script requires manual execution (semi-automated)

### 📁 Key Files (Updated: Dec 2024)
- `app/leasing/opportunities/[id]/page.tsx` - Interactive opportunity detail page with multi-space stage management
- `components/leasing/kanban-view.tsx` - 6-stage kanban board with competition indicators
- `components/leasing/table-view.tsx` - Enhanced searchable table view
- `components/leasing/calendar-view.tsx` - Coming soon placeholder page
- `README.md` - Complete project documentation and business context
- `TECHNICAL_DESIGN.md` - Database schema, API design, and technical architecture
- `AI_SESSION_CONTEXT.md` - Quick context for new AI sessions
- `DOCS_UPDATE_GUIDE.md` - Guide for maintaining documentation
- `docs-update.sh` - Interactive documentation update helper script

## Technical Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Components**: ShadCN/UI (Radix UI primitives)
- **Icons**: Lucide React

## Running the Project

```bash
npm install --legacy-peer-deps  # Handle React 19 compatibility
npm run dev                     # Start development server at localhost:3000

# Documentation Commands
npm run docs                    # Track documentation updates (interactive)
npm run docs-help              # Show documentation commands
./docs-update.sh               # Same as npm run docs
```

## Next Steps

### Phase 3 - Backend Integration
1. Connect stage management to actual backend API
2. Implement real-time updates across multiple users
3. Add proper authentication and authorization
4. Build Space Mapper tool integration

### Phase 4 - Advanced Features  
1. Drag-and-drop kanban functionality
2. Advanced search and filtering
3. Reporting dashboard
4. Mobile responsive design
5. Calendar view implementation

### Phase 5 - Production Readiness
1. Performance optimization
2. Error handling and loading states  
3. Comprehensive testing
4. Documentation for engineers

## Development Notes

### For New Chat Sessions
If starting a new chat session, provide this context:
- "I'm working on CRMforCRE, a commercial real estate CRM prototype"
- "We've implemented a 6-stage system with OpportunitySpace junction table"
- "The MVP includes opportunity detail page, kanban board, table view with interactive stage management"
- "Key innovation is handling multi-location deals with individual stages per space"

### For Engineers
- The frontend demonstrates the complete data model and user interactions
- OpportunitySpace junction table is the key architectural decision
- Stage management system balances customer flexibility with analytics consistency
- Focus on the opportunity detail page - it showcases all the complex relationships

## Business Impact

This prototype validates:
- **Scalability**: Can handle 1,500+ building portfolios  
- **Flexibility**: Supports simple single-space deals and complex multi-location expansions
- **Competitive Intelligence**: Unique feature for landlords to create urgency
- **User Experience**: Asset Manager and Broker-focused interface
- **Technical Foundation**: Solid architecture for rapid feature development

---

*Last Updated: Dec 2024 - Phase 2 Complete with Documentation System - Interactive stage management, enhanced UI, and comprehensive project documentation* 