/* Name: jest.config.ts
 * Description: Jest test runner configuration; uses ts-jest to compile TypeScript tests on the fly.
 *
 * Confidential & Proprietary, 2026 SS&C Technologies Canada Corp.
 * Property of SS&C Technologies Canada Corp.
 * This document shall not be duplicated, transmitted or used in whole
 * or in part without written permission from SS&C Technologies Canada Corp.
 */
import type { Config } from "jest";

// ── Why Jest + ts-jest? ───────────────────────────────────────────────────────
//
// Jest is the de-facto standard test runner for Node.js TypeScript projects:
//   - Built-in assertion library (expect), test doubles (jest.fn), and mocking
//   - First-class async/await support
//   - Coverage reporting with --coverage flag
//   - Watch mode for TDD workflows
//
// ts-jest is the official Jest transformer for TypeScript.  It compiles .ts
// files in-memory using the project's own tsconfig so that the test code is
// checked by the same compiler options as production code.
//
// ─────────────────────────────────────────────────────────────────────────────

const config: Config =
{
    // Use the ts-jest preset so Jest knows how to compile TypeScript test files
    preset: "ts-jest",

    // Run tests in a Node.js environment (not a browser DOM).
    // This matches the runtime the application itself uses.
    testEnvironment: "node",

    // Tell Jest to look for test files inside the top-level tests/ directory.
    // This keeps test files completely separate from production source code.
    roots: ["<rootDir>/tests"],

    // Pass ts-jest a dedicated tsconfig that includes both src/ and tests/.
    // The base tsconfig.json restricts rootDir to src/ so it cannot see tests/;
    // tsconfig.test.json relaxes that restriction for the test build only.
    transform:
    {
        "^.+\\.tsx?$": ["ts-jest", { tsconfig: "tsconfig.test.json" }],
    },
};

export default config;
