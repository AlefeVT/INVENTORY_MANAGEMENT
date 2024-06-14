"use client"
import { useSession } from 'next-auth/react'
import { ProfileForm } from './_components/form'

export default function Page() {
  const session = useSession();

  return <ProfileForm defaultValues={session.data?.user} />
}
