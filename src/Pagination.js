import React from 'react'

export default function Pagination({nextPage, prevPage}) {
    return (
        <div>
            {prevPage && <button onClick={prevPage}>Prev Page</button>}
            {nextPage && <button onClick={nextPage}>Next Page</button>}
        </div>
    )
}
