from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static




#authentication built  in token
from rest_framework_simplejwt.views import (
    TokenRefreshView,
    TokenObtainPairView,
    TokenVerifyView
)






urlpatterns=[
    path('user_register',views.UserRegisterAPIView.as_view(),name='user_register'),
    path('single_user_view/<int:id>',views.SingleUserAPIView.as_view(),name='single_user_view'),
    path('postupload',views.PostUploadSerializerView.as_view(),name='postupload'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    path('viewfeeds',views.GetUserPostAPIView.as_view(), name='viewfeeds'),
    path('users',views.ShowUsersAPIView.as_view(), name='users'),
    path('follow/<followed_user_id>/',views.FollowUser.as_view(),name='follow'),
    path('unfollow/<followed_user_id>/',views.UnfollowUser.as_view(),name='unfollow'),
    path('checkfollow/<followed_user_id>/',views.CheckFollower.as_view(),name='checkfollow'),
    path('usergrid/<user_id>/',views.SingleUserGrid.as_view(),name='usergrid'),
    path('followcount/<user_id>/',views.FollowCount.as_view(),name='followcount'),
    path('profileimage/<user_id>/',views.AddProfileImage.as_view(),name='profileimage'),
    path('getprofileimage/<user_id>/',views.GetProfileImage.as_view(),name='getprofileimage'),
    path('addlikes/<int:post_id>',views.AddLikes.as_view(),name='addlikes'),
    path('likedpost/<int:post_id>',views.SingleLikesView.as_view(),name='likedpost'),
    path('unlike/<int:post_id>',views.UnLikeAPI.as_view(),name='unlike'),
    path('feedprofile/<int:user_id>',views.FeedDpAPI.as_view(),name='feedprofile'),
    path('storyupload',views.StoryUploadAPI.as_view(),name='storyupload'),
    path('getstory',views.GetStories.as_view(),name='getstory'),
    path('viewedstory/<int:story_id>',views.ViewedStory.as_view(),name='viewedstory'),
    path('storydelete',views.StoryDelete.as_view(),name='storydelete'),
    path('singlestory/<int:user_id>',views.SingleUserStory.as_view(),name='singlestory'),











]
