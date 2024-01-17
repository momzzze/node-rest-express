import { Alert, Button, Form, Row, Col, Stack } from "react-bootstrap";

const Register = () => {
    return (
        <>
            <Form>
                <Row style={{
                    height: "100vh",
                    justifyContent: "center",
                    paddingTop: "10%"
                }}>
                    <Col xs={6}>
                        <Stack gap={3}>
                            <h2>Register</h2>
                            <Form.Control type="text" placeholder="Enter name" />
                            <Form.Control type="email" placeholder="Enter email" />
                            <Form.Control type="password" placeholder="Enter password" />
                            <Button variant="primary" type="submit" className="mt-3">Register</Button>
                            <Alert variant="danger" className="mt-3"><p>This is a danger alert—check it out!</p></Alert>
                        </Stack>

                    </Col>
                </Row>
            </Form>
        </>
    )
}

export default Register