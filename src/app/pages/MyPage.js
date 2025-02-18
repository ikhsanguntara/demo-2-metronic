import React, { useState, useEffect } from "react";
import { Card, Container, Row, Col, Form, Pagination } from "react-bootstrap";

// Data Dummy (30 item)
const allCourses = Array.from({ length: 30 }, (_, index) => ({
  id: index + 1,
  title: `Course ${index + 1}`,
  price: index % 3 === 0 ? "Rp 0" : `Rp ${index * 10},000`,
  rating: (Math.random() * 5).toFixed(1),
  reviews: Math.floor(Math.random() * 5000),
  level: index % 3 === 0 ? "Beginner Friendly" : index % 3 === 1 ? "Intermediate" : "All Levels",
  type: index % 2 === 0 ? "Starter" : "Premium",
  year: 2019 + (index % 5),
}));

export const MyPage = () => {
  const [filteredCourses, setFilteredCourses] = useState(allCourses);
  const [selectedLevel, setSelectedLevel] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Filter Data
  useEffect(() => {
    let filtered = allCourses;

    if (selectedLevel) filtered = filtered.filter((c) => c.level === selectedLevel);
    if (selectedType) filtered = filtered.filter((c) => c.type === selectedType);
    if (selectedYear) filtered = filtered.filter((c) => c.year === Number(selectedYear));

    setFilteredCourses(filtered);
    setCurrentPage(1); // Reset ke halaman pertama setelah filter
  }, [selectedLevel, selectedType, selectedYear]);

  // Hitung Pagination
  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);
  const displayedCourses = filteredCourses.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <Container>
      <Row className="my-3">
        {/* Filter Sidebar */}
        <Col md={3}>
          <h5>Filter</h5>
          <Form>
            <Form.Group>
              <Form.Label>Level</Form.Label>
              <Form.Control as="select" value={selectedLevel} onChange={(e) => setSelectedLevel(e.target.value)}>
                <option value="">Semua</option>
                <option value="Beginner Friendly">Beginner Friendly</option>
                <option value="Intermediate">Intermediate</option>
                <option value="All Levels">All Levels</option>
              </Form.Control>
            </Form.Group>

            <Form.Group className="mt-3">
              <Form.Label>Type</Form.Label>
              <Form.Control as="select" value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
                <option value="">Semua</option>
                <option value="Starter">Starter (Rp 0)</option>
                <option value="Premium">Premium</option>
              </Form.Control>
            </Form.Group>

            <Form.Group className="mt-3">
              <Form.Label>Tahun</Form.Label>
              <Form.Control as="select" value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
                <option value="">Semua</option>
                {[2019, 2020, 2021, 2022, 2023].map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Form>
        </Col>

        {/* Course List */}
        <Col md={9}>
          <Row>
            {displayedCourses.length > 0 ? (
              displayedCourses.map((course) => (
                <Col md={4} key={course.id} className="mb-4">
                  <Card>
                    <Card.Body>
                      <Card.Title>{course.title}</Card.Title>
                      <Card.Text>
                        <strong>Harga:</strong> {course.price} <br />
                        <strong>Rating:</strong> ⭐ {course.rating} ({course.reviews} ulasan) <br />
                        <strong>Level:</strong> {course.level} <br />
                        <strong>Tipe:</strong> {course.type} <br />
                        <strong>Tahun:</strong> {course.year}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            ) : (
              <p className="text-center">Tidak ada kursus yang cocok dengan filter.</p>
            )}
          </Row>

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination className="justify-content-center">
              <Pagination.Prev disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)} />
              {[...Array(totalPages)].map((_, index) => (
                <Pagination.Item key={index} active={index + 1 === currentPage} onClick={() => setCurrentPage(index + 1)}>
                  {index + 1}
                </Pagination.Item>
              ))}
              <Pagination.Next disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)} />
            </Pagination>
          )}
        </Col>
      </Row>
    </Container>
  );
};

