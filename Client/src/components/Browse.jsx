import {useState} from 'react'

const Browse = () => {
    const [search, setSearch] = useState('')

    const submitSearch = async (event) => {
      event.preventDefault()
      console.log("Search Submitted: ") 
    }
    return (
    <div>

      <form onSubmit={submitSearch}>

          Search Playlists: <input
            value={search}
            onChange={({ target }) => setSearch(target.value)}
      />
      <button type='submit'> Find </button>
      </form>

      <div>
        <h2> All Playlists:  </h2>
      <li>p1 </li>
      <li>p2 </li>
      <li>p3 </li>
      <li>p4 </li>
      </div>

    </div>
    )
}

export default Browse