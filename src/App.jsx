import axios from "axios"
import { useCallback, useEffect, useRef, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import ImageModal from "./Modal"
import "./index.css"

// Global variables
const API_URL = 'https://api.unsplash.com/search/photos'
const imagesPerPage = 20

const App = () => {
  console.log("App rendered")

  // State variables
  const searchInput = useRef(null)
  const [images, setImages] = useState([])
  const [totalPages, setTotalPages] = useState(0)
  const [page, setPage] = useState(1)
  const [errorMsg, setErrorMsg] = useState('')
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Function to fetch images from the unsplash API
  const fetchImages = useCallback(
    async () => {
      try {
        if (searchInput.current.value) {
          setErrorMsg('')
          setLoading(true)

          // Fetch images based on search data
          const {data} = await axios.get(
            `${API_URL}?query=${searchInput.current.value}&page=${page}&per_page=${imagesPerPage}&client_id=${import.meta.env.VITE_API_KEY}`
            )
    
          // Update states with fetched data
          setImages(data.results)
          setTotalPages(data.total_pages)
          setLoading(false)
      }
      } catch (error) {
        console.log(error)
        setErrorMsg("An error occurred, please try again later")
        setLoading(false)
      }
    }, [page])

  const resetSearch = () => {
    fetchImages()
    setPage(1)
  }

  // Event handler for form submission
  const handleSearch = (event) => {
    event.preventDefault();
    resetSearch()
  }

  // Function to handle selection from predefined filters
  const handleSelection = (selection) => {
    searchInput.current.value = selection
    resetSearch()
  }

  // Effect to fetch images on component mount and page change
  useEffect(() => {
    fetchImages()
  }, [fetchImages, page])

  // Event handler for image click to open modal
  const handleImageClick = (id) => {
    setCurrentImageIndex(() => images.findIndex((image) => image.id === id))
    setShowModal(true)
  }
  
  // Map fetched image data to JSX elements
  const imageElements = images.map((image) => (
      <img
        key={image.id}
        src={image.urls.small}
        alt={image.alt_description}
        className="image"
        onClick={() => handleImageClick(image.id)}
      />
  ))

  return (
    <main className="container">

      {/* Show the modal if image is clicked */}
      {showModal && < ImageModal
        idx={currentImageIndex}
        images={images}
        show={showModal}
        setShow={setShowModal}
      />}
      <h1 className="title">Image Search<img className='search-icon' src="/search-icon-2.png" alt="search icon" /></h1>
      {errorMsg && <p className="error-msg">{errorMsg}</p>}
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
      
      {/* Predefined filters for quick selection */}
      <section className='filters'>
        <div onClick={() => handleSelection("nature")}>Nature</div>
        <div onClick={() => handleSelection("cats")}>Cats</div>
        <div onClick={() => handleSelection("Space")}>Space</div>
        <div onClick={() => handleSelection("Girls")}>Girls</div>
        <div onClick={() => handleSelection("Cars")}>Cars</div>
      </section>
      
      {/* Display loading animation or fetched images */}
      {loading ? <img className="loading" src="/Loading.gif" alt="loading" /> :
      <section className="images">
        {imageElements}
      </section>
      }
      
      {/* pagination buttons */}
      <section className="buttons">
        {page > 1 && (<Button onClick={() => setPage(prevPage => prevPage - 1)}>Previous</Button>)}
        {page < totalPages && (<Button onClick={() => setPage(prevPage => prevPage + 1)}>next</Button>)}
      </section>
    </main>
  )
}

export default App