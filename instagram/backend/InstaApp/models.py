from django.db import models
from django.contrib.auth.models import User
import datetime,os


# Create your models here.


# login
class Login(models.Model):
    username=models.CharField(max_length=255,blank=False,null=False)
    password=models.CharField(max_length=255,blank=False,null=False)

    def __str__(self):
        return self.username



# registration
class UserRegister(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    mobile=models.CharField(max_length=255,blank=False,null=False)
    full_name=models.CharField(max_length=255,blank=False,null=False)
    username=models.CharField(max_length=255,blank=False,null=False)
    password=models.CharField(max_length=255,blank=False,null=False)

    def __str__(self):
        return self.mobile



def get_image_path(instance, filename):
    today = datetime.date.today().strftime('%Y-%m-%d')
    return os.path.join('images', today, filename)


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)





# post upload
class UserPosts(models.Model):
    user=models.ForeignKey(User,on_delete=models.CASCADE)
    username=models.CharField(max_length=255)
    post_time=models.DateTimeField(auto_now_add=True)
    likes_count=models.IntegerField(default=0)
    post_images=models.ImageField(upload_to=get_image_path)
    follow=models.BooleanField(default=False)
    image_title=models.CharField(max_length=255,null=True,blank=True,default='Image title')
    image_discription=models.CharField(max_length=255,null=True,blank=True,default='Image description')




#followers 
class Followers(models.Model):
    user = models.ForeignKey(User, related_name='following_set', on_delete=models.CASCADE)
    status = models.BooleanField(default=False)
    followed_user = models.ForeignKey(User, related_name='followers_set', on_delete=models.CASCADE)

    class Meta:
        unique_together = ('user', 'followed_user', 'status')

    def __str__(self):
        return f'{self.user} follows {self.followed_user}'



def profile_image_path(instance, filename):
    today = datetime.date.today().strftime('%Y-%m-%d')
    return os.path.join('Profile_images', today, filename)


class ProfileImage(models.Model):
    user=models.ForeignKey(User,on_delete=models.CASCADE)
    profile_image=models.ImageField(upload_to=profile_image_path)


class Likes(models.Model):
    user=models.ForeignKey(User,on_delete=models.CASCADE)
    post_likes=models.IntegerField(default=0)
    status=models.BooleanField(default=False)
    post=models.ForeignKey(UserPosts,on_delete=models.CASCADE)

def get_story_path(instance, filename):
    today = datetime.date.today().strftime('%Y-%m-%d')
    return os.path.join('stories', today, filename)

class UserStories(models.Model):
    user=models.ForeignKey(User,on_delete=models.CASCADE)
    story=models.FileField(upload_to=get_story_path)
    status=models.BooleanField(default=False)
    date=models.DateTimeField(auto_now_add=True)

