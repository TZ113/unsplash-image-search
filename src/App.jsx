
// eslint-disable-next-line no-unused-vars
import { useRef } from 'react'
import { Form } from 'react-bootstrap'
import "./index.css"

const App = () => {

  const searchInput = useRef(null)

  const handleSearch = (event) => {
    event.preventDefault();
    console.log("submitted")
  }

  return (
    <main className="container">
      <h1 className="title">Search Image<img className='search-icon' src="/search-icon-2.png" alt="search icon" /></h1>
      <div className="search-section">
        <Form onSubmit={handleSearch}>
          <Form.Control
            type="search"
            placeholder="Type something to search"
            className='search-input'
            ref={searchInput}
          />
        </Form>
      </div>
    </main>
  )
}

export default App