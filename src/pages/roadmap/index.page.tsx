import type { GetStaticProps, NextPage } from 'next'
import { Page } from 'src/components/Page'
import clsx from 'clsx'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import { StyledLink } from '../../components/StyledLink'
import { useBodyClass, useIsMobile } from '../../hooks'
import styles from './index.module.scss'
import presets from '../../styles/presets.module.scss'
import { Badges, inprogress, upcoming, achievements } from './icons'
import { Section } from './Section'

const Roadmap: NextPage = () => {
  useBodyClass([presets.themeDark ?? ''])
  const [t] = useTranslation(['roadmap', 'common'])
  const isMobile = useIsMobile()
  const isDesktop = !isMobile
  const sections = [
    {
      title: <div className={clsx(styles.sectionTitle, styles.inProgressTitle)}>{t('in_progress.title')}</div>,
      icon: inprogress,
      iconPosition: 'left' as const,
      subtitle: t('in_progress.subtitle'),
      descriptionText: t('in_progress.description'),
      descriptionLink: t('in_progress.link'),
      projects: [
        t('in_progress.kuai'),
        t('in_progress.force_relay'),
        t('in_progress.open_transactions'),
        t('in_progress.composable_lock_script'),
        t('in_progress.ckb_light_client'),
      ],
    },
    {
      title: <div className={clsx(styles.sectionTitle, styles.upcomingTitle)}>{t('upcoming.title')}</div>,
      icon: upcoming,
      iconPosition: 'right' as const,
      subtitle: t('upcoming.subtitle'),
      descriptionText: t('upcoming.description'),
      descriptionLink: t('upcoming.link'),
      projects: [t('upcoming.light_client')],
    },
    {
      title: <div className={clsx(styles.sectionTitle, styles.achievementsTitle)}>{t('achievements.title')}</div>,
      icon: achievements,
      iconPosition: 'left' as const,
      subtitle: t('achievements.description'),
      descriptionText: t('achievements.description'),
      descriptionLink: t('achievements.link'),
      projects: [
        t('achievements.cota'),
        t('achievements.light_client_soft_fork'),
        t('achievements.light_client_implementation'),
        t('achievements.neuron'),
        t('achievements.axon_beta'),
        t('achievements.godwoken_launches'),
        t('achievements.godwoken_v1_ethereum_equivalence'),
        t('achievements.joyid_testnet'),
        t('achievements.bit_launches'),
        t('achievements.force_bridge_launch'),
        t('achievements.opera_integration'),
      ],
    },
  ]

  return (
    <>
      <Page className={styles.baseSeparatePage}>
        {isDesktop && (
          <>
            <div className={clsx(styles.embellishedElements, styles.embellishedElementLeft)} />
            <div className={clsx(styles.embellishedElements, styles.embellishedElementRight)} />
          </>
        )}
        {isMobile && (
          <>
            <div className={clsx(styles.embellishedElements, styles.embellishedElementMobileUp)} />
            <div className={clsx(styles.embellishedElements, styles.embellishedElementMobileDown)} />
          </>
        )}
        <div className={styles.content}>
          <div className={styles.title}>{t('title')}</div>
          <div className={styles.subTitleWrapper}>
            <div className={styles.subTitleItem}>{t('subtitle.never_finished')},</div>
            <div className={styles.subTitleItem}>{t('subtitle.always_building')}</div>
          </div>

          <div className={styles.badges}>
            <Badges />
          </div>
          <div className={styles.slogan}>
            <div className={styles.sloganTitle}>{t('get_involved.title')}</div>
            <div className={styles.sloganText}>{t('get_involved.description_1')}</div>
            <div className={styles.sloganText}>{t('get_involved.description_2')}</div>
            <StyledLink className={styles.link} href={''} colored>
              {t('get_involved.rfcs')}
            </StyledLink>{' '}
            |{' '}
            <StyledLink className={styles.link} href={''} colored>
              {t('get_involved.nervos_talk_forum')}
            </StyledLink>
          </div>
          {sections.map((section, index) => {
            return (
              <Section
                key={section.subtitle}
                {...section}
                className={clsx({
                  // when on desktop, background color for the second section is different
                  [styles.darkerBg ?? '']: isDesktop && index === 1,
                })}
              />
            )
          })}
        </div>
      </Page>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale = 'en' }) => {
  const lng = await serverSideTranslations(locale, ['common', 'roadmap'])
  return {
    props: {
      ...lng,
    },
  }
}

export default Roadmap