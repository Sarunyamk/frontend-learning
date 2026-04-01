import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CodeBlock } from '@/components/tailwind/code-block';
import { SOCKET_TUTORIAL } from '@/constants/socket-tutorial.constant';

export function SocketTutorial() {
  const { intro, concepts, codeSnippets } = SOCKET_TUTORIAL;

  return (
    <div className="space-y-6">
      {/* Intro */}
      <div>
        <h2 className="text-xl font-bold text-foreground">{intro.title}</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {intro.description}
        </p>
      </div>

      {/* Core Concepts */}
      <div>
        <h3 className="mb-3 text-lg font-semibold text-foreground">Core Concepts</h3>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {concepts.map((concept) => (
            <Card key={concept.title}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">{concept.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  {concept.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Architecture */}
      <div>
        <h3 className="mb-3 text-lg font-semibold text-foreground">Architecture</h3>
        <CodeBlock code={codeSnippets.architecture} language="text" />
      </div>

      {/* Code: useSocket hook */}
      <div>
        <h3 className="mb-3 text-lg font-semibold text-foreground">
          Frontend — useSocket Hook
        </h3>
        <CodeBlock code={codeSnippets.useSocket} language="tsx" />
      </div>

      {/* Code: Backend Gateway */}
      <div>
        <h3 className="mb-3 text-lg font-semibold text-foreground">
          Backend — NestJS Gateway
        </h3>
        <CodeBlock code={codeSnippets.backendGateway} language="typescript" />
      </div>
    </div>
  );
}
