import { getPost } from '../content/blog'
import type { BlogSlug } from '../content/blog'

declare const isoDateBrand: unique symbol

export type IsoDate = string & { readonly [isoDateBrand]: typeof isoDateBrand }

export type VenueStatus =
  | { readonly kind: 'preprint' }
  | { readonly kind: 'under-review'; readonly venue: string }
  | { readonly kind: 'accepted'; readonly venue: string }
  | { readonly kind: 'in-progress' }

/** A hosted paper is either an external https URL or a PDF served from /assets. */
export type PaperHref = `https://${string}` | `/assets/${string}.pdf`

type CardBase = {
  readonly id: string
  readonly kind: 'research' | 'project'
  readonly title: string
  readonly summary: string
  readonly tags: readonly [string, ...string[]]
  readonly status?: VenueStatus
  readonly paper?: PaperHref
  readonly code?: `https://${string}`
}

export type CardDraft =
  | (CardBase & { readonly writeup: BlogSlug; readonly publishedOn?: never })
  | (CardBase & { readonly writeup?: never; readonly publishedOn: IsoDate } & (
      | { readonly paper: PaperHref }
      | { readonly code: `https://${string}` }
    ))

export type ExperienceDraft = {
  readonly id: string
  readonly title: string
  readonly role: string
  readonly period: string
  readonly tags: readonly [string, ...string[]]
}

export type WorkDraft = {
  readonly experience: readonly ExperienceDraft[]
  readonly cards: readonly CardDraft[]
}

export type CardLink =
  | { readonly label: 'Writeup'; readonly href: `/blog/${string}`; readonly external: false }
  | { readonly label: 'Paper'; readonly href: PaperHref; readonly external: true }
  | { readonly label: 'Code'; readonly href: `https://${string}`; readonly external: true }

export type CardFace = {
  readonly id: string
  readonly eyebrow: 'Research' | 'Project'
  readonly title: string
  readonly summary: string
  readonly tags: readonly string[]
  readonly status?: { readonly label: string; readonly tone: 'accepted' | 'review' | 'sky' | 'neutral' }
  readonly activation: CardLink
  readonly links: readonly Extract<CardLink, { readonly external: true }>[]
}

export type ExperienceRow = {
  readonly id: string
  readonly title: string
  readonly role: string
  readonly period: string
  readonly tags: readonly string[]
}

export type WorkCatalog = {
  readonly experienceRows: readonly ExperienceRow[]
  readonly cardFaces: readonly CardFace[]
}

type Resolved = {
  readonly id: string
  readonly kind: 'research' | 'project'
  readonly title: string
  readonly summary: string
  readonly tags: readonly string[]
  readonly status?: VenueStatus
  readonly publishedOn: IsoDate
} & (
  | {
      readonly writeup: BlogSlug
      readonly paper?: PaperHref
      readonly code?: `https://${string}`
    }
  | {
      readonly writeup?: undefined
      readonly paper: PaperHref
      readonly code?: `https://${string}`
    }
  | {
      readonly writeup?: undefined
      readonly paper?: undefined
      readonly code: `https://${string}`
    }
)

const ISO_DAY = /^(\d{4})-(\d{2})-(\d{2})$/

export function on(date: string): IsoDate {
  const match = ISO_DAY.exec(date)
  if (match === null) throw new Error(`bad date '${date}'`)
  const year = Number(match[1])
  const month = Number(match[2])
  const day = Number(match[3])
  const utc = new Date(Date.UTC(year, month - 1, day))
  const roundTrip =
    utc.getUTCFullYear() === year &&
    utc.getUTCMonth() === month - 1 &&
    utc.getUTCDate() === day
  if (!roundTrip) throw new Error(`bad date '${date}'`)
  return date as IsoDate
}

function writeupDate(slug: BlogSlug): IsoDate {
  const post = getPost(slug)
  if (!post) throw new Error(`writeup '${slug}' is not published`)
  try {
    return on(post.meta.date)
  } catch {
    throw new Error(`writeup '${slug}' has date '${post.meta.date}', want YYYY-MM-DD`)
  }
}

function statusView(status: VenueStatus): NonNullable<CardFace['status']> {
  switch (status.kind) {
    case 'preprint':
      return { label: 'Preprint', tone: 'sky' }
    case 'under-review':
      return { label: `${status.venue} under review`, tone: 'review' }
    case 'accepted':
      return { label: `${status.venue} \u2014 accepted`, tone: 'accepted' }
    case 'in-progress':
      return { label: 'in progress', tone: 'neutral' }
    default: {
      const unexpected: never = status
      throw new Error(`bad status '${String(unexpected)}'`)
    }
  }
}

function destinationLinks(card: Resolved): readonly [CardLink, ...CardLink[]] {
  const links: CardLink[] = []
  if (card.writeup !== undefined) {
    links.push({
      label: 'Writeup',
      href: `/blog/${card.writeup}`,
      external: false,
    })
  }
  // Same URL as the repo means the preprint is not published yet.
  if (card.paper !== undefined && card.paper !== card.code) {
    links.push({ label: 'Paper', href: card.paper, external: true })
  }
  if (card.code !== undefined) {
    links.push({ label: 'Code', href: card.code, external: true })
  }
  const head = links[0]
  if (head === undefined) throw new Error(`card '${card.id}' has no destination`)
  return [head, ...links.slice(1)]
}

function compareResolved(
  a: { readonly card: Resolved; readonly index: number },
  b: { readonly card: Resolved; readonly index: number },
): number {
  if (a.card.kind !== b.card.kind) {
    return a.card.kind === 'research' ? -1 : 1
  }
  if (a.card.publishedOn > b.card.publishedOn) return -1
  if (a.card.publishedOn < b.card.publishedOn) return 1
  return a.index - b.index
}

function rejectBlank(id: string, field: 'title' | 'summary' | 'tag', value: string): void {
  if (value.trim() === '') throw new Error(`blank ${field} on '${id}'`)
}

function rejectBadUrl(id: string, url: string | undefined, allowAsset = false): void {
  if (url === undefined) return
  if (url.startsWith('https://')) return
  if (allowAsset && /^\/assets\/[^?#]+\.pdf$/.test(url)) return
  throw new Error(`bad url on '${id}'`)
}

function resolveCard(card: CardDraft): Resolved {
  const id = card.id
  rejectBadUrl(id, card.paper, true)
  rejectBadUrl(id, card.code)
  const shared = {
    id: card.id,
    kind: card.kind,
    title: card.title,
    summary: card.summary,
    tags: card.tags,
    status: card.status,
  }
  if (card.writeup !== undefined) {
    return {
      ...shared,
      publishedOn: writeupDate(card.writeup),
      writeup: card.writeup,
      paper: card.paper,
      code: card.code,
    }
  }
  if (card.paper !== undefined) {
    return {
      ...shared,
      publishedOn: card.publishedOn,
      paper: card.paper,
      code: card.code,
    }
  }
  if (card.code !== undefined) {
    return {
      ...shared,
      publishedOn: card.publishedOn,
      code: card.code,
    }
  }
  throw new Error(`card '${id}' has no destination`)
}

function toFace(card: Resolved): CardFace {
  const all = destinationLinks(card)
  const activation = all[0]
  const links: Extract<CardLink, { readonly external: true }>[] = []
  for (const link of all.slice(1)) {
    if (!link.external) throw new Error(`card '${card.id}' leaked a writeup into links`)
    links.push(link)
  }
  return {
    id: card.id,
    eyebrow: card.kind === 'research' ? 'Research' : 'Project',
    title: card.title,
    summary: card.summary,
    tags: [...card.tags],
    ...(card.status !== undefined ? { status: statusView(card.status) } : {}),
    activation,
    links,
  }
}

export function buildWork(input: WorkDraft): WorkCatalog {
  const seen = new Set<string>()
  const experienceRows = input.experience.map((row) => {
    if (seen.has(row.id)) throw new Error(`duplicate id '${row.id}'`)
    seen.add(row.id)
    rejectBlank(row.id, 'title', row.title)
    for (const tag of row.tags) rejectBlank(row.id, 'tag', tag)
    return {
      id: row.id,
      title: row.title,
      role: row.role,
      period: row.period,
      tags: [...row.tags],
    }
  })

  const ordered = input.cards.map((card, index) => {
    if (seen.has(card.id)) throw new Error(`duplicate id '${card.id}'`)
    seen.add(card.id)
    rejectBlank(card.id, 'title', card.title)
    rejectBlank(card.id, 'summary', card.summary)
    for (const tag of card.tags) rejectBlank(card.id, 'tag', tag)
    return { card: resolveCard(card), index }
  })
  ordered.sort(compareResolved)

  return {
    experienceRows,
    cardFaces: ordered.map(({ card }) => toFace(card)),
  }
}
