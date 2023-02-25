from django.db import models

# Create your models here.

class User(models.Model):
    user_name = models.CharField(max_length=64, verbose_name='Имя пользователя')
    first_name = models.CharField(max_length=64, verbose_name='Имя')
    last_name = models.CharField(max_length=64, verbose_name='Фамилия')
    email = models.CharField(max_length=128, unique=True, verbose_name='Почта')

    class Meta:
        verbose_name = 'Пользователь'
        verbose_name_plural = 'Пользователи'

    def __str__(self):
        return self.user_name