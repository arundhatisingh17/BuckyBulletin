import React from "react";
import { Modal, Button, Table } from "react-bootstrap";

const Banner = ({ marker, onClose }) => {
  const headerStyle = {
    backgroundColor: "#E44040",
    color: "white",
  };

  return (
    <Modal show onHide={onClose} centered>
      <Modal.Header closeButton style={headerStyle}>
        <Modal.Title>{marker.title}</Modal.Title>
        <style>{`
          .modal-header .btn-close {
            filter: invert(1); /* Makes the close button white */
          }
        `}</style>
      </Modal.Header>
      <Modal.Body>
        <Table bordered>
          <tbody>
            <tr>
              <td><strong>Location</strong></td>
              <td>{marker.location || "N/A"}</td>
            </tr>
            <tr>
              <td><strong>Time</strong></td>
              <td>{marker.start_time}{marker.end_time ? ` - ${marker.end_time}` : ""}</td>
            </tr>
            <tr>
                <td><strong>Description</strong></td>
                <td>
                    {marker.description?.startsWith("https") ? (
                        <a href={marker.description} target="_blank" rel="noopener noreferrer">
                        {marker.description}
                        </a>
                    ) : (
                    marker.description
                    )}
                </td>

            </tr>
            <tr>
                <td><strong>Tags</strong></td>
                <td>{Array.isArray(marker.tags) ? marker.tags.join(", ") : marker.tags || "N/A"}</td>
            </tr>
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Banner;