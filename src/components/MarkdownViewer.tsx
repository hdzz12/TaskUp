import React from 'react';

interface Props {
  content: string;
}

export function MarkdownViewer({ content }: Props) {
  // Simple, robust markdown renderer for headings, code blocks, lists, and paragraphs
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let inCodeBlock = false;
  let codeBuffer: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.startsWith('```')) {
      if (inCodeBlock) {
        elements.push(
          <pre
            key={`code-${i}`}
            className="my-4 p-4 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 font-mono text-xs overflow-x-auto leading-relaxed"
          >
            <code>{codeBuffer.join('\n')}</code>
          </pre>
        );
        codeBuffer = [];
        inCodeBlock = false;
      } else {
        inCodeBlock = true;
      }
      continue;
    }

    if (inCodeBlock) {
      codeBuffer.push(line);
      continue;
    }

    if (line.startsWith('### ')) {
      elements.push(
        <h3 key={i} className="text-lg font-bold text-slate-100 mt-6 mb-2">
          {renderFormattedText(line.replace('### ', ''))}
        </h3>
      );
    } else if (line.startsWith('## ')) {
      elements.push(
        <h2 key={i} className="text-xl font-bold text-slate-100 mt-8 mb-3 pb-2 border-b border-slate-800">
          {renderFormattedText(line.replace('## ', ''))}
        </h2>
      );
    } else if (line.startsWith('# ')) {
      elements.push(
        <h1 key={i} className="text-2xl font-extrabold text-white mt-8 mb-4">
          {renderFormattedText(line.replace('# ', ''))}
        </h1>
      );
    } else if (line.startsWith('- ') || line.startsWith('* ')) {
      elements.push(
        <li key={i} className="text-sm text-slate-300 ml-4 list-disc list-inside my-1 leading-relaxed">
          {renderFormattedText(line.slice(2))}
        </li>
      );
    } else if (/^\d+\.\s/.test(line)) {
      const text = line.replace(/^\d+\.\s/, '');
      elements.push(
        <li key={i} className="text-sm text-slate-300 ml-4 list-decimal list-inside my-1 leading-relaxed">
          {renderFormattedText(text)}
        </li>
      );
    } else if (line.trim() === '') {
      elements.push(<div key={i} className="h-3" />);
    } else {
      elements.push(
        <p key={i} className="text-sm sm:text-base text-slate-300 leading-relaxed my-2">
          {renderFormattedText(line)}
        </p>
      );
    }
  }

  return <div className="space-y-1">{elements}</div>;
}

function renderFormattedText(text: string): React.ReactNode {
  // Support **bold**, `code`, and *italic*
  const parts = text.split(/(\*\*.*?\*\*|`.*?`|\*.*?\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={index} className="font-semibold text-slate-100">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code
          key={index}
          className="px-1.5 py-0.5 rounded text-xs font-mono bg-slate-800 text-indigo-300 border border-slate-700"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    if (part.startsWith('*') && part.endsWith('*')) {
      return (
        <em key={index} className="italic text-slate-200">
          {part.slice(1, -1)}
        </em>
      );
    }
    return part;
  });
}
