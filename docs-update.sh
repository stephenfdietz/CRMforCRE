#!/bin/bash

# CRMforCRE Documentation Update Helper
# Run this after development sessions to track changes

echo "🔄 CRMforCRE Documentation Update Helper"
echo "========================================"
echo ""

# Create log file if it doesn't exist
if [ ! -f docs-update-log.txt ]; then
    echo "# CRMforCRE Development Log" > docs-update-log.txt
    echo "Started: $(date)" >> docs-update-log.txt
    echo "" >> docs-update-log.txt
fi

# Get current session info
echo "📅 Date: $(date)" >> docs-update-log.txt
echo ""
echo "What did you build/change in this session?"
echo "(Be brief - this helps track what needs documenting)"
read -p "➤ " UPDATE_DESC

if [ -n "$UPDATE_DESC" ]; then
    echo "✏️  Update: $UPDATE_DESC" >> docs-update-log.txt
    echo "" >> docs-update-log.txt
    
    echo ""
    echo "📝 Documentation to update:"
    echo ""
    echo "   1. 🔥 AI_SESSION_CONTEXT.md (30 sec) - Always update this first!"
    echo "   2. 📋 README.md status section (2 min) - If major features added"
    echo "   3. 🏗️  TECHNICAL_DESIGN.md (5 min) - If architecture changed"
    echo ""
    
    # Check what type of changes were made
    echo "What type of changes? (helps prioritize doc updates)"
    echo "a) New UI components/pages"
    echo "b) Data model/architecture changes" 
    echo "c) Bug fixes"
    echo "d) Configuration/setup"
    echo "e) Other"
    read -p "➤ " CHANGE_TYPE
    
    case $CHANGE_TYPE in
        a) echo "📝 Priority: Update AI_SESSION_CONTEXT.md + README.md" ;;
        b) echo "🏗️  Priority: Update ALL docs (architecture changed)" ;;
        c) echo "🐛 Priority: Update README.md known issues section" ;;
        d) echo "⚙️  Priority: Update README.md setup instructions" ;;
        *) echo "📋 Priority: Update AI_SESSION_CONTEXT.md at minimum" ;;
    esac
    
    echo ""
    echo "💡 Quick update prompt for AI:"
    echo "─────────────────────────────────"
    echo "I need to update my CRMforCRE documentation."
    echo "Here's what we just accomplished: $UPDATE_DESC"
    echo ""
    echo "Please update the relevant sections in:"
    echo "1. AI_SESSION_CONTEXT.md - What's Already Built section"
    echo "2. README.md - Current Implementation Status" 
    echo "3. TECHNICAL_DESIGN.md - If architecture changed"
    echo "─────────────────────────────────"
    echo ""
    
else
    echo "No changes noted." >> docs-update-log.txt
    echo ""
fi

echo "📊 Recent development log:"
echo ""
tail -10 docs-update-log.txt

echo ""
echo "✅ Log updated! Remember to update documentation files."
echo "📂 Check: AI_SESSION_CONTEXT.md, README.md, TECHNICAL_DESIGN.md" 