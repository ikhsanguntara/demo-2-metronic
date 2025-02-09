import React, { useState } from "react";
import { Button, Form, Card, Container, Row, Col, Badge, Pagination } from "react-bootstrap";

const coursesData = [
  { id: 1, title: "Full-Stack Laravel React Native: FoodMarket Apps", category: "Premium", image: "https://via.placeholder.com/300" },
  { id: 2, title: "Mastering Coding Interview", category: "Premium", image: "https://via.placeholder.com/300" },
  { id: 3, title: "SASS Workshop: Design Website Lebih Cepat", category: "Starter", image: "https://via.placeholder.com/300" },
  { id: 4, title: "React Advanced: Optimizing Performance", category: "Premium", image: "https://via.placeholder.com/300" },
  { id: 5, title: "Node.js Fundamentals", category: "Starter", image: "https://via.placeholder.com/300" },
  { id: 6, title: "Vue.js for Beginners", category: "Finished", image: "https://via.placeholder.com/300" },
  { id: 7, title: "Python Data Science", category: "Premium", image: "https://via.placeholder.com/300" },
  { id: 8, title: "Flutter Mobile Development", category: "Starter", image: "https://via.placeholder.com/300" },
  { id: 9, title: "Django Web Development", category: "Finished", image: "https://via.placeholder.com/300" },
];

const ITEMS_PER_PAGE = 3; // Menampilkan 3 kursus per halaman

const EmailSettings = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All Courses");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredCourses = coursesData.filter(
    (course) =>
      (filter === "All Courses" || course.category === filter) &&
      course.title.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination Logic
  const totalPages = Math.ceil(filteredCourses.length / ITEMS_PER_PAGE);
  const displayedCourses = filteredCourses.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <Container className="mt-4">
      <h2 className="fw-bold">My Courses</h2>
      <p>Upgrade terus ilmu dan pengalaman terbaru kamu di bidang teknologi</p>

      <Form.Group className="mb-3">
        <Form.Control
          type="text"
          placeholder="Cari kelas..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />
      </Form.Group>

      {/* Filter Buttons */}
      <div className="d-flex gap-2 mb-3">
        {["All Courses", "Premium", "Starter", "Finished"].map((category) => (
          <Button
            key={category}
            variant={filter === category ? "dark" : "light"}
            onClick={() => {
              setFilter(category);
              setCurrentPage(1);
            }}
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Search & Reset Buttons */}
      <div className="d-flex gap-2 mb-4">
        <Button variant="primary">Search</Button>
        <Button variant="danger" onClick={() => setSearch("")}>
          Reset
        </Button>
      </div>

      {/* Course Cards */}
      <Row>
        {displayedCourses.length > 0 ? (
          displayedCourses.map((course) => (
            <Col key={course.id} md={4} className="mb-4">
              <Card className="shadow-sm">
                <Card.Img variant="top" src={course.image} />
                <Card.Body>
                  <Card.Title>{course.title}</Card.Title>
                  <Badge bg="secondary" className="mb-2">
                    Kelas {course.category}
                  </Badge>
                  <div className="text-success mt-2">✔ Akses Selamanya</div>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p className="text-center">Tidak ada kursus yang ditemukan.</p>
        )}
      </Row>

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination className="justify-content-center mt-4">
          <Pagination.Prev
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          />
          {[...Array(totalPages)].map((_, index) => (
            <Pagination.Item
              key={index + 1}
              active={index + 1 === currentPage}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          />
        </Pagination>
      )}
    </Container>
  );
};

export default EmailSettings;
