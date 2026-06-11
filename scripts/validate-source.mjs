import { readFileSync } from "node:fs";

const sourcePath = new URL("../src/main.jsx", import.meta.url);
const source = readFileSync(sourcePath, "utf8");
const forbiddenSnippets = ["git apply --3way", "git rev-parse --show-toplevel", "<<'EOF'"];
const firstMeaningfulLine = source.split(/\r?\n/).find((line) => line.trim().length > 0);

if (firstMeaningfulLine !== 'import React from "react";') {
  throw new Error(`src/main.jsx appears to contain non-JavaScript content before the React import: ${firstMeaningfulLine}`);
}

for (const snippet of forbiddenSnippets) {
  if (source.includes(snippet)) {
    throw new Error(`src/main.jsx contains an accidental patch/shell snippet: ${snippet}`);
  }
}
