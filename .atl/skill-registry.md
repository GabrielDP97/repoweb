# Skill Registry

**Delegator use only.** Any agent that launches sub-agents reads this registry to resolve compact rules, then injects them directly into sub-agent prompts. Sub-agents do NOT read this registry or individual SKILL.md files.

See `_shared/skill-resolver.md` for the full resolution protocol.

## User Skills

| Trigger | Skill | Path |
|---------|-------|------|
| PRs over 400 lines, stacked PRs, review slices | chained-pr | C:\Users\Gabriel\.config\opencode\skills\chained-pr\SKILL.md |
| judgment day, dual review, adversarial review, juzgar | judgment-day | C:\Users\Gabriel\.config\opencode\skills\judgment-day\SKILL.md |
| new skills, agent instructions, documenting AI usage patterns | skill-creator | C:\Users\Gabriel\.config\opencode\skills\skill-creator\SKILL.md |
| PR feedback, issue replies, reviews, Slack messages, or GitHub comments | comment-writer | C:\Users\Gabriel\.config\opencode\skills\comment-writer\SKILL.md |
| Go tests, go test coverage, Bubbletea teatest, golden files | go-testing | C:\Users\Gabriel\.config\opencode\skills\go-testing\SKILL.md |
| creating GitHub issues, bug reports, or feature requests | issue-creation | C:\Users\Gabriel\.config\opencode\skills\issue-creation\SKILL.md |
| creating, opening, or preparing PRs for review | branch-pr | C:\Users\Gabriel\.config\opencode\skills\branch-pr\SKILL.md |
| implementation, commit splitting, chained PRs, or keeping tests and docs with code | work-unit-commits | C:\Users\Gabriel\.config\opencode\skills\work-unit-commits\SKILL.md |
| writing guides, READMEs, RFCs, onboarding, architecture, or review-facing docs | cognitive-doc-design | C:\Users\Gabriel\.config\opencode\skills\cognitive-doc-design\SKILL.md |

## Compact Rules

Pre-digested rules per skill. Delegators copy matching blocks into sub-agent prompts as `## Project Standards (auto-resolved)`.

### branch-pr
- Every PR MUST link an approved issue — no exceptions
- Every PR MUST have exactly one `type:*` label
- Blank PRs without issue linkage will be blocked by GitHub Actions
- Branch naming: `type/description` (lowercase, no spaces)
- Conventional commits: `type(scope): description`
- Run shellcheck on modified shell scripts before pushing

### chained-pr
- Split PRs over 400 changed lines unless maintainer accepts `size:exception`
- Keep each PR reviewable in about ≤60 minutes
- One deliverable work unit per PR; keep tests/docs with the unit
- State start, end, prior dependencies, follow-up work, out-of-scope
- Every child PR must include a dependency diagram
- In Feature Branch Chain, create a draft/no-merge tracker PR

### cognitive-doc-design
- Lead with the answer — put decision, action, or outcome first
- Progressive disclosure — happy path, then details, edge cases, references
- Chunking — group related information into small sections
- Signposting — use headings, labels, callouts, summaries
- Recognition over recall — prefer tables, checklists, examples over prose
- Review empathy — design docs so reviewers verify intent without reconstructing

### comment-writer
- Be useful fast — start with actionable point, no recap before feedback
- Be warm and direct — sound like a thoughtful teammate, not a corporate bot
- Keep it short — 1-3 short paragraphs or a tight bullet list
- Explain why — give technical reason when asking for a change
- Avoid pile-ons — comment on highest-value issue, not every tiny preference
- Match thread language — Spanish uses Rioplatense voseo: podés, tenés, fijate, dale
- No em dashes — use commas, periods, or parentheses instead

### go-testing
- Prefer table-driven tests for multiple cases; use `t.Run(tt.name, ...)`
- Test behavior and state transitions, not implementation trivia
- Use `t.TempDir()` for filesystem tests; never rely on real home directory
- Keep integration tests skippable with `testing.Short()`
- For Bubbletea, test `Model.Update()` directly for state changes
- Golden files: update only through repo's `-update` path
- Use small mocks/interfaces around system/command execution boundaries

### issue-creation
- Blank issues disabled — MUST use bug_report or feature_request template
- Every issue gets `status:needs-review` automatically on creation
- Maintainer MUST add `status:approved` before PR can be opened
- Questions go to Discussions, not issues

### judgment-day
- Resolve project skills before launching agents
- Launch two blind judges in parallel with identical target/criteria
- Wait for both judges before synthesis — never accept partial verdict
- Classify warnings as `WARNING (real)` only if normal use can trigger them
- Ask before fixing Round 1 confirmed issues
- Re-judge in parallel after any fix agent runs
- Terminal states: `JUDGMENT: APPROVED` or `JUDGMENT: ESCALATED`
- After 2 fix iterations with remaining issues, ask user

### skill-creator
- Required frontmatter: name, description (≤250 chars, one line, trigger-first), license, metadata.author, metadata.version
- Body: 180-450 tokens, max 700, hard max 1000
- Sections order: Activation Contract, Hard Rules, Decision Gates, Execution Steps, Output Contract, References
- Do not add Keywords section
- References must point to local files

### work-unit-commits
- Commit by work unit — deliverable behavior, fix, migration, or docs
- Do not commit by file type — avoid models/services/tests split if none works alone
- Keep tests with code — in same commit as the behavior they verify
- Keep docs with user-visible change they explain
- Tell a story — reviewer understands why each commit exists
- Future PR-ready — each commit is a candidate chained PR
- SDD workload guard: >400-line forecast triggers chained PR planning

## Project Conventions

| File | Path | Notes |
|------|------|-------|
| AGENTS.md | C:\Users\Gabriel\.config\opencode\AGENTS.md | User-level agent configuration — persona, language, tone, philosophy, engram protocol |

Read the convention files listed above for project-specific patterns and rules. All referenced paths have been extracted — no need to read index files to discover more.