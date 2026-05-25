# Getting Started: Ratehub Member Platform (May 2026)

**Start here.** This guide connects all resources and shows what to do first.

---

## 1-Minute Overview

Ratehub is building a unified member platform with:
- **Cross-brand login** (Ratehub + Moneysense + CanWise)
- **Smart form pre-fill** (no more typing)
- **Member engagement** (personalized recommendations)

**Right now:** Phase 1A ✅ Complete (backend infrastructure built)  
**This week:** Phase 1B 🔄 (frontend integration)

---

## What to Read (Based on Your Role)

### 👨‍💼 Product Manager
**Start here:** `PROJECT_STATUS.md` (10 min)  
Then read: `FUTURE_VISION_ROADMAP.md` (20 min)

---

### 👨‍💻 Frontend Engineer
**Start here:** `UNIFIED_PROFILE_QUICK_START.md` (30 min)  
Then: Run BFF locally and test pre-fill

**Quick test:**
```bash
curl http://localhost:3000/health
```

---

### 🏗️ Backend Engineer
**Start here:** `PHASE_1A_COMPLETION_SUMMARY.md` (15 min)  
Then review: `~/code/ratehub/bff-service/app.js` + `README.md`

---

### 🎨 Designer
**Start here:** Check design tokens in `colors_and_type.css`  
Validate: All 9 routes use Gordita + validate breakpoints (1024/768/480)

---

### 🔧 DevOps Engineer
**Start here:** `PHASE_1A_COMPLETION_SUMMARY.md` — Deployment section  
Then plan: Staging RDS + ElastiCache setup

---

## Quick Setup

```bash
# 1. Setup BFF
cd ~/code/ratehub/bff-service
npm install
createdb ratehub_members
psql ratehub_members < db/001_create_members_table.sql
cp .env.example .env
# Edit .env with WorkOS credentials

# 2. Start
npm run dev  # Runs on localhost:3000

# 3. Test
curl http://localhost:3000/health
```

---

## File Directory

```
~/code/ratehub/bff-service/
├── README.md                    # API reference
├── app.js                       # Main server
├── middleware/session.js        # Session logic
└── db/001_create_members_table.sql  # Schema

~/code/ratehub/Ratehub\ Design\ System/docs/
├── GETTING_STARTED.md           # This file
├── PROJECT_STATUS.md            # Status overview
├── FUTURE_VISION_ROADMAP.md     # 4-month plan
├── PHASE_1A_COMPLETION_SUMMARY.md   # What's built
└── UNIFIED_PROFILE_QUICK_START.md   # Step-by-step
```

---

## This Week's Focus: Phase 1B

**Website Design System Production-Ready**

- [ ] Validate all pages use Gordita font
- [ ] Check mobile breakpoints
- [ ] Run Lighthouse (target: +10pts)
- [ ] Add AuthProvider to Design System

**Timeline:** May 6–12  
**Owner:** @design + @frontend-team

---

## FAQ

**Q: How do I test BFF?**  
A: `curl http://localhost:3000/health`

**Q: How do I get WorkOS credentials?**  
A: https://dashboard.workos.com

**Q: Can I run without WorkOS?**  
A: Yes, add test user path in app.js

**Q: Where's the database schema?**  
A: `bff-service/db/001_create_members_table.sql`

---

**Status:** Phase 1A ✅ Complete, 1B 🔄 Starting  
**Next Review:** May 12, 2026
