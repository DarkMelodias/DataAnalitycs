# Generated by Django 4.1.10 on 2023-09-04 01:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Computadores', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='computador',
            name='ComputadorId',
            field=models.IntegerField(primary_key=True, serialize=False, unique=True),
        ),
    ]
