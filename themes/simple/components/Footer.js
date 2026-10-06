import AnalyticsBusuanzi from '@/components/AnalyticsBusuanzi'
import { BeiAnGongAn } from '@/components/BeiAnGongAn'
import DarkModeButton from '@/components/DarkModeButton'
import SmartLink from '@/components/SmartLink'
import { siteConfig } from '@/lib/config'
import CONFIG from '../config'

/**
 * 解析页脚链接配置，格式：名称|链接,名称|链接
 * @param {string} raw
 * @returns {{name: string, href: string}[]}
 */
function parseFooterLinks(raw) {
  if (!raw || typeof raw !== 'string') return []
  return raw
    .split(',')
    .map(item => {
      const [name, href] = item.split('|').map(s => s?.trim())
      return name && href ? { name, href } : null
    })
    .filter(Boolean)
}

/**
 * 页脚
 * @param {*} props
 * @returns
 */
export default function Footer(props) {
  const d = new Date()
  const currentYear = d.getFullYear()
  const since = siteConfig('SINCE')
  const ANALYTICS_BUSUANZI_ENABLE = siteConfig('ANALYTICS_BUSUANZI_ENABLE')
  const copyrightDate =
    parseInt(since) < currentYear ? since + '-' + currentYear : currentYear
  const footerLinks = parseFooterLinks(
    siteConfig('SIMPLE_FOOTER_LINKS', null, CONFIG)
  )

  return (
    <footer className='relative w-full bg-black px-6 border-t'>
      <DarkModeButton className='text-center pt-4' />

      <div className='text-yellow-300 container mx-auto max-w-4xl py-6 md:flex flex-wrap md:flex-no-wrap md:justify-between md:gap-x-8 items-center text-sm'>
        <div className='text-center'>
          &copy;{`${copyrightDate}`} {siteConfig('AUTHOR')}. All rights
          reserved.
        </div>
        <div className='md:p-0 text-center md:text-right text-xs'>
          {/* 右侧链接 */}
          {footerLinks.length > 0 && (
            <nav className='inline-flex flex-wrap justify-center gap-x-4 gap-y-1 mt-2 md:mt-0'>
              {footerLinks.map(link => (
                <SmartLink
                  key={link.href}
                  href={link.href}
                  className='no-underline hover:underline'>
                  {link.name}
                </SmartLink>
              ))}
            </nav>
          )}
          {siteConfig('BEI_AN') && (
            <a
              href={siteConfig('BEI_AN_LINK')}
              className='no-underline hover:underline ml-4'>
              {siteConfig('BEI_AN')}
            </a>
          )}
          <BeiAnGongAn />
          {ANALYTICS_BUSUANZI_ENABLE && (
            <div className='inline-flex ml-4'>
              <AnalyticsBusuanzi />
            </div>
          )}
        </div>
      </div>
    </footer>
  )
}
