---
title: Editorial Workflow
---

# Editorial Workflow

## Adding a new article

1. Copy the closest file from `docs/templates/`.
2. Rename it using lowercase words separated by hyphens.
3. Replace every `TBD` field that is known.
4. Keep unknown fields as `TBD`; do not guess.
5. Add links to relevant existing articles.
6. Add the article to `nav` in `mkdocs.yml` when it deserves permanent navigation.
7. Run `mkdocs build --strict` before publishing.

## Importing a subject from the source corpus

### Pass 1 — collection

Collect all passages concerning the subject from current corrections and the relevant documents. Include contradictory passages instead of filtering too early.

### Pass 2 — authority

Assign each claim a source, date or location, subject-matter relevance, and provisional canon status.

### Pass 3 — conflict resolution

Apply the [canon hierarchy](canon-guide.md). Record obsolete alternatives where they explain prior material, but do not blend incompatible versions.

### Pass 4 — article drafting

Write the article in neutral reference style. Separate facts, interpretation, and open questions.

### Pass 5 — continuity check

Check all linked articles for consequences. A change in one country's territory may require changes to city, war, trade, language, map, and timeline articles.

## Recommended change log format

```markdown
## Change log

- 2026-07-23 — Created starter article.
- YYYY-MM-DD — Updated borders following [named ruling].
- YYYY-MM-DD — Marked older account obsolete.
```

## Article maturity levels

| Level | Meaning |
|---|---|
| Stub | Basic identity and known facts only |
| Developing | Major sections exist, but important gaps remain |
| Reviewed | Checked against current authoritative sources |
| Canon-complete | All currently available material integrated and conflicts resolved |
