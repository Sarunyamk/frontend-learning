
import { CodeBlockShiki } from '@/components/tailwind/code-block-shiki';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

type CodeSection = {
  title: string;
  description: string;
  code: string;
  language: string;
};

type InstallSectionProps = {
  section: CodeSection;
};

export function InstallSection({ section }: InstallSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{section.title}</CardTitle>
        <CardDescription>{section.description}</CardDescription>
      </CardHeader>

      <CardContent>
        <CodeBlockShiki code={section.code} language={section.language} />
      </CardContent>
    </Card>
  );
}
