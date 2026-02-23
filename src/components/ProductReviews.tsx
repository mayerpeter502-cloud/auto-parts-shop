"use client";

import { useState, useEffect } from "react";
import { Star, User } from "lucide-react";

interface Review {
  id: string;
  productId: string;
  author: string;
  rating: number;
  text: string;
  date: string;
}

interface ProductReviewsProps {
  productId: string;
}

export function ProductReviews({ productId }: ProductReviewsProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReview, setNewReview] = useState({ author: "", rating: 5, text: "" });
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    const allReviews = JSON.parse(localStorage.getItem("reviews") || "[]");
    const productReviews = allReviews.filter((r: Review) => r.productId === productId);
    setReviews(productReviews);
  }, [productId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.author.trim() || !newReview.text.trim()) return;

    const review: Review = {
      id: Date.now().toString(),
      productId,
      author: newReview.author,
      rating: newReview.rating,
      text: newReview.text,
      date: new Date().toLocaleDateString("ru-RU"),
    };

    const allReviews = JSON.parse(localStorage.getItem("reviews") || "[]");
    allReviews.push(review);
    localStorage.setItem("reviews", JSON.stringify(allReviews));

    setReviews([...reviews, review]);
    setNewReview({ author: "", rating: 5, text: "" });
    setIsFormOpen(false);
  };

  const averageRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : "0";

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Отзывы</h2>
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-gray-900">{averageRating}</span>
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-5 h-5 ${
                  star <= Math.round(Number(averageRating))
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-500">({reviews.length})</span>
        </div>
      </div>

      <button
        onClick={() => setIsFormOpen(!isFormOpen)}
        className="mb-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        {isFormOpen ? "Отменить" : "Написать отзыв"}
      </button>

      {isFormOpen && (
        <form onSubmit={handleSubmit} className="mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Имя</label>
            <input
              type="text"
              value={newReview.author}
              onChange={(e) => setNewReview({ ...newReview, author: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
              placeholder="Ваше имя"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Оценка</label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setNewReview({ ...newReview, rating: star })}
                  className="p-1"
                >
                  <Star
                    className={`w-6 h-6 ${
                      star <= newReview.rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Отзыв</label>
            <textarea
              value={newReview.text}
              onChange={(e) => setNewReview({ ...newReview, text: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
              rows={4}
              placeholder="Расскажите о вашем опыте использования"
              required
            />
          </div>

          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Отправить отзыв
          </button>
        </form>
      )}

      <div className="space-y-4">
        {reviews.length === 0 ? (
          <p className="text-gray-500 text-center py-8">Пока нет отзывов. Будьте первым!</p>
        ) : (
          reviews.map((review) => (
            <div key={review.id} className="border-b border-gray-100 pb-4 last:border-0">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-gray-500" />
                  </div>
                  <span className="font-medium text-gray-900">{review.author}</span>
                </div>
                <span className="text-sm text-gray-400">{review.date}</span>
              </div>

              <div className="flex mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-4 h-4 ${
                      star <= review.rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>

              <p className="text-gray-700">{review.text}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
