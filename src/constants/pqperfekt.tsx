import React from 'react';
  const templates = [
    {
      text: 'Nachdem er das Projekt ___ ___ , ___ er mit einer neuen Aufgabe.',
      bank: ['abgeschlossen', 'hatte', 'begann'],
      correct: ['abgeschlossen', 'hatte', 'begann']
    },
    {
      text: 'Bevor sie das Haus ___ ___ , ___ sie den Herd aus.',
      bank: ['verlassen', 'hatte', 'schaltete'],
      correct: ['verlassen', 'hatte', 'schaltete']
    },
    {
      text: 'Sobald er den Vertrag ___ ___ , ___ er sich erleichtert.',
      bank: ['unterschrieben', 'hatte', 'fühlte'],
      correct: ['unterschrieben', 'hatte', 'fühlte']
    },
    {
      text: 'Solange wir auf dich ___ ___ , ___ wir Karten.',
      bank: ['gewartet', 'hatten', 'spielten'],
      correct: ['gewartet', 'hatten', 'spielten']
    }
  ];

export function genPlusquamperfekt(count: number): any[] {
  const result: any[] = [];
  for (let i = 0; i < count; i++) {
    result.push(templates[i % templates.length]);
  }
  return result;
}
