from django.shortcuts import render
from rest_framework import status
from rest_framework.views import status, APIView
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from django.contrib.auth.models import User
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

from django.db.models import Q
from django.shortcuts import get_object_or_404
import datetime
import os


from .models import Login, UserRegister, UserPosts, UserProfile, Followers,ProfileImage,Likes,UserStories
from InstaApp.serializers import LoginUserSerializer, UserRegisterSerializer, UserPostsSerializer, FollowersSerializer,ProfileImageSerializer,CombinedSerializer,PostLikesSerializer,UserStoriesSerializer



# registration api
class UserRegisterAPIView(GenericAPIView):
    serializer_class = UserRegisterSerializer
    serializer_class_login = LoginUserSerializer

    def post(self, request):
        mobile = request.data.get('mobile')
        full_name = request.data.get('full_name')
        username = request.data.get('username')
        password = request.data.get('password')

        user = User.objects.create_user(
            username=username,
            password=password,
        )
        user.save()

        if Login.objects.filter(username=username):
            return Response({'message': 'username already exists'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            serializer_log = self.serializer_class_login(
                data={'username': username, 'password': password})

        if serializer_log.is_valid():
            log = serializer_log.save()
            logs_id = log.id

        serializer = self.serializer_class(
            data={'user': user.id, 'username': username, 'mobile': mobile, 'full_name': full_name, 'password': password})

        if serializer.is_valid():
            serializer.save()
            return Response({'data': serializer.data, 'message': 'userregister successfully', 'success': 1}, status=status.HTTP_201_CREATED)
        return Response({'data': serializer.errors, 'message': 'user register failed', 'success': 0}, status=status.HTTP_400_BAD_REQUEST)



# get single user data

class SingleUserAPIView(GenericAPIView):
    def get(self, request, id):
        queryset = UserRegister.objects.get(user_id=id)
        serializer = UserRegisterSerializer(queryset)
        return Response(serializer.data)


# uploading image api
class PostUploadSerializerView(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request, format=None):
        post_images = request.data.get('post_images')
        image_title = request.data.get('image_title')
        image_discription = request.data.get('image_discription')

        user_data = UserRegister.objects.filter(user=request.user).values()
        print('user data', user_data)
        for i in user_data:
            user_id = i['user_id']
            username = i['username']
            likes = 0

        serializer = UserPostsSerializer(data={
            'user': user_id,
            'username': username,
            'likes': likes,
            'image_title': image_title,
            'image_description': image_discription,
            'post_images': post_images
        })
        if serializer.is_valid():
            serializer.save()

            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



# view all UserPosts api
class GetUserPostAPIView(GenericAPIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):

        user = UserRegister.objects.filter(user=request.user).values()
        for i in user:
            user_id = i['user_id']

        follower_ids = Followers.objects.filter(
            user=user_id).values_list('followed_user', flat=True)
        
        follow_data = UserPosts.objects.filter(
            Q(user__in=follower_ids) | Q(user=request.user)).order_by('-id')

        if follow_data.count() > 0:
            serializer = UserPostsSerializer(follow_data, many=True)
            data = serializer.data

            for post in data:
                post['image_url'] = request.build_absolute_uri(
                    post['post_images'])



                # get the time diffrence
                post_time_str = post['post_time']
                post_time_obj = datetime.datetime.strptime(
                    post_time_str, '%Y-%m-%dT%H:%M:%S.%fZ')

                time_diff = datetime.datetime.now() - post_time_obj

                second_diff = int(time_diff.total_seconds())
                minutes_diff = int(time_diff.total_seconds() // 60)
                hours_diff = int(time_diff.total_seconds() // 3600)
                days_diff = int(time_diff.total_seconds() // 86400)

                if second_diff < 60:
                    final_diff = str(second_diff)+' Seconds'
                elif minutes_diff < 60:
                    final_diff = str(minutes_diff)+' Minutes'
                elif hours_diff < 24:
                    final_diff = str(hours_diff)+' Hours'
                else:
                    final_diff = str(days_diff)+' Days'

                post['time_difference'] = final_diff



            return Response({'data': data, 'message': 'data get', 'success': 1})
        else:
            return Response({'data': 'no data available'}, status=status.HTTP_400_BAD_REQUEST)


# show users
class ShowUsersAPIView(GenericAPIView):
    serializer_class = UserRegisterSerializer
    permission_classes = [IsAuthenticated]

    def get(self, request):

        combined_data = ProfileImage.objects.select_related('user').exclude(user=request.user)


        serializer = CombinedSerializer(combined_data, many=True)

        data = serializer.data

        for post in data:
            post['image_url'] = request.build_absolute_uri(
                post['profile_image'])

        
        data = serializer.data
        return Response({'data':  data, 'message': 'data get', 'success': 1})
      

# follow user
class FollowUser(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, followed_user_id):
        user = request.user
        followed_user = get_object_or_404(User, id=followed_user_id)

        follower = Followers(
            user=user, followed_user=followed_user, status=True)
        follower.save()
        serializer = FollowersSerializer(follower)

        return Response(serializer.data)


# unfollow user
class UnfollowUser(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, followed_user_id):
        user = request.user
        followers = get_object_or_404(
            Followers, user=user, followed_user_id=followed_user_id)
        followers.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)


#check is follower
class CheckFollower(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, followed_user_id):
        user = request.user
        followers = get_object_or_404(
            Followers, user=user, followed_user_id=followed_user_id)
        serilazer = FollowersSerializer(followers)

        return Response(serilazer.data)


# single user profile grid view

class SingleUserGrid(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, user_id):
        queryset = UserPosts.objects.filter(user_id=user_id)
        serializer = UserPostsSerializer(queryset, many=True)
        data = serializer.data

        for post in data:
            post['image_url'] = request.build_absolute_uri(
                post['post_images'])

        return Response(serializer.data)


# get follow count

class FollowCount(APIView):
    def get(self, requeset, user_id):
        queryset = Followers.objects.filter(user_id=user_id)
        serializer = FollowersSerializer(queryset, many=True)
        follower_data = serializer.data

        queryset2 = Followers.objects.filter(followed_user_id=user_id)

        for post in follower_data:
            post['following_count'] = queryset.count()
            post['followers_count'] = queryset2.count()

        return Response(serializer.data)



#add profile picture
class AddProfileImage(APIView):
    parser_classes = [MultiPartParser, FormParser]

    def post(self,request,user_id):
        try:
            data=ProfileImage.objects.get(user=user_id)
            data.delete()  
            os.remove(data.profile_image.path)

            profile_image=request.data.get('post_images')
            serializer=ProfileImageSerializer(data={'profile_image':profile_image,'user':user_id})

            if serializer.is_valid():
                serializer.save()

                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


        except ProfileImage.DoesNotExist:

            profile_image=request.data.get('post_images')
            serializer=ProfileImageSerializer(data={'profile_image':profile_image,'user':user_id})

            if serializer.is_valid():
                serializer.save()

                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



#get profile picture
class GetProfileImage(APIView):
    def get(self,request,user_id):
        queryset=ProfileImage.objects.filter(user_id=user_id)
        serializer=ProfileImageSerializer(queryset,many=True)
        data = serializer.data

        for post in data:
            post['image_url'] = request.build_absolute_uri(
                post['profile_image'])

        return Response(serializer.data)
    


#add likes
class AddLikes(APIView):
       permission_classes = [IsAuthenticated]

       def post(self,request,post_id):
            
            post=get_object_or_404(UserPosts,id=post_id)
            liked_post=Likes.objects.filter(Q(post_id=post_id)& Q(user=request.user))
            print('exists',liked_post)


            if liked_post.count()>0:
                return Response('doesnot exist')
            else:                       
                likes=Likes(user=request.user,post=post,post_likes=1,status=True)
                likes.save()

                post_likes=UserPosts.objects.get(id=post_id)
                post_likes.likes_count+=1
                post_likes.save()

                serializer=PostLikesSerializer(likes)
                return Response(serializer.data)



#single like view
class SingleLikesView(APIView):
    permission_classes=[IsAuthenticated]

    def get(self,request,post_id):
        user_liked_post=Likes.objects.filter(Q(post_id=post_id)& Q(user=request.user))
        print('userlikde psot',user_liked_post)

        if user_liked_post.count()>0:
            serializer=PostLikesSerializer(user_liked_post,many=True)
            return Response(serializer.data)
        else:
            return Response({'status':0})
    
    

#unlike
class UnLikeAPI(APIView):
       permission_classes = [IsAuthenticated]

       def post(self,request,post_id):
            liked_post=Likes.objects.filter(Q(post_id=post_id)& Q(user=request.user))

            if liked_post.count()>0:
                for i in liked_post:
                    i.delete()

                post_likes=UserPosts.objects.get(id=post_id)
                post_likes.likes_count-=1
                post_likes.save()
                return Response('unliked successfully ')
            else:
                return Response('not found')


#get feed page profile image of the user

class FeedDpAPI(APIView):
    def get(self,request,user_id):
        queryset=ProfileImage.objects.filter(user=user_id)
        serializer=ProfileImageSerializer(queryset,many=True)
        data=serializer.data

        for post in data:
            post['image_url'] = request.build_absolute_uri(
                post['profile_image'])
            
        return Response(serializer.data)
    
    

class StoryUploadAPI(APIView):
    permission_classes=[IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def post(self,request):
        story_data=request.data.get('post_images')
        serializer=UserStoriesSerializer(data={'story':story_data,'user':request.user.id})

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


             

# view story

class GetStories(APIView):
    permission_classes = [IsAuthenticated]

    def get (self,request):

        follower_ids = Followers.objects.filter(
        user=request.user).values_list('followed_user', flat=True)
        
        follow_data = UserStories.objects.filter(
            Q(user__in=follower_ids) | Q(user=request.user)).order_by('-id')

        if follow_data.count() > 0:
            serializer = UserStoriesSerializer(follow_data, many=True)
            data = serializer.data

            for post in data:
                post['image_url'] = request.build_absolute_uri(
                    post['story'])
                
            
            return Response({'data': data, 'message': 'data get', 'success': 1})
        else:
            return Response({'data': 'no data available'}, status=status.HTTP_400_BAD_REQUEST)


#viewed story
class ViewedStory(APIView):
    def get(self,request,story_id):
        queryset=UserStories.objects.get(pk=story_id)
        queryset.status=True
        queryset.save()
        serializer=UserStoriesSerializer(queryset)

        return Response(serializer.data)
    

# story delete
class StoryDelete(APIView):
    def get(self,request):
        queryset=UserStories.objects.all()
        serializer=UserStoriesSerializer(queryset,many=True)
        data=serializer.data

        for post in data:

            post_time_str = post['date']
            post_time_obj = datetime.datetime.strptime(
                post_time_str, '%Y-%m-%dT%H:%M:%S.%fZ')

            time_diff = datetime.datetime.now() - post_time_obj
            hours_diff = int(time_diff.total_seconds() // 3600)
            print(hours_diff)


            if hours_diff>=24:
                UserStories.objects.filter(id=post['id']).delete()

        return Response('story deleted successfully')



# get single user story

class SingleUserStory(APIView):
    def get(self,request,user_id):
        queryset=UserStories.objects.filter(user=user_id)

        if queryset.count()>0:
            serializer=UserStoriesSerializer(queryset,many=True)
            data = serializer.data

            for post in data:
                post['image_url'] = request.build_absolute_uri(
                    post['story'])
                
            return Response(serializer.data)
        else:
            return Response({'data': 'no data available'}, status=status.HTTP_400_BAD_REQUEST)

    