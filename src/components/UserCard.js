import React from 'react';
import { Card, Button, Image, Row, Col } from 'react-bootstrap';

function UserCard({ avatarUrl, username }) {
    return (
        <Card style={{ padding: '10px', margin: '10px 0' }}>
            <Row>
                <Col xs={2} md={1}>
                    <Image src={avatarUrl} roundedCircle fluid style={{ maxWidth: '50px' }} />
                </Col>
                <Col style={{ alignSelf: 'center', fontSize: '18px', fontWeight: '500' }}>
                    {username}
                </Col>
                <Col xs={3} md={2} style={{ alignSelf: 'center', textAlign: 'right' }}>
                    <Button variant="outline-danger">Unfollow</Button>
                </Col>
            </Row>
        </Card>
    );
}

export default UserCard;
