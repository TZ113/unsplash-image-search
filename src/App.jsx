
// eslint-disable-next-line no-unused-vars
import axios from "axios"
import { useCallback, useEffect, useRef, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import "./index.css"

const API_URL = 'https://api.unsplash.com/search/photos'
const imagesPerPage = 20


const App = () => {
  console.log("rendered")

  const searchInput = useRef(null)
  const [images, setImages] = useState([])
  const [totalPages, setTotalPages] = useState(0)
  const [page, setPage] = useState(1)

  const resetSearch = () => {
    fetchImages()
    setPage(1)
  }

  const handleSearch = (event) => {
    event.preventDefault();
    console.log(searchInput.current.value)
    resetSearch()
  }

  const handleSelection = (selection) => {
    console.log(selection)
    searchInput.current.value = selection
    resetSearch()
  }

  
  const fetchImages = useCallback(
    async () => {
    try {
      const {data} = await axios.get(
        `${API_URL}?query=${searchInput.current.value}&page=${page}&per_page=${imagesPerPage}&client_id=${import.meta.env.VITE_API_KEY}`
        )
        console.log(data)
        setImages(data.results)
        setTotalPages(data.total_pages)
      }
      catch (error) {
        console.log(error)
      }
    }, [page])
  
    console.log('page', page)
    console.log('total pages', totalPages)

  useEffect(() => {
    fetchImages()
  }, [page])
  
  const imageElements = images.map((image) => (
    <img
      key={image.id}
      src={image.urls.small}
      alt={image.alt_description}
      className="image"
    />
  ))

  return (
    <main className="container">
      <h1 className="title">Search Image<img className='search-icon' src="/search-icon-2.png" alt="search icon" /></h1>
      <section className="search-section">
        <Form onSubmit={handleSearch}>
          <Form.Control
            type="search"
            placeholder="Type something to search"
            className='search-input'
            ref={searchInput}
          />
        </Form>
      </section>
      <section className='filters'>
        <div onClick={() => handleSelection("nature")}>Nature</div>
        <div onClick={() => handleSelection("cats")}>Cats</div>
        <div onClick={() => handleSelection("girls")}>Girls</div>
        <div onClick={() => handleSelection("bags")}>Bags</div>
      </section>
      <section className="images">
        {imageElements}
      </section>
      <section className="buttons">
        {page > 1 && (<Button onClick={() => setPage(prevPage => prevPage - 1)}>Previous</Button>)}
        {page < totalPages && (<Button onClick={() => setPage(prevPage => prevPage + 1)}>next</Button>)}
      </section>
    </main>
  )
}

export default App