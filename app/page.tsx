import { readContent } from '@/lib/content'
import { Nav } from '@/components/Nav'
import { Hero } from '@/components/Hero'
import { Now } from '@/components/Now'
import { Work } from '@/components/Work'
import { Lab } from '@/components/Lab'
import { Stack } from '@/components/Stack'
import { Approach } from '@/components/Approach'
import { Services } from '@/components/Services'
import { Contact } from '@/components/Contact'

export const dynamic = 'force-dynamic'

export default async function Home() {
  const hero = await readContent<Record<string, unknown>>('hero')
  const now = await readContent<Record<string, unknown>>('now')
  const work = await readContent<unknown[]>('work')
  const lab = await readContent<unknown[]>('lab')
  const stack = await readContent<unknown[]>('stack')
  const approach = await readContent<Record<string, unknown>>('approach')
  const services = await readContent<unknown[]>('services')
  const contact = await readContent<Record<string, unknown>>('contact')

  return (
    <>
      <Nav cvUrl={hero.cvUrl as string | undefined} />
      <Hero
        headlineConfig={hero.headlineConfig as Parameters<typeof Hero>[0]['headlineConfig']}
        role={hero.role as string}
        location={hero.location as string}
        availability={hero.availability as string}
        bio={hero.bio as string}
        metrics={hero.metrics as Parameters<typeof Hero>[0]['metrics']}
        marqueeStack={hero.marqueeStack as string[]}
      />
      <Now
        company={(now as { company: string }).company}
        university={(now as { university: string }).university}
        highlight={(now as { highlight: string }).highlight}
      />
      <Work cards={work as Parameters<typeof Work>[0]['cards']} />
      <Lab cards={lab as Parameters<typeof Lab>[0]['cards']} />
      <Stack cols={stack as Parameters<typeof Stack>[0]['cols']} />
      <Approach
        headline={(approach as { headline: string }).headline}
        principles={(approach as { principles: Parameters<typeof Approach>[0]['principles'] }).principles}
      />
      <Services items={services as Parameters<typeof Services>[0]['items']} />
      <Contact
        email={(contact as { email: string }).email}
        location={(contact as { location: string }).location}
        timezone={(contact as { timezone: string }).timezone}
        languages={(contact as { languages: string }).languages}
        social={(contact as { social: Parameters<typeof Contact>[0]['social'] }).social}
        footerBuild={(contact as { footerBuild: string }).footerBuild}
        form={(contact as { form?: Parameters<typeof Contact>[0]['form'] }).form}
        serviceOptions={(services as { title: string }[]).map((service) => service.title)}
      />
    </>
  )
}
