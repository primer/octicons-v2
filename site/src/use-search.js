import Fuse from "fuse.js"
import React from "react"

function useSearch(list, query, options) {
  const [results, setResults] = React.useState(list)

  const fuse = React.useMemo(
    () =>
      new Fuse(list, {
        threshold: 0.2,
        ...options,
      }),
    [list, options]
  )

  React.useEffect(() => {
    if (query.trim()) {
      setResults(fuse.search(query.trim()))
    } else {
      setResults(list)
    }
  }, [fuse, list, query])

  return results
}

export default useSearch
