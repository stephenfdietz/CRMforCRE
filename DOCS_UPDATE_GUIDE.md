# Documentation Update Guide

## 🎯 Goal
Keep README.md, TECHNICAL_DESIGN.md, and AI_SESSION_CONTEXT.md current as the project evolves.

## 📋 When to Update Documentation

### ✅ Always Update After:
- **New major features** (new pages, components, workflows)
- **Architecture changes** (new data models, API endpoints)
- **Phase completions** (MVP → Phase 3 → Phase 4)
- **Bug fixes that change behavior**
- **Before sharing with engineers**
- **Before switching computers/locations**

### 📝 Quick Update Checklist

#### After Each Development Session:
- [ ] Did we add/change any major features?
- [ ] Did we modify the data model or API design?
- [ ] Did we complete any MVP requirements?
- [ ] Are there new bugs or known issues?
- [ ] Did we change the tech stack or dependencies?

If YES to any → Update docs!

## 🚀 AI-Assisted Update Process

### For New AI Sessions:
**Use this prompt to update docs:**

```
I need to update my CRMforCRE documentation. Here's what we just accomplished:

[Describe what was built/changed]

Please update:
1. README.md - Current Implementation Status section
2. AI_SESSION_CONTEXT.md - What's Already Built section  
3. TECHNICAL_DESIGN.md - If architecture changed

Keep the same format and style, just add/modify the relevant sections.
```

### Documentation Priority Order:
1. **AI_SESSION_CONTEXT.md** - Most critical (30 seconds to update)
2. **README.md** - Status and next steps (2 minutes)
3. **TECHNICAL_DESIGN.md** - Only if architecture changed (5 minutes)

## 📖 Update Templates

### README.md Updates
```markdown
### ✅ What's Working (Updated: [DATE])
- [New feature] - [Brief description]
- [Enhanced feature] - [What changed]

### 🐛 Known Issues (Updated: [DATE])
- [New bug description]
- [Fixed: Previous bug] - ~~Fixed in [version/date]~~

### 📁 Key Files (Updated: [DATE])
- [New file] - [Purpose]
```

### AI_SESSION_CONTEXT.md Updates
```markdown
## What's Already Built ✅ (Updated: [DATE])
[X]. **[New Feature]**: [Description and why it matters]

## Current Architecture (Updated: [DATE])
- **[New Technology/Pattern]**: [Brief explanation]
```

### TECHNICAL_DESIGN.md Updates
```markdown
### [New Section] (Added: [DATE])
[Technical details of new architecture/patterns]

### Updated Schema (Modified: [DATE])
[New tables, fields, or relationships]
```

## 🤖 Semi-Automated Approach

### Create a Simple Update Script
```bash
#!/bin/bash
# docs-update.sh
echo "🔄 Updating documentation..."
echo "Last updated: $(date)" >> docs-update-log.txt
echo "What did you build today? (This will help update docs)"
read -p "> " UPDATE_DESC
echo "Update: $UPDATE_DESC" >> docs-update-log.txt
echo "📝 Remember to update:"
echo "  1. AI_SESSION_CONTEXT.md"
echo "  2. README.md status section" 
echo "  3. TECHNICAL_DESIGN.md if needed"
```

### Usage:
```bash
chmod +x docs-update.sh
./docs-update.sh
```

## 📅 Scheduled Review Process

### Weekly (5 minutes):
- Review `docs-update-log.txt`
- Update AI_SESSION_CONTEXT.md with major changes
- Update README.md status

### Before Major Milestones (15 minutes):
- Full review of all three documents
- Update version numbers/phase status
- Clean up outdated information

### Before Sharing (10 minutes):
- Ensure AI_SESSION_CONTEXT.md is current
- Update README.md with latest status
- Check that examples still work

## 🎯 Smart Update Triggers

### Git Hook Approach (Optional)
Create `.git/hooks/pre-commit`:
```bash
#!/bin/bash
echo "📝 Documentation check:"
echo "Have you updated docs for this commit? (y/n)"
read -p "> " DOCS_UPDATED
if [ "$DOCS_UPDATED" != "y" ]; then
    echo "💡 Consider updating documentation!"
    echo "Run: ./docs-update.sh"
fi
```

### Package.json Script
Add to package.json:
```json
{
  "scripts": {
    "docs": "echo '📝 Documentation Update Needed!' && echo 'Update: AI_SESSION_CONTEXT.md, README.md, TECHNICAL_DESIGN.md'"
  }
}
```

Run: `npm run docs`

## 🧠 Memory Aids

### Create Commit Message Template
```
feat: [description]

📝 Docs Impact:
- [ ] AI_SESSION_CONTEXT.md
- [ ] README.md
- [ ] TECHNICAL_DESIGN.md
- [ ] No doc changes needed
```

### Quick Reference Card
```
🚀 BUILT SOMETHING NEW?
├── 30 sec → Update AI_SESSION_CONTEXT.md
├── 2 min → Update README.md status
└── 5 min → Update TECHNICAL_DESIGN.md (if needed)

💡 SHARING WITH TEAM?
└── Double-check all docs are current!
```

## 📱 Mobile-Friendly Reminders

### Phone Notes Template:
```
CRMforCRE Dev Session [DATE]
Built: [Quick description]
Status: [Working/Bugs/Next]
Docs to update: AI_SESSION/README/TECHNICAL
```

---

**The key is consistency over perfection.** It's better to make quick, regular updates than perfect but infrequent ones! 