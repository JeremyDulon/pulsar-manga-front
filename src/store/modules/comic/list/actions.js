import { getCommonList } from '@/common/store/list/actions'

const id = 'comics'

export default function () {
  const getItems = (context, options) =>
    getCommonList(
      context,
      { ...{ id, params: {} }, ...options }
    )

  return { getItems }
}
