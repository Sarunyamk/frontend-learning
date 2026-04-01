import 'server-only';

import { type Highlighter, createHighlighter } from 'shiki';

let highlighterPromise: Promise<Highlighter> | null = null;

function getHighlighter() {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
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
