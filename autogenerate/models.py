from __future__ import unicode_literals

from django.db import models
from django.contrib.auth.models import User
from datetime import datetime

class Notification(models.Model):
    name = models.CharField(max_length = 200)
    dateCreated = models.DateTimeField(auto_now_add = True, blank=True)
    checked = models.BooleanField(default=False)
    user = models.ForeignKey(User)
    def __unicode__(self):
        return u'%s' %(self.name+' '+str(self.dateCreated.date()))

class UserActivity(models.Model):
    last_activity_ip = models.GenericIPAddressField()
    last_activity_date = models.DateTimeField(default = datetime(2016, 9, 9))
    user = models.OneToOneField(User, primary_key=True)