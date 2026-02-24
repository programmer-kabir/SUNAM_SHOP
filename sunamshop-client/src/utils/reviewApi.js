import reviews from "../../public/reviews.json";

// সব review
export async function getAllReviews() {
  await new Promise((res) => setTimeout(res, 300));
  return reviews;
}

export async function getReviewsById(id) {
  await new Promise((res) => setTimeout(res, 300));
  return reviews.filter((r) => String(r.productId) === String(id));
}
