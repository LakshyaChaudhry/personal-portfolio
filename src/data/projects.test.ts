import { expect, it } from 'vitest'
import { cardFaces, experienceRows } from './projects'
import { RL_OR_DATA_PAPER_URL } from '../content/papers'

function face(id: string) {
  const found = cardFaces.find((item) => item.id === id)
  if (!found) throw new Error(`missing face '${id}'`)
  return found
}

it('exposes the catalog faces in research-then-date order', () => {
  expect(cardFaces.map((item) => item.id)).toEqual([
    'res-rl-or-data',
    'res-beyond-lie-detection',
    'res-sample-whitebox-af',
    'res-colm',
    'proj-distill',
    'proj-synthbench',
    'proj-signal',
    'proj-2',
    'proj-1',
  ])

  expect(experienceRows.map((row) => row.id)).toEqual([
    'exp-mars',
    'exp-0',
    'exp-1',
    'exp-2',
    'exp-3',
    'exp-4',
  ])

  const grpo = face('res-rl-or-data')
  expect(grpo.activation).toEqual({
    label: 'Writeup',
    href: '/blog/rl-or-data',
    external: false,
  })
  expect(grpo.links).toEqual([
    { label: 'Paper', href: RL_OR_DATA_PAPER_URL, external: true },
    { label: 'Code', href: 'https://github.com/LakshyaChaudhry/rl-or-data', external: true },
  ])
  expect(grpo.summary).toContain('does not close that gap')
  expect(grpo.status).toEqual({ label: 'Preprint', tone: 'sky' })
  expect(grpo.tags).toEqual(['GRPO', 'RFT', 'Post-training', 'Qwen3'])

  expect(face('res-beyond-lie-detection').activation.href).toBe('/blog/beyond-lie-detection')
  expect(face('res-sample-whitebox-af').activation.href).toBe('/blog/beyond-lie-detection')
  expect(face('res-beyond-lie-detection').summary).toContain('+12% AUROC')
  expect(face('res-beyond-lie-detection').status).toEqual({
    label: 'ICML 2026 TAIGR \u2014 accepted',
    tone: 'accepted',
  })
  expect(face('res-sample-whitebox-af').status).toEqual({
    label: 'ICML 2026 \u2014 accepted',
    tone: 'accepted',
  })

  const colm = face('res-colm')
  expect(colm.activation.label).toBe('Paper')
  expect(colm.activation.href).toBe('https://openreview.net/forum?id=y3TtQFiodt')
  expect(colm.links).toHaveLength(0)
  expect(colm.status).toEqual({ label: 'COLM 2026 under review', tone: 'review' })

  const signal = face('proj-signal')
  expect(signal.activation.label).toBe('Writeup')
  expect(signal.activation.href).toBe('/blog/signal-ai-coach')
  expect(signal.links).toHaveLength(0)

  expect(cardFaces.map((item) => item.tags.length)).toEqual([4, 4, 4, 4, 4, 4, 4, 4, 4])
  expect(JSON.stringify({ experienceRows, cardFaces })).not.toMatch(/student|Purdue/i)
})
