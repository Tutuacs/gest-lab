'use client'

import { ROLE } from '@/common/role.enums'
import React from 'react'

interface ButtonByRoleProps {
  roles: ROLE[]
  role: ROLE | undefined
  children: React.ReactNode
}

export default function ButtonByRole({
  roles,
  role,
  children
}: ButtonByRoleProps) {
  if (!role || !roles.includes(role)) {
    return null
  }

  return <>{children}</>
}
