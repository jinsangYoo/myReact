import * as React from 'react'
import { useLocation, matchPath } from 'react-router-dom'

/**
 * URL path 를 분석해
 * @param patterns 현재 pathName과 매칭 시킬 패턴 배열
 * @param rootPath '/' 일 때 패턴 배열과 매칭되지 않을 경우 대치할 pathName
 * @return string | null
 */
export default function useRouteMatch(patterns: readonly string[], rootPath?: string) {
  const { pathname } = useLocation()

  if (rootPath) {
    if (pathname === '/') {
      return {
        params: {},
        pathname: rootPath,
        pathnameBase: rootPath,
        pattern: { path: rootPath, caseSensitive: false, end: true }
      }
    }
  }

  for (let i = 0; i < patterns.length; i += 1) {
    const pattern = patterns[i]
    const possibleMatch = matchPath(pattern, pathname)
    if (possibleMatch !== null) {
      return possibleMatch
    }
  }

  return null
}
