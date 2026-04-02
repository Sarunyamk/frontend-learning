import 'server-only';

import { type Highlighter, createHighlighter } from 'shiki';

// globalThis ป้องกัน HMR สร้าง instance ซ้ำใน dev mode
const globalForShiki = globalThis as typeof globalThis & {
  __shikiHighlighter?: Promise<Highlighter>;
};

let highlighterPromise: Promise<Highlighter> | null =
  globalForShiki.__shikiHighlighter ?? null;

function getHighlighter() {
  if (!highlighterPromise) {
    highlighterPromise = globalForShiki.__shikiHighlighter = createHighlighter({
      themes: ['light-plus', 'dark-plus'],
      langs: ['css', 'tsx', 'typescript', 'bash', 'html', 'json', 'javascript'],
    });
  }
  return highlighterPromise;
}

export async function highlightCode(
  code: string,
  language = 'text',
): Promise<string> {
  const highlighter = await getHighlighter();

  const validLangs = highlighter.getLoadedLanguages();
  const lang = validLangs.includes(language) ? language : 'text';

  return highlighter.codeToHtml(code, {
    lang,
    themes: { light: 'light-plus', dark: 'dark-plus' },
  });
}
