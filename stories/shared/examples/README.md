# QTI Examples

This folder contains shared QTI 3.x XML examples that are used across all framework implementations (React, Vue, and Vanilla JS) in Storybook.

## Structure

- `docs-example.ts` - Documentation example showing basic QTI 3.x structure
- `math-question.ts` - Simple math question (2 + 2) without feedback
- `planets-question.ts` - Multiple choice question about planets with feedback
- `index.ts` - Exports all examples for easy importing

## Usage

All Storybook stories import examples from this folder to ensure consistency:

```typescript
import { docsExample, mathQuestion, planetsQuestion } from "./shared/examples";
```

## Stories

Each framework (React, Vue, Vanilla JS) has exactly 3 stories:
1. **Docs** - Uses `docsExample`
2. **MathQuestion** - Uses `mathQuestion`
3. **PlanetsQuestion** - Uses `planetsQuestion`

## Example Structure

```typescript
/**
 * Description of the example
 */
export const exampleName = `<?xml version="1.0" encoding="UTF-8"?>
<qti-assessment-item>
  <!-- QTI XML content -->
</qti-assessment-item>`;
```
