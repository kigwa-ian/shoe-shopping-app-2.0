import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductDetails = ({ productId }) => {
  const [product, setProduct] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [addingComment, setAddingComment] = useState(false);

  useEffect(() => {
    let isMounted = true;  // Track whether the component is mounted
    setLoading(true);

    axios.get(`https://your-backend-api.com/api/products/${productId}`)
      .then((response) => {
        if (isMounted) {
          setProduct(response.data);
          setComments(response.data.comments || []);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error('Error fetching product details:', error);
        setLoading(false);
      });

    return () => {
      isMounted = false;  // Cleanup on unmount
    };
  }, [productId]);

  const handleAddComment = () => {
    if (!newComment.trim()) return;  // Prevent adding empty comments

    setAddingComment(true);
    axios.post(`https://your-backend-api.com/api/products/${productId}/comments`, { text: newComment })
      .then((response) => {
        setComments([...comments, response.data]);
        setNewComment('');
      })
      .catch((error) => {
        console.error('Error adding comment:', error);
      })
      .finally(() => {
        setAddingComment(false);
      });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleAddComment();
    }
  };

  return loading ? (
    <p>Loading...</p>
  ) : product ? (
    <div>
      <h1>{product.name}</h1>
      <img src={product.imageUrl} alt={product.name} />
      <p>{product.description}</p>

      <h2>Comments</h2>
      {comments.length > 0 ? (
        comments.map((comment) => (
          <p key={comment.id}>{comment.text}</p>
        ))
      ) : (
        <p>No comments yet. Be the first to comment!</p>
      )}

      <input
        type="text"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        onKeyDown={handleKeyDown}
        className="w-full mb-2 p-2 border"
        placeholder="Add a comment..."
      />
      <button
        onClick={handleAddComment}
        className={`bg-blue-500 text-white p-2 ${addingComment ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={addingComment}
      >
        {addingComment ? 'Adding...' : 'Add Comment'}
      </button>
    </div>
  ) : (
    <p>Product not found</p>
  );
};

export default ProductDetails;

