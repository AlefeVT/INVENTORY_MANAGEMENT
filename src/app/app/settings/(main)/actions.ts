'use server'

import { z } from 'zod'
import { updateProfileSchema } from './schema'
import { prisma } from '@/services/database'

export async function updateProfile(
  input: z.infer<typeof updateProfileSchema>,
  userId: string
) {

  if (userId) {
    return {
      error: 'Not found',
      data: null,
    }
  }

  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      name: input.name,
    },
  })
}
