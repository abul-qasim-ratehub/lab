# Development Workflow: Local Setup → GitHub → Deployment

Complete guide for how everything works together locally, on GitHub, and in production.

---

## Part 1: Running Everything Locally (Developer Setup)

### All Systems at a Glance

You'll be running **3 services** locally, each on different ports:

```
BFF Service (backend)          Port 3000
  ↑
  ├── Express + PostgreSQL + Redis
  
Ratehub Design System (web)    Port 3001
  ↑
  ├── Next.js 15 frontend
  ├── Calls BFF for auth
  
Moneysense (future)            Port 3002
  ↑
  └── Future: will also call BFF
```

### Prerequisites (One-Time Setup)

```bash
# 1. Install Node.js 18+
node --version  # v18+

# 2. Install PostgreSQL
brew install postgresql@15
brew services start postgresql@15

# 3. Install Redis
brew install redis
brew services start redis

# 4. Verify everything
psql --version
redis-cli ping  # Should return PONG
```

### Start All Services (Every Development Session)

**Terminal 1: BFF Service (Backend)**
```bash
cd ~/code/ratehub/bff-service
npm install  # First time only
npm run dev
# Runs on http://localhost:3000
# Output: "✓ PostgreSQL connected" + "✓ Redis connected"
```

**Terminal 2: Ratehub Design System (Frontend)**
```bash
cd ~/code/ratehub/Ratehub\ Design\ System
npm install  # First time only
npm run dev
# Runs on http://localhost:3001
# Output: "ready - started server on ... 3001"
```

**Terminal 3: Watchers/Logs (Optional)**
```bash
# Monitor BFF logs
cd ~/code/ratehub/bff-service
tail -f npm-debug.log

# Or watch database changes
psql ratehub_members -c "SELECT COUNT(*) FROM members;" # Run periodically
```

### Validate Everything is Running

```bash
# 1. BFF health check
curl http://localhost:3000/health
# Response: { "status": "ok", "timestamp": "..." }

# 2. Design System is up
curl http://localhost:3001
# Response: HTML page content

# 3. Database has tables
psql ratehub_members -c "\dt"
# Output: members, applications tables

# 4. Redis is working
redis-cli ping
# Response: PONG
```

---

## Part 2: Development Workflow (Daily)

### Starting Work on a Feature

```bash
# 1. Create a new branch
git checkout -b feature/add-member-dashboard
# Branch naming: feature/*, fix/*, chore/*, docs/*

# 2. Make your changes
# Edit files in app/, components/, bff-service/, etc.

# 3. Test locally
# BFF already running on 3000
# Design System already running on 3001
# Open http://localhost:3001 in browser
# Test the feature

# 4. Check what you changed
git status
git diff
```

### Running Tests

```bash
# BFF has no tests yet (TODO)
# Design System has no tests yet (TODO)

# For now: manual testing
# - Click through features
# - Check browser console for errors
# - Verify API calls in Network tab
```

### Committing Changes

```bash
# 1. Stage your changes
git add .  # Or git add path/to/file

# 2. Write a clear commit message
git commit -m "feat: Add member profile settings page"

# Message format:
# feat:  New feature
# fix:   Bug fix
# chore: Dependencies, tooling
# docs:  Documentation
# refactor: Code cleanup (no behavior change)

# 3. Push to GitHub
git push origin feature/add-member-dashboard
```

### Code Review Process

```
1. Push to GitHub → Triggers CI/CD checks
2. GitHub opens Pull Request (PR)
3. Automated tests run (passing/failing)
4. Team reviews code + provides feedback
5. Make requested changes
6. Merge to main when approved
7. Automatic deployment happens
```

---

## Part 3: GitHub Integration (What Happens on Push)

### Automatic Checks Run

When you push code, GitHub **automatically**:

**1. Runs Linting** (code style)
```
✅ Pass: Code follows style rules
❌ Fail: Has formatting issues → must fix before merge
```

**2. Runs Type Checking** (if TypeScript)
```
✅ Pass: No type errors
❌ Fail: TypeScript errors → must fix
```

**3. Builds the Project**
```bash
# BFF
npm install
npm run build  # If build script exists

# Design System
npm install
npm run build  # Creates .next/ folder
```

**4. Runs Tests** (if tests exist)
```bash
npm test
# Currently: 0 tests (TODO)
# Later: unit + integration tests
```

### GitHub Actions Workflow File

**Location:** `.github/workflows/ci.yml` (needs to be created)

```yaml
name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  bff:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: cd bff-service && npm install
      - run: cd bff-service && npm run lint  # TODO: add eslint
      - run: cd bff-service && npm test      # TODO: add tests

  design-system:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm install
      - run: npm run lint
      - run: npm run build
      - run: npm test
```

---

## Part 4: Deployment Strategy

### Current Setup

```
Local Development
       ↓
   GitHub
       ↓
   Staging (AWS)         ← Manual deploy
       ↓
   Production (AWS)      ← Manual deploy
```

### GitHub Pages (Static Sites Only)

⚠️ **Note:** GitHub Pages only hosts **static HTML**.

- ✅ Can deploy Design System (Next.js static export)
- ❌ Cannot deploy BFF (requires Node.js runtime)
- ❌ Cannot deploy dynamic Next.js (needs server)

### Recommended Approach: Vercel + AWS

**Design System (Frontend)** → Vercel
```
Push to GitHub
    ↓
GitHub → Vercel (auto-detects Next.js)
    ↓
Automatic deploy to vercel.com
    ↓
Live at: ratehub.vercel.app
```

**BFF Service (Backend)** → AWS
```
Push to GitHub
    ↓
Manual trigger (or GitHub Action) → AWS ECS
    ↓
Deploys to: api.ratehub.ca (your domain)
    ↓
Live at: api.ratehub.ca
```

### If Using GitHub Pages

Create automated GitHub Pages deploy:

**Location:** `.github/workflows/pages.yml`

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - uses: actions/upload-pages-artifact@v2
        with:
          path: 'out'  # Next.js export output
      - uses: actions/deploy-pages@v2
```

**Note:** Only works for static exports. Dynamic API calls won't work.

---

## Part 5: Team Responsibilities & Workflow

### Who Does What?

| Role | Responsibility | Tools |
|------|-----------------|-------|
| **Frontend Engineer** | Build UI components, integrate auth | VS Code, Next.js, React |
| **Backend Engineer** | Build BFF, APIs, database schemas | VS Code, Express, PostgreSQL |
| **DevOps Engineer** | Set up CI/CD, deployments, infrastructure | GitHub Actions, AWS, Docker |
| **QA Engineer** | Manual testing, test automation | Test scripts, Selenium, Jest |
| **Product Manager** | Requirements, prioritization, metrics | GitHub Issues, Jira, Confluence |
| **Designer** | Design tokens, component specs | Figma, colors_and_type.css |

### Typical PR Workflow

**Frontend wants to add member dashboard:**

```
1. Frontend Engineer creates branch
   git checkout -b feature/member-dashboard
   
2. Writes code
   components/MemberDashboard.jsx
   app/members/page.jsx
   
3. Tests locally
   npm run dev → visits http://localhost:3001
   Tests login flow + pre-fill
   
4. Pushes to GitHub
   git push origin feature/member-dashboard
   
5. GitHub shows: "Create Pull Request"
   Clicks "Create PR"
   Describes change in PR body
   
6. CI/CD runs automatically
   ✅ ESLint passes
   ✅ TypeScript passes (if used)
   ✅ Build succeeds
   ✅ Tests pass
   
7. Backend Engineer reviews
   Comments: "Looks good, but how will auth flow work?"
   Frontend Engineer replies: "BFF /auth/me endpoint handles it"
   
8. Product Manager approves
   "Great, matches design spec"
   
9. Merges PR
   Automatically deploying to staging...
   
10. QA tests on staging
    ✅ Dashboard loads
    ✅ Profile pre-fills
    ✅ Logout works everywhere
    
11. Deploy to production
    Production: ratehub.ca
```

---

## Part 6: Automated Testing (GitHub + Local)

### Pre-Commit Hooks (Optional, Run Locally)

Create `.husky/pre-commit` to catch errors before push:

```bash
#!/bin/sh
# Runs on every commit

npm run lint    # Check code style
npm run type    # Check types
npm test        # Run tests

# If any fail: commit is blocked
# Fix issues then try commit again
```

### CI/CD Pipeline (Runs on GitHub)

When code is pushed:

```
Code pushed to GitHub
    ↓
Trigger: GitHub Actions (CI workflow)
    ↓
Spin up Ubuntu VM
    ↓
├─ Install Node.js
├─ npm install
├─ npm run lint       (5 sec)
├─ npm run type       (10 sec)
├─ npm run build      (30 sec)
├─ npm test           (20 sec)
    ↓
All passed?
├─ YES → PR mergeable ✅
└─ NO  → PR blocked ❌ (fix required)
```

### Local Pre-Deployment Checklist

```bash
# Before pushing:

# 1. Run locally
npm run dev
# Visit http://localhost:3001
# Test feature manually

# 2. Check lint
npm run lint
# Fix any issues: npm run lint -- --fix

# 3. Check types (if TypeScript)
npm run type

# 4. Build locally
npm run build
# Should complete without errors

# 5. Run tests
npm test
# All should pass

# 6. Final git check
git status      # Review what you changed
git diff        # Review code changes

# 7. Commit + push
git add .
git commit -m "feat: ..."
git push origin branch-name
```

---

## Part 7: Environments & Deployment

### Three Environments

**Development (Local)**
```
BFF:       http://localhost:3000
Frontend:  http://localhost:3001
Database:  Local PostgreSQL + Redis
Auth:      WorkOS (test credentials)
```

**Staging (AWS)**
```
BFF:       https://api-staging.ratehub.ca
Frontend:  https://staging.ratehub.ca
Database:  RDS PostgreSQL (managed)
Auth:      WorkOS (test credentials)
CI/CD:     GitHub Actions → AWS
```

**Production (AWS)**
```
BFF:       https://api.ratehub.ca
Frontend:  https://ratehub.ca
Database:  RDS PostgreSQL (managed, with backups)
Auth:      WorkOS (production credentials)
CDN:       CloudFront for static assets
```

### Deployment Command

**Manual deploy to staging:**
```bash
git push origin main  # Triggers CI/CD
# GitHub Actions automatically:
# 1. Builds code
# 2. Runs tests
# 3. Deploys to staging
# 4. Runs smoke tests
```

**Manual deploy to production:**
```bash
# After testing on staging:
git tag v1.2.3
git push origin v1.2.3
# OR manual button: "Deploy to Production" in GitHub
```

---

## Part 8: Troubleshooting

### "BFF won't start"

```bash
# Check PostgreSQL
psql -l
# If no "ratehub_members": createdb ratehub_members

# Check Redis
redis-cli ping
# If error: brew services start redis

# Check .env
cat bff-service/.env
# Must have WORKOS_API_KEY, DATABASE_URL, REDIS_URL
```

### "Design System build fails"

```bash
cd ~/code/ratehub/Ratehub\ Design\ System
rm -rf node_modules .next
npm install
npm run build
```

### "GitHub CI fails but local works"

```bash
# CI might use different Node version
node --version  # Should be 18+

# Try locally with CI's setup
npm ci           # Clean install (like CI does)
npm run build
npm test
```

### "Can't connect BFF from frontend"

```bash
# Check CORS is configured
# BFF app.js should have:
cors({
  origin: ['http://localhost:3001', ...],
  credentials: true
})

# Check fetch calls use credentials
fetch('http://localhost:3000/auth/me', {
  credentials: 'include'  // IMPORTANT
})
```

---

## Part 9: Summary: The Full Flow

```
Developer writes code locally
    ↓
npm run dev  (all 3 services running)
    ↓
Tests feature manually in browser
    ↓
git commit + git push
    ↓
GitHub receives push
    ↓
GitHub Actions CI runs automatically
  ├─ npm install
  ├─ npm run lint
  ├─ npm run build
  └─ npm test
    ↓
All pass?
├─ YES → PR mergeable
└─ NO  → Shows errors, must fix
    ↓
Code review on GitHub
    ↓
Approved + Merged to main
    ↓
Automatic deployment starts
    ├─ Staging: https://staging.ratehub.ca
    └─ Later: Production: https://ratehub.ca
    ↓
QA tests on staging
    ↓
Manual approval for production
    ↓
Production deploy
    ↓
Live for users at ratehub.ca
```

---

## Part 10: Setting Up CI/CD (What DevOps Does)

### Create GitHub Actions Workflow

**File: `.github/workflows/ci-cd.yml`**

```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm install
      - run: npm run lint

  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm install
      - run: npm run build

  test:
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:15
        env:
          POSTGRES_DB: test_db
          POSTGRES_PASSWORD: test
      redis:
        image: redis:7
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm install
      - run: npm test

  deploy-staging:
    needs: [lint, build, test]
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to staging
        run: |
          # Deploy script to AWS/Vercel/etc
          ./scripts/deploy-staging.sh
```

---

## Quick Reference

### Start Development (Every Day)

```bash
# Terminal 1
cd ~/code/ratehub/bff-service && npm run dev

# Terminal 2
cd ~/code/ratehub/Ratehub\ Design\ System && npm run dev

# Terminal 3
# Open browser: http://localhost:3001
```

### Make & Push Changes

```bash
git checkout -b feature/my-feature
# Edit files
npm run lint -- --fix
git add .
git commit -m "feat: description"
git push origin feature/my-feature
# → GitHub shows "Create PR" button
```

### Deploy to Production

```bash
# After PR is merged to main and tested on staging:
git tag v1.2.3
git push origin v1.2.3
# → Triggers production deployment
```

---

**Status:** Development workflow documented  
**CI/CD:** Ready to implement with GitHub Actions  
**Deployment:** Ready for Vercel (frontend) + AWS (backend)
