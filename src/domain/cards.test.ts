import { expect, it } from 'vitest'
import { buildWork, on } from './cards'
import type { WorkDraft } from './cards'
import type { BlogSlug } from '../content/blog'

it("rejects a calendar day that does not exist", () => {
  expect(() => on('2026-02-31')).toThrow("bad date '2026-02-31'")
  expect(on('2024-02-29')).toBe('2024-02-29')
})

it('orders research ahead of projects, then newer dates, then input order', () => {
  const cards = [
    {
      id: 'project-2026',
      kind: 'project' as const,
      title: 'Project',
      summary: 'Summary',
      tags: ['tag'] as const,
      publishedOn: on('2026-02-01'),
      code: 'https://example.com/project-2026' as const,
    },
    {
      id: 'research-2025',
      kind: 'research' as const,
      title: 'Older research',
      summary: 'Summary',
      tags: ['tag'] as const,
      publishedOn: on('2025-01-01'),
      paper: 'https://example.com/research-2025' as const,
    },
    {
      id: 'research-2026',
      kind: 'research' as const,
      title: 'Newer research',
      summary: 'Summary',
      tags: ['tag'] as const,
      publishedOn: on('2026-01-01'),
      paper: 'https://example.com/research-2026' as const,
    },
  ]
  const inputIds = cards.map((card) => card.id)
  const catalog = buildWork({ experience: [], cards })
  expect(catalog.cardFaces.map((face) => face.id)).toEqual([
    'research-2026',
    'research-2025',
    'project-2026',
  ])
  expect(catalog.cardFaces.map((face) => face.activation.href)).toEqual([
    'https://example.com/research-2026',
    'https://example.com/research-2025',
    'https://example.com/project-2026',
  ])
  expect(cards.map((card) => card.id)).toEqual(inputIds)
})

it("rejects a repeated id", () => {
  const row = {
    id: 'a',
    title: 'Title',
    role: 'Role',
    period: 'Period',
    tags: ['tag'] as const,
  }
  expect(() => buildWork({ experience: [row, { ...row }], cards: [] })).toThrow("duplicate id 'a'")
})

it('rejects a writeup that is not a published post', () => {
  expect(() =>
    buildWork({
      experience: [],
      cards: [
        {
          id: 'missing',
          kind: 'research',
          title: 'Title',
          summary: 'Summary',
          tags: ['tag'],
          writeup: 'not-a-post' as BlogSlug,
        },
      ],
    }),
  ).toThrow("writeup 'not-a-post' is not published")
})

it('returns the same face ids and hrefs for the same drafts', () => {
  const drafts = {
    experience: [],
    cards: [
      {
        id: 'research-2026',
        kind: 'research' as const,
        title: 'Newer research',
        summary: 'Summary',
        tags: ['tag'] as const,
        publishedOn: on('2026-01-01'),
        paper: 'https://example.com/research-2026' as const,
      },
      {
        id: 'project-2026',
        kind: 'project' as const,
        title: 'Project',
        summary: 'Summary',
        tags: ['tag'] as const,
        publishedOn: on('2026-02-01'),
        code: 'https://example.com/project-2026' as const,
      },
    ],
  } satisfies WorkDraft
  const hrefs = [
    'https://example.com/research-2026',
    'https://example.com/project-2026',
  ]
  expect(buildWork(drafts).cardFaces.map((face) => face.activation.href)).toEqual(hrefs)
  expect(buildWork(drafts).cardFaces.map((face) => face.activation.href)).toEqual(hrefs)
  expect(buildWork(drafts).cardFaces.map((face) => face.id)).toEqual([
    'research-2026',
    'project-2026',
  ])
})

it('accepts an on-site PDF as a paper and rejects other site paths', () => {
  const card = (paper: string) => ({
    experience: [],
    cards: [
      {
        id: 'hosted',
        kind: 'research' as const,
        title: 'Title',
        summary: 'Summary',
        tags: ['tag'] as const,
        publishedOn: on('2026-01-01'),
        paper: paper as '/assets/paper.pdf',
      },
    ],
  })
  expect(buildWork(card('/assets/blog/paper.pdf')).cardFaces[0]?.activation).toEqual({
    label: 'Paper',
    href: '/assets/blog/paper.pdf',
    external: true,
  })
  expect(() => buildWork(card('/assets/blog/paper.png'))).toThrow("bad url on 'hosted'")
  expect(() => buildWork(card('http://example.com/paper.pdf'))).toThrow("bad url on 'hosted'")
})
