# Generated by Django 4.1.7 on 2023-03-05 22:53

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Project',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=128, verbose_name='Название проекта')),
                ('repo_link', models.TextField(blank=True, verbose_name='Ссылка на репозиторий')),
                ('users', models.ManyToManyField(to='users.user', verbose_name='Пользователь(и)')),
            ],
            options={
                'verbose_name': 'Проект',
                'verbose_name_plural': 'Проекты',
            },
        ),
        migrations.CreateModel(
            name='ToDo',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('text', models.TextField(verbose_name='Текст')),
                ('created', models.DateTimeField(auto_now_add=True, verbose_name='Создана')),
                ('updated', models.DateTimeField(auto_now_add=True, verbose_name='Обновлена')),
                ('is_active', models.BooleanField(default=True, verbose_name='Состояние')),
                ('project', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='todo.project', verbose_name='Проект')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='users.user', verbose_name='Автор заметки')),
            ],
            options={
                'verbose_name': 'Заметка',
                'verbose_name_plural': 'Заметки',
            },
        ),
    ]
