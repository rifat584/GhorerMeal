import { Link } from 'react-router'
import queryFetch from '../../../utilitis/queryFetch';
import useAuth from '../../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import MyReviewForm from '../../../components/Form/MyReviewForm';
import { DashboardPage, DashboardTable } from '../../../components/Dashboard/DashboardUI';

const MyReview = () => {
    const {user}= useAuth();
  const {data:MyReviews, isLoading}= useQuery({
    queryKey: ['reviews', user?.email],
    enabled: !!user?.email,
    queryFn: ()=> queryFetch(`review/${user?.email}`)
  })
  if(isLoading) return <LoadingSpinner/>

  return (
    <DashboardPage
      title='My reviews'
      description='Look back at the feedback you have already left and remove anything that no longer reflects your experience.'
    >
      <DashboardTable
        title='Review history'
        countLabel='Review'
        columns={['Meal', 'Rating', 'Comment', 'Date', 'Actions']}
        rowCount={MyReviews.length}
        emptyTitle='No reviews yet'
        emptyDescription='Once you review meals you have ordered, the full history will appear here.'
        emptyAction={
          <Link to='/all-meals' className='btn btn-primary rounded-full'>
            Browse meals
          </Link>
        }
      >
        {MyReviews.map(review => (
          <MyReviewForm key={review._id} review={review} user={user} />
        ))}
      </DashboardTable>
    </DashboardPage>
  );
};

export default MyReview;
