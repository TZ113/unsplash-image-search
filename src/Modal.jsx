import PropTypes from "prop-types"
import { useState } from "react"
import { Carousel, Modal } from "react-bootstrap"
import "./index.css"

export default function ImageModal(props) {
  console.log("Modal rendered")
  console.log(props)
  const [index, setIndex] = useState(props.idx)
  console.log(index)
  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex)
  }
  

    return (
      <Modal
        className="modal"
        show={props.show}
        onHide={() => props.setShow(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton onClick={() => props.setShow(false)}>
        </Modal.Header>
          <Modal.Body className="modal-body">
            <Carousel
              activeIndex={index}
              onSelect={handleSelect}
              interval={null}
              controls={true}
              touch={true}
              indicators={true}
              fade
            >
              {props.images.map((image, idx) => (

                  <Carousel.Item key={idx}>
                  <img
                      className="carousel-image"
                      src={image.urls.regular}
                      alt={image.alt_description}
                    />
                  <Carousel.Caption>{image.alt_description}</Carousel.Caption>
                  </Carousel.Item>

                  ))}
            </Carousel>
        </Modal.Body>
    </Modal>
    )
}
 
ImageModal.propTypes = {
  show: PropTypes.bool.isRequired,
  setShow: PropTypes.func.isRequired,
  idx: PropTypes.number.isRequired,
  images: PropTypes.array.isRequired,

}