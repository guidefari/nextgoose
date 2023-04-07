import React from 'react'
import { Root, Viewport, Corner, Scrollbar, Thumb } from '@radix-ui/react-scroll-area'

type Props = {
  children: React.ReactNode
}

const HorizontalScrollCards = ({ children }: Props) => (
  <Root className="w-full shadow-sm shadooo ScrollAreaRoot">
    <Viewport>
      <div className="flex h-full space-x-8 ">{children}</div>
      <Scrollbar orientation="horizontal">
        <Thumb />
      </Scrollbar>
      <Corner />
    </Viewport>
  </Root>
)

export default HorizontalScrollCards