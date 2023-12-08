import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import fetchUtility from '../utils/Request';

const leftAlignedText = {
  textAlign: 'left'
};

const smallButton = {
  padding: '0.1rem 0.3rem',
  fontSize: '0.8rem',
  marginLeft: '0.5rem'
};

const CommentsSection = ({ feedId, comments, setComments }) => {
  const [activeCommentId, setActiveCommentId] = useState(null);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingReplyId, setEditingReplyId] = useState(null);
  const [editText, setEditText] = useState('');
  const [commentText, setCommentText] = useState('');
  const [replyText, setReplyText] = useState({});

  // 댓글 추가
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    const response = await fetchUtility.post('/comments?request_user_id=2', { feed_id: feedId, content: commentText });
    if (response !== undefined && response.ok) {
      const newComment = await response.json();
      setComments([...comments, newComment]);
      setCommentText('');
    }
  };

  // 대댓글 추가
  const handleReplySubmit = async (commentId) => {
    const response = await fetchUtility.post(`/comments/${commentId}?request_user_id=2`, { feed_id: feedId, content: replyText[commentId] });
    if (response !== undefined && response.ok) {
      const newReply = await response.json();
      setComments(comments.map(comment => {
        if (comment.id === commentId) {
          return { ...comment, replies: [...(comment.replies || []), newReply] };
        } else {
          return comment;
        }
      }));
      setReplyText({ ...replyText, [commentId]: '' });
    }
  };

  const handleCommentClick = (commentId) => {
    setActiveCommentId(activeCommentId === commentId ? null : commentId);
  };

  // 댓글 수정
  const handleEditComment = (commentId) => {
    setEditingCommentId(commentId);
    const comment = comments.find(c => c.id === commentId);
    setEditText(comment ? comment.content : '');
  };

  // 댓글 삭제
  const handleDeleteComment = async (commentId) => {
    console.log(commentId)
    const response = await fetchUtility.delete(`/comments/${commentId}?request_user_id=2`);
    if (response !== undefined && response.ok) {
      setComments(comments.filter(comment => comment.id !== commentId));
    }
  };

  // 대댓글 수정
  const handleEditReply = (replyId) => {
    setEditingReplyId(replyId);
    setEditText('');
  };

  // 대댓글 삭제
  const handleDeleteReply = async (commentId, replyId) => {
    const response = await fetchUtility.delete(`/comments/${replyId}?request_user_id=2`);
    if (response !== undefined && response.ok) {
      setComments(comments.map(comment => {
        if (comment.id === commentId) {
          return { ...comment, replies: comment.replies.filter(reply => reply.id !== replyId) };
        } else {
          return comment;
        }
      }));
    }
  };

  // 수정 저장
  const handleEditSave = async () => {
    let response;
    if (editingCommentId !== null) {
      response = await fetchUtility.put(`/comments/${editingCommentId}?request_user_id=2`, { feed_id: feedId, content: editText });
    } else if (editingReplyId !== null) {
      response = await fetchUtility.put(`/comments/${editingReplyId}?request_user_id=2`, { feed_id: feedId, content: editText });
    }
    if (response && response.ok) {
      const updatedItem = await response.json();
      setComments(comments.map(comment => {
        if (comment.id === editingCommentId) {
          return updatedItem;
        } else if (comment.replies && comment.replies.some(reply => reply.id === editingReplyId)) {
          return {
            ...comment,
            replies: comment.replies.map(reply => reply.id === editingReplyId ? updatedItem : reply)
          };
        } else {
          return comment;
        }
      }));
      setEditingCommentId(null);
      setEditingReplyId(null);
      setEditText('');
    }
  };

  // 수정 취소
  const handleEditCancel = () => {
    setEditingCommentId(null);
    setEditingReplyId(null);
    setEditText('');
  };

  return (
    <div>
      {/* 댓글 작성 폼 */}
      <Form onSubmit={handleCommentSubmit}>
        <Form.Group controlId="comment">
          <Form.Label>댓글 달기</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
        </Form.Group>
        <Button className='m-1' variant="primary" type="submit">
          댓글 작성
        </Button>
      </Form>

      {/* 댓글 및 대댓글 목록 */}
      {comments.map((comment) => (
        <div key={comment.id}>
          {/* 댓글 내용 및 버튼 */}
          {editingCommentId === comment.id ? (
            <Form>
              <Form.Control
                as="textarea"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
              />
              <Button onClick={handleEditSave}>저장</Button>
              <Button onClick={handleEditCancel}>취소</Button>
            </Form>
          ) : (
            <p style={leftAlignedText}>
              <span onClick={() => handleCommentClick(comment.id)}>{comment.content}</span>
              <Button style={smallButton} variant="outline-primary" onClick={() => handleEditComment(comment.id)}>수정</Button>
              <Button style={smallButton} variant="danger" onClick={() => handleDeleteComment(comment.id)}>삭제</Button>
            </p>
          )}

          {/* 대댓글 목록 */}
          {comment.replies && comment.replies.map((reply) => (
            <div key={reply.id} style={{ marginLeft: '20px' }}>
              {editingReplyId === reply.id ? (
                <Form>
                  <Form.Control
                    as="textarea"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                  />
                  <Button onClick={handleEditSave}>저장</Button>
                  <Button onClick={handleEditCancel}>취소</Button>
                </Form>
              ) : (
                <p style={leftAlignedText}>
                  {reply.content}
                  <Button style={smallButton} variant="outline-primary" onClick={() => handleEditReply(reply.id)}>수정</Button>
                  <Button style={smallButton} variant="danger" onClick={() => handleDeleteReply(comment.id, reply.id)}>삭제</Button>
                </p>
              )}
            </div>
          ))}

          {/* 대댓글 추가 폼 */}
          {activeCommentId === comment.id && (
            <Form>
              <Form.Control
                as="textarea"
                rows={1}
                value={replyText[comment.id] || ''}
                onChange={(e) => setReplyText({ ...replyText, [comment.id]: e.target.value })}
                placeholder="대댓글 작성"
              />
              <Button onClick={() => handleReplySubmit(comment.id)}>대댓글 추가</Button>
            </Form>
          )}
        </div>
      ))}
    </div>
  );
};

export default CommentsSection;
