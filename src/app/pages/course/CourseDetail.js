import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  ListGroup,
  Form,
  Accordion,
} from "react-bootstrap";
import { Card as BootstrapCard } from "react-bootstrap";
import {
  Card,
  CardBody,
  CardHeader,
} from "../../../_metronic/_partials/controls";

export const CourseDetail = () => {
  const [selectedVideo, setSelectedVideo] = useState({
    title: "Build APP",
    link: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  });
  const [completedVideos, setCompletedVideos] = useState([]);

  const videos = [
    {
      title: "Section 1",
      duration: "10 menit",
      list: [
        {
          title: "Build APP",
          duration: "5 menit",
          link: "https://www.youtube.com/embed/dQw4w9WgXcQ",
          status : true,
        },
        {
          title: "Release app",
          duration: "5 menit",
          link: "https://www.youtube.com/embed/-IAp4Vx3oWI",
          status : true,

        },

      ],
    },
    {
      title: "Section 2",
      duration: "10 menit",
      list: [
        {
          title: "Build APP",
          duration: "5 menit",
          link: "https://www.youtube.com/embed/31lPlCr8hxc",
          status : false,

        },
        {
          title: "Release app",
          duration: "5 menit",
          link: "https://www.youtube.com/embed/-IAp4Vx3oWI",
          status : false,

        },
      ],
    },
  ];

  const handleVideoSelect = (video) => {
    setSelectedVideo(video);
    if (!completedVideos.includes(video.title)) {
      setCompletedVideos([...completedVideos, video.title]);
    }
  };

  return (
    <Card>
      <CardHeader title="Course"></CardHeader>
      <CardBody>
        <Row className="gx-3">
          <Col md={3} className="p-3 rounded shadow">
            <Accordion defaultActiveKey="0">
              {videos.map((section, index) => (
                <BootstrapCard key={index} className="mb-2 border-0">
                  <BootstrapCard.Header className="p-2 bg-dark text-white">
                    <Accordion.Toggle
                      as={Button}
                      variant="link"
                      eventKey={index.toString()}
                      className="text-white fw-bold text-decoration-none w-100 text-start"
                    >
                      {section.title} <span className="fw-normal">({section.duration})</span>
                    </Accordion.Toggle>
                  </BootstrapCard.Header>
                  <Accordion.Collapse eventKey={index.toString()}>
                    <BootstrapCard.Body className="p-0">
                      <ListGroup variant="flush">
                        {section.list.map((video, vidIndex) => (
                          <ListGroup.Item
                            key={vidIndex}
                            action
                            onClick={() => handleVideoSelect(video)}
                            className="d-flex justify-content-between align-items-center px-3 py-2 border-bottom"
                            style={{
                              cursor: "pointer",
                              backgroundColor: selectedVideo.title === video.title ? "#f8f9fa" : "white",
                            }}
                          >
                            {video.title} {selectedVideo.title === video.title && "▶"}
                            <span className={`text-muted small ${completedVideos.includes(video.title) ? "text-success fw-bold" : ""}`}>
                              {video.duration} {completedVideos.includes(video.title) && "✔"}
                            </span>
                          </ListGroup.Item>
                        ))}
                      </ListGroup>
                    </BootstrapCard.Body>
                  </Accordion.Collapse>
                </BootstrapCard>
              ))}
            </Accordion>
          </Col>

          <Col md={9}>
            <BootstrapCard className="shadow-lg border-0">
              <BootstrapCard.Body>
                <div className="embed-responsive embed-responsive-16by9">
                  <iframe
                    className="embed-responsive-item w-100"
                    src={selectedVideo.link}
                    title={selectedVideo.title}
                    allowFullScreen
                    style={{ borderRadius: "12px", minHeight: "450px" }}
                  ></iframe>
                </div>
              </BootstrapCard.Body>
            </BootstrapCard>
            <h4 className="mt-3 fw-bold">{selectedVideo.title}</h4>
            <div className="d-flex justify-content-end">
              <Button variant="primary" className="mt-3 px-4 py-2 fs-6">
                Complete
              </Button>
            </div>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};
