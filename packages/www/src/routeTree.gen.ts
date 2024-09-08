/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'

// Create Virtual Routes

const MixesLazyImport = createFileRoute('/mixes')()
const MdxLazyImport = createFileRoute('/mdx')()
const IndexLazyImport = createFileRoute('/')()

// Create/Update Routes

const MixesLazyRoute = MixesLazyImport.update({
  path: '/mixes',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/mixes.lazy').then((d) => d.Route))

const MdxLazyRoute = MdxLazyImport.update({
  path: '/mdx',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/mdx.lazy').then((d) => d.Route))

const IndexLazyRoute = IndexLazyImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/index.lazy').then((d) => d.Route))

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/mdx': {
      id: '/mdx'
      path: '/mdx'
      fullPath: '/mdx'
      preLoaderRoute: typeof MdxLazyImport
      parentRoute: typeof rootRoute
    }
    '/mixes': {
      id: '/mixes'
      path: '/mixes'
      fullPath: '/mixes'
      preLoaderRoute: typeof MixesLazyImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren({
  IndexLazyRoute,
  MdxLazyRoute,
  MixesLazyRoute,
})

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/mdx",
        "/mixes"
      ]
    },
    "/": {
      "filePath": "index.lazy.tsx"
    },
    "/mdx": {
      "filePath": "mdx.lazy.tsx"
    },
    "/mixes": {
      "filePath": "mixes.lazy.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
