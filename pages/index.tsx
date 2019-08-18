import React from 'react'
import Link from 'next/link'

const Index = () => {
  return (
    <div>
      <ul>
        <li>
          <Link href="/todos" as="/todos">
            <a>todo</a>
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default Index
