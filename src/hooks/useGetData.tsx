'use client'
import instance from '@/lib/api/axios'
import { useState } from 'react'
import { metaType } from '@/app/(service)/(nav)/student/page'

export async function useGetData(type: string, page: number, take: number, searchBy?: string, inputValue?: string) {
  if (searchBy) {
    const res = await instance(`/api/${type}?searchBy=${searchBy}&${searchBy}=${inputValue}&page=${page}&take=${take}`)
    const data = res.data.data
    return { data: data[`${type}`], meta: data.meta }
  } else {
    const res = await instance(`/api/${type}?searchBy=none&page=${page}&take=${take}`)
    const data = res.data.data
    return { data: data[`${type}`], meta: data.meta }
  }
}
