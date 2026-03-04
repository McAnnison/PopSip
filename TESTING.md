# Testing Guide — PopSip

## Overview

This document describes the test setup for both the **backend** (Express/TypeScript) and **frontend** (Next.js/React) of the PopSip project, what has been validated, known issues, and what remains to complete the project.

---

## Running Tests

### Backend

```bash
cd backend
npm install
npm test              # run all tests once
npm run test:coverage # run with coverage report
```

Tests live in `backend/src/__tests__/` and use **Jest** + **ts-jest** + **Supertest**. No running database is required — all DB calls are mocked.

### Frontend

```bash
cd frontend
npm install
npm test              # run all tests once
npm run test:coverage # run with coverage report
```

Tests live in `frontend/__tests__/` and use **Jest** + **React Testing Library**. Next.js components, `next/link`, and `next/image` are handled automatically by the `next/jest` preset.

---

## CI

A GitHub Actions workflow (`.github/workflows/tests.yml`) runs both test suites on every push/PR to `main`. The two jobs run in parallel:

- **Backend Tests** — `cd backend && npm ci && npm test`
- **Frontend Tests** — `cd frontend && npm ci && npm test`

---

## What Was Tested

### Backend — 24 tests across 4 suites

| Suite | Coverage |
|-------|----------|
| `errorHandler.test.ts` | 500 response shape, empty message fallback, console.error call |
| `packages.test.ts` | `GET /api/packages`, `GET /api/packages/:id` (found / not-found), `POST /api/packages` |
| `bookings.test.ts` | `GET /api/bookings`, `POST /api/bookings` (default status, DB error) |
| `bartenders.test.ts` | `GET /api/bartenders`, `GET /api/bartenders/:id` (found / not-found), `POST /api/bartenders`, `PUT /api/bartenders/:id` (success / no valid fields), `POST /api/bartenders/:id/publish` |

**Approach:** Rate-limiter middleware is bypassed (pass-through mock). The MySQL pool is replaced by a `jest.fn()` that returns controlled values. No real database connection is needed.

### Frontend — 18 tests across 3 suites

| Suite | Coverage |
|-------|----------|
| `utils.test.ts` | `cn()` single class, multiple classes, conditional, Tailwind-merge conflict resolution, nullish inputs |
| `Header.test.tsx` | Brand link rendered, desktop nav links, hamburger button, mobile nav toggle (open/close), mobile link closes nav |
| `HomePage.test.tsx` | Hero headings, Find Bartenders CTA href, Join as Bartender CTA href, Why PopSip section, How It Works section, footer copyright, Header mounted |

**Approach:** `next/link` and `next/image` are mocked to plain HTML elements. The `Header` component is mocked in the `HomePage` test so it can be tested in isolation.

---

## What Is Passing

- ✅ All 24 backend tests pass (`npm test` in `backend/`)
- ✅ All 18 frontend tests pass (`npm test` in `frontend/`)
- ✅ CI workflow defined and will execute on PR/push to `main`

---

## Known Issues & Gaps

### Backend

- **No database integration tests** — all tests mock the MySQL pool. No real connection is verified (requires a running MySQL instance / Docker).
- **Authentication / authorisation** — the API has no auth layer yet; there are no tests for protected routes.
- **Input validation** — controllers do not validate request bodies (e.g. missing required fields, invalid types). No tests cover invalid input paths.
- **`bartender_bookings` & `bartender_reviews` sub-routes** (`POST /api/bartenders/bookings`, `POST /api/bartenders/services`, `POST /api/bartenders/reviews`) — not covered by tests yet.
- **`GET /` health-check route** — not covered; simple to add.

### Frontend

- **BartendersPage** (`app/bartenders/page.tsx`) — uses `useEffect` + `fetch`. A test would need `fetch` to be mocked (e.g. via `jest.spyOn(global, 'fetch')`). Not included to avoid test flakiness from the infinite `useEffect` dependency array bug (`useEffect(() => { ... })` with no deps will loop).
- **JoinPage** (`app/join/page.tsx`) — not tested; form submission logic needs coverage.
- **`[id]` bartender detail page** — not tested.
- **End-to-end tests** — no Playwright/Cypress tests; adding them would require a running full-stack environment.

### CI

- **No test database** in CI — backend tests deliberately avoid a real DB. If integration tests are added, a MySQL service container (`services: mysql:`) should be added to the CI job.
- **No frontend build check** in CI — add a `npm run build` step to catch type errors and build failures on PR.

---

## Concrete Next Steps

### Immediate (to complete current milestone)

1. **Fix `BartendersPage` `useEffect` bug** — add `[]` or the correct dependency array so the component doesn't loop infinitely; then add a unit test that mocks `fetch`.
2. **Add `JoinPage` test** — cover form field rendering and submission.
3. **Add input validation to backend controllers** (with 400 responses) and write tests for the invalid-input paths.
4. **Add health-check route test** — `GET /` should return `{ success: true, message: 'PopSip API is running' }`.

### Medium term

5. **Authentication layer** — implement JWT/session auth and write tests for protected and unprotected routes.
6. **Database integration tests** — add a Docker Compose file with MySQL; create a CI job that spins up the DB and runs integration tests against a real connection.
7. **E2E tests** — add Playwright smoke tests for the critical user flow: browse bartenders → view profile → submit booking form.
8. **Frontend build step in CI** — add `npm run build` to the `frontend-tests` job.

### Long term

9. **Consolidate root `package.json`** — add `test` and `test:coverage` scripts that run both backend and frontend tests.
10. **Code coverage thresholds** — set minimum coverage gates (e.g. 70 %) in both Jest configs to prevent regression.
