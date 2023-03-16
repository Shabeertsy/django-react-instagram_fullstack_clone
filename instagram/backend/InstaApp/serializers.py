from rest_framework import serializers
from .models import Login,UserRegister,UserPosts,UserProfile,Followers,ProfileImage,Likes,UserStories
from django.contrib.auth.models import User


class LoginUserSerializer(serializers.ModelSerializer):
    class Meta:
        model=Login
        fields='__all__'



class UserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model=UserRegister
        fields='__all__'
    def create(self,validated_data):
        return UserRegister.objects.create(**validated_data)
    


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = '__all__'


class UserPostsSerializer(serializers.ModelSerializer):

    class Meta:
        model=UserPosts
        fields = '__all__'


class FollowersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Followers
        fields = ('user', 'followed_user', 'status')


class ProfileImageSerializer(serializers.ModelSerializer):

    class Meta:
        model=ProfileImage
        fields='__all__'



class CombinedSerializer(serializers.ModelSerializer):
    user_id = serializers.ReadOnlyField(source='user.id')
    username = serializers.ReadOnlyField(source='user.username')
    email = serializers.ReadOnlyField(source='user.email')
    profile_image = serializers.ImageField()

    class Meta:
        model = ProfileImage
        fields = ('id', 'user_id', 'username', 'email', 'profile_image')

   
class PostLikesSerializer(serializers.ModelSerializer):
    class Meta:
        model=Likes
        fields='__all__'

class UserStoriesSerializer(serializers.ModelSerializer):
    class Meta:
        model=UserStories
        fields='__all__'