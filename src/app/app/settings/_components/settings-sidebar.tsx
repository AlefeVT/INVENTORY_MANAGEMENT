'use client'

import { DashboardSidebarNav, DashboardSidebarNavLink } from '@/components/Dashboard/sidebar'
import { usePathname } from 'next/navigation'

export function SettingsSidebar() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <aside>
      <DashboardSidebarNav>

        <main className='flex mb-10'>
          <DashboardSidebarNavLink
            href="/app/settings"
            active={isActive('/app/settings')}
            className='px-4'
          >
            Meu Perfil
          </DashboardSidebarNavLink>

          <DashboardSidebarNavLink
            href="/app/settings/theme"
            active={isActive('/app/settings/theme')}
            className='px-4'
          >
            Aparência
          </DashboardSidebarNavLink>

          </main>

      </DashboardSidebarNav>
    </aside>
  )
}
