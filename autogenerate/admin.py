from django.contrib import admin

# Register your models here.
from autogenerate.models import *
admin.site.register(Notification)
admin.site.register(UserActivity)