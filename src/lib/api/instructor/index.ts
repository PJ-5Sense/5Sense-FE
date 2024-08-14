import instance from '../axios'

interface IProps {
  type: string
  searchBy: string
  searchValue?: string
  page: number
}

export const getSerachInstructorData = async ({ type, searchBy, searchValue, page }: IProps) => {
  return instance.get(`/api/${type}?searchBy=${searchBy}&${searchBy}=${searchValue}&page=${page}`)
}

export const getInstructorData = async (type: string, searchBy: string, page: number) => {
  return instance.get(`/api/${type}?searchBy=${searchBy}&page=${page}`)
}
